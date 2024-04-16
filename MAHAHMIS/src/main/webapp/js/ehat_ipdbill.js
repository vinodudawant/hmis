var cancelTestSmplColFlag = "N";
var deleteTestSmplColFlg = "N";
var risReportFlag = "N";

function getPatientBillById(r) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/billNoble/fetchPatientsBillById",
		success : function(r) {
		}
	});
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 6_June_2017
 * @Code Getting Bill Data By Service
 ******************************************************************************/
function getPatientBillAmountIpd(r, callFrom) {

	// var k=31;
	//var openTreatment = "openTreatment";
	var tFlag = "AT";
	if(callFrom == "generalPrev"){
		
		tFlag = "CT";
	}else{
		
		tFlag = "AT";
	}
	
	jQuery.ajax({
		async : true,
		type : "POST",
		/*data : {
			"callform" : r,
			"treatcloseForIpd" : openTreatment
		},		
		url : "ehat/ipdbill/getIpdPatientServiceListFromView",*/
		
		data : {
			"tFlag" : tFlag,
			"treatmentId" : r
		},
		url : "ehat/ipdbillmgt/fetchPatientBillAmount",
		success : function(r) {

			// setTempPatientRecords(r);
			console.log(r);
			setBillDetailsTemp(r, callFrom);
			$('#amount').attr('readonly', 'true');
			$('#concessionIpdPer').val(0);
			
			if(callFrom == "generalPrev"){
				
				$("#saveBill").prop("disabled", true);
				$("#perticular").prop("disabled", true);
				$("#servId").prop("disabled", true);
				$("#specialityId").prop("disabled", true);
				$("#doctorName").prop("disabled", true);
				$("#rate").prop("disabled", true);
				$("#qty").prop("disabled", true);
				$("#amount").prop("disabled", true);
				$("#concession").prop("disabled", true);
				$("#pay").prop("disabled", true);
				$("#coPay").prop("disabled", true);
				$("#concessionIpdPer").prop("disabled", true);
			}
			

			// $(".openAllSlave").trigger('click');
			/*
			 * $("#payable").val(0); setTotalPaid();
			 */

		}
	});
}

var totAmt = 0;
function setBillDetailsTemp(r, callFrom) {

	// alert(callFrom);
	var setBill = "";
	var totAmt = 0;
	var totqyt = 0;
	var treatmentId = $('#treatmentId').text();
	var pharmaId = $("#pharmacyInvoice").val();
	var pharmacy = $("#pharmacy").val();

	for ( var i = 0; i < r.listServiceIpdDto.length; i++) {

		if (r.listServiceIpdDto[i].serviceId == 1) {
			totqyt = totqyt + 1;
			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ r.listServiceIpdDto[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ r.listServiceIpdDto[i].billDetailsId
					+ '"> </td>'

					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle">'
					+ '<div class="row">'
					+ '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName
					+ '</div>'
					+ '</div>'
					+ '</a>'
					+ '</h3>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</td>'
					+ '<td><div class="text-center">1</div></td>'
					+ '<td>'
					+ '<div class="text-right mainAddedInTotal" id="tamt'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;display:none"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';

			totAmt = totAmt + r.listServiceIpdDto[i].amount;

		} /*
			 * else if (r.listServiceIpdDto[i].serviceId == 2) { setBill=setBill
			 *  + '<tr>' + '<td class="only-checkbox" >' + '<input
			 * type="checkbox"
			 * onclick="setSlaveChk('+(r.listServiceIpdDto[i].serviceId)+')"
			 * checked=checked id="chkOpdBillReg'+
			 * r.listServiceIpdDto[i].serviceId+'" name="opdBillCheckboxReg"
			 * value="'+ r.listServiceIpdDto[i].serviceId+'">' + '</td>' + '<td>' + '<div
			 * class="text-left">' + '<div class="panel-group" id="accordion">' + '<div
			 * class="panel">' + '<div class="panel-heading">' + '<h3 class="panel-title">' + '<a
			 * class="accordion-toggle openAllSlaveIpd" data-toggle="collapse"
			 * data-parent="#accordion" href="#collapseCghsOne'+i+'"
			 * onclick="getSubServiceDetails('+treatmentId+','+
			 * r.listServiceIpdDto[i].serviceId +')">' + '<div class="row">' + '<div
			 * class="col-md-10">' + r.listServiceIpdDto[i].serviceName +'</div>' + '<div
			 * class="col-md-1">' + '<i class="fa fa-chevron-down"
			 * id="list'+i+'"></i>' + '</div>' + '</div>' + '</a>' + '</h3>' + '</div>' + '<div
			 * id="collapseCghsOne'+i+'" class="panel-collapse collapse">' + '<div
			 * class="panel-body">' + '<table class="table table-hover">' + '<thead>' + '<tr>' + '<th class="only-checkbox">#</th>' + '<th>Doctor
			 * Name</th>' + '<th>' + '<div class="text-center">Amount</div>' + '</th>';
			 * 
			 * var concessionFlow=$('#concessionFlow').val();
			 * 
			 * if(concessionFlow == "on"){ setBill=setBill + '<th>' + '<div
			 * class="text-center">Disc</div>' + '</th>'
			 *  + '<th>' + '<div class="text-center">Disc Per%</div>' + '</th>';
			 * }else{ setBill=setBill + '<th style="display:none">' + '<div
			 * class="text-center">Disc</div>' + '</th>'
			 *  + '<th style="display:none">' + '<div
			 * class="text-center">Disc Per%</div>' + '</th>'; }
			 * setBill=setBill + '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'
			 *  + '<th>' + '<div class="text-right">Date</div>' + '</th>' + '<th class="only-checkbox">Edit</th>' + '<th class="only-checkbox">Cancel</th>' + '<th class="only-checkbox">ChB</th>' + '</tr>' + '</thead>' + '<tbody
			 * id="serviceData">'
			 *  + '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</td>' + '<td><div
			 * class="text-center">' + r.listServiceIpdDto[i].serviceCount +'</div></td>' + '<td>' + '<div
			 * id="tamt'+(r.listServiceIpdDto[i].serviceId)+'"
			 * class="text-right">' + (r.listServiceIpdDto[i].amount).toFixed(2) +'</div></td>'
			 *  + '<td  class="text-center" ><a style="cursor:pointer;"> ' +'<button
			 * class="btn btn-xs btn-success editUserAccess" ' +'
			 * onclick=printIpdServiceWise('+treatmentId+',\'general\',\'No\','+
			 * r.listServiceIpdDto[i].serviceId +') ' +'value="EDIT"><i
			 * class="fa fa-print"
			 * id=btnServWise'+r.listServiceIpdDto[i].serviceId+'></i></button></a>
			 * </td>'
			 * 
			 *  + '</tr>';
			 * 
			 * totqyt=totqyt+ r.listServiceIpdDto[i].serviceCount;
			 * totAmt=totAmt+r.listServiceIpdDto[i].amount; }
			 */else if (r.listServiceIpdDto[i].serviceId == 3) {
			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ r.listServiceIpdDto[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse"data-parent="#accordion" href="#collapseCghsTwo'
					+ i + '" onclick="getBedDetails(' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + ')">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'

					+ '<div id="collapseCghsTwo' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					+ '<th>Bed + Hall</th>'

					/* + '<th>Doc Name</th>' */

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					/*
					 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>'
					 *  + '<th>' + '<div class="text-center">Disc %</div>' + '</th>'
					 */
					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';
			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th>' + '<div class="text-center">Disc Per%</div>'
						+ '</th>';
			} else {
				setBill = setBill + '<th style="display:none">'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th style="display:none">'
						+ '<div class="text-center">Disc Per%</div>' + '</th>';
			}
			setBill = setBill

			/* + '<th>' + '<div class="text-center">Pay</div>' + '</th>' */

			+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'

					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>'

					+ '<tbody id="bedData">'

					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>' + '<div class="text-right">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		} else if (r.listServiceIpdDto[i].serviceId == 4) {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'
					+ i + '" onclick="getSubServiceDetails1ForOT(' + i + ','
					+ treatmentId + ',' + r.listServiceIpdDto[i].serviceId
					+ ')">' + '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseCghsTwo' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>' + '<th>OT Name</th>'

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					/*
					 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
					 * class="text-center">Disc %</div>' + '</th>'
					 */
					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';
			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th>' + '<div class="text-center">Disc Per%</div>'
						+ '</th>';
			} else {
				setBill = setBill + '<th style="display:none">'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th style="display:none">'
						+ '<div class="text-center">Disc Per%</div>' + '</th>';
			}
			setBill = setBill

			/* + '<th>' + '<div class="text-center">Pay</div>' + '</th>' */

			+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>';
			if (r.listServiceIpdDto[i].iscombination == 'Y') {
				setBill = setBill + '<th class="only-checkbox">Services</th>';
			}
			setBill = setBill + '<th class="only-checkbox">ChB</th>'

			+ '</tr>' + '</thead>' + '<tbody id="OT' + i + '">'
			/*
			 * '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center"></div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
			 */
			+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		} else if (r.listServiceIpdDto[i].serviceId == 5) {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'
					+ i
					+ '" onclick="getSubServiceDetails1ForConsultingVisitingCharges('
					+ i + ',' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + ')">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseCghsTwo' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					/* + '<th>OT Name</th>' */

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					/*
					 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
					 * class="text-center">Disc %</div>' + '</th>'
					 */
					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th>' + '<div class="text-center">Disc Per%</div>'
						+ '</th>';
			} else {
				setBill = setBill + '<th style="display:none">'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th style="display:none">'
						+ '<div class="text-center">Disc Per%</div>' + '</th>';
			}
			setBill = setBill

			/* + '<th>' + '<div class="text-center">Pay</div>' + '</th>' */

			+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'
					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>' + '<tbody id="CVC' + i + '">'

					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		} else if (r.listServiceIpdDto[i].serviceId == pharmaId) {
		} else if (r.listServiceIpdDto[i].serviceId == pharmacy) {
			
			setBill = setBill

			+ '<tr>'
			+ '<td class="only-checkbox" >'// added by vinod
			+ '<input type="checkbox" onclick="setSlaveChk('
			+ (r.listServiceIpdDto[i].serviceId)
			+ ')" checked=checked id="chkOpdBillReg'
			+ (r.listServiceIpdDto[i].serviceId)
			+ '" name="opdBillCheckboxReg" value="'
			+ r.listServiceIpdDto[i].serviceId
			+ '">'
			+ '</td>'// added by vinod
			+ '<td>'
			+ '<div class="text-left">'
			+ '<div class="panel-group" id="accordion">'
			+ '<div class="panel">'
			+ '<div class="panel-heading">'
			+ '<h3 class="panel-title">'
			+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'
			+ i + '" onclick="getSubServiceDetails1(' + i + ','
			+ treatmentId + ',' + r.listServiceIpdDto[i].serviceId
			+ ')">' + '<div class="row">' + '<div class="col-md-10">'
			+ r.listServiceIpdDto[i].serviceName + '</div>'
			+ '<div class="col-md-1">'
			+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
			+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
			+ '<div id="collapseCghsTwo' + i
			+ '" class="panel-collapse collapse">'
			+ '<div class="panel-body">'
			+ '<table class="table table-hover">' + '<thead>' + '<tr>'
			+ '<th class="only-checkbox">#</th>'
			+ '<th>SubService Name</th>'

			+ '<th>Doc Name</th>'

			+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

			+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

			/*
			 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
			 * class="text-center">Disc %</div>' + '</th>'
			 */
			+ '<th>' + '<div class="text-center">Amount</div>'
			+ '</th>';

	var concessionFlow = $('#concessionFlow').val();

	if (concessionFlow == "on") {
		setBill = setBill + '<th>'
				+ '<div class="text-center">Disc</div>' + '</th>'

				+ '<th>' + '<div class="text-center">Disc Per%</div>'
				+ '</th>';
	} else {
		setBill = setBill + '<th style="display:none">'
				+ '<div class="text-center">Disc</div>' + '</th>'

				+ '<th style="display:none">'
				+ '<div class="text-center">Disc Per%</div>' + '</th>';
	}
	setBill = setBill

	/* + '<th>' + '<div class="text-center">Pay</div>' + '</th>' */

	+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

	+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
			+ '<th class="only-checkbox">Edit</th>'
			+ '<th class="only-checkbox">Cancel</th>';
	if (r.listServiceIpdDto[i].iscombination == 'Y') {
		setBill = setBill + '<th class="only-checkbox">Pkg</th>';
	}
	setBill = setBill + '<th class="only-checkbox">ChB</th>'

	+ '</tr>' + '</thead>' + '<tbody id="serviceData' + i + '">'
	/*
	 * '<tr>' + '<td class="only-checkbox">' + '<input
	 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
	 * class="text-center"></div>' + '</td>' + '<td>' + '<div
	 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
	 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
	 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
	 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
	 */
	+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
			+ '</div>' + '</div>' + '</td>'
			+ '<td><div class="text-center"> '
			+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
			+ '<td>'// added by vishant
			+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
			+ '" class="text-right">'
			+ (r.listServiceIpdDto[i].amount).toFixed(2)
			+ '</div></td>'

			+ '<td  class="text-center" ><a style="cursor:pointer;"> '
			+ '<button class="btn btn-xs btn-success " '
			+ '  onclick=printIpdServiceWise(' + treatmentId
			+ ',\'general\',\'No\',' + r.listServiceIpdDto[i].serviceId
			+ ') '
			+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
			+ r.listServiceIpdDto[i].serviceId
			+ '></i></button></a> </td>'

			+ '</tr>';// added by vishant

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
			
		} else {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'
					+ i + '" onclick="getSubServiceDetails1(' + i + ','
					+ treatmentId + ',' + r.listServiceIpdDto[i].serviceId
					+ ')">' + '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseCghsTwo' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					+ '<th>SubService Name</th>'

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					/*
					 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
					 * class="text-center">Disc %</div>' + '</th>'
					 */
					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th>' + '<div class="text-center">Disc Per%</div>'
						+ '</th>';
			} else {
				setBill = setBill + '<th style="display:none">'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th style="display:none">'
						+ '<div class="text-center">Disc Per%</div>' + '</th>';
			}
			setBill = setBill

			/* + '<th>' + '<div class="text-center">Pay</div>' + '</th>' */

			+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>';
			if (r.listServiceIpdDto[i].iscombination == 'Y') {
				setBill = setBill + '<th class="only-checkbox">Pkg</th>';
			}
			setBill = setBill + '<th class="only-checkbox">ChB</th>'

			+ '</tr>' + '</thead>' + '<tbody id="serviceData' + i + '">'
			/*
			 * '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center"></div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
			 */
			+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		}
	}

	// alert(totqyt);
	// alert(totAmt);
	// alert(callFrom);
	if (callFrom == "cghs") {
		$("#billDetails").html("");
		// alert("in chgs");
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text((totAmt).toFixed(2));

		$("#cghsBill").html(setBill);

		// $("#cghsBill").html(setBill);
	}/*
		 * else if(callFrom == "IpdSponsor"){ //alert("HII="+callFrom);
		 * getPatientBillAmountIpdForSponsor(treatmentId); $("#cghs").html("");
		 * //alert("in chgs"); $("#totalQtty").text(totqyt);
		 * $("#totalAmmt").text(totAmt);
		 * 
		 * $("#sponsor").html(setBill); }
		 */else {
		$("#cghsBill").html("");
		// alert("in general");
		$("#totalQty").text(totqyt);
		$("#totalAmt").text((totAmt).toFixed(2));
		$("#totAmt").text((totAmt).toFixed(2));

		$("#billDetails").html(setBill);

	}
}

function getBedDetails(t, s) {
	// alert("hiiii");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/ipdbill/getPatientBedBill",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getBedDetailsTemp(r, s);
			// setBillDetailsTemp(r);
		}
	});
}

function getBedDetailsTemp(t, s) {

	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	var nursing = "Nursing";
	var hallName = "";

	for ( var i = 0; i < t.listBedIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listBedIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');

		var netAmt = Number(t.listBedIpdDto[i].amount)
				- Number(t.listBedIpdDto[i].concession);

		/*
		 * var dname= t.listBedIpdDto[i].docName;
		 * 
		 * if(dname==null) { dname="-"; }
		 */
		if (t.listBedIpdDto[i].paidByCashFlag == "Y") {

			if (t.listBedIpdDto[i].cancle == "Y"
					|| t.listBedIpdDto[i].isModify == "N") {
				setService = setService
						+ '<tr disabled bgcolor="lightblue" id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';

			} else {
				setService = setService
						+ '<tr bgcolor="lightblue" disabled="disabled" id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';
			}
		} else {
			if (t.listBedIpdDto[i].cancle == "Y"
					|| t.listBedIpdDto[i].isModify == "N") {
				setService = setService + '<tr id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';

			} else {
				setService = setService + '<tr id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';
			}

		}

		setService = setService

		// + '<tr id="tr' + (t.listBedIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listBedIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].billDetailsId + ' </td>'

				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].otherRate + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="ehatHallId"> '
				+ t.listBedIpdDto[i].ehatHallId + ' </td>'

				+ '<td style="display:none;" id="hallID"> '
				+ t.listBedIpdDto[i].hallID + ' </td>'

				+ '<td style="display:none;" id="idHallType"> '
				+ t.listBedIpdDto[i].idHallType + ' </td>'

				+ '<td style="display:none;" id="ehatHalltypeId"> '
				+ t.listBedIpdDto[i].ehatHalltypeId + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].subServiceId + ' </td>';

		if (t.listBedIpdDto[i].subServiceId == 0) {

			setService = setService + '<td id="catName'
					+ (t.listBedIpdDto[i].billDetailsId) + '"> ' + (nursing)
					+ ":" + (hallName) + ' </td>';
		} else {
			hallName = t.listBedIpdDto[i].bedHall;
			if (t.listBedIpdDto[i].isCategory == 'N') {
				setService = setService + '<td id="catName'
						+ (t.listBedIpdDto[i].billDetailsId) + '"> '
						+ t.listBedIpdDto[i].bedHall + ' </td>';

			} else {
				hallName = t.listBedIpdDto[i].bedHall;

				setService = setService + '<td id="catName'
						+ (t.listBedIpdDto[i].billDetailsId) + '"> '
						+ t.listBedIpdDto[i].bedHall + ' </td>';

			}
		}

		setService = setService

		/*
		 * + '<td id="doccName'+(t.listBedIpdDto[i].billDetailsId)+'"> '+
		 * dname+' </td>'
		 */

		+ '<td style="display:none;" id="subserviceid'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].subServiceId + ' </td>';

		/*
		 * + '<td style="display:none;" id="dId'+(t.listBedIpdDto[i].billDetailsId)+'"> '+
		 * t.listBedIpdDto[i].docId+' </td>'
		 */

		/*
		 * + '<td id="char'+(t.listBedIpdDto[i].billDetailsId)+'">' + '<div
		 * class="text-center">'+ t.listBedIpdDto[i].rate +'</div>' + '</td>';
		 */

		// added by vinod
		if (t.listBedIpdDto[i].paidByCashFlag == "Y") {
			if (t.listBedIpdDto[i].cancle == "Y") {

				setService = setService + '<td style="display:none;"> '
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ t.listBedIpdDto[i].rate + '</div>' + '</td>'
						+ '<td id="char' + (t.listBedIpdDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIpdDto[i].rate).toFixed(2) + '</div>'
						+ '</td>';

			} else {

				if (t.listBedIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listBedIpdDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBedIpdDto[i].billDetailsId) + '" value="'
							+ netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBedIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIpdDto[i].billDetailsId) + '">'
							+ (t.listBedIpdDto[i].rate).toFixed(2) + '</div>'
							+ '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '" value="'
							+ netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">' + t.listBedIpdDto[i].quantity
					+ '</div>' + '</td>'

					+ '<td id="amt' + (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concession).toFixed(2) + '</div>'
						+ '</td>'

						+ '<td id="conPer' + (t.listBedIpdDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concession).toFixed(2) + '</div>'
						+ '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			/*
			 * + '<td id="p' + (t.listBedIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' + (t.listBedIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 */

			+ '<td id="cP' + (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub' + (t.listBedIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBedIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForBed('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBedIpdDto[i].cancle == "Y"
						|| t.listBedIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForBed('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editOnClickForBed('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBedIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBedIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listBedIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId + '">';
			}
		} else {
			if (t.listBedIpdDto[i].cancle == "Y") {

				setService = setService + '<td style="display:none;"> '
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ t.listBedIpdDto[i].rate + '</div>' + '</td>'
						+ '<td id="char' + (t.listBedIpdDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIpdDto[i].rate).toFixed(2) + '</div>'
						+ '</td>';

			} else {

				if (t.listBedIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listBedIpdDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBedIpdDto[i].billDetailsId) + '" value="'
							+ netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBedIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIpdDto[i].billDetailsId) + '">'
							+ (t.listBedIpdDto[i].rate).toFixed(2) + '</div>'
							+ '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '" value="'
							+ netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">' + t.listBedIpdDto[i].quantity
					+ '</div>' + '</td>'

					+ '<td id="amt' + (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concession).toFixed(2) + '</div>'
						+ '</td>'

						+ '<td id="conPer' + (t.listBedIpdDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concession).toFixed(2) + '</div>'
						+ '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			/*
			 * + '<td id="p' + (t.listBedIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' + (t.listBedIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 */

			+ '<td id="cP' + (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub' + (t.listBedIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBedIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForBed('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBedIpdDto[i].cancle == "Y"
						|| t.listBedIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForBed('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForBed('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBedIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBedIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" onclick="cancleOnClick('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listBedIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						// + '"disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId
						+ '" onclick=setService("general",'
						+ t.listBedIpdDto[i].billDetailsId + ')>';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId
						+ '" onclick=setService("general",'
						+ t.listBedIpdDto[i].billDetailsId + ')>';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';
		// $("#ehatHallIdFromUI").val(t.listBedIpdDto[i].ehatHallId);
	}
	$("#ehatHallIdd").val($("#ehatHallId").text());
	/*
	 * $("#hallIDD").val($("#hallID").val());
	 * $("#idHallTypee").val($("#idHallType").val());
	 * $("#ehatHalltypeIdd").val($("#ehatHalltypeId").val());
	 */

	// $("#ehatHallIdd").html($("#ehatHallId").html());
	// $("#hallIDD").html($("#hallID").html());
	// $("#idHallTypee").html($("#idHallType").html());
	// $("#ehatHalltypeIdd").html($("#ehatHalltypeId").html());
	$("#bedData").html(setService);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Save total payble
 ******************************************************************************/
/*
 * function setTotalPaid() {
 * 
 * var total = 0; $('.mainAddedInTotal').each(function() {
 * 
 * total = total + Number($(this).text()); });
 * 
 * $('.addedInTotal').each(function() {
 * 
 * total = total + Number($(this).val()); });
 * 
 * var payable = $("#payable").val(); total = Number(total) + Number(payable);
 * $("#payable").val(total); }
 */

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Set Total Payable
 ******************************************************************************/
function setTotalPaidIpd(callFrom, serviceId) {

	var sId = serviceId;
	var treatmentId = $("#treatmentId").text();
	var billId = $("#billNo").text();
	var unitId = $("#unitId").val();
	var userId = parseInt($("#userId").val());
	var depId = 2;

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"treatmentId" : parseInt(treatmentId),
			"billId" : parseInt(billId),
			"serviceId" : parseInt(sId),
			"callFrom" : callFrom,
			"depId" : parseInt(depId),
			"unitId" : parseInt(unitId),
			"userId" : parseInt(userId)
		},
		url : "ehat/ipdbill/getTotalPayableIpd",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			var totAmt = 0, totCons = 0, totPayable = 0;

			for ( var inx = 0; inx < r.listBillDetailsIpd.length; inx++) {

				var servId = r.listBillDetailsIpd[inx].serviceId;
				if (callFrom == "IpdSponsor") {

					totAmt = totAmt + r.listBillDetailsIpd[inx].otherAmount;
					totCons = totCons
							+ r.listBillDetailsIpd[inx].otherConcession;
				} else {

					totAmt = totAmt + r.listBillDetailsIpd[inx].amount;
					totCons = totCons + r.listBillDetailsIpd[inx].concession;
				}

				if (sId == -1) {

					$("#chkOpdBillReg" + servId).removeAttr("disabled");
					$("#chkOpdBillReg" + servId).prop("checked", "checked");
				}
			}

			totPayable = totAmt - totCons;
			$("#payable").val(parseFloat(totPayable).toFixed(2));
		}
	});
};

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Set slave checkboxes according to master
 ******************************************************************************/
function setSlaveChk(id) {

	if (($('#chkOpdBillReg' + id).prop("checked") == true)) {

		if (id == 1) {

			$('#tamt1').removeClass("mainNotInTotal");
			$('#tamt1').addClass("mainAddedInTotal");
		}

		$('.billSlaveChk' + id).prop('checked', true);

		$('.billSlave' + id).removeClass("notInTotal");
		$('.billSlave' + id).addClass("addedInTotal");
		// setTotalPaid();
	} else {

		if (id == 1) {

			$('#tamt1').removeClass("mainAddedInTotal");
			$('#tamt1').addClass("mainNotInTotal");
		}

		$('.billSlaveChk' + id).prop('checked', false);

		$('.billSlave' + id).removeClass("addedInTotal");
		$('.billSlave' + id).addClass("notInTotal");
		// setTotalPaid();
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Set total paid according to slaves
 ******************************************************************************/
function setTotalPaidbySlave(id) {

	if ($('#chkOpdBill' + id).prop("checked") == true) {

		$("#tAmtSlave" + id).removeClass("notInTotal");
		$("#tAmtSlave" + id).addClass("addedInTotal");
		// setTotalPaid();
	} else {

		$("#tAmtSlave" + id).removeClass("addedInTotal");
		$("#tAmtSlave" + id).addClass("notInTotal");
		// setTotalPaid();
	}
}

function getSubServiceDetails(t, s) {
	// alert(t +" "+s);
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetailsTemp(r, s);
			// setBillDetailsTemp(r);
		}
	});
}

function getSubServiceDetailsTemp(t, s) {
	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")
				|| t.listSubServiceIpdDto[i].cancle == "Y") {
			setService = setService + '<tr>';
		} else {
			setService = setService + '<tr onclick="editOnClickForDoctorIpd('
					+ t.listSubServiceIpdDto[i].billDetailsId + ')">';

		}

		setService = setService
		// + '<tr>'

		+ '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>'

				+ '<td style="display:none;" id="doc'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'
				+ '<td style="display:none;" id="docId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '" value="'
				+ t.listSubServiceIpdDto[i].docId + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'
				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherRate + ' </td>'

				+ '<td style="display:none;"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>'

				+ '<td> ' + a + ' </td>';

		setService = setService + '<td id="doccName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docName + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center" id="tAmt'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>'
					+ '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						/*
						 * + '<input type="hidden" class="addedInTotal
						 * billSlave'+s+'"
						 * id="tAmtSlave'+(t.listSubServiceIpdDto[i].billDetailsId)+'"
						 * value="'+Number(t.listSubServiceIpdDto[i].charges)+'">'
						 */
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + (t.listSubServiceIpdDto[i].rate)
						+ '"></td>';

			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						/*
						 * + '<input type="hidden" class="notInTotal
						 * billSlave'+s+'"
						 * id="tAmtSlave'+(t.listSubServiceIpdDto[i].billDetailsId)+'"
						 * value="'+Number(t.listSubServiceIpdDto[i].charges)+'">'
						 */
						+ '</td>';
				/*
				 * + '<td style="display: none;"><input type="hidden"
				 * class="addedInTotal billSlave'+s+'"
				 * id="tAmtSlave'+(t.listSubServiceIpdDto[i].billDetailsId)+'"
				 * value="'+(t.listSubServiceIpdDto[i].charges)+'"></td>';
				 */

			}
		}
		// added by vinod

		// added by kishor
		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {

			setService = setService

			+ '<td id="con' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="consPerc'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		} else {
			setService = setService

			+ '<td style="display:none;" id="con'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display:none;" id="consPerc'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';

		}

		setService = setService

		+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td>' + '<div class="text-right">' + datetime + '</div>'
				+ '</td>';
		setService = setService + '</td>';

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {
			setService = setService
					+ '<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '" onclick="editOnClickForDoctorIpd('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';
			setService = setService
					+ '<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger deleteUserAccess billSlaveBtn'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '" onclick="cancleOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'
					+ t.listSubServiceIpdDto[i].cancle + '" id=btnCancle'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ' type="hidden"></a></td>';
		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '"  disabled="disabled" onclick="editOnClickForDoctorIpd('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess billSlaveBtn'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '"  onclick="editOnClickForDoctorIpd('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess billSlaveBtn'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}

		/*
		 * if (t.listSubServiceIpdDto[i].cancle =="Y" ||
		 * (t.listSubServiceIpdDto[i].paidFlag=="Y")) { setService = setService + '<td class="col-md-1 center" ><a
		 * style="cursor:pointer;"> <input value="'+
		 * t.listSubServiceIpdDto[i].cancle +'"
		 * id=btnCancle'+t.listSubServiceIpdDto[i].billDetailsId+'
		 * type="hidden"><button class="btn btn-xs btn-primary editUserAccess
		 * billSlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'"
		 * onclick="cancleOnClick('+t.listSubServiceIpdDto[i].billDetailsId+')"
		 * value="EDIT"><i class="fa fa-refresh"></i></button></a></td>'; }
		 * else { setService = setService + '<td class="col-md-1 center" ><a
		 * style="cursor:pointer;"> <input value="'+
		 * t.listSubServiceIpdDto[i].cancle +'"
		 * id=btnCancle'+t.listSubServiceIpdDto[i].billDetailsId+'
		 * type="hidden"><button class="btn btn-xs btn-danger editUserAccess
		 * billSlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'"
		 * onclick="cancleOnClick('+t.listSubServiceIpdDto[i].billDetailsId+')"
		 * value="EDIT"><i class="fa fa-times"></i></button></a></td>'; }
		 */

		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceIpdDto[i].paidFlag == "N"
				&& t.listSubServiceIpdDto[i].cancle == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" onclick="setTotalPaidbySlave('
					+ t.listSubServiceIpdDto[i].billDetailsId + ','
					+ t.listSubServiceIpdDto[i].serviceId
					+ ')" checked=checked id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" disabled="disabled" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';

		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}
	$("#serviceData").html(setService);
}

function getSubServiceDetails1ForOT(i, t, s)

{
	// alert("Hi kishor");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetailsTemp1ForOT(i, r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function getSubServiceDetailsTemp1ForOT(j, t, s) {
	
	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentI=0;d=$('#treatmentId').text();
	
	// Code for get distinct operation ids start
	var count = 0;
	var otCountIds = new Array(10);
	var otNames = new Array(10);
	otCountIds[count] = t.listSubServiceIpdDto[0].otCount;
	otNames[count] = t.listSubServiceIpdDto[0].otProcedure;
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
	
		var oCount = t.listSubServiceIpdDto[i].otCount;		
		var oName = t.listSubServiceIpdDto[i].otProcedure;		
		//if(oCount != otCountIds[count]){
		if(oName != otNames[count]){
			
			count = count + 1;
			otCountIds[count] = oCount;
			otNames[count] = oName;
		}		
	}	
	// Code for get distinct operation ids end
	
	var otIdsDiffer = 0;
	var otNamesDiffer = 0;
	for(var h = 0; h <= count; h++){
			
		otIdsDiffer = otCountIds[h];		
		otNamesDiffer = otNames[h];		
		setService = setService 
		
		+ '<tr>'
		+ '<td style="font-size:12px" colspan=12><b>'+otNamesDiffer+'</b></td> '
		+ '<td><input type="hidden" id="otCountId" value='+otIdsDiffer+'></td></tr>';
		
		var a = 0;
		for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
			
			//var otCountId = t.listSubServiceIpdDto[i].otCount;
			var otProcedure = t.listSubServiceIpdDto[i].otProcedure;
			//if(otCountId == otIdsDiffer){
			if(otProcedure == otNamesDiffer){
				
				a = 1 + a;
				var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
						.toLocaleDateString('en-GB');
				var dname = t.listSubServiceIpdDto[i].docName;
		
				var netAmt = Number(t.listSubServiceIpdDto[i].amount)
						- Number(t.listSubServiceIpdDto[i].concession);
				var cghsCode = "("+t.listSubServiceIpdDto[i].cghsCode+")";
				if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)" || cghsCode=="(null)"){
					cghsCode="";
				}
				if (dname == null) {
					dname = "-";
				}
				
		if(t.listSubServiceIpdDto[i].paidByCashFlag == "Y"){
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
		
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService + '<tr bgcolor="lightblue"  id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			}
		}else{
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
		
				setService = setService + '<tr id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService + '<tr  id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			}
		}
						
			
				
				setService = setService
		
				// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<td style="display:none;" id="row'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '"> class="col-md-1 center">' + (i + 1) + '</td>'
		
						+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';
		
						
							setService=setService	+ '<td id="catName' + (t.listSubServiceIpdDto[i].billDetailsId)
							+ '"><div class="row"><div class="col-md-10"><label data-toggle="tooltip" data-placement="top" title="'+t.listSubServiceIpdDto[i].otProcedure+'"> ' + t.listSubServiceIpdDto[i].categoryName + '</label></div> </div></td>';
		
						
						setService=setService
						
						+ '<td id="doccName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> ' + dname
						+ ' </td>'
		
						+ '<td style="display:none;" id="subserviceid'
						+ (t.listSubServiceIpdDto[i].billDetailsId)  + '"> '
						+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'
						
						+ '<td style="display:none;" id="otProcedureId'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].otProcedureId + ' </td>'
		
						+ '<td style="display:none;" id="dId'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].docId + ' </td>'
		
						+ '<td style="display:none;" id="sId'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].serviceId + ' </td>'
		
						+ '<td style="display:none;" id="amt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].amount + ' </td>'
						
						+ '<td style="display:none;" id="othIpdRate'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].otherRate + ' </td>'
						
						+ '<td style="display:none;" id="drdeskflag'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>';
		
				// added by vinod
		if(t.listSubServiceIpdDto[i].paidByCashFlag == "Y"){
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
		
				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';
		
			} else {
		
				if (t.listSubServiceIpdDto[i].paidFlag == "N") {
		
					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {
		
					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}
		
			}// added by vinod
		
			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'
		
					
		
					+ '<td id="char' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>' + '</td>';
			var concessionFlow=$('#concessionFlow').val();			
			
			if(concessionFlow == "on"){
				setService = setService
				+ '<td id="con' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concession).toFixed(2) + '</div>' + '</td>'
				
				+ '<td id="conPer' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) + '</div>' + '</td>';
			}else{
				setService = setService
				+ '<td style="display: none;" id="con' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concession).toFixed(2) + '</div>' + '</td>'
				
				+ '<td style="display: none;" id="conPer' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) + '</div>' + '</td>';
			}
			setService = setService
					/*+ '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'*/
		
					+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>' + '</td>'
		
					+ '<td id="dateSub' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';
		
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {
		
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
		
			} else {
		
				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled"  onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}
		
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {
		
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
		
			} else {
		
				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if(t.listSubServiceIpdDto[i].iscombination=='Y')
			{			
				var drFlag = t.listSubServiceIpdDto[i].drdeskflag;
				
				if(drFlag != "C"){
					
					setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPopUpDataForOT('+t.listSubServiceIpdDto[i].serviceId+','+t.listSubServiceIpdDto[i].subServiceId+','+t.listSubServiceIpdDto[i].billDetailsId+',\'general\', '+t.listSubServiceIpdDto[i].amount+')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listSubServiceIpdDto[i].billDetailsId+'></i></button></a></td>';
				}else{
					
					setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button disabled class="btn btn-xs btn-success editUserAccess" data-toggle="modal" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listSubServiceIpdDto[i].billDetailsId+'></i></button></a></td>';
				}
				
			}
			setService = setService + '<td class="only-checkbox" >';
		
			if (t.listSubServiceIpdDto[i].paidFlag == "N") {
		
				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
		
			} else {
		
				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}else{
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
		
				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';
		
			} else {
		
				if (t.listSubServiceIpdDto[i].paidFlag == "N") {
		
					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {
		
					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}
		
			}// added by vinod
		
			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'
		
					
		
					+ '<td id="char' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>' + '</td>';
			var concessionFlow=$('#concessionFlow').val();			
			
			if(concessionFlow == "on"){
				setService = setService
				+ '<td id="con' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concession).toFixed(2) + '</div>' + '</td>'
				
				+ '<td id="conPer' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) + '</div>' + '</td>';
			}else{
				setService = setService
				+ '<td style="display: none;" id="con' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concession).toFixed(2) + '</div>' + '</td>'
				
				+ '<td style="display: none;" id="conPer' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) + '</div>' + '</td>';
			}
			setService = setService
					/*+ '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'*/
		
					+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>' + '</td>'
		
					+ '<td id="dateSub' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';
		
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {
		
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
		
			} else {
		
				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled"  onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}
		
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {
		
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
		
			} else {
		
				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if(t.listSubServiceIpdDto[i].iscombination=='Y')
			{			
				var drFlag = t.listSubServiceIpdDto[i].drdeskflag;
				
				if(drFlag != "C"){
					
					setService = setService +	'<td class="col-md-2 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPopUpDataForOT('+t.listSubServiceIpdDto[i].serviceId+','+t.listSubServiceIpdDto[i].subServiceId+','+t.listSubServiceIpdDto[i].billDetailsId+',\'general\', '+t.listSubServiceIpdDto[i].amount+')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listSubServiceIpdDto[i].billDetailsId+'></i></button></a>'
											+	'<a style="cursor:pointer;"> <button disabled class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#OTDoctors"  onclick="getPopUpDoctorsForOT('+t.listSubServiceIpdDto[i].otDoctorNames+')"><i class="fa fa-th-list" value="comb" ></i></button></a></td>';
				}else{
					
					//var doctor = " ' "+t.listSubServiceIpdDto[i].otDoctorNames+" ' ";
					var doctor = t.listSubServiceIpdDto[i].otDoctorNames;		
					///alert(doctor);
					setService = setService +	'<td class="col-md-2 center" ><a style="cursor:pointer;"> <button disabled class="btn btn-xs btn-success editUserAccess" data-toggle="modal" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listSubServiceIpdDto[i].billDetailsId+'></i></button></a>';
					if(doctor=="null"){
						setService = setService +	"<a style='cursor:pointer;'> <button  disabled class='btn btn-xs btn-success editUserAccess' data-toggle='modal' data-target='#OTDoctors' onclick='getPopUpDoctorsForOT("+t.listSubServiceIpdDto[i].billDetailsId+")'><i class='fa fa-th-list'></i></button></a><input id=otDoc"+t.listSubServiceIpdDto[i].billDetailsId+" type='hidden' value='"+doctor+"'></td>";

					}else{
						setService = setService +	"<a style='cursor:pointer;'> <button class='btn btn-xs btn-success editUserAccess' data-toggle='modal' data-target='#OTDoctors' onclick='getPopUpDoctorsForOT("+t.listSubServiceIpdDto[i].billDetailsId+")'><i class='fa fa-th-list'></i></button></a><input id=otDoc"+t.listSubServiceIpdDto[i].billDetailsId+" type='hidden' value='"+doctor+"'></td>";

					}
				}
				
			}
			setService = setService + '<td class="only-checkbox" >';
		
			if (t.listSubServiceIpdDto[i].paidFlag == "N") {
		
				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
		
			} else {
		
				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}				
				
		
				setService = setService + '</td>';
		
				setService = setService + '</tr>';
				setService = setService + '<tr>';
				
				
				//var surgeonlist="<option id=''></option>";
		
				var list = "<option value='0'>select</option>";	
				var xxx=t.listSubServiceIpdDto[0].amount;
					list = list + "<option value='" + t.listSubServiceIpdDto[0].docId + "'>"
							+ ((t.listSubServiceIpdDto[0].docName)) + "</option>";
					$("#docamountonpopup").val(t.listSubServiceIpdDto[0].amount);
					//$("#sPayable").val(t.listSubServiceIpdDto[0].amount);
				$("#surgeonlist").html(list);
				//$("#servIdIpdSponsor").html(list);
				//$("#servIdPackageIpd").html(list);
				
			}
		}
	}

	$("#OT" + j).html(setService);
	
}
function setAmountOfDoc(doccidd) {

	var kk = $("#docamountonpopup").val();
	$("#sTotal").val(kk);
	$("#sPayable").val(kk);
	// doccidd=0;
}

function getSubServiceDetails1ForConsultingVisitingCharges(i, t, s) {
	// alert("Hi kishor");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetails1ForConsultingVisitingChargesTemp(i, r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}
function getSubServiceDetails1ForConsultingVisitingChargesTemp(j, t, s) {

	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].amount)
				- Number(t.listSubServiceIpdDto[i].concession);
		var cghsCode = "(" + t.listSubServiceIpdDto[i].cghsCode + ")";
		if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
				|| cghsCode == "(-)" || cghsCode == "(null)") {
			cghsCode = "";
		}
		if (dname == null) {
			dname = "-";
		}
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")
					|| t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			} else {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			}
		} else {
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")
					|| t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {
				setService = setService + '<tr id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			} else {
				setService = setService + '<tr onclick="editOnClickForCVC('
						+ t.listSubServiceIpdDto[i].billDetailsId + ')" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';

		/*
		 * + '<td id="catName'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+
		 * t.listSubServiceIpdDto[i].categoryName+' </td>'
		 */

		setService = setService + '<td id="doccName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> ' + dname
				+ ' </td>';

		setService = setService

		+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherRate + ' </td>'

				+ '<td style="display:none;" id="drdeskflagDC'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>'
					+ '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

				+ '<td id="char' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
				+ '</td>';
		var concessionFlow = $('#concessionFlow').val();
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display: none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display: none;" id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			/*
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 */

			+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForCVC('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {
				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success "  disabled="disabled" onclick="editOnClickForCVC('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClickForCVC('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		} else {
			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display: none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display: none;" id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			/*
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 */

			+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForCVC('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
				/* || t.listSubServiceIpdDto[i].isModify == "N" */) {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success "  disabled="disabled" onclick="editOnClickForCVC('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClickForCVC('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#CVC" + j).html(setService);

}

function getSubServiceDetails1(i, t, s){
	//added by Akshata
	var drdeskflag = $('#drdeskflag').val()
		
	
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",*/
		
		data : {
			"treatmentId" : t,
			"serviceId" : s,
			//added by Akshata
			"drdeskflag" : drdeskflag
		},
		url : "ehat/ipdbillmgt/getPatientServiceBill",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
						
			//getSubServiceDetailsTemp1(i, r, s);
			// changed Rohini and updated by Rohini on 07/09/2023
			getSubServiceDetailsTemp1ipdbill(i, r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

/*function getSubServiceDetailsTemp1(j, t, s) {
	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	//OT Inventory 	
	if(t.listSubServiceInventoryDto.length > 0){
	for ( var i = 0; i < t.listSubServiceInventoryDto.length; i++) {
	var a = 1 + i;
	var datetime12 = new Date(t.listSubServiceInventoryDto[i].createdDate)
			.toLocaleDateString('en-GB');
	var dname = t.listSubServiceInventoryDto[i].docName;

	var netAmt = Number(t.listSubServiceInventoryDto[i].amount)
			- Number(t.listSubServiceInventoryDto[i].concession);

	var sid = t.listSubServiceInventoryDto[i].serviceId;
	var cghsCode = "(" + t.listSubServiceInventoryDto[i].cghsCode + ")";
	if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
			|| cghsCode == "(-)" || cghsCode == "(null)") {
		cghsCode = "";
	}

	if (dname == null) {
		dname = "-";
	}
	if (t.listSubServiceInventoryDto[i].paidByCashFlag == "Y") {
		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")
				|| t.listSubServiceInventoryDto[i].cancle == "Y"
				|| t.listSubServiceInventoryDto[i].isModify == "N") {

			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">';

		} else {

			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">';

		}
	} else {
		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")
				|| t.listSubServiceInventoryDto[i].cancle == "Y"
				|| t.listSubServiceInventoryDto[i].isModify == "N") {

			setService = setService + '<tr id="tr'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">';

		} else {

			setService = setService + '<tr onclick="editOnClick('
					+ t.listSubServiceInventoryDto[i].billDetailsId + ')" id="tr'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">';

		}
	}

	setService = setService

	// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
	+ '<td style="display:none;" id="row'
			+ (t.listSubServiceInventoryDto[i].billDetailsId)
			+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

			+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].billDetailsId + ' </td>';

	if (sid == 14) {

		setService = setService + '<td id="catName'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
				+ t.listSubServiceInventoryDto[i].inventoryName + ' </td>';
	}  else {

		setService = setService + '<td id="catName'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
				+ t.listSubServiceInventoryDto[i].categoryName + cghsCode
				+ ' </td>';
	}

	setService = setService

	+ '<td id="doccName' + (t.listSubServiceInventoryDto[i].billDetailsId)
			+ '"> ' + dname + ' </td>'

			+ '<td style="display:none;" id="subserviceid'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].subServiceId + ' </td>'

			+ '<td style="display:none;" id="dId'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].docId + ' </td>'

			+ '<td style="display:none;" id="sId'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].serviceId + ' </td>'

			+ '<td style="display:none;" id="amt'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].amount + ' </td>'

			+ '<td style="display:none;" id="emrP'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].emrPer + ' </td>'

			+ '<td style="display:none;" id="othIpdRate'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].otherRate + ' </td>'

			+ '<td style="display:none;" id="drdeskflag'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].drdeskflag + ' </td>'
			
			
			+	'<td style="display:none;" id="barCode'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">0</td>'
			+	'<td style="display:none;" id="spclId'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].specialityId+' </td>'
			+	'<td style="display:none;" id="sampleType'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].sampleTypeId+' </td>'
			+	'<td style="display:none;" id="barCodeId'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">0</td>'
			+	'<td style="display:none;" id="inOutHouse'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">'+ t.listSubServiceInventoryDto[i].inOutHouse+'</td>'
			+	'<td style="display:none;" id="histopathLab'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">'+ t.listSubServiceInventoryDto[i].histopathLab+'</td>'
			+	'<td style="display:none;" id="collectionDate'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].collectionDate+' </td>'
			+	'<td style="display:none;" id="collectionTime'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].collectionTime+' </td>'
			+	'<td style="display:none;" id="regRefDocId'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">0</td>'
			+	'<td style="display:none;" id="isTemplateWiseTest'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].templateWise +' </td>'
			+	'<td style="display:none;" id="isCombination'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].iscombination +' </td>'
			
			+ '<td style="display:none;" id="sndtolabflag'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].sndtolabflag + ' </td>';

	if (t.listSubServiceInventoryDto[i].paidByCashFlag == "Y") {
		// added by vinod
		if (t.listSubServiceInventoryDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
					+ '</div>' + '</td>';

		} else {

			if (t.listSubServiceInventoryDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
						+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceInventoryDto[i].quantity + '</div>' + '</td>'

				+ '<td id="char'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceInventoryDto[i].amount).toFixed(2) + '</div>'
				+ '</td>';

		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService + '<td id="con'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="conPer'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';

		} else {
			setService = setService + '<td style="display:none;" id="con'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display:none;" id="conPer'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		}
		setService = setService
		
		 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
		 * class="text-center">' +
		 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
		 

		+ '<td id="cP' + (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceInventoryDto[i].coPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="dateSub'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceInventoryDto[i].cancle == "Y"
					|| t.listSubServiceInventoryDto[i].isModify == "N") {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceInventoryDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceInventoryDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceInventoryDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceInventoryDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}
		if (t.listSubServiceInventoryDto[i].iscombination == 'Y') {
			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
					+ t.listSubServiceInventoryDto[i].serviceId
					+ ','
					+ t.listSubServiceInventoryDto[i].subServiceId
					+ ','
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ',\'general\', '
					+ t.listSubServiceInventoryDto[i].amount
					+ ', '
					+ t.listSubServiceInventoryDto[i].concession
					+ ','
					+ t.listSubServiceInventoryDto[i].ot_flag
					+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ '></i></button></a></td>';
		}
		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceInventoryDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceInventoryDto[i].serviceId
					+ '"disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceInventoryDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceInventoryDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceInventoryDto[i].serviceId
					+ '" disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceInventoryDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceInventoryDto[i].billDetailsId + '">';
		}
	} else {
		// added by vinod
		if (t.listSubServiceInventoryDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
					+ '</div>' + '</td>';

		} else {

			if (t.listSubServiceInventoryDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
						+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceInventoryDto[i].quantity + '</div>' + '</td>'

				+ '<td id="char'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceInventoryDto[i].amount).toFixed(2) + '</div>'
				+ '</td>';

		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService + '<td id="con'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="conPer'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';

		} else {
			setService = setService + '<td style="display:none;" id="con'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display:none;" id="conPer'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		}
		setService = setService
		
		 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
		 * class="text-center">' +
		 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
		 

		+ '<td id="cP' + (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceInventoryDto[i].coPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="dateSub'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceInventoryDto[i].cancle == "Y"
					|| t.listSubServiceInventoryDto[i].isModify == "N") {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceInventoryDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceInventoryDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceInventoryDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceInventoryDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}
		if (t.listSubServiceInventoryDto[i].iscombination == 'Y') {
			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
					+ t.listSubServiceInventoryDto[i].serviceId
					+ ','
					+ t.listSubServiceInventoryDto[i].subServiceId
					+ ','
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ',\'general\', '
					+ t.listSubServiceInventoryDto[i].amount
					+ ', '
					+ t.listSubServiceInventoryDto[i].concession
					+ ','
					+ t.listSubServiceInventoryDto[i].ot_flag
					+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ '></i></button></a></td>';
		}
		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceInventoryDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceInventoryDto[i].serviceId
					+ '" checked=checked id="chkOpdBill'
					+ (t.listSubServiceInventoryDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceInventoryDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceInventoryDto[i].serviceId
					+ '" disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceInventoryDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceInventoryDto[i].billDetailsId + '">';
		}
	}

	setService = setService + '</td>';

	setService = setService + '</tr>';
	setService = setService + '<tr>';
}

}
	//OT Drugs and OT CathLab 
	if(t.listBillNobleServiceDto.length > 0){
		for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listBillNobleServiceDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listBillNobleServiceDto[i].docName;

		var netAmt = Number(t.listBillNobleServiceDto[i].amount)
				- Number(t.listBillNobleServiceDto[i].concession);

		var sid = t.listBillNobleServiceDto[i].serviceId;
		var cghsCode = "(" + t.listBillNobleServiceDto[i].cghsCode + ")";
		if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
				|| cghsCode == "(-)" || cghsCode == "(null)") {
			cghsCode = "";
		}

		if (dname == null) {
			dname = "-";
		}
		if (t.listBillNobleServiceDto[i].paidByCashFlag == "Y") {
			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")
					|| t.listBillNobleServiceDto[i].cancle == "Y"
					|| t.listBillNobleServiceDto[i].isModify == "N") {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';

			} else {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';

			}
		} else {
			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")
					|| t.listBillNobleServiceDto[i].cancle == "Y"
					|| t.listBillNobleServiceDto[i].isModify == "N") {

				setService = setService + '<tr id="tr'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';

			} else {

				setService = setService + '<tr onclick="editOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId + ')" id="tr'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';

			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listBillNobleServiceDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].billDetailsId + ' </td>';

		if (sid == 14) {

			setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
					+ t.listBillNobleServiceDto[i].inventoryName + ' </td>';
		}  else {

			setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
					+ t.listBillNobleServiceDto[i].categoryName + cghsCode
					+ ' </td>';
		}

		setService = setService

		+ '<td id="doccName' + (t.listBillNobleServiceDto[i].billDetailsId)
				+ '"> ' + dname + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="emrP'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].emrPer + ' </td>'

				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].otherRate + ' </td>'

				+ '<td style="display:none;" id="drdeskflag'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].drdeskflag + ' </td>'
				
				
				+	'<td style="display:none;" id="barCode'+(t.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="spclId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].specialityId+' </td>'
				+	'<td style="display:none;" id="sampleType'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sampleTypeId+' </td>'
				+	'<td style="display:none;" id="barCodeId'+(t.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="inOutHouse'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ t.listBillNobleServiceDto[i].inOutHouse+'</td>'
				+	'<td style="display:none;" id="histopathLab'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ t.listBillNobleServiceDto[i].histopathLab+'</td>'
				+	'<td style="display:none;" id="collectionDate'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionDate+' </td>'
				+	'<td style="display:none;" id="collectionTime'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionTime+' </td>'
				+	'<td style="display:none;" id="regRefDocId'+(t.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="isTemplateWiseTest'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].templateWise +' </td>'
				+	'<td style="display:none;" id="isCombination'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].iscombination +' </td>'
				
				+ '<td style="display:none;" id="sndtolabflag'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].sndtolabflag + ' </td>';

		if (t.listBillNobleServiceDto[i].paidByCashFlag == "Y") {
			// added by vinod
			if (t.listBillNobleServiceDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listBillNobleServiceDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '">'
							+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
							+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listBillNobleServiceDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBillNobleServiceDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';

			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 

			+ '<td id="cP' + (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBillNobleServiceDto[i].cancle == "Y"
						|| t.listBillNobleServiceDto[i].isModify == "N") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBillNobleServiceDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBillNobleServiceDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBillNobleServiceDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBillNobleServiceDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listBillNobleServiceDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listBillNobleServiceDto[i].serviceId
						+ ','
						+ t.listBillNobleServiceDto[i].subServiceId
						+ ','
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listBillNobleServiceDto[i].amount
						+ ', '
						+ t.listBillNobleServiceDto[i].concession
						+ ','
						+ t.listBillNobleServiceDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listBillNobleServiceDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBillNobleServiceDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listBillNobleServiceDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBillNobleServiceDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBillNobleServiceDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBillNobleServiceDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBillNobleServiceDto[i].billDetailsId + '">';
			}
		} else {
			// added by vinod
			if (t.listBillNobleServiceDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listBillNobleServiceDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '">'
							+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
							+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listBillNobleServiceDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBillNobleServiceDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';

			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 

			+ '<td id="cP' + (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBillNobleServiceDto[i].cancle == "Y"
						|| t.listBillNobleServiceDto[i].isModify == "N") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBillNobleServiceDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBillNobleServiceDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBillNobleServiceDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBillNobleServiceDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listBillNobleServiceDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listBillNobleServiceDto[i].serviceId
						+ ','
						+ t.listBillNobleServiceDto[i].subServiceId
						+ ','
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listBillNobleServiceDto[i].amount
						+ ', '
						+ t.listBillNobleServiceDto[i].concession
						+ ','
						+ t.listBillNobleServiceDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listBillNobleServiceDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBillNobleServiceDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listBillNobleServiceDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBillNobleServiceDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBillNobleServiceDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBillNobleServiceDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBillNobleServiceDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';
	}

	}
//
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].amount)
				- Number(t.listSubServiceIpdDto[i].concession);

		var sid = t.listSubServiceIpdDto[i].serviceId;
		var cghsCode = "(" + t.listSubServiceIpdDto[i].cghsCode + ")";
		if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
				|| cghsCode == "(-)" || cghsCode == "(null)") {
			cghsCode = "";
		}

		if (dname == null) {
			dname = "-";
		}
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")
					|| t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			} else {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			}
		} else {
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")
					|| t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {

				setService = setService + '<tr id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			} else {

				setService = setService + '<tr onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId + ')" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';

		if (sid == 14) {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].inventoryName + ' </td>';
		} else if (sid == 16) {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].pharmaName + ' </td>';
		} else if (sid == 11 || sid == 13) {// Added by laxman for sended lab
											// test coloe change.
			if ((t.listSubServiceIpdDto[i].sndtolabflag) == "Y") {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" style="color: green;"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			} else {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			}
		}// code By Sanjay on 26-03-2018 for changes the testname color when
			// it sent to RIS
		else if (sid == 12) {
			if ((t.listSubServiceIpdDto[i].sndtorisflag) == "Y") {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" style="color: #00bfff;"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			} else {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			}
		} else {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].categoryName + cghsCode
					+ ' </td>';
		}

		setService = setService

		+ '<td id="doccName' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> ' + dname + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="emrP'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].emrPer + ' </td>'

				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherRate + ' </td>'

				+ '<td style="display:none;" id="drdeskflag'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>'
				
				
				+	'<td style="display:none;" id="barCode'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="spclId'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].specialityId+' </td>'
				+	'<td style="display:none;" id="sampleType'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].sampleTypeId+' </td>'
				+	'<td style="display:none;" id="barCodeId'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="inOutHouse'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ t.listSubServiceIpdDto[i].inOutHouse+'</td>'
				+	'<td style="display:none;" id="histopathLab'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ t.listSubServiceIpdDto[i].histopathLab+'</td>'
				+	'<td style="display:none;" id="collectionDate'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].collectionDate+' </td>'
				+	'<td style="display:none;" id="collectionTime'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].collectionTime+' </td>'
				+	'<td style="display:none;" id="regRefDocId'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="isTemplateWiseTest'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].templateWise +' </td>'
				+	'<td style="display:none;" id="isCombination'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].iscombination +' </td>'
				
				+ '<td style="display:none;" id="sndtolabflag'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].sndtolabflag + ' </td>';

		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			// added by vinod
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';

			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 

			+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listSubServiceIpdDto[i].serviceId
						+ ','
						+ t.listSubServiceIpdDto[i].subServiceId
						+ ','
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listSubServiceIpdDto[i].amount
						+ ', '
						+ t.listSubServiceIpdDto[i].concession
						+ ','
						+ t.listSubServiceIpdDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		} else {
			// added by vinod
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';

			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 

			+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listSubServiceIpdDto[i].serviceId
						+ ','
						+ t.listSubServiceIpdDto[i].subServiceId
						+ ','
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listSubServiceIpdDto[i].amount
						+ ', '
						+ t.listSubServiceIpdDto[i].concession
						+ ','
						+ t.listSubServiceIpdDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#serviceData" + j).html(setService);
}*/

function getSubServiceDetailsTemp1(j, t, s) {
	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	//OT Inventory 	
	if(t.listSubServiceIpdDto.length > 0){
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
	var a = 1 + i;
	var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
			.toLocaleDateString('en-GB');
	var dname = t.listSubServiceIpdDto[i].docName;

	var netAmt = Number(t.listSubServiceIpdDto[i].amount)
			- Number(t.listSubServiceIpdDto[i].concession);

	var sid = t.listSubServiceIpdDto[i].serviceId;
	var cghsCode = "(" + t.listSubServiceIpdDto[i].cghsCode + ")";
	if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
			|| cghsCode == "(-)" || cghsCode == "(null)") {
		cghsCode = "";
	}

	if (dname == null) {
		dname = "-";
	}
	if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")
				|| t.listSubServiceIpdDto[i].cancle == "Y"
				|| t.listSubServiceIpdDto[i].isModify == "N") {

			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

		} else {

			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

		}
	} else {
		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")
				|| t.listSubServiceIpdDto[i].cancle == "Y"
				|| t.listSubServiceIpdDto[i].isModify == "N") {

			setService = setService + '<tr id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

		} else {

			setService = setService + '<tr  id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

		}
	}

	setService = setService

	// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
	+ '<td style="display:none;" id="row'
			+ (t.listSubServiceIpdDto[i].billDetailsId)
			+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

			+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
			+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
			+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';

	if (sid == 14) {

		setService = setService + '<td id="catName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].inventoryName + ' </td>';
	}  else {

		setService = setService + '<td id="catName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].categoryName + cghsCode
				+ ' </td>';
	}

	setService = setService

	+ '<td id="doccName' + (t.listSubServiceIpdDto[i].billDetailsId)
			+ '"> ' + dname + ' </td>'

			+ '<td style="display:none;" id="subserviceid'
			+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
			+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

			+ '<td style="display:none;" id="dId'
			+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
			+ t.listSubServiceIpdDto[i].docId + ' </td>'

			+ '<td style="display:none;" id="sId'
			+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
			+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

			+ '<td style="display:none;" id="amt'
			+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
			+ t.listSubServiceIpdDto[i].amount + ' </td>'

			+ '<td style="display:none;" id="emrP'
			+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
			+ t.listSubServiceIpdDto[i].emrPer + ' </td>'

			+ '<td style="display:none;" id="othIpdRate'
			+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
			+ t.listSubServiceIpdDto[i].otherRate + ' </td>'

			+ '<td style="display:none;" id="drdeskflag'
			+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
			+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>'
			
			
			+	'<td style="display:none;" id="barCode'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
			+	'<td style="display:none;" id="spclId'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].specialityId+' </td>'
			+	'<td style="display:none;" id="sampleType'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].sampleTypeId+' </td>'
			+	'<td style="display:none;" id="barCodeId'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
			+	'<td style="display:none;" id="inOutHouse'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ t.listSubServiceIpdDto[i].inOutHouse+'</td>'
			+	'<td style="display:none;" id="histopathLab'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ t.listSubServiceIpdDto[i].histopathLab+'</td>'
			+	'<td style="display:none;" id="collectionDate'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].collectionDate+' </td>'
			+	'<td style="display:none;" id="collectionTime'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].collectionTime+' </td>'
			+	'<td style="display:none;" id="regRefDocId'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
			+	'<td style="display:none;" id="isTemplateWiseTest'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].templateWise +' </td>'
			+	'<td style="display:none;" id="isCombination'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].iscombination +' </td>'
			
			+ '<td style="display:none;" id="sndtolabflag'
			+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
			+ t.listSubServiceIpdDto[i].sndtolabflag + ' </td>';

	if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
					+ '</div>' + '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

				+ '<td id="char'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
				+ '</td>';

		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService + '<td id="con'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="conPer'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';

		} else {
			setService = setService + '<td style="display:none;" id="con'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display:none;" id="conPer'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		}
		setService = setService
		
		/* + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
		 * class="text-center">' +
		 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'*/
		 

		+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="dateSub'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceIpdDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}
		if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
					+ t.listSubServiceIpdDto[i].serviceId
					+ ','
					+ t.listSubServiceIpdDto[i].subServiceId
					+ ','
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ',\'general\', '
					+ t.listSubServiceIpdDto[i].amount
					+ ', '
					+ t.listSubServiceIpdDto[i].concession
					+ ','
					+ t.listSubServiceIpdDto[i].ot_flag
					+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';
		}
		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceIpdDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '"disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';
		}
	} else {
		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
					+ '</div>' + '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

				+ '<td id="char'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
				+ '</td>';

		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService + '<td id="con'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="conPer'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';

		} else {
			setService = setService + '<td style="display:none;" id="con'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display:none;" id="conPer'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		}
		setService = setService
		
		 /* + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
		 * class="text-center">' +
		 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'*/
		 

		+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="dateSub'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceIpdDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}
		if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
					+ t.listSubServiceIpdDto[i].serviceId
					+ ','
					+ t.listSubServiceIpdDto[i].subServiceId
					+ ','
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ',\'general\', '
					+ t.listSubServiceIpdDto[i].amount
					+ ', '
					+ t.listSubServiceIpdDto[i].concession
					+ ','
					+ t.listSubServiceIpdDto[i].ot_flag
					+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';
		}
		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceIpdDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" checked=checked id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';
		}
	}

	setService = setService + '</td>';

	setService = setService + '</tr>';
	setService = setService + '<tr>';
}

}
	//OT Drugs and OT CathLab 

	$("#serviceData" + j).html(setService);
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 24_June_2017
 * @Code Getting amount
 ******************************************************************************/

function calculatePerticularTotal1() {
	var rate = ($("#rate").val()).trim();
	var qty = ($("#qty").val()).trim();
	var concession = ($("#concession").val()).trim();

	if (rate == "") {
		$("#rate").val(0);
	}
	if (qty == "" || qty == 0) {
		//$("#qty").val(0);
		var a = rate * 0;
		setTimeout(function() {
			$("#amount").val(a);
			$("#concessionIpdPer").val(0);
			$("#concession").val(0);
			$("#coPay").val(a);
		}, 50);
	}
	if (concession == "") {
		$("#concession").val(0);
	}
	if (concession > (rate * qty)) {
		var quantity = $("#qty").val();
		if (quantity == 0) {
			// alert("Quantity Cannot Be 0");
			$("#concession").val(0);
			calculatePerticularTotal1();
			return false;
		} else {
			alert("Discount Can Not Be Greater Than " + (rate * qty));
			$("#concession").val(0);
			$("#amount").val(rate * qty);
			$("#coPay").val(rate * qty);
			return false;
		}
	}
	// var amount = ((rate * qty) - concession);
	var amount = ((rate * qty));

	$("#amount").val(Math.round(amount));
	// $("#pay").val(amount);
	/*
	 * var sponsorId = $("#SponsorsourceTypeId").val(); var chargesSlaveId =
	 * $("#chargesSlaveId").val();
	 */

	/*
	 * if (sponsorId == 1 && chargesSlaveId > 0) {
	 * 
	 * $("#pay").val(amount);
	 *  } else {
	 */

	$("#coPay").val(Math.round(amount));

	/* } */
	/*
	 * var amount = $("#amount").val(); var concession = $("#concession").val();
	 * 
	 * var consAmt=((concession * 100 ) / amount);
	 * $("#concessionIpdPer").val(consAmt);
	 */

	var SpecialDisc = $("#SpecialDisc").val();
	if (SpecialDisc == 0 && ($("#pay").val()) == 0) {
		calculatePerticularCoPay1();
		// calculatePerticularPay1();
		// calculatePerticularCoPay1();
	} /*
		 * else { //calculatePerticularCoPay1(); calculatePerticularPay1(); }
		 */
}

function calculatePerticularCoPay1() {
	var pay = $("#pay").val();
	var amount = $("#amount").val();
	var concession = $("#concession").val();
	if (pay == "" || amount == "") {
		return false;
	}

	if (pay < 0) {
		pay = 0;
	} else if (isNaN(pay) == true) {
		pay = 0;
	}

	var coPay = ((amount - pay) - concession);
	if (coPay < 0) {
		alert("Pay should be Less Than CoPay");
		$("#pay").val("0");
		// retuen false;
	}
	$("#coPay").val(Math.round(coPay));
}

function calculatePerticularPay1() {
	var coPay = $("#coPay").val();
	var amount = $("#amount").val();
	var concession = $("#concession").val();
	if (coPay == "" || amount == "") {
		return false;
	}
	if (coPay < 0) {
		coPay = 0;
	} else if (isNaN(coPay) == true) {
		coPay = 0;
	}

	var pay = ((amount - coPay) - concession);
	var coPay1 = (amount - concession);
	if (pay < 0) {
		alert("CoPay should be Less Than Pay");
		$("#coPay").val(coPay1);
		$("#pay").val("0");
		return false;
	}
	$("#pay").val(Math.round(pay));
}

function concessionOnPercentageIpd() {
	var amount = $("#amount").val();
	var concessionOnPerc = $("#concessionIpdPer").val();

	if (concessionOnPerc == "" || concessionOnPerc == "") {
		return false;
	}
	if (concessionOnPerc < 0) {
		concessionOnPerc = 0;
	} else if (isNaN(concessionOnPerc) == true) {
		concessionOnPerc = 0;
	}

	if (concessionOnPerc > 100) {
		alert("Percentage should be less than 100");
		$("#concessionOnPerc").val(0);
		$("#concession").val(0);
		return false;
	}
	// alert(amount);
	var conAmt = ((concessionOnPerc * amount) / 100).toFixed(2);

	$("#concession").val(Math.round(conAmt));

}

/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 18-May-2017
 * @code :autosuggestion
 ******************************************************************************/
function setallservautocompleteOnBillingIPD(inputID) {
	var listofunit = [];
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	var userId = $("#userId").val();
	// var unitlist=listofunit.slice(1);
	var unitlist = "";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype = "all";
	var serviceid = $('#servId').val();
	// var treatId=$("#treatId").val();

	var inputs = [];
	inputs.push('unitid=' + unit);
	inputs.push('userId=' + userId);
	inputs.push('categoryName=' + encodeURIComponent(findingName));
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	inputs.push('dept_id=2');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "ehat/autoallservicestest/getallservices",
		url : "ehat/ipdtestautosuggest/getTestAutosuggestion",
		success : function(r) {
			/*
			 * alert(r.lstSubService[0].categoryName);
			 */
			autoCompDoctorDeskOnBilling(r, inputID);

		}
	});
}

/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 18-May-2017
 * @code :autosuggestion services
 ******************************************************************************/
function autoCompDoctorDeskOnBilling(response, id) {

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
	$("#" + id)
			.mcautocomplete(
					{
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ {
							name : 'CategoryName',
							width : '150px',
							valueField : 'categoryName'
						}, {
							name : 'ServiceName',
							width : '100px',
							valueField : 'serviceName'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {

							// console.log(ui);
							$("#templateWiseTestFlag").val(ui.item.templateWise);
							var categoryid = ui.item.categoryid;
							var isModify = ui.item.isModify;
							if (isModify == "N") {
								$("#rate").prop("disabled", true);
								$("#rateOpdSponsor").prop("disabled", true);
							} else {
								$("#rate").prop("disabled", false);
								$("#rateOpdSponsor").prop("disabled", false);
							}

							$('#categoryidsipd').val(categoryid);
							
							var isCombServLastId = 0;
							if(ui.item.iscombination=="Y")
								isCombServLastId = categoryid;
							
							
							//var valsponsor = sponsorTestCharges;//getchargesipd();

							$('#perticular').val(ui.item.categoryName);

							//$("#subservicesname").val(ui.item.categoryName);
							$("#subserviceid").val(ui.item.categoryid);
							$("#servicename").val(ui.item.serviceName);
							$("#serviceid").val(ui.item.serviceid);
							var suserviceId = ui.item.categoryid;
							
							var b2bCharges = getB2BChargesForIpd(isCombServLastId,categoryid);
							
							if(b2bCharges > 0){
								$("#rate").val(b2bCharges);
								$("#rate2").val(b2bCharges);
							}else{
								
								getSponsorTestCharges(isCombServLastId,categoryid);
								var sponsorTestCharges = $("#sponsorTestCharges").val();
								var yearWiseSponsorTestCharges = $("#yearWiseSponsorTestCharges").val();
	
								var rategeneralhall = sponsorTestCharges;//$("#rategeneral").val();
								if (rategeneralhall > 0) {
									$("#rate").val(rategeneralhall);
									$("#rate2").val(rategeneralhall);
								} else {
	
									var yearwisecharges = yearWiseSponsorTestCharges;//getyearwisecharges(suserviceId);
									if (yearwisecharges > 0) {
										$("#rate").val(yearwisecharges);
										$("#rate2").val(yearwisecharges);
									} else {
										getHallWiseTestCharges(isCombServLastId,categoryid);
										var hallWiseTestCharges = $("#hallWiseTestCharges").val();
										  if(hallWiseTestCharges > 0){
											  $("#rate").val(hallWiseTestCharges);
										      $("#rate2").val(hallWiseTestCharges);
										  }else{
										      $("#rate").val(ui.item.categorycharges);
										      $("#rate2").val(ui.item.categorycharges);
										  }
									}
	
									// $("#rate").val(ui.item.categorycharges);
								}
							}

							// $("#concession").val(ui.item.concession);
							// $("#amount").val(ui.item.amount);
							$("#servId").val(ui.item.serviceid);
							$("#servId").select2('val',ui.item.serviceid);
							$("#iscombinationIpd").val(ui.item.iscombination);

							// @auhtor-tk @date - 05-feb-2018 @reason open
							// doctor list after selecting service name
							$('#doctorName').select2('open');
							//$('#specialityId').select2('open');   //by sandip
							
							calculatePerticularTotal1();
							// added by Tarique Aalam
							calculateEmrCheIpd('general');

							// Sanjay Kr shah
							if ($("#serviceid").val() == 12) {
								$("#sendToRis").prop("checked", true);
							} else {
								$("#sendToRis").prop("checked", false);
							}

							// For Consulting and Visiting
							if ($("#serviceid").val() == 5) {
								document.getElementById("qty").readOnly = true;
							} else {
								document.getElementById("qty").readOnly = false;
							}
							
							if(ui.item.iscombination == "Y"){
								
								setPackageBarcodePopup(ui.item.serviceid, ui.item.categoryid);
							}else{
								
								if(ui.item.serviceid == 11){
									
									getPathologyPreDetails(ui.item.serviceid,ui.item.categoryid);
								}						
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
							if (!data || data.lstService.length === 0
									|| !data.lstService
									|| data.lstService.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'categoryName' : 'NO',
									'serviceName' : 'Match',
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstService;// Response List for
								// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");

						}
					});
}

// @author : kishr Lokhande @date: 15-June-2017 @reason : Function for use to
// get all services
function getServicesOnBillingIPD() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/serv/fetchServiceList",
		success : function(r) {
			setTempAllService(r);
		}
	});
}

// @author : kishor Lokhande @date: 15-June-2017 @reason : Template use to get
// all services
function setTempAllService(r) {

	var list = "<option value='0'>select</option>";
	for ( var i = 0; i < r.listService.length; i++) {

		list = list + "<option value='" + r.listService[i].serviceId + "'>"
				+ ((r.listService[i].serviceName)) + "</option>";
	}
	$("#servId").html(list);
	$("#servIdIpdSponsor").html(list);
	$("#servIdPackageIpd").html(list);
	
	$("#servId").select2();
	$("#servIdIpdSponsor").select2();
	$("#servIdPackageIpd").select2();

	
}

function editOnClickForDoctorIpd(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticular').val($('#doccName' + billDetailsId).text());
	$('#perticular').attr('readonly', 'true');
	var chargesfromConf = $('#othIpdRate' + billDetailsId).text();
	$('#chargesfromConfIpd').val(chargesfromConf);
	var a = parseInt($('#sId' + billDetailsId).text());
	$('#servId').val(a).text();
	$("#serviceid").val(a);
	$('#servId option:not(:selected)').prop('disabled', true);
	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	$("#subserviceid").val(subserviceid);
	var d = parseInt($('#docId' + billDetailsId).text());
	$('#doctorName').val(d);
	$('#rate').val($('#char' + billDetailsId).text());
	$('#qty').val(1);
	$('#qty').attr('readonly', 'true');
	$('#concession').val($('#con' + billDetailsId).text());
	$('#concessionIpdPer').val($('#consPerc' + billDetailsId).text());

	// $('#concession').val(0);
	// $('#concessionOnPerc').val(0);

	$('#amount').val($('#char' + billDetailsId).text());
	$('#pay').val(0);
	$('#pay').attr('readonly', 'true');
	$('#coPay').val($('#char' + billDetailsId).text());
	$('#coPay').attr('readonly', 'true');

	$('#chkOpdBill' + billDetailsId).change(function() {// This function use to
														// call clear fields
		// alert("HI"+billDetailsId);
		crearAllFields();
	});

	$("#narrationBill").val('narrationBill');
}

function editOnClick(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticular').val($('#catName' + billDetailsId).text());

	var chargesfromConf = $('#othIpdRate' + billDetailsId).text();

	$('#chargesfromConfIpd').val(chargesfromConf);

	var a = parseInt($('#sId' + billDetailsId).text());
	//$('#servId').val(a).text();
	$('#servId').select2('val',a);
	$("#serviceid").val(a);
	// alert(a);
	// $('#servId option:not(:selected)').prop('disabled', true);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	// alert(subserviceid);
	$("#subserviceid").val(subserviceid);
	// $("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true);

	var d = parseInt($('#dId' + billDetailsId).text());
	$('#doctorName').select2('val', d);

	$('#rate').val($('#char' + billDetailsId).text());

	$('#qty').val($('#q' + billDetailsId).text());

	$('#concession').val($('#con' + billDetailsId).text());
	$('#concessionIpdPer').val($('#conPer' + billDetailsId).text());

	// $('#concession').val(0);
	// $('#concessionIpdPer').val(0);

	$('#amount').val($('#amt' + billDetailsId).text());
	$('#amount').attr('readonly', 'true');

	// $('#pay').val($('#p' + billDetailsId).text());
	$('#pay').val(0);
	$('#coPay').val($('#cP' + billDetailsId).text());
	$('#drdeskflag').val($('#drdeskflag' + billDetailsId).text());
	var a = $('#otProcedureId' + billDetailsId).text();
	$('#otProcedureId').val(a);

	$('#chkOpdBill' + billDetailsId).change(function() {// This function use to
														// call clear fields
		// alert("HI"+billDetailsId);
		crearAllFields();
	});

	$("#narrationBill").val('narrationBill');

	$("#narrationBill").val('narrationBill');

	$('#sndtolabflag').val($('#sndtolabflag' + billDetailsId).text());
	// added by tarique aalam
	$('#rate2').val($('#char' + billDetailsId).text());

	var emrP = parseFloat($('#emrP' + billDetailsId).text());
	if (isNaN(emrP)) {
		emrP = 0;
	}

	$('#emrPer').val(emrP);
	//if (emrP > 0 || emrP == 0) {
	if (emrP > 0 ) {
		$("#emrChrFlag").prop("checked", true);
		$('#emrPer').css("display", "inline");
	}
	fetchSuperCatForBillng(subserviceid, "general");
	
	var spId = parseInt($('#spclId' + billDetailsId).text());
	$('#specialityId').select2('val', spId);
}

function editOnClickForOT(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticular').val($('#catName' + billDetailsId).text());
	$('#perticular').attr('readonly', 'true');

	var a = parseInt($('#sId' + billDetailsId).text());
	//$('#servId').val(a).text();
	$('#servId').select2('val',a);
	$("#serviceid").val(a);
	// alert(a);
	// $('#servId option:not(:selected)').prop('disabled', true);

	var chargesfromConf = $('#othIpdRate' + billDetailsId).text();
	$('#chargesfromConfIpd').val(chargesfromConf);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	// alert(subserviceid);
	$("#subserviceid").val(subserviceid);
	// $("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true);

	var d = parseInt($('#dId' + billDetailsId).text());
	$('#doctorName').select2('val', d);

	$('#rate').val($('#char' + billDetailsId).text());

	$('#qty').val($('#q' + billDetailsId).text());

	$('#concession').val($('#con' + billDetailsId).text());
	$('#concessionIpdPer').val($('#conPer' + billDetailsId).text());

	// $('#concession').val(0);
	// $('#concessionIpdPer').val(0);

	$('#amount').val($('#amt' + billDetailsId).text());
	$('#amount').attr('readonly', 'true');

	// $('#pay').val($('#p' + billDetailsId).text());
	$('#pay').val(0);

	$('#coPay').val($('#cP' + billDetailsId).text());
	/*
	 * var a=$('#otProcedureId').val($('#otProcedureId' +
	 * billDetailsId).text()); alert(a);
	 */
	$('#chkOpdBill' + billDetailsId).change(function() {// This function use to
														// call clear fields
		// alert("HI"+billDetailsId);
		crearAllFields();
	});

	$("#narrationBill").val('narrationBill');
	
	var spId = parseInt($('#spclId' + billDetailsId).text());
	$('#specialityId').select2('val', spId);
}
function editOnClickForBed(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticular').val($('#catName' + billDetailsId).text());

	var a = parseInt($('#sId' + billDetailsId).html());

	//$('#servId').val(a).text();
	$('#servId').select2('val',a);
	$("#serviceid").val(a);
	// alert(a);
	$('#servId option:not(:selected)').prop('disabled', true);

	var chargesfromConf = $('#othIpdRate' + billDetailsId).text();

	$('#chargesfromConfIpd').val(chargesfromConf);
	// alert(chargesfromConf);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());

	$("#subserviceid").val(subserviceid);

	$('#rate').val($('#char' + billDetailsId).text());

	$('#qty').val($('#q' + billDetailsId).text());

	$('#concession').val($('#con' + billDetailsId).text());
	$('#concessionIpdPer').val($('#conPer' + billDetailsId).text());

	// $('#concession').val(0);
	// $('#concessionIpdPer').val(0);

	$('#amount').val($('#amt' + billDetailsId).text());
	$('#amount').attr('readonly', 'true');

	// $('#pay').val($('#p' + billDetailsId).text());
	$('#pay').val(0);

	$('#coPay').val($('#cP' + billDetailsId).text());

	/*
	 * $('#chkOpdBill'+billDetailsId).change(function() {//This function use to
	 * call clear fields // alert("HI"+billDetailsId); crearAllFields(); });
	 */

	$("#narrationBill").val('narrationBill');
	
	var spId = parseInt($('#spclId' + billDetailsId).text());
	$('#specialityId').select2('val', spId);
}
function editOnClickForCVC(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticular').val($('#doccName' + billDetailsId).text());

	var chargesfromConf = $('#othIpdRate' + billDetailsId).text();

	$('#chargesfromConfIpd').val(chargesfromConf);

	var a = parseInt($('#sId' + billDetailsId).text());
	//$('#servId').val(a).text();
	$('#servId').select2('val',a);
	$("#serviceid").val(a);
	// alert(a);
	// $('#servId option:not(:selected)').prop('disabled', true);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	// alert(subserviceid);
	$("#subserviceid").val(subserviceid);
	// $("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true);

	var d = parseInt($('#dId' + billDetailsId).text());
	$('#doctorName').select2('val', d);

	$('#rate').val($('#char' + billDetailsId).text());

	$('#qty').val($('#q' + billDetailsId).text());

	$('#concession').val($('#con' + billDetailsId).text());
	$('#concessionIpdPer').val($('#conPer' + billDetailsId).text());

	// $('#concession').val(0);
	// $('#concessionIpdPer').val(0);

	$('#amount').val($('#amt' + billDetailsId).text());
	$('#amount').attr('readonly', 'true');

	// $('#pay').val($('#p' + billDetailsId).text());
	$('#pay').val(0);

	$('#coPay').val($('#cP' + billDetailsId).text());

	$('#chkOpdBill' + billDetailsId).change(function() {// This function use to
														// call clear fields
		// alert("HI"+billDetailsId);
		crearAllFields();
	});

	$("#narrationBill").val('narrationBill');
	$("#drdeskflag").val($("#drdeskflagDC" + billDetailsId).text());
	
	var spId = parseInt($('#spclId' + billDetailsId).text());
	$('#specialityId').select2('val', spId);
}

/*******************************************************************************
 * @code for save or update services to ipd bill
 ******************************************************************************/
function saveServiceToPatient(callform) {

	var chargesConf = $("#chargesfromConfIpd").val();

	var emrPer = $('#emrPer').val(); // added by Tarique Aalam
	if (emrPer == "" || emrPer == null || emrPer == undefined) {
		emrPer = 0;
	}

	// Added By BILAL For narration of receipt at the time of edit
	var narration = $("#narration").val();
	if (narration == "narration") {
		setnarationpopupipd();
		return false;
	}
	var narrationid = $('#narrationid').val();
	if (narrationid != "" || narrationid != null || narrationid != undefined) {
		closePopupnarrationipd();
	}

	if (narrationid == "" || narrationid == null || narrationid == undefined) {
		narrationid = "-";
	}

	var drdeskflag1 = $('#drdeskflag').val();
	var update = $('#queryType').val();
	if (update == "update") {
		// alert("in 2977");
		if (drdeskflag1 == "" || drdeskflag1 == null
				|| drdeskflag1 == undefined) {
			drdeskflag1 = "-";
		}

		var drdeskflag = drdeskflag1.trim();
	}

	// alert("h"+drdeskflag+"i");

	// Added By Kishor For narration of Bill at the time of edit
	var narrationBill = $("#narrationBill").val();
	if (narrationBill == "narrationBill") {
		setnarationpopupBill();
		return false;
	}

	var narrationidBill = $('#narrationidBill').val();
	if (narrationidBill != "" || narrationidBill != null
			|| narrationidBill != undefined) {
		closePopupnarrationBill();
	}

	if (narrationidBill == "" || narrationidBill == null
			|| narrationidBill == undefined) {
		narrationidBill = "-";
	}

	// Added By Bilal for getting proper rates of sponsor and hall
	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	$("#sponsorid2").val(sponsorId);
	$("#chargesSlaveId2").val(chargesSlaveId);
	var serviceId = $("#serviceid").val();

	// Only for Consulting and Visiting
	if (serviceId == 5) {
		if (($("#doctorName option:selected").val()) == 0) {
			alert("Please select Doctor...!!!");
			return false;
		}

		if ($("#timeFrom2").val() == "") {
			var billDetailsId = $('#billDetailsId').val();
			if (billDetailsId == 0) {
				alert("Please select start Time...!!!");
				return false;
			}

		}
	}

	/*if (serviceId != 3) {

		if (sponsorId > 0 && chargesSlaveId > 0) {
			getchargesipd();
		}
	}*/
	if (chargesConf > 0) {
		// chargesConf =chargesConf;
	} else {
		$("#hallId").val(0);
		//getchargesipd();
		chargesConf = $("#chargesfromConfIpd").val();
		if (chargesConf > 0) {
			// chargesConf =chargesConf;
		} else {
			$("#SponsorsourceTypeId").val(0);
			$("#chargesSlaveId").val(0);
			$("#hallId").val(2);
			//getchargesipd();
			chargesConf = $("#chargesfromConfIpd").val();
		}
	}

	var sponsorid2 = $("#sponsorid2").val();
	var chargesSlaveId2 = $("#chargesSlaveId2").val();

	$("#hallId").val(2);
	$("#SponsorsourceTypeId").val(sponsorid2);
	$("#chargesSlaveId").val(chargesSlaveId2);
	// END By Bilal for getting proper rates of sponsor and hall
	if (callform == "general2") {
		$("#hallId").val(0);
		$("#SponsorsourceTypeId").val(0);
		$("#chargesSlaveId").val(0);
	}
	var defchargesfromConfIpd = $("#defchargesfromConfIpd").val();
	// alert(defchargesfromConfIpd);

	if (serviceId == 4) {
		alert("Can not edit Surgery Charges");
		crearAllFields()();
		return false;
	}

	/*
	 * if (serviceId == 15) { alert("Can not add Administrative Charges");
	 * crearAllFields()(); return false; }
	 */
	var callfrom = $('#saveServiceCallFrom').val();
	var masterReceiptId = $('#receiptMasterId').val();

	var iscombination = $("#iscombinationIpd").val();

	var receiptOf = $("#receiptOf").val();

	var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();

	var hallId = $('#hallId').val();

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}

	if (recSlaveIdIPD == "" || recSlaveIdIPD == null
			|| recSlaveIdIPD == undefined || isNaN(recSlaveIdIPD)) {
		recSlaveIdIPD = 0;
	}

	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (masterReceiptId == "" || masterReceiptId == null
			|| masterReceiptId == undefined || isNaN(masterReceiptId)) {
		masterReceiptId = 0;
	}

	var sndToLabFlag = $("#sndtolabflag").val().trim();

	/*
	 * if(serviceId==2){ var queryType = $('#queryType').val(); var
	 * billDetailsId = $('#billDetailsId').val(); // var doctorId = $(
	 * "#docId"+billDetailsId ).text(); var doctorId = $( "#doctorName
	 * option:selected" ).val(); //var recSlaveId = $('#receiptSlaveId').val();
	 * //receipt slave id //var cancel=$('#btnCancle'+billDetailsId).val();
	 * //alert(cancel); var patienttId = $("#pId").val(); var treatmentId =
	 * $("#tId").val(); var departmentId = $("#depdocdeskid").val(); ; var
	 * billId = parseInt($("#billNo").html());//$("#bNo").val(); //var
	 * sourceTypeId = $("#sourceTypeId").val();; var rate = $("#amount").val();
	 * var concession = $("#concession").val(); var quantity = $("#qty").val();
	 * var amount = $("#amount").val(); var pay = $("#pay").val(); var coPay =
	 * $("#coPay").val(); var createdDateTime = $("#finalDate").val();
	 * alert(createdDateTime); var subServiceId = $("#subserviceid").val(); var
	 * subservicesname = $("#perticular").val(); // var servicename =
	 * $("#servicename").val(); var unitId = $("#uId").val(); var concessionPer =
	 * $("#concessionIpdPer").val(); var module = "opd";
	 * 
	 * //var otherRate=rate; var otherAmount=0; var otherCoPay=0; var
	 * otherPay=0; var otherConcession=0;
	 * 
	 * if(chargesConf==0) { otherRate=rate; otherAmount=(rate * quantity) ; //
	 * alert("In iff"+otherAmount);
	 * 
	 * var otherconAmt=((concessionPer * otherAmount)/100).toFixed(2);
	 * otherCoPay=0;
	 * 
	 * otherPay=amount-otherconAmt; otherConcession = otherconAmt; //
	 * alert(otherPay);
	 *  } else{
	 * 
	 * otherRate=chargesConf;
	 * 
	 * otherAmount=(otherRate * quantity);
	 * 
	 * var otherconAmt=((concessionPer * otherAmount)/100).toFixed(2);
	 *  // alert("In else"+otherAmount); otherCoPay=0;
	 * 
	 * otherPay=otherAmount-otherconAmt; otherConcession = otherconAmt; //
	 * alert(otherConcession); }
	 * 
	 * 
	 * var tempDate = createdDateTime.split("/"); var addDate = new
	 * Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	 * 
	 * if(unitId ==0){ unitid = $("#allunitid").val(); }
	 * 
	 * if (subServiceId == "" || subServiceId == null || subServiceId ==
	 * undefined || isNaN(subServiceId)) { subServiceId = -1; }
	 * 
	 * var ratevalidation = $('#rate').val();
	 * 
	 * if (ratevalidation == "" || ratevalidation == null || ratevalidation ==
	 * undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
	 * ratevalidation = 0; alert("Please Enter Rate"); return false; }
	 * 
	 * var serviceDetails = { listBillDetailsIpd : [] };
	 * serviceDetails.listBillDetailsIpd.push({
	 * 
	 * patienttId : patienttId, billDetailsId : billDetailsId, serviceId :
	 * serviceId, doctorId : doctorId, treatmentId : treatmentId, departmentId :
	 * departmentId, billId : billId, //cancel : cancel, //sourceTypeId :
	 * sourceTypeId, rate : rate, concession : concession, quantity : quantity,
	 * amount : amount, pay : pay, otherPay : otherPay, otherCoPay : otherCoPay,
	 * coPay : coPay, serviceId : serviceId, subServiceId : subServiceId, unitId :
	 * unitId, createdDateTime : addDate, recSlaveIdIPD : recSlaveIdIPD,
	 * callfrom : callfrom, masterReceiptId : masterReceiptId, subservicesname :
	 * subservicesname, sponsorId : sponsorId, chargesSlaveId : chargesSlaveId,
	 * otherRate : otherRate, urgentFlag : "N", otherAmount : otherAmount,
	 * otherConcession : otherConcession, concessionPer : concessionPer,
	 * iscombination : iscombination, receiptOf : receiptOf, narration :
	 * narrationid, narrationidBill : narrationidBill, accountStatusIpd : "N"
	 * });
	 * 
	 * serviceDetails = JSON.stringify(serviceDetails);
	 * 
	 * if(listBillDetails == null){ alert("Service details are Null!!!!");
	 * return false; }
	 * 
	 * var inputs = [];
	 *  // patient details push inputs.push("serviceDetails="+
	 * encodeURIComponent(serviceDetails)); inputs.push("queryType="+
	 * queryType); inputs.push("callfrom="+ callfrom); // inputs.push("module="+
	 * module); inputs.push("billDetailsId="+ encodeURIComponent(recSlaveId));
	 * 
	 * 
	 * 
	 * var str = inputs.join('&');
	 * 
	 * 
	 * jQuery.ajax({ async : false, type : "POST", data : str + "&reqType=AJAX",
	 * error : function() { alert('Network Issue!!!'); },
	 * 
	 * url : "ehat/doctordesk/saveIpd",
	 * 
	 * success : function(r) {
	 * 
	 * 
	 * if(r >0){ if(queryType=='insert') { alertify.success("Doctor assign
	 * Successfully"); } else{ alertify.success("Doctor Update Successfully"); }
	 * 
	 * getPatientBillAmountIpd(treatmentId);
	 * 
	 * $('#perticular').attr('readonly', 'false'); calculatePerticularTotal1(); } }
	 * });
	 *  } else
	 */
	  
	if (serviceId == 3) {
		var queryType = $('#queryType').val();
		var billDetailsId = $('#billDetailsId').val();

		// var doctorId = $( "#doctorName option:selected" ).val();
		/* var num = isNaN(parseInt(doctorId)) ? 0 : parseInt(doctorId); */
		// alert(doctorId);
		var patienttId = $("#pId").val();
		// var doctorId =$('#doctorName').val();
		var treatmentId = $("#treatmentId").text();

		var departmentId = $("#depdocdeskid").val();
		var billId = parseInt($("#billNo").html());// $("#bNo").val();
		var sourceTypeId = $("#sourceTypeId").val();
		var rate = $("#rate").val();
		var concession = $("#concession").val();
		var concessionPer = parseFloat($("#concessionIpdPer").val());
		var quantity = $("#qty").val();
		var amount = $("#amount").val();
		// concessionPer.toFixed(2);
		var pay = $("#pay").val();
		var coPay = $("#coPay").val();
		var createdDateTime = $("#finalDate").val();
		/* alert(createdDateTime); */
		var subServiceId = parseInt($("#subserviceid").val());
		// alert(subServiceId);
		if (subServiceId == -1) {
			alert("Please enter valid service Name");
			crearAllFields();

			return false;
		}
		var ratevalidation = $('#rate').val();

		/*
		 * if (ratevalidation == "" || ratevalidation == null || ratevalidation ==
		 * undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
		 * ratevalidation = 0; alert("Please Enter Rate"); return false; }
		 */
		if (concessionPer == "" || concessionPer == null
				|| concessionPer == undefined || concessionPer == 0
				|| isNaN(concessionPer)) {
			concessionPer = 0;

		}

		var subservicesname = $("#perticular").val();
		var servicename = $("#servicename").val();
		// alert(servicename);
		var unitId = $("#uId").val();

		var otherAmount = 0;
		var otherCoPay = 0;
		var otherPay = 0;
		var otherRate = 0;
		var otherConcession = 0;
		if (chargesConf == -10) {
			otherRate = rate;
			otherAmount = (rate * quantity);
			// alert("In iff"+otherAmount);

			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);
			otherCoPay = 0;

			otherPay = amount - otherconAmt;
			otherConcession = otherconAmt;
			// alert(otherPay);

		} else {

			// var otherRate=chargesfromConf ;
			otherRate = chargesConf;

			otherAmount = (otherRate * quantity);

			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);

			// alert("In else"+otherAmount);
			otherCoPay = 0;

			otherPay = otherAmount - otherconAmt;
			otherConcession = otherconAmt;
			// alert(otherConcession);
		}
		
		var inOutHouse = 0;
		var histopathLab = "N";
		if(serviceId == 11){
			
			inOutHouse = $('#inOutHouseCount').val();
			histopathLab = $('#histopathLab').val();
		}
		// @author bilal for IPD receipt edit

		// var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();

		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}
		var serviceDetails = {
			listBillDetailsIpd : []
		};
		serviceDetails.listBillDetailsIpd.push({

			patienttId : patienttId,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			// doctorId : doctorId,
			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,
			concession : concession,
			concessionPer : concessionPer,
			quantity : quantity,
			amount : amount,
			pay : pay,
			coPay : coPay,
			serviceId : serviceId,
			subServiceId : subServiceId,
			unitId : unitId,
			createdDateTime : addDate,
			recSlaveIdIPD : recSlaveIdIPD,
			callfrom : callfrom,
			masterReceiptId : masterReceiptId,
			subservicesname : subservicesname,
			sponsorId : sponsorId,
			chargesSlaveId : chargesSlaveId,
			urgentFlag : "N",
			otherRate : otherRate,
			otherAmount : otherAmount,
			otherCoPay : otherCoPay,
			otherPay : otherPay,
			otherConcession : otherConcession,
			iscombination : iscombination,
			receiptOf : receiptOf,
			narration : narrationid,
			narrationidBill : narrationidBill,
			emrPer : emrPer,
			accountStatusIpd : "N",
			drdeskflag : drdeskflag,
			inOutHouse : inOutHouse

		});

		serviceDetails = JSON.stringify(serviceDetails);
		
		

		var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());

		/*
		 * if(listBillDetails == null){ alert("Service details are Null!!!!");
		 * return false; }
		 */

		var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("module="+ inOutHouse);
		inputs.push("callfrom=" + callfrom);
		inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/doctordesk/saveIpd",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				if (r > 0) {
					if (queryType == 'insert') {
						alertify.success("Bed assign Successfully");
						// alert("Bed assign Successfully");
					} else {
						alertify.success("Bed Update Successfully");
						// alert("Bed Update Successfully");
					}

					getPatientBillAmountIpd(treatmentId);

					$('#perticular').attr('readonly', 'false');
					calculatePerticularTotal1();
				}
			}
		});
		$('#queryType').val("insert");
		$('#billDetailsId').val("0");
		$('#subserviceid').val("-1");
	} else if (serviceId == 4) {

		var otProcedureId = $('#otProcedureId').val();

		var otflag = "Y";
		var queryType = $('#queryType').val();
		var billDetailsId = $('#billDetailsId').val();
		var doctorId = $("#doctorName option:selected").val();
		/* var num = isNaN(parseInt(doctorId)) ? 0 : parseInt(doctorId); */
		// alert(doctorId);
		var patienttId = $("#pId").val();
		// var doctorId =$('#doctorName').val();
		var treatmentId = $("#treatmentId").text();

		var departmentId = $("#depdocdeskid").val();

		var billId = parseInt($("#billNo").html());// $("#bNo").val();
		var sourceTypeId = $("#sourceTypeId").val();

		var rate = $("#rate").val();
		var concession = $("#concession").val();
		var concessionPer = $("#concessionIpdPer").val();
		var quantity = $("#qty").val();
		var amount = $("#amount").val();

		var pay = $("#pay").val();
		var coPay = $("#coPay").val();

		var createdDateTime = $("#finalDate").val();
		/* alert(createdDateTime); */
		var subServiceId = $("#subserviceid").val();
		var subservicesname = $("#perticular").val();
		var servicename = $("#servicename").val();
		var unitId = $("#uId").val();

		var otherAmount = 0;
		var otherCoPay = 0;
		var otherPay = 0;
		var otherRate = 0;
		var otherConcession = 0;

		if (chargesConf == -10) {
			otherRate = rate;
			otherAmount = (rate * quantity);
			// alert("In iff"+otherAmount);

			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);
			otherCoPay = 0;

			otherPay = amount - otherconAmt;
			otherConcession = otherconAmt;

		} else {
			otherRate = chargesConf;
			otherAmount = (otherRate * quantity);
			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);
			// alert("In else"+otherAmount);
			otherCoPay = 0;
			otherPay = otherAmount - otherconAmt;
			otherConcession = otherconAmt;
		}

		// @author bilal for IPD receipt edit
		// var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();

		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

		/*
		 * alert("coPay >>>>>>>>>>.."+coPay); return false;
		 */

		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		var ratevalidation = $('#rate').val();

		/*
		 * if (ratevalidation == "" || ratevalidation == null || ratevalidation ==
		 * undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
		 * ratevalidation = 0; alert("Please Enter Rate"); return false; }
		 */

		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}

		// Added by sanjay on ipd, service assign save button.send to ris
		var sendToRisIpdBill = 'N';
		if ($("#sendToRis").prop("checked") == true) {
			sendToRisIpdBill = 'Y';
			// ServiceId 12 is for Investigation Categort Test,if ServiceId
			// change then replace ServiceId
			if (serviceId != 12) {
				alertify
						.error("Select Investigation Test or Uncheck Send To Ris");
				return false;
			}
		}

		var serviceDetails = {
			listBillDetailsIpd : []
		};
		serviceDetails.listBillDetailsIpd.push({

			patienttId : patienttId,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			doctorId : doctorId,

			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,
			concession : concession,
			concessionPer : concessionPer,
			quantity : quantity,
			amount : amount,
			pay : pay,
			coPay : coPay,
			serviceId : serviceId,
			subServiceId : subServiceId,
			unitId : unitId,
			urgentFlag : "N",
			createdDateTime : addDate,
			recSlaveIdIPD : recSlaveIdIPD,
			callfrom : callfrom,
			masterReceiptId : masterReceiptId,
			subservicesname : subservicesname,
			sponsorId : sponsorId,
			chargesSlaveId : chargesSlaveId,

			otherRate : otherRate,
			otherAmount : otherAmount,
			otherCoPay : otherCoPay,
			otherPay : otherPay,
			otherConcession : otherConcession,
			iscombination : iscombination,
			ot_flag : otflag,
			otprocedure : otProcedureId,
			receiptOf : receiptOf,
			narration : narrationid,
			narrationidBill : narrationidBill,
			emrPer : emrPer,
			accountStatusIpd : "N",
			sendToRisIpdBill : sendToRisIpdBill,
			drdeskflag : drdeskflag,
			sndToLabFlag : sndToLabFlag
		});

		serviceDetails = JSON.stringify(serviceDetails);
		
		var inOutHouse = 0;
		var histopathLab = "N";
		if(serviceId == 11){
			
			inOutHouse = $('#inOutHouseCount').val();
			histopathLab = $('#histopathLab').val();
		}

		var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());

		var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("module="+ inOutHouse);
		inputs.push("callfrom=" + callfrom);
		inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/doctordesk/saveIpd",

			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				if (r > 0) {
					if (queryType == 'insert') {
						alertify.success("Service assign Successfully");
						if ($("#ipdTestSendToLab").val() == "on") {
							// call for when assign test that time test send to
							// lab immediatly.
							ipdBillSendToLab(serviceDetails, queryType);
						}
						// alert("Service assign Successfully");
					} else {
						alertify.success("Service Update Successfully");
						// alert("Service Update Successfully");
					}
					getPatientBillAmountIpd(treatmentId);
					calculatePerticularTotal1();

				}
			}
		});
	}

	else {

		var ot_flag = 'N';
		var queryType = $('#queryType').val();
		var billDetailsId = $('#billDetailsId').val();
		var doctorId = $("#doctorName option:selected").val();
		
		/* var num = isNaN(parseInt(doctorId)) ? 0 : parseInt(doctorId); */
		// alert(doctorId);
		var patienttId = $("#pId").val();
		// var doctorId =$('#doctorName').val();
		var treatmentId = $("#treatmentId").text();

		var departmentId = $("#depdocdeskid").val();

		var billId = parseInt($("#billNo").html());// $("#bNo").val();
		var sourceTypeId = $("#sourceTypeId").val();

		var rate = $("#rate").val();
		var concession = $("#concession").val();
		var concessionPer = $("#concessionIpdPer").val();
		var quantity = $("#qty").val();
		var amount = $("#amount").val();

		var pay = $("#pay").val();
		var coPay = $("#coPay").val();
		var createdDateTime = $("#finalDate").val();
		/* alert(createdDateTime); */
		var subServiceId = parseInt($("#subserviceid").val());

		var update = $('#queryType').val();
		if (update != "update") {
			// alert("else 3677");
			var pharmacyInvname = $("#perticular").val(); // Pooja
			var drdeskflag = "-";
			if (subServiceId == -1
					&& (pharmacyInvname != "" || pharmacyInvname == null
							|| pharmacyInvname == undefined
							|| pharmacyInvname == 0 || isNaN(pharmacyInvname))) {
				subServiceId = 9;
				serviceId = $("#pharmacyInvoice").val();// only for invoice
				// serviceId =$("#servId").val();//only for invoice
				drdeskflag = $("#perticular").val();

			}
		}

		if (subServiceId == -1) {
			alert("Please enter valid service Name");
			crearAllFields();
			return false;
		}

		var ratevalidation = $('#rate').val();

		/*
		 * if (ratevalidation == "" || ratevalidation == null || ratevalidation ==
		 * undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
		 * ratevalidation = 0; alert("Please Enter Rate"); return false; }
		 */
		var subservicesname = $("#perticular").val();
		var servicename = $("#servicename").val();
		var perticularSName = $("#perticular").val();

		var unitId = $("#uId").val();

		var otherAmount = 0;
		var otherCoPay = 0;
		var otherPay = 0;
		var otherRate = 0;
		var otherConcession = 0;

		/*if (chargesConf == -10) {
			// alert("3643");
			otherRate = rate;
			otherAmount = (rate * quantity);
			// alert("In iff"+otherAmount);

			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);
			otherCoPay = 0;

			otherPay = amount - otherconAmt;
			otherConcession = otherconAmt;
		} else {
			otherRate = chargesConf;
			otherAmount = (otherRate * quantity);
			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);
			// alert("In else"+otherAmount);
			otherCoPay = 0;
			otherPay = otherAmount - otherconAmt;
			otherConcession = otherconAmt;
		}*/
		
		var sponsorTestCharges = $("#sponsorTestCharges").val();
		
		if(chargesSlaveId > 0 && sponsorTestCharges > 0){
			
			otherRate = sponsorTestCharges;
			otherAmount = (otherRate * quantity);
			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);
			// alert("In else"+otherAmount);
			otherCoPay = 0;
			otherPay = otherAmount - otherconAmt;
			otherConcession = otherconAmt;
		}else{
			
			otherRate = rate;
			otherAmount = (rate * quantity);
			// alert("In iff"+otherAmount);

			var otherconAmt = ((concessionPer * otherAmount) / 100).toFixed(2);
			otherCoPay = 0;

			otherPay = amount - otherconAmt;
			otherConcession = otherconAmt;
		}
			
		// @author bilal for IPD receipt edit
		var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();

		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

		/*
		 * alert("coPay >>>>>>>>>>.."+coPay); return false;
		 */

		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}
		// Added by sanjay on ipd, service assign save button.send to ris
		var sendToRisIpdBill = 'N';
		if ($("#sendToRis").prop("checked") == true) {
			sendToRisIpdBill = 'Y';
			// ServiceId 12 is for Investigation Categort Test,if ServiceId
			// change then replace ServiceId
			
			if (serviceId != 12 && serviceId != 13) {
				alertify
						.error("Select Investigation Test or Uncheck Send To Ris");
				return false;
			}
		}
		
		var barcodeNo=0;
		var templateWiseTestFlag = $("#templateWiseTestFlag").val();
		var sampleTypeId  =	$('#sampleType').val();
		//var barCode  =	$('#barCode').val();
		var inOutHouse = 0;
		var histopathLab = "N";
		if(serviceId == 11){
			
			inOutHouse = $('#inOutHouseCount').val();
			histopathLab = $('#histopathLab').val();
		}
		var customerType = 0; //$('#customerType').val();	
		var customerId = 0; //$('#customerId').val();	
		var businessType = 2;//$('#businessType').val();
		var prepaidReceiptId = 0;//$('#prepaidReceiptId').val();
		var collectionDate = $('#collectionDate').val();
		var collectionTime = $('#collectionTime').val();
		var regRefDocId = 0;//$('#refDocId').val();

		// Added for validate
		if(sampleTypeId <= 0 || sampleTypeId == undefined){
			//alert("Please Select Sample Type!");
			//return false;
			sampleTypeId = 0;
		}
		
		if (parseInt($("#doctorName option:selected").val()) > 0) {
		var specialityId =  $("#specialityId option:selected").val();
		if(specialityId == undefined || specialityId == null || specialityId == "0"){
			alert("Please Select Doctor Speciality!");
			specialityId = 0;
			return false;
		}
		}
		var hallSlaveId = $("#hallSlaveId").val();
		//var validationResult = validateBusinessAmountLimit(amount);
		
		var defaultFlag = $("#defaultPkgFlag").val();
		
		var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());
		
		var serviceDetails = {
			listBillDetailsIpd : []
		};
		serviceDetails.listBillDetailsIpd.push({

			patienttId : patienttId,
			perticularSName : perticularSName,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			doctorId : doctorId,
			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,
			concession : concession,
			concessionPer : concessionPer,
			quantity : quantity,
			amount : amount,
			pay : pay,
			coPay : coPay,
			serviceId : serviceId,
			subServiceId : subServiceId,
			unitId : unitId,
			createdDateTime : addDate,
			recSlaveIdIPD : recSlaveIdIPD,
			urgentFlag : "N",
			callfrom : callfrom,
			masterReceiptId : masterReceiptId,
			subservicesname : subservicesname,
			sponsorId : sponsorId,
			chargesSlaveId : chargesSlaveId,

			otherRate : otherRate,
			otherAmount : otherAmount,
			otherCoPay : otherCoPay,
			otherPay : otherPay,
			otherConcession : otherConcession,
			iscombination : iscombination,
			receiptOf : receiptOf,
			narration : narrationid,
			hallId : hallId,
			hallSlaveId : hallSlaveId,
			narrationidBill : narrationidBill,
			accountStatusIpd : "N",
			emrPer : emrPer,
			sendToRisIpdBill : sendToRisIpdBill,
			ot_flag : ot_flag,
			sndToLabFlag : sndToLabFlag,
			drdeskflag : drdeskflag,
			
			sampleTypeId : sampleTypeId,
			barCode : barcodeNo,
			inOutHouse : inOutHouse,
			histopathLab : histopathLab,
			businessType : businessType,
			customerId : customerId,
			customerType : customerType,
			//invoiceRemainAmount : amount,
			//prepaidReceiptId : prepaidReceiptId,
			collectionDate : collectionDate,
			collectionTime : collectionTime,
			regRefDocId : regRefDocId,
			templateWise : templateWiseTestFlag,
			ivfTreatFlag : "N",
			defaultFlag : defaultFlag,
			specialityId : specialityId
		});

		serviceDetails = JSON.stringify(serviceDetails);

		var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("module="+ inOutHouse);
		inputs.push("callfrom=" + callfrom);
		inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/doctordesk/saveIpd",

					error : function() {
						alert('Network Issue!!!');
					},
					success : function(r) {

						// if (r > 0) {
						if (r == 1 && queryType == 'insert') {
							alertify.success("Service assign Successfully");
							if ($("#ipdTestSendToLab").val() == "on") {
								// call for when assign test that time test send
								// to lab immediatly.
								ipdBillSendToLab(serviceDetails, queryType);
							}

						} else if (r == 2 && queryType == 'update') {
							alertify.success("Service Update Successfully");
						} else if (r == 6) {
							alertify.error("Dublicate Radiation Test cannot be added");
						} else if (r == 4) {
							var r = confirm("Package is not configure for Hall. Do you want Default Package?");
							if (r == true) {
								$("#hallId").val(0);

								saveServiceToPatient('general2');

							} else {
								return false;
							}
						}else if(r == 22){
							
							var r = confirm("Package is not configure for Hall. Do you want Default Hall Package?");
							if (r == true) {
								$("#hallId").val(2);
								$("#SponsorsourceTypeId").val(0);
								$("#chargesSlaveId").val(0);
								$("#defaultPkgFlag").val(1);
								saveServiceToPatient('general2');
							} else {
								return false;
							}
						}
						
						/*
						 * if (r == 3) { var r = confirm("Package is not
						 * configure for Hall. Do you want Default Package?");
						 * if (r == true) { $("#hallId").val(0);
						 * 
						 * saveServiceToPatient('general'); }else{ return false; } }
						 * if(r == 1 && queryType == 'insert') {
						 * alertify.success("Service assign Successfully");
						 * //alert("Service assign Successfully"); } if(r == 2 &&
						 * queryType == 'update') { alertify.success("Service
						 * Update Successfully"); //alert("Service Update
						 * Successfully"); }
						 */

						getPatientBillAmountIpd(treatmentId);
						calculatePerticularTotal1();
						
						
						
					}
				});
	}
	getSponsorSanctionAmount();
	crearAllFields();
	// window.location.reload(true);
	// added by vinod
	$("#perticular").removeAttr('readonly');
	$("#pay").removeAttr('readonly');
	$("#coPay").removeAttr('readonly');
	$("#concession").removeAttr('readonly');
	$("#qty").removeAttr('readonly');
	/*
	 * $(".openAllSlaveIpd").trigger('click'); getBillReceiptDetailsIpd('all');
	 * setTotalPaid();
	 */
	// added by vinod
	resetAllIpd("general");
	
	// added by dayanand  for sending ris test from package
	if ($("#sendToRis").prop("checked") == true) {
						
			setTimeout(function() {
								//sendToPhlebotomyFromSave(0);
				}, 900);
			
		if (serviceId == 13) {
			var chargesSlaveId = $("#chargesSlaveId").val();
			exploreOnClick('open');
			if(chargesSlaveId > 0){
				
				sendToPhlebotomyFromSaveSponsor(0);
			}else{
				
				sendToPhlebotomyFromSave(0);
			}
		}
	}
	// end sending ris test
	/*
	 * $(".openAllSlaveIpd").trigger('click'); getBillReceiptDetailsIpd('all');
	 * setTotalPaid();
	 */
	// added by vinod
	$("#chargesfromConfIpd").val("0");
	$("#defchargesfromConfIpd").val("0");
	$("#narration").val('');
	$('#narrationid').val('');
	$('#drdeskflag').val('-');
	// $('#receiptOf').val('general');
	$("#SponsorsourceTypeId").val(sponsorid2);
	$("#chargesSlaveId").val(chargesSlaveId2);
	$("#hallId").val(2);
	$("#divsptime").css("display", 'none');
	$("#defaultPkgFlag").val(0);
	$("#iscombinationIpd").val("N");
	$("#sampleWiseBarcodeTableBody").empty();
	userAccess();
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 05-June-2017
 * @codeFor : Get for ipd queue
 ******************************************************************************/
function getIpdQueue(callfrom) {

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/viewIpdQueue",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {

			setIpdQueueTemp(r);
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 05-June-2017
 * @codeFor : Set ipd queue template
 ******************************************************************************/
function setIpdQueueTemp(res) {
	

	var count = 1;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed table-stripped cf'>"
			+ "<thead class='cf'>"
			+ "<tr>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
			+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont' >Mobile No</label></th>"
			+ "<th class='col-md-2-1 center' style=''><label class='TextFont' >MRN No</label></th>"

			//+ "<th class='col-md-1-1' style=''><label class='TextFont' >Patient ID</label></th>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont' >UHID</label></th>"

			+ "<th class='col-md-2-1' style=''><label class='TextFont' >Admission No</label></th>"
			+ "<th class='col-md-1-1 ' style=''><label class='TextFont' >Allot Bed</label></th>"
			+ "<th class='col-md-2-1 center' style=''><label class='TextFont'>Cancel Admission</label></th>"
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
				+ "	<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ count
				+ "</td>"
				+ "	<td class='col-sm-3-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ fullName
				+ "</td>"
				+ "	<td class='col-sm-1-1 center center' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdQueue[indx].mobile
				+ "</td>"
				+ "	<td class='col-sm-2-1 center' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdQueue[indx].mrnno
				+ "</td>"
				/*+ "	<td class='col-sm-1-1 center' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdQueue[indx].pId
				+ "</td>"*/
				
				+ "	<td class='col-sm-1-1 center' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdQueue[indx].centerPatientId
				+ "</td>"
				+ "	<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ res.lstIpdQueue[indx].opdipdno
				+ "</td>"
				+ "	<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ "		<input type='button' value='ALLOT BED' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
				+ count
				+ "' "
				+ "		onclick=viewBedWard("
				+ res.lstIpdQueue[indx].treatId
				+ ") style='font-size: 12px;' />"
				+ "	</td>"
				+ "	<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ "		<input type='button' value='Cancel Admission' name='#login-box' class='btn btn-xs btn-success editUserAccess' id='submit' "
				+ "				onclick='reasonTocancell(" + res.lstIpdQueue[indx].pId
				+ "," + res.lstIpdQueue[indx].treatId + ")' />" + "	</td>"
				+ "	</tr>";

		count = count + 1;
	}
    	 
	ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
	$("#container").html(ipdqueueTemp);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 05-June-2017
 * @codeFor : View bed wards
 ******************************************************************************/
function viewBedWard(treatId) {

	window.location.href = "ehat_IPD_BedWard.jsp?treatId=" + treatId;
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 05-June-2017
 * @codeFor : Autosuggestion for ipd queue
 ******************************************************************************/
function setAutoCompleteForIpdQueue(inputId, callfrom) {

	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
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
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/autoSuggestionIpdQueue",
		//timeout : 100 * 6 * 15,
		cache : true,
		success : function(r) {

			if (callfrom == "search") {
				setIpdQueueTemp(r);
				// autoCompTable(r, inputId);

			} else {
				// autoCompTable(r, inputId);
			}
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 05-June-2017
 * @codeFor : Allocate Bed for patient
 ******************************************************************************/
function allocateBed(bedID) {

	var billId = $("#billNo").text();
	var patientId = $("#patientId").text();
	var treatmentId = $("#treatmentId").text();
	var srvMstId = $("#li0").val();
	getIpdbillSlaveDetails(0, "SubServiceDto", bedID);
	var sourceTypeId = 1;
	var unitId = $("#unitId").val();
	;
	var userId = $("#userId").val();
	;
	var departmentId = 2;
	var deleted = "N";
	var bedCharges = $("#bedCharges").val();
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
	inputs.push('deleted=' + deleted);

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
			window.location.href = "ehat_ipd_billing.jsp?" + "treatmentId="
					+ encodeURIComponent(treatmentId);
		}
	});
};

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 05-June-2017
 * @codeFor : Get for ipd bill patients
 ******************************************************************************/
function getIpdBillPatients(callform, id) {

	var ward = "-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if (id == "hallTypeSelectID") {
		ward = "bothwise";
	}
	var wardType = $("#wardType1").val();
	var hallTypeSelectId = $("#hallTypeSelectID").val();

	if (wardType == null || wardType == "-") {

		wardType = 0;
	}

	if (hallTypeSelectId == null) {

		hallTypeSelectId = 0;
	}

	var inputs = [];
	inputs.push("callform=" + callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/viewIpdbillPatients",
		// timeout : 1000 * 60 * 15,
		// cache : false,
		success : function(r) {

			setIpdbillPatientsTemp(r);
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 09-June-2017
 * @codeFor : Set ipd queue template
 ******************************************************************************/
function setIpdbillPatientsTemp(res) {

	var count = 1;
	var ipdqueueTemp = "";		
	

	for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {		

		var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;
		var fullName = res.lstIpdbillPatients[indx].patientName;
		var categoryName = res.lstIpdbillPatients[indx].categoryName;
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

				// For Sonsor Name
				+ "	<td class='col-sm-3-1' id='divSp"
				+ count
				+ "' style='height: 21.5px;'>"
				+ categoryName
				+ "</td>"

				+ "	<td class='col-sm-1-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].centerPatientId
				+ "</td>"

				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mobile
				+ "</td>"

				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mrnno
				+ "</td>"

				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].opdipdno
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnDelete"
				+ count
				+ "' "
				+ "		onclick=viewBillForIPD("
				+ res.lstIpdbillPatients[indx].treatId
				+ ",'generalBill','"+phyDisFlag+"') style='font-size: 12px;' />"
				+ "	</td>"

				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='Print' class='btn btn-xs btn-success' id='btnPrint"
				+ count + "' " + "		onclick=printsForPatients("
				+ res.lstIpdbillPatients[indx].treatId
				+ ") style='font-size: 12px;' />" + "	</td>"

				+ "</tr>";

		count = count + 1;
	}
	$("#ipdBillPatients").html(ipdqueueTemp);
	$("#ipdBillPatients1").html(ipdqueueTemp);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 09-June-2017
 * @codeFor : View Ipd bill of ipd patients
 ******************************************************************************/
function viewBillForIPD(treatId, finalbill, phyDisFlag) {

	if(phyDisFlag != "Y"){
		
		phyDisFlag = "N";
	}
	window.location.href = "ehat_ipd_billing.jsp?" + "treatmentId="
			+ encodeURIComponent(treatId) + "&finalbillIs="
			+ encodeURIComponent(finalbill)+ "&phyDisFlag="
			+ encodeURIComponent(phyDisFlag);
}

/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 03-Nov-2017
 * @codeFor : Get for ipd Final bill patients
 ******************************************************************************/
function getIpdBillPatientsFinalBill(callform, id) {

	var ward = "-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if (id == "hallTypeSelectID") {
		ward = "bothwise";
	}
	var wardType = $("#wardType1").val();
	var hallTypeSelectId = $("#hallTypeSelectID").val();

	if (wardType == null) {

		wardType = 0;
	}

	if (hallTypeSelectId == null) {

		hallTypeSelectId = 0;
	}

	var inputs = [];
	inputs.push("callform=" + callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/viewIpdbillPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {

			setIpdbillPatientsTempFinalBill(r);
		}
	});
}

/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 03-Nov-2017
 * @codeFor : Set ipd Final queue template
 ******************************************************************************/
function setIpdbillPatientsTempFinalBill(res) {

	var count = 1;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed table-stripped cf'>"
			+ "<thead class='cf'>"
			+ "<tr>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
			+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
			+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Sponsor Name</label></th>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont' style='padding-left: 20px;'>UHID</label></th>"

			+ "<th class='col-md-1-1' style=''><label class='TextFont' style='padding-left: 20px;'>Mobile No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>MRN No</label></th>"

			+ "<th class='col-md-2-1 center' style=''><label class='TextFont' style='padding-left: 20px;'>Bill ID</label></th>"

			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>View Bill</label></th>"
			+ "</tr>"
			+ "</thead>"
			+ "</table>"
			+ "</div>"
			+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
			+ "	<table class='table table-condensed table-stripped cf'>"
			+ "<tbody class='cf'>";

	for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {

		var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;		
		var fullName = res.lstIpdbillPatients[indx].patientName;
		var categoryName = res.lstIpdbillPatients[indx].categoryName;

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

				+ "	<td class='col-sm-3-1' id='divSp"
				+ count
				+ "' style='height: 21.5px;'>"
				+ categoryName
				+ "</td>"

				+ "	<td class='col-sm-1-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].centerPatientId
				+ "</td>"

				+ "	<td class='col-sm-1-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mobile
				+ "</td>"

				+ "	<td class='col-sm-2-1 ' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mrnno
				+ "</td>"

				+ "	<td class='col-sm-2-1 center' id='divIc"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].invoiceCount
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].opdipdno
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
				+ count + "' " + "		onclick=viewBillForIPDFinalBill("
				+ res.lstIpdbillPatients[indx].treatId
				+ ",'finalBill','"+phyDisFlag+"') style='font-size: 12px;' />" + "	</td></tr>";

		count = count + 1;
	}
	ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
	$("#ipdBillPatients").html(ipdqueueTemp);
}

/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 03-Nov-2017
 * @codeFor : View Final Ipd bill of ipd patients
 ******************************************************************************/
function viewBillForIPDFinalBill(treatId, finalbill, phyDisFlag) {

	
	if(phyDisFlag != "Y"){
		
		phyDisFlag = "N";
	}	
	window.location.href = "ehat_ipd_billing.jsp?" + "treatmentId="
			+ encodeURIComponent(treatId) + "&finalbillIs="
			+ encodeURIComponent(finalbill)+ "&phyDisFlag="
			+ encodeURIComponent(phyDisFlag);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 10-June-2017
 * @codeFor : Fetch Ipd bill details ipd patients
 ******************************************************************************/
function fetchIpdbillDetails(r) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatId" : r
		},
		url : "ehat/ipdbill/fetchbiilldetails",
		success : function(r) {

			setIpdBillDetailsTemp(r);
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 10-June-2017
 * @codeFor : Set template for ipd bill details
 ******************************************************************************/
function setIpdBillDetailsTemp(r) {

	var setBill = "";
	for ( var i = 0; i < r.listBillDetails.length; i++) {

		setBill = setBill

				+ '<tr>'
				+ '<td class="only-checkbox"><input type="checkbox" id=chk1></td>'
				+ '<td>'
				+ '<div class="text-left">'
				+ '<div class="panel-group" id="accordion">'
				+ '<div class="panel">'
				+ '<div class="panel-heading">'
				+ '<h3 class="panel-title">'
				+ '<a class="accordion-toggle"data-toggle="collapse"data-parent="#accordion" href="#collapseBed'
				+ i + '" ' + 'onclick="getIpdbillSlaveDetails(' + i
				+ ',\'SubServiceDto\',' + r.listBillDetails[i].subServiceId
				+ ')">' + '<div class="row">'
				+ '<div class="col-md-10">Bed</div>' + '<div class="col-md-1">'
				+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
				+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
				+ '<div id="collapseBed' + i
				+ '" class="panel-collapse collapse">'
				+ '<div class="panel-body">'
				+ '<table class="table table-hover">' + '<thead>' + '<tr>'
				+ '<th class="only-checkbox">#</th>' + '<th>Bed Name</th>'
				+ '<th>' + '<div class="text-center">Amount</div>' + '</th>'
				+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
				+ '</tr>' + '</thead>' + '<tbody id="ipdBillSlaveDetails' + i
				+ '">'

				+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
				+ '</div>' + '</div>' + '</td>'
				+ '<td><div class="text-center">1</div></td>' + '<td>'
				+ '<div class="text-right">' + r.listBillDetails[i].amount
				+ '</div></td>' + '</tr>';
	}
	$("#billDetails").html(setBill);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 10-June-2017
 * @codeFor : Fetch ipd bill slave details
 ******************************************************************************/
function getIpdbillSlaveDetails(count, className, servId) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"className" : className,
			"autoId" : parseInt(servId)
		},
		url : "ehat/ipdbill/getsubServiceDetails",
		success : function(response) {

			setIpdbillSlaveDetailsTemp(count, response);
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 10-June-2017
 * @codeFor : Set template for ipd bill slave details
 ******************************************************************************/
function setIpdbillSlaveDetailsTemp(count, res) {

	var setService = "";
	var datetime12 = new Date(res.createdDate).toLocaleDateString('en-GB');
	setService = setService

	+ '<tr>' + '<td class="only-checkbox">' + '<input type="checkbox">'
			+ '</td>' + '<td> ' + res.categoryName + ' </td>' + '<td>'
			+ '<div class="text-center">' + res.charges + '</div>' + '</td>'
			+ '<td>' + '<div class="text-right">' + datetime12 + '</div>'
			+ '</td>' + '</tr>' + '<tr>';

	$("#ipdBillSlaveDetails" + count).html(setService);
	$("#bedCharges").val(res.charges);
}

var addHallDetailsTemp = "<div style='height: 120%; padding-left: 5%;'>"
		+ "<div class='col-md-12-1 center' style='padding-top: 5%;'><h4>Add Hall</h4></div>	"
		+

		" <div class='form-group Remove-Padding col-md-12-1' "
		+ " style='margin: 1%; height: 100px; width: 100%; border: 1px solid #ddd;'> "
		+ " <div class='divide-20'></div> "
		+ " <div class='form-group'> "
		+ " <div class='col-md-8'> "
		+ " <select name='listmstr' id='listmstr_select' style='width: 200px' "
		+ " onchange=setDyanamicDiv('dynamicItem',this.id)> "
		+ " <option id='firstElmt'>Select Master</option> </select> </div> </div>"
		+ " <div class='col-md-12 select2-container select2-container-multi' style='margin-top: 2%;'> "
		+ " <ul id='dynamicItem' class='select2-choices' "
		+ " style='overflow-y: scroll;'> </ul> </div> </div>"
		+

		"<div class='col-md-12-1'><div class='col-md-3-1' style='padding-top: 7%;margin-left:2%;'>Hall Name</div>"
		+ "<div class='col-md-9-1' style='padding-top: 8%; padding-left: 6%;'>"
		+ "<input type='text' id='hname' name='hname' class='col-md-10-1'	maxlength='150' />"
		+ "<div class='col-md-1-1' style='color: red; padding-left:3px;'><b>*</b></div></div></div>"
		+ "<div class='col-md-12-1'style='margin-top:9px'><div class='col-md-3-1' style='margin-top:4px;margin-left:2%;'>Hall Type</div>"
		+ "<div class='col-md-9-1' style='margin-top:9px; padding-left: 6%;'>"
		+ "<select class='col-md-10-1' id='btype' name='btype'></select>"
		+ "<div class='col-md-1-1' style='color: red; padding-left:3px;'><b>*</b></div></div></div>"
		+ "<div class='col-md-12-1' style='margin-top:9px'><div class='col-md-3-1' style='margin-top:4px;margin-left:2%;'>Lease/ Bed Normal</div>"
		+ "<div class='col-md-9-1' style='margin-top:9px; padding-right: 6%;'><p class='col-md-1-1'>Rs.</p>"
		+ "<input type='text' id='lease' name='lease' class='col-md-10-1'	onkeypress='return validateNumbers(event)' maxlength='6' />"
		+ "<div class='col-md-1-1' style='color: red; padding-left: 3px;'><b>*</b></div></div></div>"
		+ "<div class='col-md-12-1' style='margin-top:9px'><div class='col-md-3-1' style='margin-top:4px;margin-left:2%;'>Lease/ Bed Isolation</div>"
		+ "<div class='col-md-9-1' style='margin-top:9px; padding-right: 6%;'><p class='col-md-1-1'>Rs.</p>"
		+ "<input type='text' id='leaseIsolation' name='leaseIsolation' class='col-md-10-1' onkeypress='return validateNumbers(event)' maxlength='6' />"
		+ "<div class='col-md-1-1' style='color: red; padding-left: 3px;'><b>*</b></div></div></div>"
		+ "<div class='col-md-12-1' style='margin-top:9px'><div class='col-md-3-1' style='margin-top:9px;margin-left:2%;'>Number Of Beds</div>"
		+ "<div class='col-md-9-1' style='margin-top:9px; padding-left: 6%;'>"
		+ "<input type='text' id='nbed' name='nbed' class='col-md-10-1' onkeypress='return validateNumbers(event)' maxlength='2' />"
		+ "<div class='col-md-1-1' style='color: red; padding-left:3px;'><b>*</b></div></div></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div>";

function addHallDetails() {
	var userBean;
	$("#bedMangTemp1").setTemplate(addHallDetailsTemp);
	$("#bedMangTemp1").processTemplate(userBean);
	$("#listmstr_select").select2();
	// setsaveButtonTemp();
	// $("#addHallBtn").hide();
	$("#hname").focus();
	loadHallType();
}

var loadHallTypeTemp = "<option value='select' onclick='editAccountHallType(0)'>--Select--</option>{#foreach $T.htli as htli}  <option	value='{$T.htli.idht}' onclick='editAccountHallType({$T.htli.idht})' > {$T.htli.htnm} </option> {#/for}";

var loadHallTypeTempForReport = "<option value='select'>--Select--</option>{#foreach $T.htli as htli}  <option	value='{$T.htli.idht}'> {$T.htli.htnm} </option> {#/for}";

function loadHallType(type) {
	$("#divInside").hide();
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}

	count = 1;
	var inputs = [];
	inputs.push('action=fetchHallType');

	inputs.push('corporateId=' + sid);

	/*
	 * if (sid == "0") { AccsetsaveButtonTemp(); }
	 */
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
			// $("#hallDetailDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#btype").setTemplate(loadHallTypeTemp);
			$("#btype").processTemplate(pobj1);
			$("#divInside").show();
			if (type = "wardreport") {
				$("#halltype").setTemplate(loadHallTypeTempForReport);
				$("#halltype").processTemplate(pobj1);
			}
		}
	});
}

var saveButtonTemp = "<button type='button' value='Save Now' data-toggle='tooltip' data-placement='left' title='Save Hall/Bed' onclick=saveHallDetails() class='btn btn-xs btn-success editUserAccess' disabled='disabled'>"
		+ "<i class='fa fa-save'></i></button>";

function setsaveButtonTemp() {
	var sampleBean;
	$("#saveButton").setTemplate(saveButtonTemp);
	$("#saveButton").processTemplate(sampleBean);
	userAccess();
}

function defaultViewHall(pageName) {
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}

	count = 1;
	var inputs = [];
	inputs.push('action=fetchHall');
	inputs.push('corporateId=' + sid);
	inputs.push('callFrom=' + "withoutLimit");

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
			$("#hallDetailDiv").html(ajaxResponse);
			// for package Master Touheed
			$("#hallList").html(ajaxResponse);

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pageName == 'bedState') {
				$("#btype").setTemplate(loadHallNameTemp);
				$("#btype").processTemplate(pobj1);
			} else if (pageName == "InvestTestCharges"
					|| pageName == "labTestCharges" || pageName == "casuality"
					|| pageName == "OperationManagement"
					|| pageName == "radiologyTestCharges"
					|| pageName == "OtherServicesCharges") {
				$("#InvTestAllHallDetails").html(ajaxResponse);
			} else {
				$("#bedMangTemp").setTemplate(defaultViewHallTemp);
				$("#bedMangTemp").processTemplate(pobj1);

				// for Package Manager hall type feild
				$("#hallType").setTemplate(loadHallNameTemp);
				$("#hallType").processTemplate(pobj1);

				// halltype
				$("#normalPackagetable").setTemplate(normalPackageTemp);
				$("#normalPackagetable").processTemplate(pobj1);
			}
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

var loadHallNameTemp = '<option value="0">-select-</option>{#foreach $T.hl as hl}<option value="{$T.hl.hi}" onclick="editAccountHallType({$T.hl.hi})">{$T.hl.hn}</option>{#/for}';

var defaultViewHallTemp = "<table style='margin-bottom: 9px; background: #fff; width:100%;'	class='table table-bordered table-condensed cf'>"
		+ "<thead class='cf'><tr><th style='height: 21.5px;' class='col-md-1-1 center'> # </th>"
		+ "<th style='' class='col-md-3-1'> Hall Name </th>"
		+ "<th style='' class='col-md-3-1'> Hall Type </th>"
		+ "<th style='' class='col-md-1-1 center'> Beds </th>"
		+ "<th style='padding-left: 0px; padding-right: 0px;' class='numeric col-md-1-1 center'> Edit </th>"
		+ "<th style='padding-left: 0px; padding-right: 0px;' class='numeric col-md-1-1 center'> Delete Hall </th>"
		+ "<th style='padding-left: 0px; padding-right: 0px;' class='numeric col-md-1-1 center'> Add Bed </th>"
		+ "<th style='padding-left: 0px; padding-right: 0px;' class='numeric col-md-1-1 center'> Delete Bed </th></tr></thead></table>"
		+ "<div	style='height: 400px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #b8b8b8;'	class='col-md-12-1'>"
		+ "<table class='table table-striped table-condensed cf'><tbody>{#foreach $T.hl as hl}<tr>"
		+ "<td class='col-md-1-1 center'>{count++}.</td>"
		+ "<td class='col-md-3-1'>{$T.hl.hn}</td>"
		+ "<td class='col-md-3-1'>{$T.hl.htnm}</td>"
		+ "<td class='col-md-1-1 center' style='padding-right: 0px;'>{$T.hl.bn}</td>"
		+ "<td class='col-md-1-1 center' style='padding-right: 10px;'>"
		+ "<button value='EDIT' class='btn btn-xs btn-success pull-right editUserAccess' id='btnEdit{count}' onclick='editHall({$T.hl.hi})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1-1 center' style='padding-right: 10px;'>"
		+ "<button value='DEL' class='btn btn-xs btn-success pull-right deleteUserAccess' id='btnDelete{count}' onClick='deleteHall({$T.hl.hi})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i></button></td>"
		+ "<td class='col-md-1-1 center' style='padding-right: 10px;'>"
		+ "<button value='ADD' class='btn btn-xs btn-success pull-right editUserAccess' id='btnAdd{count}' onClick='AddBed({$T.hl.hi})' disabled='disabled'>"
		+ "<i class='fa fa-plus'></i></button></td>"
		+ "<td class='col-md-1-1 center' style='padding-right: 10px;'>"
		+ "<button value='DEL' class='btn btn-xs btn-success pull-right deleteUserAccess' id='btnDelete{count}' onClick='deleteBed({$T.hl.hi})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i></button></td>"
		+ "</tr>{#/for}</tbody></table></div>";

var normalPackageTemp = "{#foreach $T.hl as il}"
		+ "<tr id='remove{rowCountPackage}'>"
		+ "<td class='col-md-1-1 center'>"
		+ "<label class='TextFont'>{normalPackageCount++}.</label></td>"
		+ "<td class='col-md-1-1 center'>{$T.il.hi}</td>"
		+ "<td class='col-md-5-1 center'>"
		+ "<input type='text' readonly='readonly' class='form-control input-SmallText' style='margin-top: 4px;text-align: left;' value='{$T.il.hn}' name='textfield' id='hall{$T.il.hi}' value='{$T.il.hn}'  maxlength='8' />"
		+ "</td>"
		+ "<td class='col-md-3-1 center'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px; text-align: left;'  id='hallCharges{$T.il.hi}' onkeypress='return validateNumbers(event)'  /></td>"
		+ "<td class='col-md-1-1 center'><input type='checkbox' style='margin-top: 10px;' name='checkBoxPackage'  id='chk{$T.il.hi}' value='{$T.il.hi}' /></td>"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

/*******************************************************************************
 * /*
 * 
 * @Bilal 30_May_2017
 ******************************************************************************/

/*******************************************************************************
 * @Bilal
 * @date 5_jun_2017 this method is used to refersh the fields after save update
 *       and delete
 ******************************************************************************/

function refreshConfig() {

	$('#operator').val("");
	$('#number').val("");
	$('#distribute').val("");

	$("#totalcharges").val("");
	$("input:radio[name='incdecType']:checked").val("");
	// fetchSubServiceList();

}
/*******************************************************************************
 * @Bilal
 * @date 5_06_2017 apply
 ******************************************************************************/
function apply() {
	var cmt = 1;
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	var distribute = parseFloat($("#distribute").val());
	var totalcharges = parseFloat($("#totalcharges").val());

	$("#ol2 li").each(function() {

		var charges = parseFloat($("input[name=charges" + cmt + "]").val());

		// formulas for distribute the values

		// totalcharges =Math.ceil(totalcharges);

		if (operator == "%") {

			if (increaseordecrease == "+") {
				var incdec = charges * number / 100;
				charges = charges + incdec;

			} else {
				var incdec = charges * number / 100;
				charges = charges - incdec;

			}

		} else if (operator == "+") {

			charges = charges + number;
		} else if (operator == "-") {
			charges = charges - number;
		} else {
			// Formulas for Distributed value
			var IncDecP = charges * 100 / totalcharges;

			charges = (IncDecP * distribute / 100).toFixed(2);

		}

		$("input[name=charges" + cmt + "]").val(charges);
		cmt++;
	});

}
/*******************************************************************************
 * @Bilal
 * @date 6_Jun_2017 this method is used to save or update the fields
 ******************************************************************************/

function saveConfigurationService() {

	var configId = $("#configId").val();
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	// For Service Id
	var masterId = $("#li0").val();// masterid
	/*
	 * var selfId = 0;// static self id var liSize = $("#dynamicItem
	 * li").length; if (liSize == 1) { fetchSubServiceById(masterid, selfId); }
	 * else {
	 * 
	 * selfId = $("#li" + (liSize - 1)).val(); fetchSubServiceById(masterid,
	 * selfId); }
	 */

	// For Charges Id
	var chargesId = $("#lis0").val();// masterid
	// alert("chargesId:-"+chargesId);
	var chargesSlaveId = 0;// static self id
	var liSize = $("#dynamicItems lis").length;
	if (liSize == 1) {
		fetchChargesSlaveListById(chargesId, chargesSlaveId);
	} else {

		chargesSlaveId = $("#lis" + (liSize - 1)).val();
		fetchChargesSlaveListById(chargesId, chargesSlaveId);
	}
	// alert("chargesSlaveId:-"+chargesSlaveId);
	var cmt = 1;
	var configurationDetails = {
		lstConfigurService : []
	};
	// master id and self id

	// for each
	$("#ol2 li").each(function() {

		var charges = parseFloat($("input[name=charges" + cmt + "]").val());
		var serviceId = $("input[name=subbId" + cmt + "]").val();

		configurationDetails.lstConfigurService.push({
			charges : charges,
			serviceId : serviceId,
			operator : operator,
			number : number,
			increaseordecrease : increaseordecrease,
			masterId : masterId,
			chargesId : chargesId

		});

		cmt++;
	});

	// console.log(configurationDetails);
	if (configId == "" || configId == null || configId == undefined) {
		configId = 0;
	}

	configurationDetails = JSON.stringify(configurationDetails);
	alert(configurationDetails);

	var inputs = [];
	inputs.push("configurationDetails="
			+ encodeURIComponent(configurationDetails));
	inputs.push('configId=' + configId);
	inputs.push('operator=' + encodeURIComponent(operator));

	var str = inputs.join('&');

	jQuery.ajax({

		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/saveConfiguration",
		error : function() {
			alert('error');
		},
		success : function(r) {

			alertify.success(r);
			refreshConfig();
		}
	});
}

/*******************************************************************************
 * @Bilal
 * @date 31_May_2017 this method is used to fetch records on browser from data
 *       base
 ******************************************************************************/
function fetchSubServiceCategoryList() {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/subservice/SubServiceCategoryList",

		error : function() {
			alert('error');
		},
		success : function(response) {

			divId = response;
			setTemplateForServices(response);
		}
	});
}

/*******************************************************************************
 * Drag and drop functionality
 ******************************************************************************/
function setTemplateForServices(result) {
	var divContent = "<section  id='connected'><div  class='col-md-12-1' style='margin-top:0px;margin-left:-15px'><ol id='ol1' class='connected list right'><lh draggable='false'><font color='#4682B4'><b>Drag From Here..........!</b></font></lh>";
	// alert("result is"+result);
	for ( var i = 0; i < result.lstSubService.length; i++) {

		// alert("code:"+result.lbHedLi[0].lbProLi[j].proChr);
		// "
		/***********************************************************************
		 * + result.lstSubService[i].subId + "
		 **********************************************************************/

		divContent = divContent
				+ "<li title='Charges-"
				+ result.lstSubService[i].subId
				+ "class='subIdClass' 'style= 'border: 2px solid #ffd2a6;'><tr ><tb >"
				+ result.lstSubService[i].categoryName + "</tb></tr>-";
		divContent = divContent + "<input id='charges"
				+ result.lstSubService[i].subId + "'"
				+ " class='chargesClass' type='text' name='charges" + (i + 1)
				+ "' value='" + result.lstSubService[i].charges
				+ "' style='margin-left: 10px;'>";
		divContent = divContent
				+ "<input id='subId' class='subClass' type='hidden' name='subbId"
				+ (i + 1) + "' value='" + result.lstSubService[i].subId
				+ "' style='margin-left: 10px;'>";

		divContent = divContent + "</li>";

	}
	divContent = divContent + "</div></section>";
	$("#leftDiv").html(divContent);

	var call = $("#headingCall").val();
	var call2 = 0;
	if (call2 == 0) {
		setTemplate2();
	}

	sort();
}
// Touheed
// Sorting data
// Date 15-Dec-2015
function sort() {
	$('.sortable').sortable();
	$('.handles').sortable({
		handle : 'span'
	});
	$('.connected').sortable({
		connectWith : '.demo'
	});
	$('.exclude').sortable({
		items : ':not(.disabled)'
	});

	var _gaq = _gaq || [];
	_gaq.push([ '_setAccount', 'UA-36251023-1' ]);
	_gaq.push([ '_trackPageview' ]);

	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www')
				+ '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
}
/*******************************************************************************
 * 
 ******************************************************************************/
function setTemplate2() {
	var divContent2 = "<div  class='col-md-12-1' style='margin-top:0px;margin-left:60px'><ol id='ol2' class='connected list left' ondrop='changeClass(event)'>";
	divContent2 = divContent2
			+ "<lh draggable='true'><font color='#556B2F'><b>Drop Here..........!<b></font></lh></ol></div>";

	$("#rightDiv").html(divContent2);
}
/*******************************************************************************
 * @Bilal
 * @date 26_May_2017 this method is used to delete the records with id
 ******************************************************************************/
function deleteSubService(subId) {
	SubServiceTemplate(response);
	var r = confirm("Are You Sure You Want To Delete Sub Service?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subservice/deleteSubService",
			data : {
				"subId" : subId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				refreshConfig();
				fetchSubServiceList();
			}

		});
	}
}
/*******************************************************************************
 * @author Bilal
 * @date 26_May_2017
 * @code for fetching all Service
 ******************************************************************************/
function fetchAllService() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceList",
		// chargesMasterList
		success : function(response) {
			multiSelect(response);

		}
	});

}

/*******************************************************************************
 * *
 * 
 * @author : Bilal
 * @date : 26_May_2017
 * @reason : Fetching list of Sub Service by id
 ******************************************************************************/
function fetchSubServiceIsCat(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceIsCat",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {

			setTemplateForServices(response);
			setTemplateForBedView(response);
		}
	});
}

/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/

// multiselect ui
function multiSelect(response) {

	var mstHallId = $("#mstHallId").val();

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		if (response.listService[i].serviceId == mstHallId) {

			list = list + '<option value="'
					+ (response.listService[i].serviceId) + '">'
					+ (response.listService[i].serviceName) + '</option>';
		}
	}

	$("#listmstr_select").html(list);
}

// Touheed for multiselect Data
function setDyanamicDiv(setDiv, getDiv) {
	// listmstr_select

	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();
	var htm = "";

	if (count == 0) {
		htm = '<li class="select2-search-choice" id="liItme'
				+ count
				+ '">'
				+ '<div>Hall Type : '
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="li' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';
	} else {

		htm = '<li class="select2-search-choice" id="liItme'
				+ count
				+ '">'
				+ '<div>Ward Type : '
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="li' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';
	}

	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#li" + 0).val();
	var selfId = 0;
	if (liSize == 0) {

		fetchAllService();// for masters
	} else {
		/*
		 * var masterid = $("#li" + 0).val(); var selfId = 0;
		 */
		// alert(liSize);
		if (liSize == 1) {
			$(".select2-chosen").html("--- Select Ward Type ---"); // added by
			// vinod
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			$(".select2-chosen").html("--- Select Ward ---"); // added by
			// vinod
			fetchSubServiceById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
	}// now inside submaster catagories

}

function removeInpuntFild(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItme' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#li" + 0).val();
	var selfId = 0;
	if (liSize == 0) {
		fetchAllService();

	} else {
		/*
		 * var masterid = $("#li" + 0).val(); var selfId = 0;
		 */
		// alert(liSize);
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
	}
}

// fo slave demo
// multiselect ui
function multiSelectSlave(response) {

	var list = "<option>--- Select Ward Type ----</option>";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		list = list + '<option value="' + (response.lstSubService[i].subId)
				+ '">' + (response.lstSubService[i].categoryName) + '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select").html(list);
}
/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/
/*******************************************************************************
 * @author : Bilal
 * @date : 26_May_2017
 * @reason : Fetching list of Sub Service by id
 ******************************************************************************/
function fetchSubServiceById(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			multiSelectSlave(response);
			fetchSubServiceIsCat(masterId, selfId);
		}
	});
}
/*******************************************************************************
 * @author : Bilal
 * @date : 26_May_2017
 * @reason : for Fetching id of Service name
 ******************************************************************************/

function selectSubService() {
	// selectserviceName
	var masterId = $('#profileList').val();
	$('#ChargesIdHidden').val(masterId);

	var selfId = 0;
	// var subId = 2; , subId
	fetchSubServiceById(masterId, selfId);
}

// Add all div
function addAll() {
	var h1 = "";
	var h2 = "";
	$("#ol1").each(function() {
		h1 = h1 + $(this).html();
	});
	$("#ol2").each(function() {
		h2 = h2 + $(this).html();
	});
	$("#ol1").html(h2);
	$("#ol2").html(h1);
	$("#ol2 li input").each(function() {

		var curClass = $(this).attr('class');
		// alert(curClass);
		// subClass chargesClass
		if (curClass == "chargesClass") {
			$(this).addClass("chargesClassDrop");
			$(this).removeClass("chargesClass");
		}
		if (curClass == "subClass") {
			$(this).addClass("subClassDrop");
			$(this).removeClass("subClass");
		}
		// $(this).addClass(changeClass);
		// $(this).removeClass(curClass);
	});
	sort();
}

function fetchoneByone() {

	var configurationDetails = {
		lstConfigurService : []
	};
	var cmt = 1;
	$("#ol2 li").each(function() {

		var ch = $("input[name=charges" + cmt + "]").val();
		var sub = $("input[name=subbId" + cmt + "]").val();
		configurationDetails.lstConfigurService.push({
			charges : ch,
			id : sub
		});
		cmt++;

	});

	alert(configurationDetails);
	console.log(configurationDetails);

}

/*******************************************************************************
 * Touheed's Plugin for Multi select for charges
 ******************************************************************************/

/*
 * $(document).ready(function() { App.setPage("wizards_validations"); // Set
 * current page App.init(); // Initialise plugins and elements
 * FormWizard.init(); });
 */
// multiselect ui
function multiSelectForCharges(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select_service").html(list);
}

// Touheed for multiselect Data
function setDyanamicDivForCharges(setDiv, getDiv) {
	// listmstr_select

	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItmes'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lis' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster();// for masters
	} else {
		var masterid = $("#lis" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} else {
			selfId = $("#lis" + (liSize - 1)).val();
			fetchChargesSlaveListById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}// now inside submaster catagories

}

function removeInpuntFildForCharges(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmes' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster();
	} else {
		var masterid = $("#lis" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} else {
			selfId = $("#lis" + (liSize - 1)).val();
			fetchChargesSlaveListById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}
}

// fo slave demo
// multiselect ui
function multiSelectSlaveForCharges(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select_service").html(list);
}
/*******************************************************************************
 * Touheed's Plugin for Multi select ForCharges
 ******************************************************************************/
/*******************************************************************************
 * @author Bilal
 * @date 23_05_2017
 * @code for fetching all charges master
 ******************************************************************************/
function getAllChargesMaster() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/charges/chargesMasterList",

		success : function(response) {
			multiSelectForCharges(response);
		}
	});

}
/*******************************************************************************
 * @author : Bilal
 * @date : 24-May-2017
 * @reason : Fetching list of Charges slave by id
 ******************************************************************************/
function fetchChargesSlaveListById(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getChragesSlaveById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		/* "slaveId" : parseInt(slaveId) */

		},
		success : function(response) {
			multiSelectSlaveForCharges(response);
		}
	});
}
/** *** */
function totalAmount() {
	var total = 0;
	var cmt = 1;

	// $("#ol2 li").each(function() {

	$(".chargesClassDrop").each(function() {
		// alert($(this).val());
		var charges = parseFloat($(this).val());
		total = total + charges;
		// alert(total);
	});
	/*
	 * $(this).val(); var charges = parseFloat($("input[name=charges" + cmt +
	 * "]").val()); // var serviceId = $("input[name=subbId"+cmt+"]").val();
	 * 
	 * total = total + charges;
	 * 
	 * $("input[name=charges" + cmt + "]").val(charges); cmt++;
	 */

	// });
	$("#totalcharges").val(total);
}

function changeClass(event) {

	$("#ol2 li input").each(function() {

		var curClass = $(this).attr('class');
		// alert(curClass);
		// subClass chargesClass
		if (curClass == "chargesClass") {
			$(this).removeClass("chargesClass");
			$(this).addClass("chargesClassDrop");

		}
		if (curClass == "subClass") {
			$(this).addClass("subClassDrop");
			$(this).removeClass("subClass");
		}
		// $(this).addClass(changeClass);
		// $(this).removeClass(curClass);
	});
	/*
	 * $("."+curClass).addClass(changeClass);
	 * $("."+curClass).removeClass(curClass);
	 */

}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 27-Sept-2016
 * @codeFor : Fetching diagnosis Hisab
 ******************************************************************************/
/*
 * function setTemplateForBedView(res){
 * 
 * var bedTemp="<div class='row'>";
 * 
 * console.log(res);
 * 
 * for ( var i = 0; i < res.lstSubService.length; i++) {
 * 
 * bedTemp=bedTemp + '<div class="col-md-3" style="width: 150px; height: 100px;
 * background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177,
 * 77);margin:10px"> ' + '<div style="height: 17px; width: 148px;"></div>' + '<div
 * style="height: 16px; width: 148px;"></div>' + '<div style="height: 16px;
 * width: 148px;"></div>' + '<div style="height: 16px; width: 148px;"></div>' + '<div
 * style="height: 33px; width: 148px;">' + '<img width="35px" height="20px"
 * onclick="swapImages(this,'+res.lstSubService[i].subId+',15)"
 * src="images/bedEmpty1.png">' + '<label style="color: white; font-size: 10px;
 * width: 75px" class="TextFont">Bed Name: '+res.lstSubService[i].categoryName+'</label></div></div>'; }
 * bedTemp=bedTemp+"</div>"; $("#allbeds").html(bedTemp); }
 */

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 27-Sept-2016
 * @codeFor : Fetching diagnosis Hisab
 ******************************************************************************/
function setTemplateForBedView(res) {

	var bedTemp = "<div class='row'>";

	for ( var i = 0; i < res.lstSubService.length; i++) {

		if (res.lstSubService[i].status == 1) {

			bedTemp = bedTemp
					+ '<div id="bbed100" class="col-md-3" style="width: 150px; height: 100px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198);margin:10px"> '
					+ '<label style="color: white; height: 15px; width: 105px; margin-bottom: 0px;" class="TextFont">Mr. Arvind  Paiyal</label> '
					+ '<label style="float: right; height: 15px; margin-bottom: 0px;"> '
					+ '<img width="13px" height="13px" style="border: 2px solid white;" src="images/Red_dot.png"></label> '
					+ '<label style="width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;" 10px;="" font-size:="" class="TextFont">RM16170000000733</label> '
					+ '<label style="width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px" class="TextFont">2017-05-05</label> '
					+ '<label style="color: white; height: 15px; width: 148px; margin-bottom: 0px;" class="TextFont">BAJAJ</label> '
					+ '<div style="margin-top: 0px; height: 33px; width: 148px;"> '
					+ '<img width="30px" height="25px" onclick="" src="images/bedOcc1.png"> '
					+ '<label style="color: white;" class="TextFont">Bed Name: '
					+ res.lstSubService[i].categoryName + '</label> '
					+ '</div></div>';

			/*
			 * bedTemp=bedTemp + '<div class="col-md-3" style="width: 150px;
			 * height: 100px; background-color: rgb(34, 177, 77); border: 1px
			 * solid rgb(34, 177, 77);margin:10px"> ' + '<div style="height:
			 * 17px; width: 148px;"></div>' + '<div style="height: 16px;
			 * width: 148px;"></div>' + '<div style="height: 16px; width:
			 * 148px;"></div>' + '<div style="height: 16px; width: 148px;"></div>' + '<div
			 * style="height: 33px; width: 148px;">' + '<img width="35px"
			 * height="20px" onclick="swapImages(this,251,15)"
			 * src="images/bedEmpty1.png">' + '<label style="color: white;
			 * font-size: 10px; width: 75px" class="TextFont">Bed Name:
			 * '+res.lstSubService[i].categoryName+'</label></div></div>';
			 */

		} else if (res.lstSubService[i].status == 2) {

			bedTemp = bedTemp
					+ '<div class="col-md-3" style="width: 150px; height: 100px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);margin:10px"> '
					+ '<div style="height: 17px; width: 148px;"></div>'
					+ '<div style="height: 16px; width: 148px;"></div>'
					+ '<div style="height: 16px; width: 148px;"></div>'
					+ '<div style="height: 16px; width: 148px;"></div>'
					+ '<div style="height: 33px; width: 148px;">'
					+ '<img width="35px" height="20px" onclick="swapImages(this,'
					+ res.lstSubService[i].subId
					+ ',15)" src="images/bedEmpty1.png">'
					+ '<label style="color: white; font-size: 10px; width: 75px" class="TextFont">Bed Name: '
					+ res.lstSubService[i].categoryName
					+ '</label></div></div>';

		} else {

			bedTemp = bedTemp
					+ '<div class="col-md-3" style="width: 150px; height: 100px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);margin:10px"> '
					+ '<div style="height: 17px; width: 148px;"></div>'
					+ '<div style="height: 16px; width: 148px;"></div>'
					+ '<div style="height: 16px; width: 148px;"></div>'
					+ '<div style="height: 16px; width: 148px;"></div>'
					+ '<div style="height: 33px; width: 148px;">'
					+ '<img width="35px" height="20px" onclick="swapImages(this,'
					+ res.lstSubService[i].subId
					+ ',15)" src="images/bedEmpty1.png">'
					+ '<label style="color: white; font-size: 10px; width: 75px" class="TextFont">Bed Name: '
					+ res.lstSubService[i].categoryName
					+ '</label></div></div>';

		}
	}
	bedTemp = bedTemp + "</div>";
	$("#allbeds").html(bedTemp);
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code Getting Patient Data By Id
 ******************************************************************************/
function getPatientDataByTreatmentId2(treatId) {
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : treatId
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			// setTempPatientRecords(r);
			console.log(r);
			// alert(r); 

			/** ***Added By Sagar***** */
			callFrom = r.listRegTreBillDto[0].chargesMasterSlaveId;
			if (callFrom == null || callFrom == "" || callFrom == undefined
					|| callFrom == 0) {

			} else {
				getSponsorRecords(callFrom);
			}

			/* alert(); */
			//$("#patientId").text(r.listRegTreBillDto[0].patientId);
			$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
			$("#age").text(r.listRegTreBillDto[0].age);
			$("#patientName").text(r.listRegTreBillDto[0].patientName);
			$("#billNo").text(r.listRegTreBillDto[0].billId);
			$("#billno1").text(r.listRegTreBillDto[0].invoiceCount);
			
			/*
			 * $("#patientName").text(r.ListRegTreBillDto[0].fName + " " +
			 * r.ListRegTreBillDto[0].mName + " " +
			 * r.ListRegTreBillDto[0].lName);
			 */
			$("#sex").text(r.listRegTreBillDto[0].gender);
			$("#treatmentId").text(treatId);
			$("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
			/*
			 * $("#ipdNo").text(r.listReg[0].fName);
			 * $("#billCategoty").text(r.listReg[0].fName);
			 * $("#consultingDoctor").text(r.listReg[0].fName);
			 * $("#corporate").text(r.listReg[0].fName);
			 * $("#doa").text(r.listReg[0].fName);
			 * $("#dod").text(r.listReg[0].fName);
			 */

			dept = r.listRegTreBillDto[0].departmentId;
			$("#drid").val(r.listRegTreBillDto[0].doctorId);
			$("#pid").val(r.listRegTreBillDto[0].patientId);

			/* ****Added By Sagar***** */
			if (r.listRegTreBillDto[0].sourceTypeId == 1) {

				$("#billCategoty").text("Sponsor");

			} else {
				$("#billCategoty").text("Self");
				$("#corporate").text("-");
			}

			$("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
			$("#chargesSlaveId").val(
					r.listRegTreBillDto[0].chargesMasterSlaveId);
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 08-June-2017
 * @codeFor : Save Ipd bill details
 ******************************************************************************/
function saveIpdBillDetails() {

	var billId = $("#billNo").val();
	var patientId = $("#patientId").val();
	var treatmentId = $("#treatmentId").val();

	var inputs = [];
	inputs.push("queryType=" + queryType);
	inputs.push("billDetails=" + encodeURIComponent(billDetails));

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
			if (queryType == "insert" && r > 0) {
				alert("Registerd Successfully!!!");
				// alertify.success(r);
			}

			$('#queryType').val("insert");
			window.location = "ehat_billing.jsp?" + "treatmentId=" + r;
		}
	});

}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 05-June-2017
 * @codeFor : Autosuggestion for ipd queue
 ******************************************************************************/
function autoCompTable(response, id) {
	// var qty = id.slice(0, -1); // for dyamic col getting id

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
							&& ui.item.depNm != 'Match') {

						$('#byName').val(ui.item.patientName);
						var nm = ui.item.patientName;
						console.log(nm);
						setAutoCompleteForIpdQueue('byName', 'search');
						$('#byName').val('');
					}
					/*
					 * This function use for Enter keypress search
					 */
					// setAutoCompleteForIpdQueue(id, 'search');
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstIpdQueue.length);
					var result;
					if (!data || data.lstIpdQueue.length === 0
							|| !data.lstIpdQueue
							|| data.lstIpdQueue.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/* 'dn' : 'No', */
							'patientName' : 'Not Found',
							'pId' : 'Found',
						/* 'depNm' : 'Match' */
						} ];
					} else {
						result = data.lstIpdQueue;// Response List for All
						// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 25-June-2017
 * @code :delete IPD Sub-Service
 ******************************************************************************/
function deleteServiceToPatient(billDetailsId) {

	// editOnClickForBed($("#bedServiceId").val());
	var sponsor = $("#chargesSlaveId").val();
	var bedSel = 0;

	if (sponsor > 0) {

		//bedSel = $("#servIdIpdSponsor option:selected").val();// $("#servIdIpdSponsor").val();
		
		var bedSel = $('input[name=opdBillCheckbox]:checked').val();//added and changed by Rohini to delete service from billing.
		bedSelservId = $('input[name=opdBillCheckboxReg]:checked').val();
	} else {

		//bedSel = $("#servId option:selected").val();
		//added and changed by Rohini to delete service from billing. on 09-04-2024
		//bedSelservId = $("#chkOpdBillReg option:selected").val();
		bedSelservId = $('input[name=opdBillCheckboxReg]:checked').val();
		
		var bedSel = $('input[name=opdBillCheckbox]:checked').val();//rrrrr
	}

	if (bedSel == null || bedSel == 0) {

		alert("Select service to delete..");
	}
	else if (bedSelservId == 1 ) {//bedSel == 3

		alert("You can not delete Registration charges...");
	} 
	else if (bedSelservId == 3 ) {//bedSel == 3

		alert("Bed can not be deleted...");
	} else {

		var r = confirm("Are You Sure You Want delete service");
		if (r == true) {

			var labservicelist = [];
			var treatId = $('#treatId').val();
			var deleteType = "Y";
			$('input[name=opdBillCheckbox]:checked').each(function() {

				labservicelist.push(parseInt($(this).val()));
			});

			if (labservicelist.length == 0) {
				alert("Please check at least One Service to delete And Open subservices");
				return false;

			}
			// Added by Lxman.Call for delete test in lab.
			deleteIpdLabTest(labservicelist, treatId, deleteType);

			if (deleteTestSmplColFlg == "Y") {
				alert("Test Sample are collected,You can't cancel or delete this Test.");
				return false;
			}
			// Added by Vikas Godse for Delete Investigation Test From Ipd
			// Billing
			deleteInvTestFromIpdBill(labservicelist, deleteType);
			if (risReportFlag == "Y") {
				alert("Test Report are created,You can't cancel or delete this Test.");
				return false;
			}

			var inputs = [];
			inputs.push("labservicelist=" + encodeURIComponent(labservicelist));
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "POST",
				url : "ehat/doctordesk/deletesIpdSrvDetails",
				data : str + "&reqType=AJAX",
				timeout : 1000 * 60 * 5,
				cache : false,

				success : function(r) {

					// fetchbilldetails();
					getPatientBillAmountIpd(treatId);
					alert(r);
					window.location.reload(true);
				}

			});
		}
	}
}
/*******************************************************************************
 * @Vikas Godse
 * @date 5_March_2018 this method is used to Delete Investigation Test From IPD
 *       Billing
 ******************************************************************************/

function deleteInvTestFromIpdBill(labservicelist, deleteType) {

	var callform = "IpdBill";
	var deleteType = "N";
	var billDetailIds = labservicelist.join(',');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/cancelInvestigationTest",
		data : {

			"billDetId" : billDetailIds,
			"cancleType" : deleteType,
			"callform" : callform,

		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {
			if (r == "0") {
				risReportFlag = "Y";
				return false;
			} else if (r == "-1") {
				alert("Network error...!");
				return false;
			} else if (r == "1") {
				risReportFlag = "N";
			}
		}

	});
}

/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 25-June-2017
 * @code :delete IPD Main Service
 ******************************************************************************/
function deleteServicesToPatient(values) {
	var servId = [];
	var tretId = $('#treatmentId').text();

	$('input[name=opdBillCheckboxReg]:checked').each(function() {

		servId.push(parseInt($(this).val()));
	});

	var inputs = [];
	inputs.push("servId=" + encodeURIComponent(servId));
	inputs.push("tretId=" + encodeURIComponent(tretId));
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/deleteIpdServices",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {
			// fetchbilldetails();
			getPatientBillAmountIpd(tretId);
			alert(r);
			window.location.reload(true);
		}
	});
}

function cancleOnClick(billDetailsId, callFrom) {

	var cancleType = "N";
	
	var opType = $('#btnCancle' + billDetailsId).val();
	var msg="";
	
	if(opType=="N"){
		
		msg = "Are you sure ! You Want To Cancel Service";
	}else{
		
		msg = "Are you sure ! You Want To Revert Service";
	}
	var r = confirm(msg);
	if (r == true) {
	
	// Added by Laxman.
	cancelIpdLabTest(billDetailsId, callFrom);
	if (cancelTestSmplColFlag == "Y") {
		alert("Test Sample are collected.You can't cancel or delete this Test.");
		return false;
	}

	// Added by Vikas Godse
	cancelRisTest(billDetailsId, callFrom);

	if (risReportFlag == "Y") {
		alert("Test Report are created,You can't cancel or delete this Test.");
		return false;
	}

	// GET selected value
	var a = $('#btnCancle' + billDetailsId).val();
	if (a == "N") {
		cancleType = "Y";
		$('#tr' + billDetailsId).attr("disabled", true);
	}

	if (callFrom != "uncheck") {

		if (a == "N") {
			//alert("Service Successfully Canceled");
		} else {
			//alert("Service Successfully Revert");
		}

	}

	// Added Rohini Ambhore
	var idremarkcanceltest =$('#idremarkcanceltestipd').val();		// added Rohini for remark cancel test			
	if(opType=="N" && (idremarkcanceltest == "0" || idremarkcanceltest == 0  || idremarkcanceltest =="undefined" || idremarkcanceltest ==undefined)){
		
		$('#billDetailsId').val(billDetailsId);
		$('#callFrom').val(callFrom);
		setRemarkpopupCancelTestipd();
	    return false;
	}
	
	var remarkcanceltest = $('#remarkcanceltestipd').val();
    
    //  alert('.......remarkcanceltestremarkcanceltest...........'+remarkcanceltest);

      if(opType=="N"){
		if(remarkcanceltest == '' || remarkcanceltest == undefined || remarkcanceltest == null){
			alert('Please fill remark to cancel service !!!!');
			$('#remarkcanceltestipd').focus();
			return false;
		  }
      }
	var servId = $('#bdId' + billDetailsId).text();
	var treatmentId = $('#treatmentId').text();

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/cancleIpdServices",
		data : {

			"servId" : servId,
			"tretId" : treatmentId,
			cancleType : cancleType,
			remarkcanceltest : remarkcanceltest,

		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {
            alert(r)
			// fetchbilldetails();
			getPatientBillAmountIpd(treatmentId, servId);

			window.location.reload(true);

		}

	});
	// $('#cancleType').val("N");
  }
}

/*******************************************************************************
 * @Vikas Godse
 * @date 25_April_2018 this method is used to cancel Investigation Test From IPD
 *       Billing
 ******************************************************************************/
function cancelRisTest(billDetailsId, callform) {

	var callform = "IpdBill";
	var a = $('#btnCancle' + billDetailsId).val();
	var cancleType = "Y";
	var billDetId = $('#bdId' + billDetailsId).text();

	if (a == "N") {
		cancleType = "N";
		$('#tr' + billDetailsId).attr("disabled", true);
	}

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/cancelInvestigationTest",
		data : {

			"billDetId" : billDetId,
			"cancleType" : cancleType,
			"callform" : callform,

		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {

			if (r == "0") {
				risReportFlag = "Y";
				return false;
			} else if (r == "-1") {
				alert("Network error...!");
				return false;
			} else if (r == "1") {
				risReportFlag = "N";
			}
		}

	});
}

/*-------------------------------------------END GENERAL BILL----------------------------------------------------*/

/*-------------------------------------------START CGHS BILL----------------------------------------------------*/

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 10_June_2017
 * @Code Getting amount
 ******************************************************************************/

function calculatePerticularTotal2() {
	var rateManual = $("#rateManual").val();
	var qtyManual = $("#qtyManual").val();
	var concessionManual = $("#concessionManual").val();
	if (qtyManual == "") {
		$("#qtyManual").val(1);
	}
	if (rateManual == "") {
		$("#rateManual").val(0);
	}
	if (payManual == "") {
		$("#rateManual").val(0);
	}
	if (concessionManual == "") {
		$("#concessionManual").val(0);
	}
	if (concessionManual > (rateManual * qtyManual)) {
		var quantityManual = $("#qtyManual").val();
		if (quantityManual == 0) {
			// alert("Quantity Cannot Be 0");
			$("#concessionManual").val(0);
			calculatePerticularTotal2();
			return false;
		} else {
			alert("Discount Cannot Be Greater Than " + (rate * qty));
			$("#concessionManual").val(0);
			$("#amountManual").val(rateManual * qtyManual);
			$("#PayManual").val(rateManual * qtyManual);
			return false;
		}
	}
	var amountManual = ((rateManual * qtyManual) - concessionManual);
	$("#amountManual").val(amountManual);
	// $("#coPayManual").val(amountManual);
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();

	if (sponsorId == 1 && chargesSlaveId > 0) {

		$("#payManual").val(amountManual);

	} else {

		$("#coPayManual").val(amountManual);

	}

	var SpecialDisc1 = $("#SpecialDisc").val();
	if (SpecialDisc1 == 0 && ($("#coPayManual").val()) == 0) {

		calculatePerticularCoPay2();

	} else {
		calculatePerticularPay2();

	}
}

function calculatePerticularCoPay2() {
	var payManual = $("#payManual").val();
	var amountManual = $("#amountManual").val();
	if (payManual == "" || amountManual == "") {
		return false;
	}

	if (payManual < 0) {
		payManual = 0;
	} else if (isNaN(payManual) == true) {
		payManual = 0;
	}

	var coPayManual = (amountManual - payManual);
	$("#coPayManual").val(coPayManual);
}

function calculatePerticularPay2() {
	var coPayManual = $("#coPayManual").val();
	var amountManual = $("#amountManual").val();
	if (coPayManual == "" || amountManual == "") {
		return false;
	}
	if (coPayManual < 0) {
		coPayManual = 0;
	} else if (isNaN(coPayManual) == true) {
		coPayManual = 0;
	}

	var payManual = (amountManual - coPayManual);
	$("#payManual").val(payManual);
}

// @author : kishr Lokhande @date: 15-June-2017 @reason : Function for use to
// get all services
function getTempInCghs() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/temp/fetchTempList",
		success : function(r) {
			setTempAll(r);
		}
	});

}

// @author : kishr Lokhande @date: 15-June-2017 @reason : Template use to get
// all services
function setTempAll(r) {

	var list = "<option value='0'>select</option>";
	for ( var i = 0; i < r.listTemp.length; i++) {

		list = list + "<option value='" + r.listTemp[i].tempId + "'>"
				+ ((r.listTemp[i].tempName)) + "</option>";
	}
	$("#servIdForCghs").html(list);

}

function getAllTempManual() {

	jQuery.ajax({
		async : true,
		// type : "POST",
		// url : "ehat/temp/fetchTempList",

		success : function(r) {
			setTemplateForTemp(r);// call template
		}
	});
}

tA = 0;
tAmt = 0;
a = 0;
function setTemplateForTemp(r) {

	var a = $('#editHidden').val();
	// alert(a + " hurrey");
	if (a > 0) {

		var amtRem = parseFloat($('#totalManualRemains').val());
		var amtTot = parseFloat($('#amountManual').val());
		// alert(amtTot );
		if (amtTot <= amtRem) {
			// alert(a + " hurrey inside");
			$('#serM' + a).text($('#perManual').val());

			$('#packM' + a).text($('#packManual').val());// new pack box add

			$('#rateM' + a).text($('#rateManual').val());

			$('#qtyM' + a).text($('#qtyManual').val());

			$('#conM' + a).text($('#concessionManual').val());

			$('#amt' + a).text($('#amountManual').val());

			// $('#payM' + a).text($('#payManual').val());

			// $('#cPayM' + a).text($('#coPayManual').val());

			var z = amtRem - amtTot;
			$("#totalManualRemains").val(z);
			$('#totalManualRemains').attr('readonly', 'true');

		} else {
			alert("amount should be less than remain amount");
			return false;
		}

		$('#perManual').val("");
		$('#packManual').val("");
		$('#rateManual').val(0);
		$('#qtyManual').val(1);
		$('#concessionManual').val(0);
		$('#amountManual').val(0);
		$('#payManual').val(0);
		$('#coPayManual').val(0);

	} else {

		tA = parseFloat($("#totalAmmt").text());
		var service = $('#perManual').val();
		var packService = $('#packManual').val();
		var dateManual = $('#dateManual').val();
		var rateManual = $('#rateManual').val();
		var qtyManual = $('#qtyManual').val();
		var concessionManual = $('#concessionManual').val();
		var amountManual = parseFloat($('#amountManual').val());
		$('#amountManual').attr('readonly', 'true');
		var payManual = $('#payManual').val();
		var coPayManual = $('#coPayManual').val();

		if (service == "" || service == null) {
			alert("Please enter servicename ");
			return false;
		}

		if (rateManual <= 0) {
			alert("Please Enter Amount");
			return false;
		}

		var counterIpdCghs = $('#counterIpdCghs').val();
		var index = $("#cghsBillManual tr").length;
		index = index + 1;
		if (index == 0 && counterIpdCghs == 0) {
			// alert("HI");
			/*
			 * if(tAmt > 0) { tAmt=0; alert("HI"); }
			 */
			$('#counterIpdCghs').val(1);
			tAmt = tAmt + amountManual;
			if (tAmt <= tA) {
				var masterModuleBody = "";

				masterModuleBody = masterModuleBody
						+

						'<tr id="cghsId'
						+ index
						+ '"><td align="Center" id="inM'
						+ index
						+ '">'
						+ (index)
						+ '</td> <td align="Center" id="serM'
						+ index
						+ '">'
						+ service
						+ '</td><td align="Center" id="packM'
						+ index
						+ '">'
						+ packService
						+ '</td> <td style="display:none;" align="Center" id="dateM'
						+ index
						+ '">'
						+ dateManual
						+ '</td> <td align="Center" id="rateM'
						+ index
						+ '">'
						+ rateManual
						+ '</td> <td align="Center" id="qtyM'
						+ index
						+ '">'
						+ qtyManual
						+ '</td> <td style="display:none;" align="Center" id="conM'
						+ index
						+ '">'
						+ concessionManual
						+ '</td> <td align="Center" id="amt'
						+ index
						+ '">'
						+ amountManual
						+ '</td> <td align="Center" style="display:none" id="payM'
						+ index
						+ '">'
						+ payManual
						+ '</td> <td align="Center" style="display:none" id="cPayM'
						+ index
						+ '">'
						+ coPayManual
						+ '</td> <td align="Center"><i aria-hidden="true" onclick="deleteCghs2('
						+ index
						+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>';

				$("#cghsBillManual").append(masterModuleBody);

				$('#perManual').val("");
				$('#packManual').val("");
				$('#rateManual').val(0);
				$('#qtyManual').val(1);
				$('#concessionManual').val(0);
				$('#amountManual').val(0);
				$('#payManual').val(0);
				$('#coPayManual').val(0);

				// $("#ehatTable").html(masterModuleBody);
			} else {
				var k = tAmt - tA;
				tAmt = tAmt - amountManual;
				alert("amount should be less than Main amount");
				// alert("Total amount should be less than=" +tA+ "and Your
				// account
				// Max is "+ k);
				$('#perManual').val("");
				$('#packManual').val("");
				$('#rateManual').val(0);
				$('#qtyManual').val(1);
				$('#concessionManual').val(0);
				$('#amountManual').val(0);
				$('#payManual').val(0);
				$('#coPayManual').val(0);
			}

			var a = tA - tAmt;
			// alert(a);
			// $('#totalManualRemains').text(a);
			$("#totalManualRemains").val(a);
			$('#totalManualRemains').attr('readonly', 'true');

		} else {

			var TotRemains = $("#totalManualRemains").val();

			if (amountManual <= TotRemains) {
				// alert("hi"+TotRemains);
				var masterModuleBody = "";

				masterModuleBody = masterModuleBody
						+

						'<tr id="cghsId'
						+ index
						+ '"><td align="Center" id="inM'
						+ index
						+ '">'
						+ (index)
						+ '</td> <td align="Center" id="serM'
						+ index
						+ '">'
						+ service
						+ '</td> <td align="Center" id="packM'
						+ index
						+ '">'
						+ packService
						+ '</td> <td style="display:none;" align="Center" id="dateM'
						+ index
						+ '">'
						+ dateManual
						+ '</td> <td align="Center" id="rateM'
						+ index
						+ '">'
						+ rateManual
						+ '</td> <td align="Center" id="qtyM'
						+ index
						+ '">'
						+ qtyManual
						+ '</td> <td style="display:none;" align="Center" id="conM'
						+ index
						+ '">'
						+ concessionManual
						+ '</td> <td align="Center" id="amt'
						+ index
						+ '">'
						+ amountManual
						+ '</td> <td align="Center" style="display:none" id="payM'
						+ index
						+ '">'
						+ payManual
						+ '</td> <td align="Center" style="display:none" id="cPayM'
						+ index
						+ '">'
						+ coPayManual
						+ '</td> <td align="Center"><i aria-hidden="true" onclick="deleteCghs2('
						+ index
						+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>';

				$("#cghsBillManual").append(masterModuleBody);

				// tAmt=TotRemains - amountManual;

				$('#perManual').val("");
				$('#packManual').val("");
				$('#rateManual').val(0);
				$('#qtyManual').val(1);
				$('#concessionManual').val(0);
				$('#amountManual').val(0);
				$('#payManual').val(0);
				$('#coPayManual').val(0);

				var a = TotRemains - amountManual;
				// alert(a);
				// $('#totalManualRemains').text(a);
				$("#totalManualRemains").val(a);
				$('#totalManualRemains').attr('readonly', 'true');
				// $("#ehatTable").html(masterModuleBody);
			} else {
				var k = tAmt - tA;
				tAmt = tAmt - amountManual;
				alert("amount should be less than Main amount");

				// alert("Total amount should be less than=" +tA+ "and Your
				// account
				// Max is "+ k);
				$('#perManual').val("");
				$('#perManual').val("");
				$('#rateManual').val(0);
				$('#qtyManual').val(1);
				$('#concessionManual').val(0);
				$('#amountManual').val(0);
				$('#payManual').val(0);
				$('#coPayManual').val(0);
			}

		}

	}
	$('#amountManual').attr('readonly', 'true');
	$('#amountManualRemains').attr('readonly', 'true');
	$('#editHidden').val(0);
}

function deleteCghs(id) {

	var compAmt = $("#amt" + id).html();

	var totAmt = $("#totalManualRemains").val();

	var totAmttt = Number(totAmt) + Number(compAmt);
	$("#totalManualRemains").val(totAmttt);
	$("#cghsId" + id).remove();

}

tAR = 0;
tAmtR = 0;
i = 0;
function setTemplateForTempRemains() {

	var SerManualRemains = $('#SerManualRemains').val();
	var dateManualRemains = $('#dateManualRemains').val();

	var packManualRemains = $('#packManualRemains').val();
	var rateManualRemains = parseFloat($('#rateManualRemains').val());
	var qtyManualRemains = $('#qtyManualRemains').val();

	var amountManualRemains = parseFloat($('#amountManualRemains').val());
	var payManualRemains = $('#payManualRemains').val();
	var totalManualRemains = $('#totalManualRemains').val();
	$('#totalManualRemains').attr('readonly', 'true');

	var a = $('#editHiddenR').val();
	// alert(a + " hurrey");
	if (a > 0) {
		if (payManualRemains > amountManualRemains) {
			alert("Please Enter Pay less than Amount");
			$("#payManualRemains").val(0);
			return false;
		}
		var amtRem = parseFloat($('#totalManualRemains').val());
		var amtTot = parseFloat($('#amountManualRemains').val());
		// alert(amtTot );
		if (amtTot <= amtRem) {
			// alert(a + " hurrey inside");
			$('#serR' + a).text($('#SerManualRemains').val());
			$('#packR' + a).text($('#packManualRemains').val());
			$('#rateR' + a).text($('#rateManualRemains').val());
			$('#qtyR' + a).text($('#qtyManualRemains').val());
			// $('#conM' + a).text($('#concessionManual').val());
			$('#amtR' + a).text($('#amountManualRemains').val());
			$('#payR' + a).text($('#payManualRemains').val());
			// $('#cPayM' + a).text($('#coPayManual').val());

			var z = parseFloat(Number(amtRem) - Number(amtTot)).toFixed(2);
			$("#totalManualRemains").val(z);
			$('#totalManualRemains').attr('readonly', 'true');

		} else {
			alert("amount should be less than remain amount");
			return false;
		}

		$('#SerManualRemains').val("");
		$('#amountManualRemains').val(0);
		$('#payManualRemains').val(0);

	} else {

		// alert("in remains");

		if (SerManualRemains == "" || SerManualRemains == null) {
			alert("Please enter servicename ");
			return false;
		}

		if (payManualRemains > amountManualRemains) {
			alert("Please Enter Pay less than Amount");
			$("#payManualRemains").val(0);
			return false;
		}

		if (amountManualRemains <= 0 && payManualRemains <= 0) {
			alert("Please Enter Amount");
			return false;
		}

		var tAR = totalManualRemains;
		i = amountManualRemains;
		tAmtR = tAmtR + amountManualRemains;
		// alert("total"+tAmtR);

		var RA = totalManualRemains - i;
		if (RA >= 0) {
			$("#totalManualRemains").val(RA);
		} else {
			tAmtR = tAmtR - amountManualRemains;
			alert("amount should be less than remain amount");
			$("#amountManualRemains").val(0);
			$("#payManualRemains").val(0);
			return false;
		}
		// var a=tAR-tAmtR;
		if (i <= tAR)

		{
			$("#totalManualRemains").val(RA);
			var indexR = $("#cghsBillManualChangeRemains tr").length;
			indexR = indexR + 1;
			var masterModuleBody1 = "";

			masterModuleBody1 = masterModuleBody1
					+ '<tr id="cghsIdR'
					+ indexR
					+ '"><td class="col-md-1 center">'
					+ (indexR)
					+ '</td> <td align="Center" id="serR'
					+ indexR
					+ '">'
					+ SerManualRemains
					+ '</td><td align="Center" id="packR'
					+ indexR
					+ '">'
					+ packManualRemains
					+ '</td><td align="Center" id="rateR'
					+ indexR
					+ '">'
					+ rateManualRemains
					+ '</td><td align="Center" id="qtyR'
					+ indexR
					+ '">'
					+ qtyManualRemains
					+ '</td> <td align="Center" style="display:none;" id="dateR'
					+ indexR
					+ '">'
					+ dateManualRemains
					+ '</td> <td align="Center" id="amtR'
					+ indexR
					+ '">'
					+ amountManualRemains
					+ '</td> <td align="Center" style="display:none" id="payR'
					+ indexR
					+ '">'
					+ payManualRemains
					+ '</td> <td align="Center"><i aria-hidden="true" onclick="deleteManualCghs2('
					+ indexR
					+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td> </tr>';

			$("#cghsBillManualChangeRemains").append(masterModuleBody1);
			$('#SerManualRemains').val("");
			$('#amountManualRemains').val(0);
			$('#payManualRemains').val(0);
			$("#packManualRemains").val("");
			$("#rateManualRemains").val("0");
			$("#qtyManualRemains").val("1");
		} else {
			var kR = tAmtR - tAR;
			tAmtR = tAmtR - amountManualRemains;
			alert("Total amount should be less than=" + tAR
					+ "and Your account Max is " + kR);
			$('#SerManualRemains').val();
			$('#amountManualRemains').val();
			$('#payManualRemains').val();
			$("#packManualRemains").val("");
			$("#rateManualRemains").val("0");
			$("#qtyManualRemains").val("1");
		}
	}
	$('#editHiddenR').val(0);
	$('#amountManual').attr('readonly', 'true');
	$('#amountManualRemains').attr('readonly', 'true');
	crearAllFields();
}
function deleteManualCghs(id) {

	var compAmt = $("#amtR" + id).html();

	var totAmt = $("#totalManualRemains").val();

	var totAmttt = parseFloat(Number(totAmt) + Number(compAmt)).toFixed(2);
	$("#totalManualRemains").val(totAmttt);
	$("#cghsIdR" + id).remove();

}

/*******************************************************************************
 * @author Bilal
 * @date 22-JUN-2017
 * @code For autosuggetion from configuration
 ******************************************************************************/
function setallchargesConfigOnBilling(inputID) {
	var findingNames = $("#" + inputID).val();
	var sugVal = $("#inputAuto").val();
	// if (sugVal != findingNames && findingNames != "") {
	if (sugVal != findingNames) {
		var findingName = $("#" + inputID).val();
		var unit = $("#uId").val();
		var userId = $("#userId").val();
		// var unitlist=listofunit.slice(1);
		var unitlist = "";
		var depdocdeskid = $("#depdocdeskid").val();
		var querytype = "all";
		var serviceid = $('#servIdIpdSponsor').val();
		var sponsorId = parseInt($("#SponsorsourceTypeId").val());
		var chargesSlaveId = parseInt($("#chargesSlaveId").val());
		var hallId = 2;
		var hallSlaveId = 0;
		var treatId = $("#treatId").val();

		if (sponsorId == "" || sponsorId == null || sponsorId == undefined
				|| isNaN(sponsorId)) {
			sponsorId = 0;
		}
		if (chargesSlaveId == "" || chargesSlaveId == null
				|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
			chargesSlaveId = 0;
		}

		if (hallId == "" || hallId == null || hallId == undefined
				|| isNaN(hallId)) {
			hallId = 0;
		}
		if (hallSlaveId == "" || hallSlaveId == null
				|| hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
		}

		if (treatId == "" || treatId == null || treatId == undefined
				|| isNaN(treatId)) {
			treatId = 0;
		}

		/*var inputs = [];
		inputs.push('unit=' + unit);
		inputs.push('findingName=' + findingName);
		inputs.push('unitlist=' + unitlist);
		inputs.push('depdocdeskid=' + depdocdeskid);
		inputs.push('querytype=' + querytype);
		inputs.push('serviceid=' + serviceid);
		inputs.push('sponsorId=' + sponsorId);
		inputs.push('chargesSlaveId=' + chargesSlaveId);
		inputs.push('hallId=' + hallId);
		inputs.push('hallSlaveId=' + hallSlaveId);
		inputs.push('treatId=' + treatId);*/
		
		var inputs = [];
		inputs.push('unitid=' + unit);
		inputs.push('userid=' + userId);
		inputs.push('categoryName=' + findingName);
		inputs.push('unitlist=' + unitlist);
		inputs.push('depdocdeskid=' + depdocdeskid);
		inputs.push('querytype=' + querytype);
		inputs.push('serviceid=' + serviceid);
		inputs.push('dept_id=2');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "ehat/autoallservicestest/getallservicesConf",
			url : "ehat/ipdtestautosuggest/getSponsorTestAutosuggestion",
			success : function(r) {

				autoCompConfigurationBillingIpd(r, inputID);

			}
		});
		$("#inputAuto").val(findingName);
	}
}

/*******************************************************************************
 * @author : Bilal
 * @date : 22-JUN-2017
 * @code :autosuggestion services from configuration and services
 ******************************************************************************/
function autoCompConfigurationBillingIpd(response, id) {

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
	$("#" + id)
			.mcautocomplete(
					{
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ {
							name : 'CategoryName',
							width : '150px',
							valueField : 'categoryName'
						}, {
							name : 'ServiceName',
							width : '100px',
							valueField : 'serviceName'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {

							$("#templateWiseTestFlag").val(ui.item.templateWise);
							// Temporarlly saving sponsor id and charges slave
							// id in hidden
							var sponsoriddefault = $("#SponsorsourceTypeId").val();
							var chargesSlaveIddefault = $("#chargesSlaveId").val();
							$("#sponsorid2").val(sponsoriddefault);
							$("#chargesSlaveId2").val(chargesSlaveIddefault);
							$("#hallId").val(2);
							var isModify = ui.item.isModify;
							if (isModify == "N") {
								$("#rate").prop("disabled", true);
								$("#rateIpdSponsor").prop("disabled", true);
							} else {
								$("#rate").prop("disabled", false);
								$("#rateIpdSponsor").prop("disabled", false);
							}

							var categoryid = ui.item.categoryid;
							$('#categoryidsipd').val(categoryid);
							
							var isCombServLastId = 0;
							if(ui.item.iscombination=="Y")
								isCombServLastId = categoryid;
							
							$('#perticularIpdSponsor').val(ui.item.categoryName);
							// $("#saveBill").removeAttr("disabled");
							$("#subserviceid").val(ui.item.categoryid);
							$("#servicename").val(ui.item.serviceName);
							$("#serviceid").val(ui.item.serviceid);
							// $("#rateIpdSponsor").val(ui.item.categorycharges);

							// getting hall + sponsor charges if not available
							var rategeneralhall = $("#rategeneral").val();

							var b2bCharges = getB2BChargesForIpd(isCombServLastId,categoryid);
							
							if(b2bCharges > 0){
								$("#rateIpdSponsor").val(b2bCharges);
								$("#rateIpdSponsor2").val(b2bCharges);
							}else{
								
								getSponsorTestCharges(isCombServLastId,categoryid);
								var sponsorTestCharges = $("#sponsorTestCharges").val();
								var yearWiseSponsorTestCharges = $("#yearWiseSponsorTestCharges").val();
								var valsponsor = sponsorTestCharges;//getchargesipd();
								
								if (Number(valsponsor) > 0) {
									$("#rateIpdSponsor").val(valsponsor);
									$("#rateIpdSponsor2").val(valsponsor);
								}else{
									
									var yearwisecharges = yearWiseSponsorTestCharges;//getyearwisecharges(categoryid);
									if (Number(yearwisecharges) > 0) {
										$("#rateIpdSponsor").val(yearwisecharges);
										$("#rateIpdSponsor2").val(yearwisecharges);
									} else {
										
										$("#rateIpdSponsor").val(ui.item.categorycharges);
									    $("#rateIpdSponsor2").val(ui.item.categorycharges);
										
										/*getHallWiseTestCharges(isCombServLastId,categoryid);
										var hallWiseTestCharges = $("#hallWiseTestCharges").val();
										if(hallWiseTestCharges > 0){
											 $("#rateIpdSponsor").val(hallWiseTestCharges);
											    $("#rateIpdSponsor2").val(hallWiseTestCharges);
											
										}else{
										   $("#rateIpdSponsor").val(ui.item.categorycharges);
										    $("#rateIpdSponsor2").val(ui.item.categorycharges);
										}*/
									}
								}
							}
							/*else {

								// then sponsor wise charges if not available
								$("#hallId").val(0);
								var valsponsor2 = getchargesipd();
								var rategeneralhall2 = $("#rategeneral").val();

								if (valsponsor2 > 0) {
									$("#rateIpdSponsor").val(valsponsor2);
									$("#rateIpdSponsor2").val(valsponsor2);
								} else {// then hall wise charges if not
										// available
									$("#SponsorsourceTypeId").val(0);
									$("#chargesSlaveId").val(0);
									$("#hallId").val(2);
									var valsponsor3 = getchargesipd();
									var rategeneralhall3 = $("#rategeneral")
											.val();

									if (valsponsor3 > 0) {
										$("#rateIpdSponsor").val(valsponsor3);
										$("#rateIpdSponsor2").val(valsponsor3);
									} else {// then default charges of any
											// service

										var yearwisecharges = getyearwisecharges(categoryid);
										if (yearwisecharges > 0) {
											$("#rateIpdSponsor").val(
													yearwisecharges);
											$("#rateIpdSponsor2").val(
													yearwisecharges);
										} else {
											$("#rateIpdSponsor").val(
													ui.item.categorycharges);
											$("#rateIpdSponsor2").val(
													ui.item.categorycharges);
										}

									}

								}

							}*/
							$("#servIdIpdSponsor").val(ui.item.serviceid);
							$("#servIdIpdSponsor").select2('val',ui.item.serviceid);
							$("#defchargesfromConfIpd").val(ui.item.configcharges);
							$("#iscombinationsponsorIpd").val(ui.item.iscombination);

							var sponsorid2 = $("#sponsorid2").val();
							var chargesSlaveId2 = $("#chargesSlaveId2").val();

							$("#hallId").val(2);
							$("#SponsorsourceTypeId").val(sponsorid2);
							$("#chargesSlaveId").val(chargesSlaveId2);

							// @auhtor-tk @date - 05-feb-2018 @reason open
							// doctor list after selecting service name
							$('#doctorNameIpdSponsor').select2('open');
							//$('#specialityIdSponsor').select2('open');	//by sandip

							calculatePerticularTotalIpdSponsor();
							calculateEmrCheIpd('sponsor');
							// Sanjay Kumar Shah
							if ($("#serviceid").val() == 12) {
								$("#sendToRisSponsor").prop("checked", true);
							} else {
								$("#sendToRisSponsor").prop("checked", false);
							}

							// For Consulting and Visiting.
							if ($("#serviceid").val() == 5) {
								document.getElementById("qtyIpdSponsor").readOnly = true;
							} else {
								document.getElementById("qtyIpdSponsor").readOnly = false;
							}
							
							if(ui.item.iscombination == "Y"){
								setPackageBarcodePopup(ui.item.serviceid, ui.item.categoryid);
							///}else if(isPkg == 'N'){
							}else{
								
								if(ui.item.serviceid == 11){
									
										getPathologyPreDetails(ui.item.serviceid,ui.item.categoryid);
									
									
								}/*else{
									
									var isDuplicate = setCollectionCharges(ui.item.serviceid, ui.item.categoryid);
									if(isDuplicate > 0){
										alert("Test/Profile Already Added");
										clearAllFieldsOfOpd();
										return false;
									}
								}*/							
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
							if (!data || data.lstService.length === 0
									|| !data.lstService
									|| data.lstService.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'categoryName' : 'NO',
									'serviceName' : 'Match',
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstService;// Response List for
								// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");

						}
					});
}

/*-------------------------------------------------------*/
/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 25-June-2017
 * @code :autosuggestion Temp Master
 ******************************************************************************/
function setallTempAutocompleteOnIpdBilling(inputID) {
	var listofunit = [];
	var resultData = [];
	var findingName = $("#" + inputID).val();
	// var unit = $("#uId").val();
	// var unitlist=listofunit.slice(1);
	// var unitlist="";
	// var depdocdeskid = $("#depdocdeskid").val();

	var inputs = [];
	// inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	// inputs.push('unitlist=' + unitlist);
	// inputs.push('depdocdeskid=' + depdocdeskid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/temp/fetchTempList",

		success : function(r) {
			/*
			 * alert(r.lstSubService[0].categoryName);
			 */
			autoCompDoctorDeskOnIpdBilling(r, inputID);

		}
	});
}

/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 25-June-2017
 * @code :autosuggestion Temp
 ******************************************************************************/
function autoCompDoctorDeskOnIpdBilling(response, id) {

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
					name : 'ServiceName',
					width : '100px',
					valueField : 'tempName'
				}, {
					name : 'CodeName',
					width : '90px',
					valueField : 'tempCode'
				} ],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);

					$('#perManual').val(ui.item.tempName);
					$('#packManual').val(ui.item.tempCode);
					/*
					 * $("#subservicesname").val(ui.item.categoryName);
					 * $("#subserviceid").val(ui.item.categoryid);
					 * $("#servicename").val(ui.item.serviceName);
					 * $("#serviceid" ).val(ui.item.serviceid); $("#rate"
					 * ).val(ui.item.categorycharges); $("#concession"
					 * ).val(ui.item.concession); $("#amount"
					 * ).val(ui.item.amount); $("#servId"
					 * ).val(ui.item.serviceid); calculatePerticularTotal1();
					 */

					return false;

				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.listTemp.length);
					var result;
					if (!data || data.listTemp.length === 0 || !data.listTemp
							|| data.listTemp.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/* 'dn' : 'No', */
							'categoryName' : 'NO',
							'serviceName' : 'Match',
						/* 'depNm' : 'Match' */
						} ];
					} else {
						result = data.listTemp;// Response List for All
						// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");

				}
			});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 16-June-2017
 * @codeFor : Save ehat bill details
 ******************************************************************************/
function saveBillDetailsIpd() {

	var payNowConf = parseFloat($("#payNow").val());

	var r = confirm("Are You Sure You Want To Pay Amount :" + payNowConf);
	if (r == true) {

		var doctorId = $("#drid").val();
		var unitId = parseInt($("#unitId").val());
		var userId = parseInt($("#userId").val());
		var patientId = parseInt($("#patientId").text());
		var billNo = 0;
		var refDocId = 0; // parseInt($("#refDocId").val());
		var treatmentId = 0;
		var pendingFlag = $("#pendingFlag").val();
		var sourceCatId = 0;
		var sponsorCatId = 0;

		if (pendingFlag == "Y") {

			billNo = $("#pendingBillId").val();
			treatmentId = $("#pendingTreatId").val();
			sourceCatId = 0;
			sponsorCatId = 0;

		} else {

			treatmentId = parseInt($("#treatmentId").text());
			billNo = parseInt($("#billNo").text());
			sourceCatId = $("#SponsorsourceTypeId").val();
			sponsorCatId = $("#chargesSlaveId").val();
		}

		// var treatmentId = parseInt($("#treatmentId").text());
		var regBillId = $("#regBillId").val();
		var payable = $("#grandTotal").html(); // parseFloat($("#payable").val());
		var discount = 0;
		var payNow = parseFloat($("#payNow").val());
		var payMode = $("#payMode").val();
		var batchNo = "";
		var bnumber = "";
		var bName = "";
		// var creditFlag = $("#creditFlag").val();
		var againstId = $("#recId").val();

		var remark = $("#txtDiscRemk").val();

		callFrom = $("#callFromForSave").val();
		var receiptOf = $("#receiptOf").val();

		var billSettled = "N";
		
		if(payMode == 0){
			
			alert("Please select payment mode");
			return false;
		}

		if ($('input[name=outstandingCheckbox]').is(":checked")) {

			billSettled = "Y";
		}

		var paidByCashFlag = $("#paidByCashFlag").val();
		var paidByCashServices = $("#paidByCashServices").val();

		if (paidByCashFlag == "N") {

			if (sponsorCatId > 0) {

				if (receiptOf != "IpdSponsor") {

					alert("Please pay amount from sponsor tab");
					return false;
				}
			}
		}

		var multiPayDetails = {
			listMultiBillReceiptMaster : []
		};

		if (payMode == 2 || payMode == 3) {

			bnumber = $("#batchnumber").val();
			bName = $("#bankID").val();
			batchNo = $("#newBatchNumber").val();
		} else if (payMode == 4) {

			var advance = $("#advancePaid").val();

			if (advance <= 0) {

				alert("Common advance not given by patient");
				$("#payNow").val(0);
				return false;
			} else if (payNow > advance) {

				alert("Pay less or exact amount of common advance");
				$("#payNow").val(0);
				return false;
			}
		} else if (payMode == -1) {

			/*
			 * var cashAmt=$("#cashAmt").val(); if(cashAmt>0){
			 * 
			 * setReceiptList(multiPayDetails,1,0,0,cashAmt); }
			 * 
			 * var bankIdCredit=$("#bankIdCredit").val(); var
			 * creditBNum=$("#creditBNum").val(); var
			 * creditAmt=$("#creditAmt").val(); if(creditAmt>0){
			 * 
			 * setReceiptList(multiPayDetails,2,bankIdCredit,creditBNum,creditAmt); }
			 * 
			 * var bankIdCheque=$("#bankIdCheque").val(); var
			 * chequeBNum=$("#chequeBNum").val(); var
			 * chequeAmt=$("#chequeAmt").val(); if(chequeAmt>0){
			 * 
			 * setReceiptList(multiPayDetails,3,bankIdCheque,chequeBNum,chequeAmt); }
			 * 
			 * var bankIdRtgs=$("#bankIdRtgs").val(); var
			 * rtgsBNum=$("#rtgsBNum").val(); var rtgsAmt=$("#rtgsAmt").val();
			 * if(rtgsAmt>0){
			 * 
			 * setReceiptList(multiPayDetails,4,bankIdRtgs,rtgsBNum,rtgsAmt); }
			 */

			var rows = $('#multiPayTable tbody tr.multiPayClass').length;
			for ( var i = 1; i <= rows; i++) {

				var payModePop = $("#payMode" + i).val();
				var bankId = $("#bankID" + i).val();
				var bNum = $("#txtbankNo" + i).val();
				var accNo = $("#txtaccNo" + i).val();
				var amt = $("#txtAmount" + i).val();
				setReceiptList(multiPayDetails, payModePop, bankId, bNum,
						accNo, amt);
			}

		} else {

			bnumber = 0;
			bName = 0;
			batchNo = 0;
		}

		if (payNow == null || payNow == '' || payNow == 'undefined') {

			alert("Enter valid amount");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}

		var preIpdIdval = $("#preIpdId").val();
		  if (payNow > payable && preIpdIdval=="treatcloseForIpd") {
		  
		  alert("Amount should be less than outstanding");
		  $("#payNow").val(0);
		  $("#payNow").focus();
		  return false;
           } 
		  
		 if (payNow < 0) {

			alert("Amount should be greater than 0");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}

		var servIdsChecked = [];
		var subservIdsChecked = [];
		var subSrvid = 0;
		var actualAmt = 0;
		$('input[id=chkOpdBillReg1]:not(:checked)').each(function() {

			servIdsChecked.push(regBillId);
		});

		$('input[name=opdBillCheckbox]:not(:checked)').each(function() {

			servIdsChecked.push($(this).val());
		});

		$('input[name=opdBillCheckbox]:checked').each(function() {

			servIdsChecked.push($(this).val());
			var bilDetId = parseInt($(this).val());

			if (isNaN(bilDetId)) {
				bilDetId = 0;
			}
			// getting service id
			var serviceId = parseInt($("#sId" + bilDetId).text());

			// Checking whether test is of Investigation type or not
			if (serviceId == 12) {
				// getting sub service id
				subSrvid = parseInt($("#subserviceid" + bilDetId).text());
				// subservIdsChecked.push(subSrvid);
				// getting Actual Amount
				actualAmt = parseInt($("#char" + bilDetId).text());
				var object = {
					"subSrvid" : subSrvid,
					"actualAmt" : actualAmt
				};
				subservIdsChecked.push(object);
			}

		});

		multiPayDetails = JSON.stringify(multiPayDetails);

		var inputs = [];
		inputs.push("treatmentId=" + treatmentId);
		inputs.push("unitId=" + unitId);
		inputs.push("patientId=" + patientId);
		inputs.push("billNo=" + billNo);
		inputs.push("createdBy=" + userId);
		inputs.push("totalAmt=" + payable);
		inputs.push("discount=" + discount);
		inputs.push("totalPaid=" + payNow);
		inputs.push("servIdsChecked=" + servIdsChecked);
		inputs.push("refDocId=" + refDocId);
		inputs.push("payMode=" + payMode);
		inputs.push("bNumber=" + bnumber);
		inputs.push("batchNo=" + batchNo);
		inputs.push("bName=" + bName);
		inputs.push("callFrom=" + callFrom);
		inputs.push("againstId=" + againstId);
		inputs.push("sourceCatId=" + sourceCatId);
		inputs.push("sponsorCatId=" + sponsorCatId);
		inputs.push("multiPayDetails=" + multiPayDetails);
		inputs.push("receiptOf=" + receiptOf);
		inputs.push("billSettled=" + billSettled);
		inputs.push("subservIdsChecked=" + JSON.stringify(subservIdsChecked));
		inputs.push("actualAmt=" + actualAmt);
		inputs.push("remark=" + encodeURIComponent(remark));
		inputs.push("paidByCashFlag=" + paidByCashFlag);
		inputs.push("paidByCashServices=" + paidByCashServices);
		inputs.push("doctorIds=" +doctorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/saveBillDetailsIpd",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				/*
				 * $(".openAllSlaveIpd").trigger('click');
				 * getBillReceiptDetailsIpd('all'); setTotalPaid();
				 */
				// alert(r);
				if (r > 0) {

					resetMultiPopup();
					alertify.success("Receipt generated succesfully");
					receiptBillPrint("receiptIpd", r);
					setIpdBillDetailsDistribute();

				} else if (r == -3) {

					alertify.error("Common Advance not given by patient");
				} else {

					alertify.error("Network Issue");
				}

				// $("payable").val(0);
				/*
				 * $("payNow").val(0); window.location.reload(true);
				 * getBillReceiptDetailsIpd('all');
				 */
				resetAllIpd(receiptOf);
				$("#paidByCashFlag").val('N');
				$("#paidByCashServices").val('0');
			}
		});
	}
};

function setReceiptList(multiPayDetails, payMode, bankName, bNumber, batchNo,
		amt) {

	multiPayDetails.listMultiBillReceiptMaster.push({
		payMode : payMode,
		bName : bankName,
		bNumber : bNumber,
		batchNumber : batchNo,
		totalPaid : amt
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 21-June-2017
 * @codeFor : Get bill receipt master details
 ******************************************************************************/
function getBillReceiptDetailsIpd(callFrom) {

	var treatmentId = $("#treatmentId").text();
	var billId = $("#billNo").text();
	var receiptOf = $("#receiptOf").val();
	var userId = parseInt($("#userId").val());

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"treatmentId" : parseInt(treatmentId),
			"billId" : parseInt(billId),
			"callFrom" : callFrom,
			"receiptOf" : receiptOf,
			"userId" : userId
		},
		url : "ehat/ipdbill/getBillReceiptDetailsIpd",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			if (callFrom == "allForChk") {

				// disableSevicesIpd(r);
			} else {

				// /var len=r.listBillReceiptMaster.length;
				/* if(len>0){ */
				if (callFrom == "deleted") {
					setReceiptTemplateDeletedIpd(r, callFrom);
				} else {

					setReceiptTemplateIpd(r, callFrom);
					// disableSevicesIpd(r);

				}/* } */
			}
		}
	});
};

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 21-June-2017
 * @codeFor : Set receipt master template
 ******************************************************************************/
function setReceiptTemplateIpd(res, callFrom) {

	var prevPaid = 0;
	$("#btnRefund").prop('disabled', 'true');
	$("#trDisc").show();
	/*
	 * if(callFrom=="refundable"){
	 * 
	 * $("#btnPayNow").prop("disabled","true"); $("#trDisc").hide();
	 * 
	 * var result= ' <table class="table table-hover" id="receipts"> ' + '
	 * <thead> ' + ' <tr> ' + ' <th>#</th> ' + ' <th>Receipt Id</th> ' + '
	 * <th>Amount</th> ' + ' <th>Paid</th> ' + ' <th>Discount</th> ' + '
	 * <th>Refund</th> ' + ' <th>Remain</th> ' + ' <th>Date</th> ' + '
	 * <th>Details</th> ' + ' </tr> ' + ' </thead> ' + ' <tbody> ';
	 * 
	 * for(var i=0;i<res.listBillReceiptMaster.length;i++){
	 * 
	 * var billReceiptId = res.listBillReceiptMaster[i].billReceiptId; var
	 * totalAmt=parseFloat(res.listBillReceiptMaster[i].totalAmt).toFixed(2);
	 * var totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);
	 * var refAmt=parseFloat(res.listBillReceiptMaster[i].refundAmt).toFixed(2);
	 * var
	 * totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
	 * var remainAmt=parseFloat(Number(totAmt)-Number(refAmt)).toFixed(2); var
	 * datetime= new
	 * Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
	 * 
	 * //prevPaid=prevPaid+totAmt;
	 * 
	 * result=result + '<tr> ' + ' <td>'+(i+1)+'</td> ' + ' <td>'+billReceiptId+'</td> ' + '
	 * <td>'+totalAmt+'</td> ' + ' <td>'+totAmt+'</td> ' + ' <td>'+totDisc+'</td> ' + '
	 * <td>'+refAmt+'</td> ' + ' <td>'+remainAmt+'</td> ' + ' <td>'+datetime+'</td> ' + '
	 * <td><a href="#recSlave'+i+'"
	 * onclick="setCreditPaybleIpd('+res.listBillReceiptMaster[i].totalRemain+')"
	 * data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i
	 * class="fa fa-chevron-down"></button></i></a> ' + ' <td><button
	 * onclick="hideBillPanel('+billReceiptId+')"><i class="fa fa-plus"></i></button>' + '
	 * <td><button onclick=receiptBillPrint("receiptIpd",'+billReceiptId+')
	 * data-toggle="tooltip" title="Print Receipt" data-placement="left"><i
	 * class="fa fa-print"></i></button> ';
	 * 
	 * if(remainAmt<=0){
	 * 
	 * result=result + ' <button disabled
	 * onclick="setCreditPayble('+remainAmt+','+billReceiptId+',\'refund\')"><i
	 * class="fa fa-credit-card"></i></button> ' }else{
	 * 
	 * result=result + ' <button
	 * onclick="setCreditPayble('+remainAmt+','+billReceiptId+',\'refund\')"><i
	 * class="fa fa-credit-card"></i></button> ' }
	 *  + ' </td>' + '</tr> ';
	 * 
	 * var resultSlave= ' <div class="panel-collapse collapse"
	 * id="recSlave'+i+'" style="height: 0px;">' + ' <div class="panel-body"> ' + '
	 * <table class="table table-hover" id="receiptSlave"> ' + ' <thead> ' + '
	 * <tr> ' + ' <th>#</th> ' + ' <th>Comp Name</th> ' + ' <th>Amount</th> ' + '
	 * <th>Date</th> ' + ' <th>Edit</th> ' + ' <th>Delete</th> ' + ' <th>Chk</th> ' + '
	 * </tr> ' + ' </thead> ' + ' <tbody> ';
	 * 
	 * for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
	 * 
	 * var
	 * billRecSlaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
	 * var
	 * billAmt=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount).toFixed(2);
	 * var
	 * rate=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate).toFixed(2);
	 * var
	 * quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
	 * var
	 * disc=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession).toFixed(2);
	 * var
	 * copay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay).toFixed(2);
	 * var
	 * pay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay).toFixed(2);
	 * var
	 * billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
	 * 
	 * var
	 * serviceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
	 * var
	 * subServiceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].subServiceId;
	 * var doctorId
	 * =res.listBillReceiptMaster[i].listBillReceiptSlave[k].doctorId; var
	 * advanceFlag
	 * =res.listBillReceiptMaster[i].listBillReceiptSlave[k].advanceFlag; var
	 * pfVoucherFlag
	 * =res.listBillReceiptMaster[i].listBillReceiptSlave[k].pfVoucherFlag;
	 * 
	 * var billAmt2=billAmt-disc;
	 * 
	 * resultSlave = resultSlave + '<tr> ' + ' <td>'+(k+1)+'</td> ' + '
	 * <td id="compNameIPD'+billRecSlaveId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> ' + '
	 * <td id="finalBillAmt'+billRecSlaveId+'">'+billAmt2+'</td> ' + '
	 * <td id="datetimeIPD'+billRecSlaveId+'">'+datetime+'</td> '; if
	 * (advanceFlag == "N" && pfVoucherFlag == "N") { resultSlave = resultSlave+ + '
	 * <td><button class="btn btn-xs btn-success editUserAcce SlaveBtn"
	 * value="EDIT"
	 * onclick="editOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
	 * id="btnEdit" class="fa fa-edit" value="EDIT"></i></button></td> ' + '
	 * <td><button class="btn btn-xs btn-success deleteUserAcce SlaveBtn"
	 * value="DELETE"
	 * onclick="deleteOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
	 * id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
	 * 
	 * }else{ resultSlave = resultSlave+ + ' <td><button disabled class="btn
	 * btn-xs btn-success editUserAcce SlaveBtn" value="EDIT"
	 * onclick="editOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
	 * id="btnEdit" class="fa fa-edit" value="EDIT"></i></button></td> ' + '
	 * <td><button disabled class="btn btn-xs btn-success deleteUserAcce
	 * SlaveBtn" value="DELETE"
	 * onclick="deleteOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
	 * id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
	 *  }
	 * 
	 * resultSlave = resultSlave+ ' <td><input type="checkbox"
	 * class="slaveNotAddedRefund chkRfndSlave'+recId+'" name="refundRd"
	 * value="'+billAmt+'" id="refundChk'+billDetailsId+'"
	 * onclick="setSlaveRefundAmt('+billDetailsId+')"></td> '
	 *  + ' <td ><input type="hidden" id="billAmtIPD'+billRecSlaveId+'"
	 * value="'+billAmt+'"></td> ' + ' <td ><input type="hidden"
	 * id="rateOfReceipt'+billRecSlaveId+'" value="'+rate+'"></td> ' + ' <td ><input
	 * type="hidden" id="quan'+billRecSlaveId+'" value="'+quantity+'"></td> ' + '
	 * <td ><input type="hidden" id="disc'+billRecSlaveId+'" value="'+disc+'"></td> ' + '
	 * <td ><input type="hidden" id="copay'+billRecSlaveId+'"
	 * value="'+copay+'"></td> ' + ' <td ><input type="hidden"
	 * id="pay'+billRecSlaveId+'" value="'+pay+'"></td> '
	 *  + ' <td ><input type="hidden" id="sId'+billRecSlaveId+'"
	 * value="'+serviceId+'"></td> ' + ' <td ><input type="hidden"
	 * id="subsId'+billDetailsId+'" value="'+subServiceId+'"></td> ' + ' <td ><input
	 * type="hidden" id="doctorId'+billDetailsId+'" value="'+doctorId+'"></td> '
	 *  + '</tr>'; }
	 * 
	 * resultSlave=resultSlave + ' </tbody></table></div></div> ';
	 * 
	 * result=result +resultSlave;
	 *  }
	 * 
	 * result=result + ' </tbody> ' + '</table> '; }else{
	 */

	$("#btnPayNow").removeAttr('disabled');

	var result = ' <table class="table table-hover" id="receipts"> '
			+ ' <thead> ' + '		<tr> ' + '			<th>#</th> '
			+ '			<th>Receipt Id</th> ' + '			<th>Amount</th> '
			+ '			<th>Paid</th> ' + '			<th>Discount</th> '
			+ '			<th>Remain</th> ' + '			<th>Date</th> '
			+ '			<th>Details</th> ' + '		</tr> ' + '	</thead> ' + '	<tbody> ';

	for ( var i = 0; i < res.listBillReceiptMaster.length; i++) {

		var billReceiptId = res.listBillReceiptMaster[i].billReceiptId;
		var totalAmt = parseFloat(res.listBillReceiptMaster[i].totalAmt)
				.toFixed(2);
		var totAmt = parseFloat(res.listBillReceiptMaster[i].totalPaid)
				.toFixed(2);
		var totDisc = parseFloat(res.listBillReceiptMaster[i].totalDisc)
				.toFixed(2);
		var remainAmt = parseFloat(res.listBillReceiptMaster[i].totalRemain)
				.toFixed(2);
		var datetime = new Date(res.listBillReceiptMaster[i].createdDateTime)
				.toLocaleDateString('en-GB');
		var billSettled = res.listBillReceiptMaster[i].billSettledFlag;
		var receiptCount = res.listBillReceiptMaster[i].receiptCount;
		var paidByCashFlag = res.listBillReceiptMaster[i].paidByCashFlag;

		if (callFrom == "all") {

			prevPaid = Number(prevPaid) + Number(totAmt);
			$("#prevPaid").val(prevPaid);
		}

		result = result + '<tr> ' + '	<td>' + (i + 1) + '</td> ' + '	<td>'
				+ receiptCount + '</td> ' + '	<td>' + totalAmt + '</td> '
				+ '	<td>' + totAmt + '<input type="hidden" id="recPaidAmtIpd'+billReceiptId+'" value="'+totAmt+'"></td> ' + '	<td>' + totDisc + '</td> '
				+ '	<td>' + remainAmt + '</td> ' + '	<td>' + datetime
				+ '</td> ';
		/*
		 * + ' <td><a href="#recSlave'+i+'"
		 * onclick="setCreditPaybleIpd('+res.listBillReceiptMaster[i].totalRemain+')"
		 * data-parent="#accordio" data-toggle="collapse"
		 * class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a> '
		 */
		/*
		 * + ' <td><button onclick="hideBillPanel('+billReceiptId+')"><i
		 * class="fa fa-plus"></i></button>'
		 */
		// + ' <td><button onclick="deleteMasterReceiptIPD('+billReceiptId+')"
		// class="deleteUserAccess" disabled="disabled"><i class="fa
		// fa-trash-o"></i></button> '

		if (paidByCashFlag == "Y") {

			result = result
					+ ' <td>  <button onclick=receiptBillPrint("cashReceiptIpd",'
					+ billReceiptId
					+ ',"'
					+ billSettled
					+ '") data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button> ';
		} else {

			result = result
					+ '	<td><button class="deleteUserAccess"  disabled="disabled" onclick="deleteMasterReceiptIPD('
					+ billReceiptId
					+ ')" ><i class="fa fa-trash-o"></i></button> '
					+ '   <button onclick=receiptBillPrint("receiptIpd",'
					+ billReceiptId
					+ ',"'
					+ billSettled
					+ '") data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button> ';
		}

		/*
		 * if(creditFlag=="Y"){
		 * 
		 * result=result + ' <button disabled
		 * onclick="setCreditPayble('+remainAmt+','+billReceiptId+',\'credit\')"><i
		 * class="fa fa-credit-card"></i></button> ' }else{
		 * 
		 * result=result + ' <button
		 * onclick="setCreditPayble('+remainAmt+','+billReceiptId+',\'credit\')"><i
		 * class="fa fa-credit-card"></i></button> ' }
		 */

		result = result + '	</td>' + '</tr> ';

		/*
		 * var resultSlave= ' <div class="panel-collapse collapse"
		 * id="recSlave'+i+'" style="height: 0px;">' + ' <div
		 * class="panel-body"> ' + ' <table class="table table-hover"
		 * id="receiptSlave"> ' + ' <thead> ' + ' <tr> ' + ' <th>#</th> ' + '
		 * <th>Comp Name</th> ' + ' <th>Amount</th> ' + ' <th>Date</th> ' + '
		 * <th>Edit</th> ' + ' <th>Delete</th> ' + ' <th>Chk</th> ' + '
		 * </tr> ' + ' </thead> ' + ' <tbody> ';
		 * 
		 * for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
		 * 
		 * var
		 * billRecSlaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
		 * var
		 * billAmt=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount).toFixed(2);
		 * var
		 * rate=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate).toFixed(2);
		 * var
		 * quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
		 * var
		 * disc=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession).toFixed(2);
		 * var
		 * copay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay).toFixed(2);
		 * var
		 * pay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay).toFixed(2);
		 * var
		 * billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
		 * 
		 * var
		 * serviceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
		 * var
		 * subServiceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].subServiceId;
		 * var doctorId
		 * =res.listBillReceiptMaster[i].listBillReceiptSlave[k].doctorId; var
		 * advanceFlag
		 * =res.listBillReceiptMaster[i].listBillReceiptSlave[k].advanceFlag;
		 * var pfVoucherFlag
		 * =res.listBillReceiptMaster[i].listBillReceiptSlave[k].pfVoucherFlag;
		 * 
		 * var billAmt2=billAmt-disc;
		 * 
		 * resultSlave = resultSlave + '<tr> ' + ' <td>'+(k+1)+'</td> ' + '
		 * <td id="compNameIPD'+billRecSlaveId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> ' + '
		 * <td id="finalBillAmt'+billRecSlaveId+'">'+billAmt2+'</td> ' + '
		 * <td id="datetimeIPD'+billRecSlaveId+'">'+datetime+'</td> ';
		 * 
		 * if (advanceFlag == "N" && pfVoucherFlag == "N") { resultSlave =
		 * resultSlave+ ' <td><button class="btn btn-xs btn-success
		 * editUserAcce SlaveBtn" value="EDIT"
		 * onclick="editOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
		 * id="btnEdit" class="fa fa-edit" value="EDIT"></i></button></td> ' + '
		 * <td><button class="btn btn-xs btn-success deleteUserAcce SlaveBtn"
		 * value="DELETE"
		 * onclick="deleteOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
		 * id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
		 *  } else { resultSlave = resultSlave+ ' <td><button disabled
		 * class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT"
		 * onclick="editOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
		 * id="btnEdit" class="fa fa-edit" value="EDIT"></i></button></td> ' + '
		 * <td><button disabled class="btn btn-xs btn-success deleteUserAcce
		 * SlaveBtn" value="DELETE"
		 * onclick="deleteOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
		 * id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
		 *  } resultSlave = resultSlave+ ' <td><input type="checkbox"
		 * class="slaveNotAddedRefund chkRfndSlave'+recId+'" name="refundRd"
		 * value="'+billAmt+'" id="refundChk'+billDetailsId+'"
		 * onclick="setSlaveRefundAmt('+billDetailsId+')"></td> '
		 *  + ' <td ><input type="hidden" id="billAmtIPD'+billRecSlaveId+'"
		 * value="'+billAmt+'"></td> ' + ' <td ><input type="hidden"
		 * id="rateOfReceipt'+billRecSlaveId+'" value="'+rate+'"></td> ' + '
		 * <td ><input type="hidden" id="quan'+billRecSlaveId+'"
		 * value="'+quantity+'"></td> ' + ' <td ><input type="hidden"
		 * id="disc'+billRecSlaveId+'" value="'+disc+'"></td> ' + ' <td ><input
		 * type="hidden" id="copay'+billRecSlaveId+'" value="'+copay+'"></td> ' + '
		 * <td ><input type="hidden" id="pay'+billRecSlaveId+'"
		 * value="'+pay+'"></td> '
		 *  + ' <td ><input type="hidden" id="sId'+billRecSlaveId+'"
		 * value="'+serviceId+'"></td> ' + ' <td ><input type="hidden"
		 * id="subsId'+billDetailsId+'" value="'+subServiceId+'"></td> ' + '
		 * <td ><input type="hidden" id="doctorId'+billDetailsId+'"
		 * value="'+doctorId+'"></td> ' + '</tr>'; }
		 * 
		 * resultSlave=resultSlave + ' </tbody></table></div></div> ';
		 * result=result +resultSlave;
		 */
	}

	result = result + '	</tbody> ' + '</table> ';
	/* } */

	/*
	 * var len= res.listBillReceiptMaster.length; if(len>0){
	 * 
	 * $("#payable").val(res.listBillReceiptMaster[len-1].totalRemain); }
	 */

	$("#cashReceipts").html(result);
}

/*
 * function setReceiptTemplateIpd(res,callFrom){
 * 
 * var prevPaid=0; $("#btnRefund").prop('disabled','true'); $("#trDisc").show();
 * 
 * if(callFrom=="refundable"){
 * 
 * $("#btnPayNow").prop("disabled","true"); $("#trDisc").hide();
 * 
 * var result= ' <table class="table table-hover" id="receipts"> ' + ' <thead> ' + '
 * <tr> ' + ' <th>#</th> ' + ' <th>Receipt Id</th> ' + ' <th>Amount</th> ' + '
 * <th>Paid</th> ' + ' <th>Discount</th> ' + ' <th>Refund</th> ' + ' <th>Remain</th> ' + '
 * <th>Date</th> ' + ' <th>Details</th> ' + ' </tr> ' + ' </thead> ' + '
 * <tbody> ';
 * 
 * for(var i=0;i<res.listBillReceiptMaster.length;i++){ var m=0; var x =
 * res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId; var
 * recId=res.listBillReceiptMaster[i].billReceiptId; var
 * totalAmt=res.listBillReceiptMaster[i].totalAmt; var
 * totAmt=res.listBillReceiptMaster[i].totalPaid; var
 * refAmt=res.listBillReceiptMaster[i].refundAmt; var
 * totDisc=res.listBillReceiptMaster[i].totalDisc; var
 * remainAmt=Number(totAmt)-Number(refAmt); var datetime= new
 * Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
 * 
 * //prevPaid=prevPaid+totAmt;
 * 
 * result=result + '<tr> ' + ' <td>'+(i+1)+'</td> ' + ' <td><input
 * type="checkbox" class="mstNotRefund" value="'+remainAmt+'"
 * id="mstRefndId'+recId+'" onclick="setMasterRefundAmt('+recId+')"></td> ' + '
 * <td>'+recId+'</td> ' + ' <td>'+totalAmt+'</td> ' + ' <td>'+totAmt+'</td> ' + '
 * <td>'+totDisc+'</td> ' + ' <td>'+refAmt+'</td> ' + ' <td>'+remainAmt+'</td> ' + '
 * <td>'+datetime+'</td> ' + ' <td><a href="#recSlave'+i+'"
 * data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i
 * class="fa fa-chevron-down"></button></i></a>';
 * 
 * if(remainAmt<=0){
 * 
 * result=result + ' <button disabled
 * onclick="setCreditPayble('+remainAmt+','+recId+',\'refund\')"><i class="fa
 * fa-credit-card"></i></button> ' }else{
 * 
 * result=result + ' <button
 * onclick="setCreditPayble('+remainAmt+','+recId+',\'refund\')"><i class="fa
 * fa-credit-card"></i></button> ' }
 *  + ' </td>' + '</tr> ';
 * 
 * var resultSlave= ' <div class="panel-collapse collapse" id="recSlave'+i+'"
 * style="height: 0px;">' + ' <div class="panel-body"> ' + ' <table class="table
 * table-hover" id="receiptSlave"> ' + ' <thead> ' + ' <tr> ' + ' <th>#</th> ' + '
 * <th>Comp Name</th> ' + ' <th>Amount</th> ' + ' <th>Date</th> ' + ' <th>Edit</th> ' + '
 * <th>Delete</th> ' + ' <th>Chk</th> ' + ' </tr> ' + ' </thead> ' + '
 * <tbody> ';
 * 
 * for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
 * 
 * var
 * slaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
 * var
 * billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
 * var billAmt=res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount; var
 * rate=res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate; var
 * quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity; var
 * copay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay; var
 * pay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay; var
 * disc=res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession; // var
 * serviceID=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
 * 
 * var finalBillAmt=billAmt-disc;
 * 
 * resultSlave = resultSlave + '<tr> ' + ' <td>'+(k+1)+'</td> ' + '
 * <td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> ' + '
 * <td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> ' + '
 * <td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> '
 *  + ' <td><button class="btn btn-xs btn-success editUserAcce SlaveBtn"
 * value="EDIT"
 * onclick="editOnClickForRecieptIPD('+slaveId+','+billDetailsId+')"><i
 * id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
 *  + ' <td><button class="btn btn-xs btn-success deleteUserAcce SlaveBtn"
 * value="DELETE"
 * onclick="deleteOnClickForRecieptIPD('+slaveId+','+billDetailsId+')"><i
 * id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> '
 *  + ' <td><input type="checkbox" class="slaveNotAddedRefund
 * chkRfndSlave'+recId+'" name="refundRd" value="'+billAmt+'"
 * id="refundChk'+billDetailsId+'"
 * onclick="setSlaveRefundAmt('+billDetailsId+')"></td> '
 *  + ' <td ><input type="hidden" id="billAmtIPD'+billDetailsId+'"
 * value="'+billAmt+'"></td> ' + ' <td ><input type="hidden"
 * id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> ' + ' <td ><input
 * type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> ' + '
 * <td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> ' + '
 * <td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> ' + '
 * <td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> ' + '</tr>';
 *  }
 * 
 * resultSlave=resultSlave + ' </tbody></table></div></div> '; result=result
 * +resultSlave;
 *  }
 * 
 * result=result + ' </tbody> ' + '</table> ';
 * 
 * }else{
 * 
 * $("#btnPayNow").removeAttr('disabled');
 * 
 * var result= ' <table class="table table-hover" id="receipts"> ' + ' <thead> ' + '
 * <tr> ' + ' <th>#</th> ' + ' <th>Receipt Id</th> ' + ' <th>Amount</th> ' + '
 * <th>Paid</th> ' + ' <th>Discount</th> ' + ' <th>Remain</th> ' + ' <th>Date</th> ' + '
 * <th>Details</th> ' + ' </tr> ' + ' </thead> ' + ' <tbody> ';
 * 
 * for(var i=0;i<res.listBillReceiptMaster.length;i++){ var m=0; var x =
 * res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId; var
 * recId=res.listBillReceiptMaster[i].billReceiptId; var
 * totalAmt=res.listBillReceiptMaster[i].totalAmt; var
 * totAmt=res.listBillReceiptMaster[i].totalPaid; var
 * totDisc=res.listBillReceiptMaster[i].totalDisc; var
 * remainAmt=res.listBillReceiptMaster[i].totalRemain; var datetime= new
 * Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
 * var creditFlag=res.listBillReceiptMaster[i].creditFlag; //var
 * refundFlag=res.listBillReceiptMaster[i].refundFlag;
 * 
 * if(callFrom=="all"){
 * 
 * prevPaid=prevPaid+totAmt; $("#prevPaid").val(prevPaid); }
 * 
 * 
 * result=result + '<tr> ' + ' <td>'+(i+1)+'</td> ' + ' <td>'+recId+'</td> ' + '
 * <td>'+totalAmt+'</td> ' + ' <td>'+totAmt+'</td> ' + ' <td>'+totDisc+'</td> ' + '
 * <td>'+remainAmt+'</td> ' + ' <td>'+datetime+'</td> ' + ' <td><a
 * href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse"
 * class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>' + '
 * <button onclick="hideOpdBillPanel('+recId+')"><i class="fa fa-plus"></i></button> ';
 * 
 * if(creditFlag=="Y"){
 * 
 * result=result + ' <button disabled
 * onclick="setCreditPayble('+res.listBillReceiptMaster[i].totalRemain+','+recId+',\'credit\')"><i
 * class="fa fa-credit-card"></i></button> ' }else{
 * 
 * result=result + ' <button
 * onclick="setCreditPayble('+res.listBillReceiptMaster[i].totalRemain+','+recId+',\'credit\')"><i
 * class="fa fa-credit-card"></i></button> ' }
 *  + ' </td>' + '</tr> ';
 * 
 * 
 * var resultSlave= ' <div class="panel-collapse collapse" id="recSlave'+i+'"
 * style="height: 0px;">' + ' <div class="panel-body"> ' + ' <table class="table
 * table-hover" id="receiptSlave"> ' + ' <thead> ' + ' <tr> ' + ' <th>#</th> ' + '
 * <th>Comp Name</th> ' + ' <th>Amount</th> ' + ' <th>Date</th> ' + ' <th>Edit</th> ' + '
 * <th>Delete</th> ' + ' </tr> ' + ' </thead> ' + ' <tbody> ';
 * 
 * for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
 * 
 * var
 * slaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
 * var
 * billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
 * var billAmt=res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount; var
 * rate=res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate; var
 * quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity; var
 * copay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay; var
 * pay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay; var
 * disc=res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession; var
 * againstId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].againstId;
 * //var paid=res.listBillReceiptMaster[i].listBillReceiptSlave[k].paid; // var
 * paid=billAmt-disc;paid // var
 * serviceID=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
 * 
 * var finalBillAmt=(rate*quantity)-disc;
 * 
 * resultSlave = resultSlave + '<tr> ' + ' <td>'+(k+1)+'</td> ' + '
 * <td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> ' + '
 * <td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> ' + '
 * <td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> '
 * 
 * if(creditFlag=="Y" || againstId!=0){
 * 
 * resultSlave=resultSlave + ' <td><button disabled class="btn btn-xs
 * btn-success editUserAcce SlaveBtn" value="EDIT"
 * onclick="editOnClickForRecieptIPD('+slaveId+','+billDetailsId+')"><i
 * id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
 *  + ' <td><button disabled class="btn btn-xs btn-success deleteUserAcce
 * SlaveBtn" value="DELETE"
 * onclick="deleteOnClickForRecieptIPD('+slaveId+','+billDetailsId+')"><i
 * id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
 * 
 * }else{
 * 
 * resultSlave=resultSlave + ' <td><button class="btn btn-xs btn-success
 * editUserAcce SlaveBtn" value="EDIT"
 * onclick="editOnClickForRecieptIPD('+slaveId+','+billDetailsId+')"><i
 * id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
 *  + ' <td><button class="btn btn-xs btn-success deleteUserAcce SlaveBtn"
 * value="DELETE"
 * onclick="deleteOnClickForRecieptIPD('+slaveId+','+billDetailsId+')"><i
 * id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
 *  }
 * 
 * resultSlave=resultSlave + ' <td ><input type="hidden"
 * id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> ' + ' <td ><input
 * type="hidden" id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> ' + '
 * <td ><input type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> ' + '
 * <td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> ' + '
 * <td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> ' + '
 * <td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> ' + '</tr>';
 *  }
 * 
 * resultSlave=resultSlave + ' </tbody></table></div></div> '; result=result
 * +resultSlave;
 *  }
 * 
 * result=result + ' </tbody> ' + '</table> ';
 *  }
 * 
 * $("#cashReceipts").html(result); }
 */

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Set remain payable against credit
 ******************************************************************************/
/*
 * function setCreditPaybleIpd(remAmt){
 * 
 * $("#payable").val(remAmt);
 * 
 * 
 *  }
 */

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 14-July-2017
 * @codeFor : Get bill refund master details
 ******************************************************************************/
function getBillRefundDetailsIpd(callFrom) {

	var treatmentId = $("#treatmentId").text();
	var billId = $("#billNo").text();
	var receiptOf = $("#receiptOf").val();
	var userId = parseInt($("#userId").val());

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"treatmentId" : parseInt(treatmentId),
			"billId" : parseInt(billId),
			"callFrom" : callFrom,
			"receiptOf" : receiptOf,
			"userId" : userId
		},
		url : "ehat/ipdbill/getBillRefundDetailsIpd",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			// /var len=r.listBillReceiptMaster.length;
			/* if(len>0){ */

			setRefundTemplate(r, callFrom);
			// disableSevices(r);
			/* } */
		}
	});
};

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 14-July-2017
 * @codeFor : Set refund master template
 ******************************************************************************/
function setRefundTemplate(res, callFrom) {

	var prevRefund = 0;

	var result = ' <table class="table table-hover" id="refunds"> '
			+ ' <thead><tr><th>#</th> '
			+ '	<th>Refund Id</th><th>Refund</th><th>Date</th></tr></thead><tbody> ';

	for ( var i = 0; i < res.listBillRefundMaster.length; i++) {
		/*
		 * var m=0; var x =
		 * res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId;
		 */
		var recId = res.listBillRefundMaster[i].billRefundId;
		var totalAmt = parseFloat(res.listBillRefundMaster[i].totalAmt)
				.toFixed(2);
		var totAmt = parseFloat(res.listBillRefundMaster[i].totalPaid).toFixed(
				2);
		var remainAmt = parseFloat(res.listBillRefundMaster[i].totalRemain)
				.toFixed(2);
		var datetime = new Date(res.listBillRefundMaster[i].createdDateTime)
				.toLocaleDateString('en-GB');

		prevRefund = Number(prevRefund) + Number(totAmt);

		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				/*
				 * + ' <td><input type="checkbox" class="mstNotRefund"
				 * value="'+remainAmt+'" id="mstRefndId'+recId+'"
				 * onclick="setMasterRefundAmt('+recId+')"></td> '
				 */
				+ '	<td>'
				+ recId
				+ '</td> '
				+ ' <td>'
				+ totAmt
				+ '</td> '
				+ '  <td>'
				+ datetime
				+ '</td>'
				+ '<td>'
				
				+ ' <button onclick=deleteRefundReceipt("refundIpd",'+ recId + ') '
				+ ' data-toggle="tooltip" title="Delete Receipt" data-placement="left"><i class="fa fa-trash-o"></i></button> '
				
				+ ' <button onclick=receiptBillPrint("refundIpd",'+ recId + ') '
				+ ' data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button></td> '
				
				/*
				 * + ' <td><a href="#recSlave'+i+'" data-parent="#accordio"
				 * data-toggle="collapse" class="accordion-toggle"><button><i
				 * class="fa fa-chevron-down"></button></i></a>';
				 */
				/*
				 * if(creditFlag=="Y"){
				 * 
				 * result=result + ' <button disabled
				 * onclick="setCreditPayble('+totAmt+','+recId+')"><i class="fa
				 * fa-credit-card"></i></button> ' }else{
				 * 
				 * result=result + ' <button
				 * onclick="setCreditPayble('+totAmt+','+recId+')"><i class="fa
				 * fa-credit-card"></i></button> ' } + ' </td>'
				 */
				+ '</tr> ';

		/*
		 * var resultSlave= ' <div class="panel-collapse collapse"
		 * id="recSlave'+i+'" style="height: 0px;">' + ' <div
		 * class="panel-body"> ' + ' <table class="table table-hover"
		 * id="receiptSlave"> ' + ' <thead> ' + ' <tr> ' + ' <th>#</th> ' + '
		 * <th>Comp Name</th> ' + ' <th>Amount</th> ' + ' <th>Date</th> ' + '
		 * <th>Edit</th> ' + ' <th>Delete</th> ' + ' <th>Chk</th> ' + '
		 * </tr> ' + ' </thead> ' + ' <tbody> ';
		 * 
		 * for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
		 * 
		 * var
		 * slaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
		 * var
		 * billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
		 * var
		 * billAmt=res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount;
		 * var rate=res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate;
		 * var
		 * quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
		 * var copay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay;
		 * var pay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay; var
		 * disc=res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession; //
		 * var
		 * serviceID=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
		 * 
		 * var finalBillAmt=billAmt-disc;
		 * 
		 * resultSlave = resultSlave + '<tr> ' + ' <td>'+(k+1)+'</td> ' + '
		 * <td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> ' + '
		 * <td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> ' + '
		 * <td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> ' + ' <td><button
		 * class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT"
		 * onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i
		 * id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> ' + '
		 * <td><button class="btn btn-xs btn-success deleteUserAcce SlaveBtn"
		 * value="DELETE"
		 * onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i
		 * id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ' + '
		 * <td><input type="checkbox" class="slaveNotAddedRefund
		 * chkRfndSlave'+recId+'" name="refundRd" value="'+billAmt+'"
		 * id="refundChk'+billDetailsId+'"
		 * onclick="setSlaveRefundAmt('+billDetailsId+')"></td> ' + ' <td ><input
		 * type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> ' + '
		 * <td ><input type="hidden" id="rateOfReceipt'+billDetailsId+'"
		 * value="'+rate+'"></td> ' + ' <td ><input type="hidden"
		 * id="quan'+billDetailsId+'" value="'+quantity+'"></td> ' + ' <td ><input
		 * type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> ' + '
		 * <td ><input type="hidden" id="copay'+billDetailsId+'"
		 * value="'+copay+'"></td> ' + ' <td ><input type="hidden"
		 * id="pay'+billDetailsId+'" value="'+pay+'"></td> ' + '</tr>'; }
		 * 
		 * resultSlave=resultSlave + ' </tbody></table></div></div> ';
		 * result=result +resultSlave; }
		 */
	}

	result = result + '	</tbody> ' + '</table> ';

	$("#prevRefunded").text(parseFloat(prevRefund).toFixed(2));
	var refundable = Number($("#prevPaid").val()) - Number(prevRefund);
	if (refundable < 0) {

		refundable = 0;
	}
	$("#nowRefunded").text(parseFloat(refundable).toFixed(2));
	$("#cashReceipts").html(result);

}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Save total payble
 ******************************************************************************/
function setRefundAmt(id) {

	if ($('#mstRefndId' + id).prop("checked") == true) {

		$("#mstRefndId" + id).removeClass("mstNotRefund");
		$("#mstRefndId" + id).addClass("mstRefund");

		$('.chkRfndSlave' + id).prop('checked', true);
		mainRefundTotal();
	} else {

		$("#mstRefndId" + id).removeClass("mstRefund");
		$("#mstRefndId" + id).addClass("mstNotRefund");

		$('.chkRfndSlave' + id).prop('checked', false);
		mainRefundTotal();
	}

	$("#payable").val(refundAmt);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Save total payble
 ******************************************************************************/
function setSlaveRefundAmt(id) {

	if ($('#refundChk' + id).prop("checked") == true) {

		$("#refundChk" + id).removeClass("slaveNotAddedRefund");
		$("#refundChk" + id).addClass("slaveAddedRefund");

		// $('.chkRfndSlave'+id).prop('checked', true);
		mainRefundTotal();
	} else {

		$("#refundChk" + id).removeClass("slaveAddedRefund");
		$("#refundChk" + id).addClass("slaveNotAddedRefund");

		// $('.chkRfndSlave'+id).prop('checked', false);
		mainRefundTotal();
	}

	$("#payable").val(refundAmt);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Save total payble
 ******************************************************************************/
function mainRefundTotal() {

	var total = 0;
	// var count=0;

	/*
	 * $('.slaveAddedRefund').each(function() { count++; });
	 */

	$('.slaveAddedRefund').each(function() {

		total = total + Number($(this).val());
	});

	/*
	 * if(count>0){
	 * 
	 * $("#mainBillDeatils").hide('hide'); }else{
	 * 
	 * $("#mainBillDeatils").show('show'); }
	 */
	/*
	 * $('.slaveAddedRefund').each(function() {
	 * 
	 * total=total+Number($(this).val()); });
	 */

	$("#payable").val(total);

}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Set slave checkboxes according to master
 ******************************************************************************/
function setRefundAmtSlave(id) {

	if (($('#mstRefndId' + id).prop("checked") == true)) {

		/*
		 * if(id==1){
		 * 
		 * $('#tamt1').removeClass("slaveNotAddedRefund");
		 * $('#tamt1').addClass("slaveAddedRefund"); }
		 */

		$('.chkRfndSlave' + id).prop('checked', true);

		$('.chkRfndSlave' + id).removeClass("slaveNotAddedRefund");
		$('.chkRfndSlave' + id).addClass("slaveAddedRefund");
		setTotalRefund();
	} else {

		/*
		 * if(id==1){
		 * 
		 * $('#tamt1').removeClass("mainAddedInTotal");
		 * $('#tamt1').addClass("mainNotInTotal"); }
		 */

		$('.chkRfndSlave' + id).prop('checked', false);

		$('.chkRfndSlave' + id).removeClass("slaveAddedRefund");
		$('.chkRfndSlave' + id).addClass("slaveNotAddedRefund");
		setTotalRefund();
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Set remain payable against credit
 ******************************************************************************/
/*
 * function setCreditPayble(id){
 * 
 * if(($('#mstRefndId'+id).prop("checked") == true)){
 * 
 * $('#mstRefndId'+id).removeClass("mstNotRefund");
 * $('#mstRefndId'+id).addClass("mstAddedRefund");
 * 
 * $('.chkRfndSlave'+id).prop("checked",true);
 * 
 * $('.billSlave'+id).removeClass("notInTotal");
 * $('.billSlave'+id).addClass("addedInTotal"); setTotalRefund();
 * 
 * //$("#payable").val($('#mstRefndId'+id).val());
 * 
 * }else{
 * 
 * $('#mstRefndId'+id).removeClass("mstAddedRefund");
 * $('#mstRefndId'+id).addClass("mstNotRefund");
 * 
 * 
 * $('.chkRfndSlave'+id).prop("checked",false);
 * $('.billSlave'+id).removeClass("notInTotal");
 * $('.billSlave'+id).addClass("addedInTotal"); setTotalRefund(); if(id==1){
 * 
 * $('#tamt1').removeClass("mstAddedRefund");
 * $('#tamt1').addClass("mstNotRefund"); }
 * 
 * $('.billSlaveChk'+id).prop('checked', false);
 * 
 * $('.billSlave'+id).removeClass("addedInTotal");
 * $('.billSlave'+id).addClass("notInTotal");
 * $('.mstRefndId'+id).removeClass("mstNotRefund");
 * $('.mstRefndId'+id).addClass("mstAddedRefund"); //$("#payable").val(0); }
 * $("#payable").val(remAmt); }
 */
function setCreditPayble(remAmt, recId, callFrom, trId, depId, billId) {

	$("#payable").val(remAmt);
	$("#recId").val(recId);
	$("#callFromForSave").val("credit");

	if (callFrom == "refund") {

		$("#btnPayNow").prop("disabled", "true");
		$("#btnRefund").removeAttr('disabled');
	} else if (callFrom == "pending") {

		$("#pendingFlag").val("Y");
		$("#pendingBillId").val(billId);
		$("#pendingTreatId").val(trId);
		$("#payNow").prop("readonly", "readonly");
		$("#payNow").val(remAmt);
		$("#trRefPer").hide();

		if (depId == 2) {

			$("#btnPayNow").attr("onclick", "saveBillDetailsIpd('cash')");

		} else {

			$("#btnPayNow").attr("onclick", "saveOpdPendingDetails()");
		}
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Save total payble
 ******************************************************************************/
function setTotalRefund() {

	var total = 0;
	var count = 0;
	$('.slaveAddedRefund').each(function() {
		count++;
		total = total + Number($(this).val());
	});

	$("#mainBillDeatils").show('show');

	/*
	 * if(count>0){
	 * 
	 * $("#mainBillDeatils").hide('hide'); }else{
	 * 
	 * $("#mainBillDeatils").show('show'); }
	 */
	/*
	 * $('.slaveAddedRefund').each(function() {
	 * 
	 * total=total+Number($(this).val()); });
	 */

	$("#payable").val(total);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 22-June-2017
 * @codeFor : Disable paid services
 ******************************************************************************/
function disableSevicesIpd(res) {

	for ( var i = 0; i < res.listBillReceiptMaster.length; i++) {

		for ( var k = 0; k < res.listBillReceiptMaster[i].listBillReceiptSlave.length; k++) {

			var serId = res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
			var subSerId = res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;

			$("#chkOpdBillReg" + serId).attr("disabled", true);
			$("#chkOpdBillReg" + serId).attr("checked", false);

			$("#tamt" + serId).removeClass("mainAddedInTotal");
			$("#tamt" + serId).addClass("mainNotInTotal");

			$("#chkOpdBill" + subSerId).attr("disabled", true);
			$("#chkOpdBill" + subSerId).attr("checked", false);
		}
	}
}

/*******************************************************************************
 * @author : Sagar kadam
 * @date : 29-June-2017
 * @code :close treatment for ipd
 ******************************************************************************/

function closePatientTreatmentForIPD(tretId) {

	var outstandingAmt = $("#finalRemain").html();

	if (Number(outstandingAmt) > 0
			&& ($("#creditBill").is(":checked") == false)) {

		alert("Please close treatment in credit mode");
		return false;
	}

	var r = confirm("Do You Want To Close Treatment ??");
	if (r == true) {
		var genInvoiceFlag = $("#genInvoiceFlag").val();
		if (genInvoiceFlag == "N") {
			alert("First Generate Invoice ");
			return false;
		}
		
		var totalOutStanding = $("#finalRemain").text();
		var totalOutStandingBill = parseInt(totalOutStanding);
		if(totalOutStandingBill>0){
			
			alert("Patient Outstanding Bill Pending Plase Add Remark ");
			$("#remarkPopUpNew").show();
			getAllReasons();
			return false;
		}
		
		
		jQuery.ajax({
			type : "POST",
			url : "ehat/billNoble/closetreatmentforipd",
			data : {
				"treatmentId" : tretId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				msg1 = "please close discharge summary first!!!";
				// msg = msg+"Treatment Closed Successfully...";
				if (response == msg1) {
					alertify.error(response);

				} else {
					alertify.success(response);
					window.location.href = "ipd_previous_billing.jsp";
				}
				;
				// alert(response);
				// alertify.error(response);
				// window.location.href = "patientRecordsDetails.jsp";
				/*
				 * resetUlList(); getConfigTemp();
				 */

			}
		});
	}
}
/*---------------------------------------------FOR SPONSOR------------------------------------*/

/*******************************************************************************
 * @code for sponsor charges in billing on sponsor tab
 * @date 3-JULY-2017
 ******************************************************************************/
function getPatientBillAmountIpdForSponsor(r, call) {
	
	//var a = $("#preIpdId").val();
	// alert(a);
	var tFlag = "AT";
	if(call == "IpdPrevSponsor"){
		
		tFlag = "CT";
	}else{
		
		tFlag = "AT";
	}
	
	jQuery.ajax({
		async : true,
		type : "POST",
		/*data : {
			"callform" : r,
			"treatcloseForIpd" : a
		},
		url : "ehat/ipdbill/getIpdPatientServiceListFromView",*/
		
		data : {
			"tFlag" : tFlag,
			"treatmentId" : r
		},
		url : "ehat/ipdbillmgt/fetchPatientBillAmount",
		success : function(r) {
			// setTempPatientRecords(r);
			console.log(r);
			setBillDetailsTempForIpd(r, call);
			$('#amountIpdSponsor').attr('readonly', 'true');
			$('#concessionIpdSponsorPer').val(0);
			/*
			 * $(".openAllSlave").trigger('click'); $("#payable").val(0);
			 * setTotalPaid();
			 */
			if(call == "IpdPrevSponsor"){
				$("#saveBill1").prop("disabled", true);
				$("#perticularIpdSponsor").prop("disabled", true);
				$("#servIdIpdSponsor").prop("disabled", true);
				$("#specialityIdSponsor").prop("disabled", true);
				$("#doctorNameIpdSponsor").prop("disabled", true);
				$("#rateIpdSponsor").prop("disabled", true);
				$("#qtyIpdSponsor").prop("disabled", true);
				$("#amountIpdSponsor").prop("disabled", true);
				$("#concessionIpdSponsor").prop("disabled", true);
				$("#payIpdSponsor").prop("disabled", true);
				$("#coPayIpdSponsor").prop("disabled", true);
				$("#concessionIpdSponsorPer").prop("disabled", true);
				$("#servIdIpdSponsor").prop("disabled", true);

			}
		}
	});
}

var totAmt = 0;
function setBillDetailsTempForIpd(r, callFrom) {

	var setBill = "";
	var totAmt = 0;
	var totqyt = 0;
	var treatmentId = $('#treatmentId').text();
	var pharmaId = $("#pharmacyInvoice").val();
	var pharmacy = $("#pharmacy").val();

	for ( var i = 0; i < r.listServiceIpdDto.length; i++) {

		if (r.listServiceIpdDto[i].serviceId == 1) {
			totqyt = totqyt + 1;
			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ r.listServiceIpdDto[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ r.listServiceIpdDto[i].billDetailsId
					+ '"> </td>'

					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle">'
					+ '<div class="row">'
					+ '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName
					+ '</div>'
					+ '</div>'
					+ '</a>'
					+ '</h3>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</td>'
					+ '<td><div class="text-center">1</div></td>'
					+ '<td>'
					+ '<div class="text-right mainAddedInTotal" id="tamt'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '">'
					+ (r.listServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;display:none"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'sponsor\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';

			totAmt = totAmt + r.listServiceIpdDto[i].otherAmount;

		} /*
			 * else if (r.listServiceIpdDto[i].serviceId == 2) { setBill=setBill
			 *  + '<tr>' + '<td class="only-checkbox" >' + '<input
			 * type="checkbox"
			 * onclick="setSlaveChk1('+(r.listServiceIpdDto[i].serviceId)+')"
			 * checked=checked id="chkOpdBillReg'+
			 * r.listServiceIpdDto[i].serviceId+'" name="opdBillCheckboxReg"
			 * value="'+ r.listServiceIpdDto[i].serviceId+'">' + '</td>' + '<td>' + '<div
			 * class="text-left">' + '<div class="panel-group" id="accordion">' + '<div
			 * class="panel">' + '<div class="panel-heading">' + '<h3 class="panel-title">' + '<a
			 * class="accordion-toggle openAllSlaveIpd" data-toggle="collapse"
			 * data-parent="#accordion" href="#collapseOne'+i+'"
			 * onclick="getSubServiceDetailsForSponsor('+treatmentId+','+
			 * r.listServiceIpdDto[i].serviceId +')">' + '<div class="row">' + '<div
			 * class="col-md-10">' + r.listServiceIpdDto[i].serviceName +'</div>' + '<div
			 * class="col-md-1">' + '<i class="fa fa-chevron-down"
			 * id="list'+i+'"></i>' + '</div>' + '</div>' + '</a>' + '</h3>' + '</div>' + '<div
			 * id="collapseOne'+i+'" class="panel-collapse collapse">' + '<div
			 * class="panel-body">' + '<table class="table table-hover">' + '<thead>' + '<tr>' + '<th class="only-checkbox">#</th>' + '<th>Doctor
			 * Name</th>' + '<th>' + '<div class="text-center">Amount</div>' + '</th>';
			 * 
			 * var concessionFlow=$('#concessionFlow').val();
			 * 
			 * if(concessionFlow == "on"){ setBill=setBill + '<th>' + '<div
			 * class="text-center">Disc</div>' + '</th>'
			 *  + '<th>' + '<div class="text-center">Disc Per%</div>' + '</th>';
			 * }else{ setBill=setBill + '<th style="display:none">' + '<div
			 * class="text-center">Disc</div>' + '</th>'
			 *  + '<th style="display:none">' + '<div
			 * class="text-center">Disc Per%</div>' + '</th>'; }
			 * setBill=setBill + '<th>' + '<div class="text-center">Pay</div>' + '</th>'
			 *  + '<th>' + '<div class="text-right">Date</div>' + '</th>'
			 * 
			 * 
			 *  + '<th class="only-checkbox">Edit</th>' + '<th class="only-checkbox">Cancel</th>'
			 *  + '<th class="only-checkbox">ChB</th>' + '</tr>' + '</thead>' + '<tbody
			 * id="serviceDataOpdSponsor">'
			 *  + '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</td>' + '<td><div
			 * class="text-center">' + r.listServiceIpdDto[i].serviceCount +'</div></td>' + '<td>' + '<div
			 * id="tamt'+(r.listServiceIpdDto[i].serviceId)+'"
			 * class="text-right">' +
			 * (r.listServiceIpdDto[i].otherAmount).toFixed(2) +'</div></td>'
			 *  + '<td  class="text-center" ><a style="cursor:pointer;"> ' +'<button
			 * class="btn btn-xs btn-success editUserAccess" ' +'
			 * onclick=printIpdServiceWise('+treatmentId+',\'sponsor\',\'No\','+
			 * r.listServiceIpdDto[i].serviceId +') ' +'value="EDIT"><i
			 * class="fa fa-print"
			 * id=btnServWise'+r.listServiceIpdDto[i].serviceId+'></i></button></a>
			 * </td>'
			 * 
			 *  + '</tr>';
			 * 
			 * totqyt=totqyt+ r.listServiceIpdDto[i].serviceCount;
			 * totAmt=totAmt+r.listServiceIpdDto[i].otherAmount; }
			 */

		else if (r.listServiceIpdDto[i].serviceId == 3) {
			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ r.listServiceIpdDto[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse"data-parent="#accordion" href="#collapseTwo'
					+ i + '" onclick="getBedDetailsForIpdSponsor('
					+ treatmentId + ',' + r.listServiceIpdDto[i].serviceId
					+ '); setTimeout(function(){userAccess();},300);">' + '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'

					+ '<div id="collapseTwo' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					+ '<th>Bed + Hall</th>'

					/* + '<th>Doc Name</th>' */

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					/*
					 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
					 * class="text-center">Disc %</div>' + '</th>'
					 */

					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th>' + '<div class="text-center">Disc Per%</div>'
						+ '</th>';
			} else {
				setBill = setBill + '<th style="display:none">'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th style="display:none">'
						+ '<div class="text-center">Disc Per%</div>' + '</th>';
			}
			setBill = setBill

			+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

			/*
			 * + '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'
			 */

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'
					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>'

					+ '<tbody id="bedDataForSponsor">'

					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>' + '<div class="text-right">'
					+ (r.listServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'sponsor\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].otherAmount;
		}

		else if (r.listServiceIpdDto[i].serviceId == 4) {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'
					+ i + '" onclick="getSubServiceDetails1ForOTAlsoSponsor('
					+ i + ',' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + ')">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseTwo' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>' + '<th>OT Name</th>'

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					/*
					 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
					 * class="text-center">Disc %</div>' + '</th>'
					 */
					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th>' + '<div class="text-center">Disc Per%</div>'
						+ '</th>';
			} else {
				setBill = setBill + '<th style="display:none">'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th style="display:none">'
						+ '<div class="text-center">Disc Per%</div>' + '</th>';
			}
			setBill = setBill

			+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

			/*
			 * + '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'
			 */

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>';
			if (r.listServiceIpdDto[i].iscombination == 'Y') {
				setBill = setBill + '<th class="only-checkbox">Services</th>';
			}
			setBill = setBill + '<th class="only-checkbox">ChB</th>'

			+ '</tr>' + '</thead>' + '<tbody id="OTForSponsor' + i + '">'
			/*
			 * '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center"></div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
			 */
			+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">'
					+ (r.listServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'sponsor\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].otherAmount;
		}

		else if (r.listServiceIpdDto[i].serviceId == 5) {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'
					+ i
					+ '" onclick="getSubServiceDetails1ForConsultingVisitingChargesSponsor('
					+ i + ',' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + ')">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseTwo' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					/* + '<th>OT Name</th>' */

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					/*
					 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
					 * class="text-center">Disc %</div>' + '</th>'
					 */
					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th>' + '<div class="text-center">Disc Per%</div>'
						+ '</th>';
			} else {
				setBill = setBill + '<th style="display:none">'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th style="display:none">'
						+ '<div class="text-center">Disc Per%</div>' + '</th>';
			}
			setBill = setBill

			+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

			/*
			 * + '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'
			 */

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'
					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>' + '<tbody id="CVCSponsor' + i + '">'

					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">'
					+ (r.listServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'sponsor\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].otherAmount;
		} else if (r.listServiceIpdDto[i].serviceId == pharmaId) {
		} else if (r.listServiceIpdDto[i].serviceId == pharmacy) {
			
			setBill = setBill

			+ '<tr>'
			+ '<td class="only-checkbox" >'// added by vinod
			+ '<input type="checkbox" onclick="setSlaveChk('
			+ (r.listServiceIpdDto[i].serviceId)
			+ ')" checked=checked id="chkOpdBillReg'
			+ (r.listServiceIpdDto[i].serviceId)
			+ '" name="opdBillCheckboxReg" value="'
			+ r.listServiceIpdDto[i].serviceId
			+ '">'
			+ '</td>'// added by vinod
			+ '<td>'
			+ '<div class="text-left">'
			+ '<div class="panel-group" id="accordion">'
			+ '<div class="panel">'
			+ '<div class="panel-heading">'
			+ '<h3 class="panel-title">'
			+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'
			+ i + '" onclick="getSubServiceDetails1(' + i + ','
			+ treatmentId + ',' + r.listServiceIpdDto[i].serviceId
			+ ')">' + '<div class="row">' + '<div class="col-md-10">'
			+ r.listServiceIpdDto[i].serviceName + '</div>'
			+ '<div class="col-md-1">'
			+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
			+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
			+ '<div id="collapseCghsTwo' + i
			+ '" class="panel-collapse collapse">'
			+ '<div class="panel-body">'
			+ '<table class="table table-hover">' + '<thead>' + '<tr>'
			+ '<th class="only-checkbox">#</th>'
			+ '<th>SubService Name</th>'

			+ '<th>Doc Name</th>'

			+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

			+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

			/*
			 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
			 * class="text-center">Disc %</div>' + '</th>'
			 */
			+ '<th>' + '<div class="text-center">Amount</div>'
			+ '</th>';

	var concessionFlow = $('#concessionFlow').val();

	if (concessionFlow == "on") {
		setBill = setBill + '<th>'
				+ '<div class="text-center">Disc</div>' + '</th>'

				+ '<th>' + '<div class="text-center">Disc Per%</div>'
				+ '</th>';
	} else {
		setBill = setBill + '<th style="display:none">'
				+ '<div class="text-center">Disc</div>' + '</th>'

				+ '<th style="display:none">'
				+ '<div class="text-center">Disc Per%</div>' + '</th>';
	}
	setBill = setBill

	/* + '<th>' + '<div class="text-center">Pay</div>' + '</th>' */

	+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

	+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
			+ '<th class="only-checkbox">Edit</th>'
			+ '<th class="only-checkbox">Cancel</th>';
	if (r.listServiceIpdDto[i].iscombination == 'Y') {
		setBill = setBill + '<th class="only-checkbox">Pkg</th>';
	}
	setBill = setBill + '<th class="only-checkbox">ChB</th>'

	+ '</tr>' + '</thead>' + '<tbody id="serviceData' + i + '">'
	/*
	 * '<tr>' + '<td class="only-checkbox">' + '<input
	 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
	 * class="text-center"></div>' + '</td>' + '<td>' + '<div
	 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
	 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
	 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
	 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
	 */
	+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
			+ '</div>' + '</div>' + '</td>'
			+ '<td><div class="text-center"> '
			+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
			+ '<td>'// added by vishant
			+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
			+ '" class="text-right">'
			+ (r.listServiceIpdDto[i].amount).toFixed(2)
			+ '</div></td>'

			+ '<td  class="text-center" ><a style="cursor:pointer;"> '
			+ '<button class="btn btn-xs btn-success " '
			+ '  onclick=printIpdServiceWise(' + treatmentId
			+ ',\'general\',\'No\',' + r.listServiceIpdDto[i].serviceId
			+ ') '
			+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
			+ r.listServiceIpdDto[i].serviceId
			+ '></i></button></a> </td>'

			+ '</tr>';// added by vishant

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
			
		} else {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'
					+ i + '" onclick="getSubServiceDetails1ForSponsor(' + i
					+ ',' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + '); userAccess();">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseTwo' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					+ '<th>SubService Name</th>'

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					/*
					 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
					 * class="text-center">Disc %</div>' + '</th>'
					 */
					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th>' + '<div class="text-center">Disc Per%</div>'
						+ '</th>';
			} else {
				setBill = setBill + '<th style="display:none">'
						+ '<div class="text-center">Disc</div>' + '</th>'

						+ '<th style="display:none">'
						+ '<div class="text-center">Disc Per%</div>' + '</th>';
			}
			setBill = setBill

			+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

			/*
			 * + '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'
			 */

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>';
			if (r.listServiceIpdDto[i].iscombination == 'Y') {
				setBill = setBill + '<th class="only-checkbox">Pkg</th>';
			}
			setBill = setBill + '<th class="only-checkbox">ChB</th>'

			+ '</tr>' + '</thead>' + '<tbody id="serviceDataForSponsor' + i
					+ '">'
					/*
					 * '<tr>' + '<td class="only-checkbox">' + '<input
					 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
					 * class="text-center"></div>' + '</td>' + '<td>' + '<div
					 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
					 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
					 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
					 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
					 */
					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">'
					+ (r.listServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success "  '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'sponsor\',\'No\',' + r.listServiceIpdDto[i].serviceId
					+ ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].otherAmount;
		}
	}

	if (callFrom == "cghs") {
		$("#billDetails").html("");
		// alert("in chgs");
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text((totAmt).toFixed(2));

		$("#cghsBill").html(setBill);

		// $("#cghsBill").html(setBill);
	} else {

		$("#billDetails").html("");

		$("#totalQttty").text(totqyt);
		$("#totalAmmmt").text((totAmt).toFixed(2));

		$("#sponsorIpd").html(setBill);
	}
}

/*******************************************************************************
 * @code for sponsor doctor charges in billing on sponsor tab
 * @date 30-JUN-2017
 ******************************************************************************/
function getSubServiceDetailsForSponsor(t, s) {
	// alert("hiiii");
	var chargesSlaveId = $("#chargesSlaveId").val();

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s,
			"chargesSlaveId" : chargesSlaveId
		},
		/* url : "ehat/ipdbill/getPatientServiceBillSponsorForIpd", */
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {

			getSubServiceDetailsTempForSponsor(r, s);

		}
	});
}

/*******************************************************************************
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017
 ******************************************************************************/
function getSubServiceDetailsTempForSponsor(t, s) {

	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {

		var a = 1 + i;
		var datetime = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');

		if (t.listSubServiceIpdDto[i].cancle == "Y") {
			setService = setService + '<tr>';
		} else {
			setService = setService
					+ '<tr onclick="editSponsorOnClickForDoctor('
					+ t.listSubServiceIpdDto[i].billDetailsId + ')">';

		}

		setService = setService
		// + '<tr>'

		+ '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>'

				+ '<td style="display:none;" id="doc'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'
				+ '<td style="display:none;" id="docId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '" value="'
				+ t.listSubServiceIpdDto[i].docId + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'
				+ '<td style="display:none;" id="oCon'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherConcession + ' </td>'
				+ '<td style="display:none;" id="oPay'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherPay + ' </td>'
				+ '<td style="display:none;" id="quantity'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].quantity + ' </td>'
				+ '<td style="display:none;" id="oCoPay'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherCoPay + ' </td>'
				+ '<td style="display:none;" id="genRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].rate + ' </td>'

				+ '<td style="display:none;"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>'

				+ '<td> ' + a + ' </td>';

		setService = setService + '<td id="doccName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docName + ' </td>';

		// added by vinod

		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center" id="tAmt'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
					+ '</div>' + '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
						+ '</div>'
						+ '<input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="'
						+ Number(t.listSubServiceIpdDto[i].otherRate)
						+ '">'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + (t.listSubServiceIpdDto[i].otherRate)
						+ '"></td>';

			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
						+ '</div>'
						+ '<input type="hidden" class="notInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="'
						+ Number(t.listSubServiceIpdDto[i].otherRate) + '">'
						+ '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="'
						+ (t.listSubServiceIpdDto[i].otherRate)
						+ '"></td>';

			}
		}
		// added by vinod

		// added by kishor
		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService + '<td id="conS'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherConcession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="consPercSpon'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		} else {
			setService = setService + '<td style="display: none;" id="conS'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherConcession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display: none;" id="consPercSpon'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		}

		setService = setService

		+ '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].otherPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td>' + '<div class="text-right">' + datetime + '</div>'
				+ '</td>';
		setService = setService + '</td>';

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {
			setService = setService
					+ '<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '" onclick="editSponsorOnClickForDoctor('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';
			setService = setService
					+ '<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger deleteUserAccess billSlaveBtn'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '" onclick="cancleOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'
					+ t.listSubServiceIpdDto[i].cancle + '" id=btnCancle'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ' type="hidden"></a></td>';
		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '"  disabled="disabled" onclick="editSponsorOnClickForDoctor('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess billSlaveBtn'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '"  onclick="editSponsorOnClickForDoctor('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess billSlaveBtn'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}

		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceIpdDto[i].paidFlag == "N"
				&& t.listSubServiceIpdDto[i].cancle == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" onclick="setTotalPaidbySlave1('
					+ t.listSubServiceIpdDto[i].billDetailsId + ','
					+ t.listSubServiceIpdDto[i].serviceId
					+ ')" checked=checked id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" disabled="disabled" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';

		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#serviceDataOpdSponsor").html(setService);
}

function getBedDetailsForIpdSponsor(t, s) {
	// alert("hiiii");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/ipdbill/getPatientBedBill",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(html(r));
			getBedDetailsTempForSponsor(r, s);
			// setBillDetailsTemp(r);
		}
	});
}

function getBedDetailsTempForSponsor(t, s) {

	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	var nursing = "Nursing";
	var hallName = "";
	for ( var i = 0; i < t.listBedIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listBedIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');

		var netAmt = Number(t.listBedIpdDto[i].otherAmount)
				- Number(t.listBedIpdDto[i].concession);

		/*
		 * var dname= t.listBedIpdDto[i].docName;
		 * 
		 * if(dname==null) { dname="-"; }
		 */
		if (t.listBedIpdDto[i].paidByCashFlag == "Y") {
			if (t.listBedIpdDto[i].cancle == "Y") {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';
			}
		} else {
			if (t.listBedIpdDto[i].cancle == "Y") {

				setService = setService + '<tr id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService
						+ '<tr id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';
			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listBedIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listBedIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].billDetailsId + ' </td>'

				+ '<td style="display:none;" id="sponServId'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].serviceId + ' </td>'

				/*
				 * + '<td id="doccName'+(t.listBedIpdDto[i].billDetailsId)+'"> '+
				 * dname+' </td>'
				 */

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].subServiceId + ' </td>'

				/*
				 * + '<td style="display:none;" id="dId'+(t.listBedIpdDto[i].billDetailsId)+'"> '+
				 * t.listBedIpdDto[i].docId+' </td>'
				 */

				+ '<td style="display:none;" id="sponRate'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].otherRate + ' </td>'

				+ '<td style="display:none;" id="sponAmt'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].otherAmount + ' </td>'

				+ '<td style="display:none;" id="ehatHallIds"> '
				+ t.listBedIpdDto[i].ehatHallId + ' </td>'

				+ '<td style="display:none;" id="hallIDs"> '
				+ t.listBedIpdDto[i].hallID + ' </td>'

				+ '<td style="display:none;" id="idHallTypes"> '
				+ t.listBedIpdDto[i].idHallType + ' </td>'

				+ '<td style="display:none;" id="ehatHalltypeIds"> '
				+ t.listBedIpdDto[i].ehatHalltypeId + ' </td>'

				+ '<td style="display:none;" id="genRate'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].rate + ' </td>'

				+ '<td style="display:none;" id="SponGenAmt'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].amount + ' </td>';

		/*
		 * + '<td id="char'+(t.listBedIpdDto[i].billDetailsId)+'">' + '<div
		 * class="text-center">'+ t.listBedIpdDto[i].rate +'</div>' + '</td>';
		 */

		if (t.listBedIpdDto[i].subServiceId == 0) {

			setService = setService + '<td id="catName'
					+ (t.listBedIpdDto[i].billDetailsId) + '"> ' + (nursing)
					+ ":" + (hallName) + ' </td>';
		} else {
			hallName = t.listBedIpdDto[i].bedHall;

			if (t.listBedIpdDto[i].isCategory == 'N') {
				setService = setService + '<td id="catName'
						+ (t.listBedIpdDto[i].billDetailsId) + '"> '
						+ t.listBedIpdDto[i].bedHall + ' </td>';

			} else {

				hallName = t.listBedIpdDto[i].bedHall;
				setService = setService + '<td id="catName'
						+ (t.listBedIpdDto[i].billDetailsId) + '"> '
						+ t.listBedIpdDto[i].bedHall + ' </td>';
			}
		}

		// added by vinod
		if (t.listBedIpdDto[i].paidByCashFlag == "Y") {
			if (t.listBedIpdDto[i].cancle == "Y") {

				setService = setService + '<td style="display:none;"> '
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ t.listBedIpdDto[i].otherRate + '</div>' + '</td>'
						+ '<td id="char' + (t.listBedIpdDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIpdDto[i].otherRate).toFixed(2) + '</div>'
						+ '</td>';

			} else {

				if (t.listBedIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listBedIpdDto[i].otherRate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBedIpdDto[i].billDetailsId) + '" value="'
							+ netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBedIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIpdDto[i].billDetailsId) + '">'
							+ (t.listBedIpdDto[i].otherRate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '" value="'
							+ netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">' + t.listBedIpdDto[i].quantity
					+ '</div>' + '</td>'

					+ '<td id="con' + (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].otherAmount).toFixed(2) + '</div>'
					+ '</td>';

			// added by kishor
			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="conS'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].otherConcession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conSponPer'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display: none;" id="conS'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].otherConcession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display: none;" id="conSponPer'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].otherPay).toFixed(2) + '</div>'
					+ '</td>'

					/*
					 * + '<td id="cP' + (t.listBedIpdDto[i].billDetailsId) + '">' + '<div
					 * class="text-center">' +
					 * (t.listBedIpdDto[i].otherCoPay).toFixed(2) + '</div>' + '</td>'
					 */

					+ '<td id="dateSub' + (t.listBedIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBedIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editSponsorOnClickForBed('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBedIpdDto[i].cancle == "Y"
						|| t.listBedIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClickForBed('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled"  onclick="editSponsorOnClickForBed('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBedIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBedIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listBedIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId + '">';
			}
		} else {
			if (t.listBedIpdDto[i].cancle == "Y") {

				setService = setService + '<td style="display:none;"> '
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ t.listBedIpdDto[i].otherRate + '</div>' + '</td>'
						+ '<td id="char' + (t.listBedIpdDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIpdDto[i].otherRate).toFixed(2) + '</div>'
						+ '</td>';

			} else {

				if (t.listBedIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listBedIpdDto[i].otherRate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBedIpdDto[i].billDetailsId) + '" value="'
							+ netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBedIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIpdDto[i].billDetailsId) + '">'
							+ (t.listBedIpdDto[i].otherRate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBedIpdDto[i].billDetailsId)
							+ '" value="'
							+ netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">' + t.listBedIpdDto[i].quantity
					+ '</div>' + '</td>'

					+ '<td id="con' + (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].otherAmount).toFixed(2) + '</div>'
					+ '</td>';

			// added by kishor
			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="conS'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].otherConcession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conSponPer'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display: none;" id="conS'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].otherConcession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display: none;" id="conSponPer'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].otherPay).toFixed(2) + '</div>'
					+ '</td>'

					/*
					 * + '<td id="cP' + (t.listBedIpdDto[i].billDetailsId) + '">' + '<div
					 * class="text-center">' +
					 * (t.listBedIpdDto[i].otherCoPay).toFixed(2) + '</div>' + '</td>'
					 */

					+ '<td id="dateSub' + (t.listBedIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBedIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editSponsorOnClickForBed('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBedIpdDto[i].cancle == "Y"
						|| t.listBedIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClickForBed('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editSponsorOnClickForBed('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBedIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBedIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" onclick="cancleOnClick('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBedIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listBedIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						// + '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId
						+ '" onclick=setService("sponsor",'
						+ t.listBedIpdDto[i].billDetailsId + ')>';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId
						+ '" onclick=setService("sponsor",'
						+ t.listBedIpdDto[i].billDetailsId + ')>';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#bedDataForSponsor").html(setService);
}

function getSubServiceDetails1ForOTAlsoSponsor(i, t, s)

{
	// alert("Hi kishor");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetailsTemp1ForOTAlsoSponsor(i, r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function getSubServiceDetailsTemp1ForOTAlsoSponsor(j, t, s) {
	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	// Code for get distinct operation ids start
	var count = 0;
	var otCountIds = new Array(10);
	var otNames = new Array(10);
	otCountIds[count] = t.listSubServiceIpdDto[0].otCount;
	otNames[count] = t.listSubServiceIpdDto[0].otProcedure;
	
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		
		var oCount = t.listSubServiceIpdDto[i].otCount;		
		var oName = t.listSubServiceIpdDto[i].otProcedure;		
		//if(oCount != otCountIds[count]){
		if(oName != otNames[count]){
			
			count = count + 1;
			otCountIds[count] = oCount;
			otNames[count] = oName;
		}		
	}	
	// Code for get distinct operation ids end
	
	var otIdsDiffer = 0;
	var otNamesDiffer = 0;
	for(var h = 0; h <= count; h++){
			
		otIdsDiffer = otCountIds[h];		
		otNamesDiffer = otNames[h];		
		setService = setService 
		
		+ '<tr>'
		+ '<td style="font-size:12px" colspan=12><b>'+otNamesDiffer+'</b></td> '
		+ '<td><input type="hidden" id="otCountId" value='+otIdsDiffer+'></td></tr>';
		
	var a = 0;
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		
		//var otCountId = t.listSubServiceIpdDto[i].otCount;
		var otProcedure = t.listSubServiceIpdDto[i].otProcedure;
		//if(otCountId == otIdsDiffer){
	if(otProcedure == otNamesDiffer){	
		a = 1 + a;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].otherAmount)
				- Number(t.listSubServiceIpdDto[i].concession);
		var cghsCode = "(" + t.listSubServiceIpdDto[i].cghsCode + ")";
		if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
				|| cghsCode == "(-)" || cghsCode == "(null)") {
			cghsCode = "";
		}
		if (dname == null) {
			dname = "-";
		}

		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			}
		} else {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService + '<tr id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService + '<tr id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';

		/*
		 * + '<td id="catName' + (t.listSubServiceIpdDto[i].billDetailsId) +
		 * '"> ' + t.listSubServiceIpdDto[i].categoryName + ' </td>'
		 */

		setService = setService
				+ '<td id="catName'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"><div class="row"><div class="col-md-10"><label data-toggle="tooltip" data-placement="top" title="'
				+ t.listSubServiceIpdDto[i].otProcedure + '"> '
				+ t.listSubServiceIpdDto[i].categoryName + cghsCode
				+ '</label></div> </div></td>';

		setService = setService

		+ '<td id="doccName' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> ' + dname + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="otProcedureIdSpo'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otProcedureId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherAmount + ' </td>'

				+ '<td style="display:none;" id="genRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].rate + ' </td>'

				+ '<td style="display:none;" id="sponGenAmt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="drdeskflagSpon'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].otherAmount)
									.toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].otherAmount)
									.toFixed(2) + '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div>' + '</td>';

			// added by kishor
			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService
						+ '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService
						+ '<td style="display: none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td style="display: none;" id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherPay).toFixed(2)
					+ '</div>' + '</td>'

					/*
					 * + '<td id="cP' +
					 * (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
					 * class="text-center">' +
					 * (t.listSubServiceIpdDto[i].otherCoPay).toFixed(2) + '</div>' + '</td>'
					 */

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editSponsorOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editSponsorOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				if (t.listSubServiceIpdDto[i].drdeskflag == "C") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  disabled="disabled" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';

				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPopUpDataForOT('
							+ t.listSubServiceIpdDto[i].serviceId
							+ ','
							+ t.listSubServiceIpdDto[i].subServiceId
							+ ','
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ',\'sponsor\','
							+ t.listSubServiceIpdDto[i].amount
							+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';

				}
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		} else {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>'
							/*+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].otherAmount)
									.toFixed(2)
							+ '</div>'*/
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>'
							/*+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].otherAmount)
									.toFixed(2) + '</div>' */
							+ '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div>' + '</td>';

			// added by kishor
			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService
						+ '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService
						+ '<td style="display: none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td style="display: none;" id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherPay).toFixed(2)
					+ '</div>' + '</td>'

					/*
					 * + '<td id="cP' +
					 * (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
					 * class="text-center">' +
					 * (t.listSubServiceIpdDto[i].otherCoPay).toFixed(2) + '</div>' + '</td>'
					 */

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editSponsorOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editSponsorOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				if (t.listSubServiceIpdDto[i].drdeskflag == "C") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal"    disabled="disabled" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';

				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPopUpDataForOT('
							+ t.listSubServiceIpdDto[i].serviceId
							+ ','
							+ t.listSubServiceIpdDto[i].subServiceId
							+ ','
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ',\'sponsor\','
							+ t.listSubServiceIpdDto[i].amount
							+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';

				}
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';
	}
	}
  }
	$("#OTForSponsor" + j).html(setService);
}

function getSubServiceDetails1ForConsultingVisitingChargesSponsor(i, t, s) {
	// alert("Hi kishor");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetails1ForConsultingVisitingChargesTempSponsor(i, r,
					s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');

		}
	});
}
function getSubServiceDetails1ForConsultingVisitingChargesTempSponsor(j, t, s) {

	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].otherAmount)
				- Number(t.listSubServiceIpdDto[i].concession);

		if (dname == null) {
			dname = "-";
		}

		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			} else {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			}
		} else {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService + '<tr id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			} else {

				setService = setService
						+ '<tr onclick="editOnClickForCVCSponsor('
						+ t.listSubServiceIpdDto[i].billDetailsId + ')" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';

		/*
		 * + '<td id="catName'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+
		 * t.listSubServiceIpdDto[i].categoryName+' </td>'
		 */

		setService = setService + '<td id="doccName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> ' + dname
				+ ' </td>';

		setService = setService

		+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherAmount + ' </td>'

				+ '<td style="display:none;" id="genRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].rate + ' </td>'

				+ '<td style="display:none;" id="sponGenAmt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].rate + ' </td>'
				+ '<td style="display:none;" id="drdeskflagDCSP'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					/**/

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div>' + '</td>';

			// added by kishor
			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService
						+ '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService
						+ '<td style="display:none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td style="display:none;" id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherPay).toFixed(2)
					+ '</div>' + '</td>'

					/*
					 * + '<td id="cP' +
					 * (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
					 * class="text-center">' +
					 * (t.listSubServiceIpdDto[i].otherCoPay).toFixed(2) + '</div>' + '</td>'
					 */

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForCVCSponsor('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForCVCSponsor('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClickForCVCSponsor('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		} else {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					/**/

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div>' + '</td>';

			// added by kishor
			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService
						+ '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService
						+ '<td style="display:none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td style="display:none;" id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherPay).toFixed(2)
					+ '</div>' + '</td>'

					/*
					 * + '<td id="cP' +
					 * (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
					 * class="text-center">' +
					 * (t.listSubServiceIpdDto[i].otherCoPay).toFixed(2) + '</div>' + '</td>'
					 */

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForCVCSponsor('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
				/* || t.listSubServiceIpdDto[i].isModify == "N" */) {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForCVCSponsor('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClickForCVCSponsor('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#CVCSponsor" + j).html(setService);

}
/*******************************************************************************
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017
 ******************************************************************************/
function getSubServiceDetails1ForSponsor(i, t, s) {
	// var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	// alert(chargesSlaveId);
	// var chargesSlaveId =8;
	// alert(chargesSlaveId);
     var drdeskflag ="sponsorpat"; // Added Rohini on 08/09/2023
     
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform2" : t,
			"call2" : s,
			"chargesSlaveId" : chargesSlaveId
		},*/
		/* url : "ehat/ipdbill/getPatientServiceBillSponsorForIpd", */
		//url : "ehat/ipdbill/getIpdPatientServiceBill2",
		data : {
			"treatmentId" : t,
			"serviceId" : s,
			"drdeskflag" : drdeskflag
		},
		url : "ehat/ipdbillmgt/getPatientServiceBill",
		success : function(r) {

			getSubServiceDetailsTemp1ForSponsor(i, r, s);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function getSubServiceDetailsTemp1ForSponsor(j, t, s) {

	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].otherAmount)
				- Number(t.listSubServiceIpdDto[i].concession);
		ssid = t.listSubServiceIpdDto[i].serviceId;
		var cghsCode = "(" + t.listSubServiceIpdDto[i].cghsCode + ")";
		if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
				|| cghsCode == "(-)" || cghsCode == "(null)") {
			cghsCode = "";
		}
		if (dname == null) {
			dname = "-";
		}

		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			}
		} else {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService + '<tr id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService + '<tr  id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';

		if (ssid == 14) {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].inventoryName + ' </td>';
		} else if (ssid == 16) {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].pharmaName + ' </td>';
		} else if (ssid == 11 || ssid == 13) {// Added by laxman for sended
												// lab test coloe change.

			if ((t.listSubServiceIpdDto[i].sndtolabflag) == "Y") {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" style="color: green;"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			} else {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			}
		}// code By Sanjay on 26-03-2018 for changes the testname color when
			// it sent to RIS
		else if (ssid == 12) {

			if ((t.listSubServiceIpdDto[i].sndtorisflag) == "Y") {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" style="color: #00bfff;"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			} else {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			}
		} else {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].categoryName + cghsCode
					+ ' </td>';
		}

		setService = setService

		+ '<td id="doccName' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> ' + dname + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherAmount + ' </td>'

				+ '<td style="display:none;" id="genRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].rate + ' </td>'

				+ '<td style="display:none;" id="sponGenAmt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="emrPerSpon'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].emrPer + ' </td>'

				+ '<td style="display:none;" id="drdeskflagSpon'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>'

				+ '<td style="display:none;" id="sndtolabflag'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].sndtolabflag + ' </td>'
				
				
				+	'<td style="display:none;" id="barCodeIdOpdSponsor'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="spclId'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].specialityId+' </td>'
				+	'<td style="display:none;" id="sampleTypeOpdSponsorr'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].sampleTypeId+' </td>'
				+	'<td style="display:none;" id="barCodeIdOpdSponsor'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="inOutHouseOpdSponsor'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ t.listSubServiceIpdDto[i].inOutHouse+'</td>'
				+	'<td style="display:none;" id="histopathLabOpdSponsor'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ t.listSubServiceIpdDto[i].histopathLab+'</td>'
				+	'<td style="display:none;" id="collectionDateOpdSponsor'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].collectionDate+' </td>'
				+	'<td style="display:none;" id="collectionTimeOpdSponsor'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].collectionTime+' </td>'
				+	'<td style="display:none;" id="regRefDocId'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="isTemplateWiseTestSponsor'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].templateWise +' </td>'
				+	'<td style="display:none;" id="isCombinationSponsor'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].iscombination +' </td>'

				+ '<td style="display:none;" id="drdeskflagSpon'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div>' + '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService
						+ '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService
						+ '<td style="display: none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td style="display: none;" id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherPay).toFixed(2)
					+ '</div>' + '</td>'

					/*
					 * + '<td id="cP' +
					 * (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
					 * class="text-center">' +
					 * (t.listSubServiceIpdDto[i].otherCoPay).toFixed(2) + '</div>' + '</td>'
					 */

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editSponsorOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editSponsorOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listSubServiceIpdDto[i].serviceId
						+ ','
						+ t.listSubServiceIpdDto[i].subServiceId
						+ ','
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ',\'IpdSponsor\','
						+ t.listSubServiceIpdDto[i].otherAmount
						+ ', '
						+ t.listSubServiceIpdDto[i].otherConcession
						+ ','
						+ t.listSubServiceIpdDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		} else {
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherAmount).toFixed(2)
					+ '</div>' + '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService
						+ '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService
						+ '<td style="display: none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].otherConcession)
								.toFixed(2) + '</div>' + '</td>'

						+ '<td style="display: none;" id="conSponPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherPay).toFixed(2)
					+ '</div>' + '</td>'

					/*
					 * + '<td id="cP' +
					 * (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
					 * class="text-center">' +
					 * (t.listSubServiceIpdDto[i].otherCoPay).toFixed(2) + '</div>' + '</td>'
					 */

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editSponsorOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editSponsorOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listSubServiceIpdDto[i].serviceId
						+ ','
						+ t.listSubServiceIpdDto[i].subServiceId
						+ ','
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ',\'IpdSponsor\','
						+ t.listSubServiceIpdDto[i].otherAmount
						+ ', '
						+ t.listSubServiceIpdDto[i].otherConcession
						+ ','
						+ t.listSubServiceIpdDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#serviceDataForSponsor" + j).html(setService);

}

function editSponsorOnClickForDoctor(billDetailsId) {

	// alert("hi");
	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#rateIpdSponsor').val($('#char' + billDetailsId).text());
	$('#amountIpdSponsor').val($('#char' + billDetailsId).text());
	var defchargesfromConfIpd = $('#genRate' + billDetailsId).text();
	$('#defchargesfromConfIpd').val(defchargesfromConfIpd);
	// $('#rateIpdSponsor').val($('#char'+ billDetailsId).text());
	$('#perticularIpdSponsor').val($('#doccName' + billDetailsId).text());
	$('#perticularIpdSponsor').attr('readonly', 'true');
	$("#narrationBill").val('narrationBill');
	$('#concessionIpdSponsor').val($('#conS' + billDetailsId).text());
	$('#concessionIpdSponsorPer')
			.val($('#consPercSpon' + billDetailsId).text());
	$('#payIpdSponsor').val($('#p' + billDetailsId).text());
	// $('#concessionIpdSponsor').val(0);
	// $('#concessionIpdSponsorOnPerc').val(0);
	var a = parseInt($('#sId' + billDetailsId).text());
	$('#servIdIpdSponsor').val(a).text();
	$("#serviceid").val(a);
	$('#servIdIpdSponsor option:not(:selected)').prop('disabled', true);
	var d = parseInt($('#docId' + billDetailsId).text()); // alert(d);
	$('#doctorNameIpdSponsor').val(d);
	$('#doctorNameIpdSponsor').select2($('#doccName' + billDetailsId).text());
	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	// alert(subserviceid);
	$("#subserviceid").val(subserviceid);
	// $('#rateOpdSponsor').attr('readonly', 'true');
	$('#amountIpdSponsor').attr('readonly', 'true');
	$('#qtyIpdSponsor').val($('#quantity' + billDetailsId).text());
	$('#qtyIpdSponsor').attr('readonly', 'true');
	$('#qtyOpdSponsor').attr('readonly', 'true');

	$('#amountIpdSponsor').val($('#char' + billDetailsId).text());

	$('#payIpdSponsor').val($('#p' + billDetailsId).text());
	$('#payOpdSponsor').attr('readonly', 'true');
	// $('#coPayIpdSponsor').val($('#oCoPay'+billDetailsId).text());
	$('#coPayIpdSponsor').val(0);
	$('#coPayIpdSponsor').attr('readonly', 'true');

	$('#chkOpdBill' + billDetailsId).change(function() {// This function use to
														// call clear fields
		// alert("HI"+billDetailsId);
		crearAllFields();
	});

}

function editSponsorOnClick(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticularIpdSponsor').val($('#catName' + billDetailsId).text());

	var a = parseInt($('#sId' + billDetailsId).text());

	//$('#servIdIpdSponsor').val(a).text();
	$('#servIdIpdSponsor').select2('val',a);
	$("#serviceid").val(a);

	// $('#servIdIpdSponsor option:not(:selected)').prop('disabled', true);

	var defchargesfromConfIpd = $('#genRate' + billDetailsId).text();
	$('#defchargesfromConfIpd').val(defchargesfromConfIpd);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	// alert(subserviceid);
	$("#subserviceid").val(subserviceid);
	// $("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true);

	var d = parseInt($('#dId' + billDetailsId).text());
	$('#doctorNameIpdSponsor').select2('val', d);

	$('#rateIpdSponsor').val($('#char' + billDetailsId).text());

	$('#qtyIpdSponsor').val($('#q' + billDetailsId).text());

	$('#concessionIpdSponsor').val($('#con' + billDetailsId).text());
	$('#concessionIpdSponsorPer').val($('#conSponPer' + billDetailsId).text());

	// $('#concessionIpdSponsor').val(0);
	// $('#concessionIpdSponsorPer').val(0);

	$('#amountIpdSponsor').val($('#amt' + billDetailsId).text());
	$('#amountIpdSponsor').attr('readonly', 'true');

	$('#payIpdSponsor').val($('#p' + billDetailsId).text());

	// $('#coPayIpdSponsor').val($('#cP' + billDetailsId).text());
	$('#coPayIpdSponsor').val(0);
	$('#drdeskflagSpon').val($('#drdeskflagSpon' + billDetailsId).text());
	var b = $('#otProcedureIdSpo' + billDetailsId).text();
	$('#otProcedureId').val(b);

	$('#chkOpdBill' + billDetailsId).change(function() {// This function use to
														// call clear fields
		// alert("HI"+billDetailsId);
		crearAllFields();
	});

	$("#narrationBill").val('narrationBill');

	$('#sndtolabflag').val($('#sndtolabflag' + billDetailsId).text());

	// added by tarique aalam
	var emrP = parseFloat($('#emrPerSpon' + billDetailsId).text());
	$('#emrPer').val(emrP);
	if (emrP > 0) {
		$("#emrChrFlag").prop("checked", true);
		$('#emrPer').css("display", "inline");
	}
	// $('#rateIpdSponsor2').val($('#char' + billDetailsId).text());
	fetchSuperCatForBillng(subserviceid, "sponsor");
	
	var spId = parseInt($('#spclId' + billDetailsId).text());
	$('#specialityIdSponsor').select2('val', spId);
}

function editSponsorOnClickForOT(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticularIpdSponsor').val($('#catName' + billDetailsId).text());
	$('#perticularIpdSponsor').attr('readonly', 'true');

	var a = parseInt($('#sId' + billDetailsId).text());
	//$('#servId').val(a).text();
	$('#servId').select2('val',a);
	$('#servIdIpdSponsor').select2('val',a);
	
	$("#serviceid").val(a);
	// alert("HIII"+a);
	// $('#servIdIpdSponsor option:not(:selected)').prop('disabled', true);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	// alert(subserviceid);
	$("#subserviceid").val(subserviceid);
	// $("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true);

	var defchargesfromConfIpd = $('#genRate' + billDetailsId).text();
	$('#defchargesfromConfIpd').val(defchargesfromConfIpd);
	var d = parseInt($('#dId' + billDetailsId).text());
	$('#doctorNameIpdSponsor').select2('val', d);

	$('#rateIpdSponsor').val($('#sponRate' + billDetailsId).text());

	$('#qtyIpdSponsor').val($('#q' + billDetailsId).text());

	$('#concession').val($('#con' + billDetailsId).text());
	$('#concessionIpdSponsorPer').val($('#conSponPer' + billDetailsId).text());

	// $('#concession').val(0);
	// $('#concessionIpdSponsorPer').val(0);

	$('#amountIpdSponsor').val($('#sponAmt' + billDetailsId).text());
	$('#amountIpdSponsor').attr('readonly', 'true');

	$('#payIpdSponsor').val($('#p' + billDetailsId).text());

	// $('#coPayIpdSponsor').val($('#cP' + billDetailsId).text());
	$('#coPayIpdSponsor').val(0);
	$('#chkOpdBill' + billDetailsId).change(function() {// This function use to
														// call clear fields
		// alert("HI"+billDetailsId);
		crearAllFields();
	});

	$("#narrationBill").val('narrationBill');
	
	var spId = parseInt($('#spclId' + billDetailsId).text());
	$('#specialityIdSponsor').select2('val', spId);
}
function editSponsorOnClickForBed(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticularIpdSponsor').val($('#catName' + billDetailsId).text());

	var a = parseInt($('#sponServId' + billDetailsId).text());
	//$('#servId').val(a).text();
	$('#servId').select2('val',a);
	$("#serviceid").val(a);
	//$("#servIdIpdSponsor").val(a);
	$('#servIdIpdSponsor').select2('val',a);

	$('#servIdIpdSponsor option:not(:selected)').prop('disabled', true);

	var defchargesfromConfIpd = $('#genRate' + billDetailsId).text();
	$('#defchargesfromConfIpd').val(defchargesfromConfIpd);
	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	// alert(subserviceid);
	$("#subserviceid").val(subserviceid);
	// $("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true);

	/*
	 * var d=parseInt($('#dId'+billDetailsId).text());
	 * $('#doctorName').select2('val',d);
	 */

	$('#rateIpdSponsor').val($('#sponRate' + billDetailsId).text());

	$('#qtyIpdSponsor').val($('#q' + billDetailsId).text());

	$('#concessionIpdSponsor').val($('#conS' + billDetailsId).text());
	$('#concessionIpdSponsorPer').val($('#conSponPer' + billDetailsId).text());
	// $('#concessionIpdSponsor').val(0);
	// $('#concessionIpdSponsorPer').val(0);

	$('#amountIpdSponsor').val($('#sponAmt' + billDetailsId).text());
	$('#amountIpdSponsor').attr('readonly', 'true');

	$('#payIpdSponsor').val($('#p' + billDetailsId).text());

	// $('#coPayIpdSponsor').val($('#cP' + billDetailsId).text());
	$('#coPayIpdSponsor').val(0);

	/*
	 * $('#chkOpdBill'+billDetailsId).change(function() {//This function use to
	 * call clear fields // alert("HI"+billDetailsId); crearAllFields(); });
	 */

	$("#narrationBill").val('narrationBill');
	
	var spId = parseInt($('#spclId' + billDetailsId).text());
	$('#specialityIdSponsor').select2('val', spId);
}

function editOnClickForCVCSponsor(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticularIpdSponsor').val($('#doccName' + billDetailsId).text());

	var chargesfromConf = $('#genRate' + billDetailsId).text();

	$('#chargesfromConfIpd').val(chargesfromConf);

	var a = parseInt($('#sId' + billDetailsId).text());
	//$('#servIdIpdSponsor').val(a).text();
	$('#servIdIpdSponsor').select2('val',a);
	$("#serviceid").val(a);
	// alert(a);
	// $('#servIdIpdSponsor option:not(:selected)').prop('disabled', true);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	// alert(subserviceid);
	$("#subserviceid").val(subserviceid);
	// $("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true);

	var d = parseInt($('#dId' + billDetailsId).text());
	$('#doctorNameIpdSponsor').select2('val', d);

	$('#rateIpdSponsor').val($('#char' + billDetailsId).text());
	// $('#rateIpdSponsor').attr('readonly', 'true');

	$('#qtyIpdSponsor').val($('#q' + billDetailsId).text());

	$('#concessionIpdSponsor').val($('#con' + billDetailsId).text());
	$('#concessionIpdSponsorPer').val($('#conSponPer' + billDetailsId).text());

	// $('#concessionIpdSponsor').val(0);
	// $('#concessionIpdSponsorPer').val(0);

	$('#amountIpdSponsor').val($('#amt' + billDetailsId).text());
	// $('#amountIpdSponsor').attr('readonly', 'true');

	$('#payIpdSponsor').val($('#p' + billDetailsId).text());

	// $('#coPayIpdSponsor').val($('#cP' + billDetailsId).text());
	$('#coPayIpdSponsor').val(0);

	$('#chkOpdBill' + billDetailsId).change(function() {// This function use to
														// call clear fields
		// alert("HI"+billDetailsId);
		crearAllFields();
	});

	$("#narrationBill").val('narrationBill');
	$("#drdeskflagSpon").val($("#drdeskflagDCSP" + billDetailsId).text());
	
	var spId = parseInt($('#spclId' + billDetailsId).text());
	$('#specialityIdSponsor').select2('val', spId);
}

/*******************************************************************************
 * @code for Sponsor save or update services to ipd bill
 ******************************************************************************/
function saveServiceToSponsorPatient(callform) {
	// Added By BILAL For narration of receipt at the time of edit
	var narration = $("#narration").val();
	if (narration == "narration") {
		setnarationpopupipd();
		return false;
	}
	var narrationid = $('#narrationid').val();
	if (narrationid != "" || narrationid != null || narrationid != undefined) {
		closePopupnarrationipd();
	}

	if (narrationid == "" || narrationid == null || narrationid == undefined) {
		narrationid = "-";
	}

	// Added By Kishor For narration of Bill at the time of edit
	var narrationBill = $("#narrationBill").val();
	if (narrationBill == "narrationBill") {
		setnarationpopupBill();
		return false;
	}

	var narrationidBill = $('#narrationidBill').val();
	if (narrationidBill != "" || narrationidBill != null
			|| narrationidBill != undefined) {
		closePopupnarrationBill();
	}

	if (narrationidBill == "" || narrationidBill == null
			|| narrationidBill == undefined) {
		narrationidBill = "-";
	}

	var drdeskflagSpon1 = $('#drdeskflagSpon').val();
	var update = $('#queryType').val();
	if (update == "update") {
		// alert("in 10936");
		if (drdeskflagSpon1 == "" || drdeskflagSpon1 == null
				|| drdeskflagSpon1 == undefined) {
			drdeskflagSpon1 = "-";
		}
		var drdeskflagSpon = drdeskflagSpon1.trim();
	}

	var chargesConf = $("#chargesfromConfIpd").val();

	var IpdGenRate = $("#defchargesfromConfIpd").val();

	// alert(defchargesfromConfIpd);

	var serviceId = $("#serviceid").val();

	if (serviceId == 4) {
		alert("Can not edit Surgery Charges");
		crearAllFields()();
		return false;
	}

	// Only for Consulting and Visiting
	if (serviceId == 5) {

		if (($("#doctorNameIpdSponsor option:selected").val()) == 0) {
			alert("Please select Doctor...!!!");
			return false;
		}

		if ($("#timeFrom3").val() == "") {
			var billDetailsId = $('#billDetailsId').val();
			if (billDetailsId == 0) {
				alert("Please select start Time...!!!");
				return false;
			}
		}
	}

	/*
	 * if (serviceId == 15) { alert("Can not add Administrative Charges");
	 * crearAllFields(); return false; }
	 */

	var callfrom = $('#saveServiceCallFrom').val();
	var masterReceiptId = $('#receiptMasterId').val();

	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	// alert(sponsorId+"sponsorId///"+chargesSlaveId);
	var iscombination = $("#iscombinationsponsorIpd").val();
	var receiptOf = $("#receiptOf").val();
	var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();
	var hallId = $("#hallId").val();

	var sndToLabFlag = $("#sndtolabflag").val().trim();

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}

	if (recSlaveIdIPD == "" || recSlaveIdIPD == null
			|| recSlaveIdIPD == undefined || isNaN(recSlaveIdIPD)) {
		recSlaveIdIPD = 0;
	}
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (callform == "IpdSponsor3") {
		hallId = 2;
		sponsorId = 0;
		chargesSlaveId = 0;
	}

	if (callform == "IpdSponsor4") {
		hallId = 0;
		sponsorId = 0;
		chargesSlaveId = 0;
	}
	if (masterReceiptId == "" || masterReceiptId == null
			|| masterReceiptId == undefined || isNaN(masterReceiptId)) {
		masterReceiptId = 0;
	}

	var emrPer = $('#emrPer').val(); // added by Tarique Aalam
	if (emrPer == "" || emrPer == null || emrPer == undefined) {
		emrPer = 0;
	}

	/*
	 * if(serviceId==2){ var queryType = $('#queryType').val(); var
	 * billDetailsId = $('#billDetailsId').val(); //var doctorId = $(
	 * "#docId"+billDetailsId ).text(); var doctorId = $( "#doctorNameIpdSponsor
	 * option:selected" ).val();
	 * 
	 * var recSlaveId = $('#receiptSlaveId').val(); //receipt slave id //var
	 * cancel=$('#btnCancle'+billDetailsId).val(); //alert(cancel); var
	 * patienttId = $("#pId").val(); var treatmentId = $("#tId").val(); var
	 * departmentId = $("#depdocdeskid").val(); ; var billId =
	 * parseInt($("#billNo").html());//$("#bNo").val(); //var sourceTypeId =
	 * $("#sourceTypeId").val();; var otherRate = $("#amountIpdSponsor").val();
	 * var otherConcession = $("#concessionIpdSponsor").val(); var quantity =
	 * $("#qtyIpdSponsor").val(); var otherAmount =
	 * $("#amountIpdSponsor").val(); var otherPay = $("#payIpdSponsor").val();
	 * var otherCoPay = $("#coPayIpdSponsor").val(); var createdDateTime =
	 * $("#finalDate").val(); alert(createdDateTime); var subServiceId =
	 * $("#subserviceid").val(); var subservicesname =
	 * $("#perticularIpdSponsor").val(); var otherConcessionPer =
	 * $("#concessionIpdSponsorPer").val(); // var servicename =
	 * $("#servicename").val(); var unitId = $("#uId").val(); var module =
	 * "opd";
	 * 
	 * 
	 * //var otherRate=rate; var amount=0; var concession=0; var rate=0; var
	 * pay=0; var coPay=0; //var concession=0;
	 * 
	 * if(IpdGenRate==0) {
	 * 
	 * 
	 * rate=otherRate; amount=(otherRate * quantity) ; // alert("In
	 * iff"+otherAmount); var otherconAmt=((otherConcessionPer *
	 * amount)/100).toFixed(2); pay=0; coPay=amount-otherconAmt; concession =
	 * otherconAmt; } else{
	 * 
	 * rate=IpdGenRate; amount=(rate * quantity); var
	 * otherconAmt=((otherConcessionPer * amount)/100).toFixed(2); //alert("In
	 * else"+otherAmount); pay=0; coPay=amount-otherconAmt; concession =
	 * otherconAmt; //alert(otherConcession); }
	 * 
	 * var tempDate = createdDateTime.split("/"); var addDate = new
	 * Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	 * 
	 * if(unitId ==0){ unitid = $("#allunitid").val(); }
	 * 
	 * if (subServiceId == "" || subServiceId == null || subServiceId ==
	 * undefined || isNaN(subServiceId)) { subServiceId = -1; }
	 * 
	 * var ratevalidation = $('#rateIpdSponsor').val();
	 * 
	 * if (ratevalidation == "" || ratevalidation == null || ratevalidation ==
	 * undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
	 * ratevalidation = 0; alert("Please Enter Rate"); return false; }
	 * 
	 * var serviceDetails = { listBillDetailsIpd : [] };
	 * serviceDetails.listBillDetailsIpd.push({
	 * 
	 * patienttId : patienttId, billDetailsId : billDetailsId, serviceId :
	 * serviceId, doctorId : doctorId, treatmentId : treatmentId, departmentId :
	 * departmentId, billId : billId, //cancel : cancel, //sourceTypeId :
	 * sourceTypeId, rate : rate, pay : pay, coPay : coPay, otherConcession :
	 * otherConcession, concession : concession, quantity : quantity, amount :
	 * amount, otherPay : otherPay, otherCoPay : otherCoPay, serviceId :
	 * serviceId, subServiceId : subServiceId, unitId : unitId, createdDateTime :
	 * addDate, recSlaveId : recSlaveId, callfrom : callfrom, masterReceiptId :
	 * masterReceiptId, subservicesname : subservicesname, urgentFlag : "N",
	 * sponsorId : sponsorId, chargesSlaveId : chargesSlaveId, otherRate :
	 * otherRate, otherAmount : otherAmount,
	 * 
	 * concessionPer : otherConcessionPer, iscombination : iscombination,
	 * receiptOf : receiptOf, narration : narrationid, narrationidBill :
	 * narrationidBill, accountStatusIpd : "N" });
	 * 
	 * serviceDetails = JSON.stringify(serviceDetails);
	 * 
	 * if(listBillDetails == null){ alert("Service details are Null!!!!");
	 * return false; }
	 * 
	 * var inputs = [];
	 *  // patient details push inputs.push("serviceDetails="+
	 * encodeURIComponent(serviceDetails)); inputs.push("queryType="+
	 * queryType); // inputs.push("module="+ module); inputs.push("callfrom="+
	 * callfrom); inputs.push("billDetailsId="+ encodeURIComponent(recSlaveId));
	 * 
	 * 
	 * var str = inputs.join('&');
	 * 
	 * 
	 * jQuery.ajax({ async : false, type : "POST", data : str + "&reqType=AJAX",
	 * error : function() { alert('Network Issue!!!'); },
	 * 
	 * url : "ehat/doctordesk/saveIpd",
	 * 
	 * success : function(r) {
	 * 
	 * 
	 * if(r >0){ if(queryType=='insert') { alertify.success("Doctor assign
	 * Successfully"); } else{ alertify.success("Doctor Update Successfully"); }
	 * 
	 * getPatientBillAmountIpd(treatmentId);
	 * 
	 * $('#perticularIpdSponsor').attr('readonly', 'false');
	 * $('#perticularIpdSponsor').val("");
	 * 
	 * $("#rateIpdSponsor").val("");
	 * 
	 * $("#qtyIpdSponsor").val("1"); $("#concessionIpdSponsor").val("0");
	 * $("#amountIpdSponsor").val("0"); $("#payIpdSponsor").val("0");
	 * $("#servIdIpdSponsor").val("0"); calculatePerticularTotal1();
	 * $("#concessionIpdSponsorPer").val(0);
	 *  } } }); $('#queryType').val("insert"); $('#billDetailsId').val("0");
	 * $('#subserviceid').val("-1");
	 *  } else
	 */if (serviceId == 3) {
		var queryType = $('#queryType').val();
		var billDetailsId = $('#billDetailsId').val();

		// var doctorId = $( "#doctorName option:selected" ).val();
		/* var num = isNaN(parseInt(doctorId)) ? 0 : parseInt(doctorId); */
		// alert(doctorId);
		var patienttId = $("#pId").val();
		// var doctorId =$('#doctorName').val();
		var treatmentId = $("#treatmentId").text();

		var departmentId = $("#depdocdeskid").val();
		var billId = parseInt($("#billNo").html());// $("#bNo").val();
		var sourceTypeId = $("#sourceTypeId").val();
		var otherRate = $("#rateIpdSponsor").val();
		var otherConcession = $("#concessionIpdSponsor").val();
		var otherConcessionPer = $("#concessionIpdSponsorPer").val();
		var quantity = $("#qtyIpdSponsor").val();

		var otherAmount = $("#amountIpdSponsor").val();

		var otherPay = $("#payIpdSponsor").val();
		var otherCoPay = $("#coPayIpdSponsor").val();
		var createdDateTime = $("#finalDate").val();
		/* alert(createdDateTime); */

		var subServiceId = parseInt($("#subserviceid").val());

		if (subServiceId == -1) {
			alert("Please enter valid service Name");
			$('#perticularIpdSponsor').val("");
			$("#rateIpdSponsor").val("");
			$("#qtyIpdSponsor").val("1");
			$("#concessionIpdSponsor").val("0");
			$("#amountIpdSponsor").val("0");
			$("#concessionIpdSponsorPer").val(0);
			$("#payIpdSponsor").val("0");
			$("#coPayIpdSponsor").val("0");
			$("#servIdIpdSponsor").val("0");
			return false;
		}

		var ratevalidation = $('#rateIpdSponsor').val();

		/*
		 * if (ratevalidation == "" || ratevalidation == null || ratevalidation ==
		 * undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
		 * ratevalidation = 0; alert("Please Enter Rate"); return false; }
		 */

		if (otherConcessionPer == "" || otherConcessionPer == null
				|| otherConcessionPer == undefined || otherConcessionPer == 0
				|| isNaN(otherConcessionPer)) {
			otherConcessionPer = 0;

		}

		var subservicesname = $("#perticularIpdSponsor").val();
		var servicename = $("#servicename").val();
		var unitId = $("#uId").val();

		var amount = 0;
		var concession = 0;
		var rate = 0;
		var pay = 0;
		var coPay = 0;

		if (IpdGenRate == 0) {
			/*
			 * rate=otherRate; amount=(otherRate * quantity) ; // alert("In
			 * iff"+otherAmount); coPay=otherAmount-otherConcession;
			 * 
			 * pay=0; //alert(otherPay);
			 */

			rate = otherRate;
			amount = (otherRate * quantity);
			// alert("In iff"+otherAmount);
			var otherconAmt = ((otherConcessionPer * amount) / 100).toFixed(2);
			pay = 0;
			coPay = amount - otherconAmt;
			concession = otherconAmt;
		} else {
			/*
			 * //var otherRate=chargesfromConf ; rate=IpdGenRate; amount=(rate *
			 * quantity) ; //alert("In else"+otherAmount);
			 * 
			 * Pay=0; coPay=amount-otherConcession; //alert(otherPay);
			 */
			rate = IpdGenRate;
			amount = (rate * quantity);
			var otherconAmt = ((otherConcessionPer * amount) / 100).toFixed(2);
			// alert("In else"+otherAmount);
			pay = 0;
			coPay = amount - otherconAmt;
			concession = otherconAmt;
			// alert(otherConcession);
		}

		// @author bilal for IPD receipt edit

		// var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();
		var inOutHouse = 0;
		var histopathLab = "N";
		if(serviceId == 11){
			
			inOutHouse = $('#inOutHouseCount').val();
			histopathLab = $('#histopathLab').val();
		}

		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}
		var serviceDetails = {
			listBillDetailsIpd : []
		};
		serviceDetails.listBillDetailsIpd.push({

			patienttId : patienttId,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			// doctorId : doctorId,
			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,
			otherConcession : otherConcession,
			quantity : quantity,
			amount : amount,
			concessionPer : otherConcessionPer,
			pay : pay,
			coPay : coPay,
			serviceId : serviceId,
			subServiceId : subServiceId,
			unitId : unitId,
			createdDateTime : addDate,
			recSlaveIdIPD : recSlaveIdIPD,
			callfrom : callfrom,
			masterReceiptId : masterReceiptId,
			subservicesname : subservicesname,
			urgentFlag : "N",
			sponsorId : sponsorId,
			chargesSlaveId : chargesSlaveId,

			otherRate : otherRate,
			otherAmount : otherAmount,
			otherCoPay : otherCoPay,
			otherPay : otherPay,
			concession : concession,
			iscombination : iscombination,
			receiptOf : receiptOf,
			narration : narrationid,
			narrationidBill : narrationidBill,
			emrPer : emrPer,
			accountStatusIpd : "N",
			drdeskflag : drdeskflagSpon,
			inOutHouse : inOutHouse

		});

		serviceDetails = JSON.stringify(serviceDetails);
		
		

		var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());

		/*
		 * if(listBillDetails == null){ alert("Service details are Null!!!!");
		 * return false; }
		 */

		var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("callfrom=" + callfrom);
		inputs.push("module="+ inOutHouse);
		inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/doctordesk/saveIpd",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				if (r > 0) {
					if (queryType == 'insert') {
						alertify.success("Bed assign Successfully");
						// alert("Bed assign Successfully");
					} else {
						alertify.success("Bed Update Successfully");
						// alert("Bed Update Successfully");
					}

					getPatientBillAmountIpd(treatmentId);

					$('#perticularIpdSponsor').attr('readonly', 'false');
					$('#perticularIpdSponsor').val("");

					$("#rateIpdSponsor").val("");

					$("#qtyIpdSponsor").val("1");
					$("#concessionIpdSponsor").val("0");
					$("#amountIpdSponsor").val("0");
					$("#concessionIpdSponsorPer").val("0");
					$("#payIpdSponsor").val("0");
					$("#coPayIpdSponsor").val("0");
					$("#servIdIpdSponsor").val("0");
					// $("#drdeskflagSpon").val("-");
					calculatePerticularTotal1();
					$("#concessionIpdSponsorPer").val(0);
				}
			}
		});
		$('#queryType').val("insert");
		$('#billDetailsId').val("0");
		$('#subserviceid').val("-1");
	} else if (serviceId == 4) {

		var otProcedureIdSpo = $('#otProcedureId').val();
		var otflagSpo = "Y";
		var queryType = $('#queryType').val();
		var billDetailsId = $('#billDetailsId').val();
		var doctorId = $("#doctorNameIpdSponsor option:selected").val();
		/* var num = isNaN(parseInt(doctorId)) ? 0 : parseInt(doctorId); */
		// alert(doctorId);
		var patienttId = $("#pId").val();
		// var doctorId =$('#doctorName').val();
		var treatmentId = $("#treatmentId").text();

		var departmentId = $("#depdocdeskid").val();

		var billId = parseInt($("#billNo").html());// $("#bNo").val();
		var sourceTypeId = $("#sourceTypeId").val();

		var otherRate = $("#rateIpdSponsor").val();
		var otherConcession = $("#concessionIpdSponsor").val();
		var otherConcessionPer = $("#concessionIpdSponsorPer").val();
		var quantity = $("#qtyIpdSponsor").val();
		var otherAmount = $("#amountIpdSponsor").val();

		var otherPay = $("#payIpdSponsor").val();
		var otherCoPay = $("#coPayIpdSponsor").val();

		var createdDateTime = $("#finalDate").val();
		/* alert(createdDateTime); */

		var subServiceId = parseInt($("#subserviceid").val());
		if (subServiceId == -1) {
			alert("Please enter valid service Name");
			$('#perticularIpdSponsor').val("");

			$("#rateIpdSponsor").val("");

			$("#qtyIpdSponsor").val("1");
			$("#concessionIpdSponsor").val("0");
			$("#amountIpdSponsor").val("0");
			$("#concessionIpdSponsorPer").val(0);
			$("#payIpdSponsor").val("0");
			$("#coPayIpdSponsor").val("0");
			$("#servIdIpdSponsor").val("0");
			return false;
		}

		var ratevalidation = $('#rateIpdSponsor').val();

		/*
		 * if (ratevalidation == "" || ratevalidation == null || ratevalidation ==
		 * undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
		 * ratevalidation = 0; alert("Please Enter Rate"); return false; }
		 */

		var subservicesname = $("#perticularIpdSponsor").val();
		var servicename = $("#servicename").val();
		var unitId = $("#uId").val();

		var amount = 0;
		var concession = 0;
		var rate = 0;
		var pay = 0;
		var coPay = 0;

		if (IpdGenRate == 0) {
			/*
			 * rate=otherRate; amount=(otherRate * quantity) ; // alert("In
			 * iff"+otherAmount); coPay=otherAmount-otherConcession;
			 * 
			 * pay=0; //alert(otherPay);
			 */
			rate = otherRate;
			amount = (otherRate * quantity);
			// alert("In iff"+otherAmount);
			var otherconAmt = ((otherConcessionPer * amount) / 100).toFixed(2);
			pay = 0;
			coPay = amount - otherconAmt;
			concession = otherconAmt;
		} else {
			/*
			 * //var otherRate=chargesfromConf ; rate=IpdGenRate; amount=(rate *
			 * quantity) ; //alert("In else"+otherAmount);
			 * 
			 * Pay=0; coPay=amount-otherConcession; //alert(otherPay);
			 */
			rate = IpdGenRate;
			amount = (rate * quantity);
			var otherconAmt = ((otherConcessionPer * amount) / 100).toFixed(2);
			// alert("In else"+otherAmount);
			pay = 0;
			coPay = amount - otherconAmt;
			concession = otherconAmt;
			// alert(otherConcession);
		}

		// @author bilal for IPD receipt edit
		// var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();

		// Added by sanjay on ipd, service assign save button.send to ris
		var sendToRisIpdBill = 'N';
		if ($("#sendToRis").prop("checked") == true) {
			sendToRisIpdBill = 'Y';
			// ServiceId 12 is for Investigation Categort Test,if ServiceId
			// change then replace ServiceId
			if (serviceId != 12) {
				alertify
						.error("Select Investigation Test or Uncheck Send To Ris");
				return false;
			}
		}

		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

		/*
		 * alert("coPay >>>>>>>>>>.."+coPay); return false;
		 */

		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}

		var serviceDetails = {
			listBillDetailsIpd : []
		};
		serviceDetails.listBillDetailsIpd.push({

			patienttId : patienttId,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			doctorId : doctorId,
			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,
			otherConcession : otherConcession,
			quantity : quantity,
			amount : amount,
			concessionPer : otherConcessionPer,
			pay : pay,
			coPay : coPay,
			serviceId : serviceId,
			subServiceId : subServiceId,
			unitId : unitId,
			createdDateTime : addDate,
			recSlaveIdIPD : recSlaveIdIPD,
			callfrom : callfrom,
			urgentFlag : "N",
			masterReceiptId : masterReceiptId,
			subservicesname : subservicesname,
			sponsorId : sponsorId,
			chargesSlaveId : chargesSlaveId,

			otherRate : otherRate,
			otherAmount : otherAmount,
			otherCoPay : otherCoPay,
			otherPay : otherPay,
			concession : concession,
			iscombination : iscombination,
			ot_flag : otflagSpo,
			otprocedure : otProcedureIdSpo,
			receiptOf : receiptOf,
			narration : narrationid,
			narrationidBill : narrationidBill,
			accountStatusIpd : "N",
			emrPer : emrPer,
			sendToRisIpdBill : sendToRisIpdBill,
			sndToLabFlag : sndToLabFlag,
			drdeskflag : drdeskflagSpon
		});

		serviceDetails = JSON.stringify(serviceDetails);
		
		var inOutHouse = 0;
		var histopathLab = "N";
		if(serviceId == 11){
			
			inOutHouse = $('#inOutHouseCount').val();
			histopathLab = $('#histopathLab').val();
		}
		var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());

		var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("callfrom=" + callfrom);
		inputs.push("module="+ inOutHouse);
		inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/doctordesk/saveIpd",

			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				if (r > 0) {
					if (queryType == 'insert') {
						alertify.success("Service assign Successfully");
						// call for when assign test that time test send to lab
						// immediatly.
						if ($("#ipdTestSendToLab").val() == "on") {
							// call for when assign test that time test send to
							// lab immediatly.
							ipdBillSendToLab(serviceDetails, queryType);
						}
						// alert("Service assign Successfully");
					} else {
						alertify.success("Service Update Successfully");
						// alert("Service Update Successfully");
					}

					getPatientBillAmountIpd(treatmentId);

					$('#perticularIpdSponsor').val("");

					$("#rateIpdSponsor").val("");

					$("#qtyIpdSponsor").val("1");
					$("#concessionIpdSponsor").val("0");
					$("#amountIpdSponsor").val("0");
					$("#concessionIpdSponsorPer").val("0");
					$("#payIpdSponsor").val("0");
					$("#coPayIpdSponsor").val("0");
					$("#servIdIpdSponsor").val("0");

					calculatePerticularTotal1();
					$("#concessionIpdSponsorPer").val(0);
				}
			}
		});
		$('#queryType').val("insert");
		$('#billDetailsId').val("0");
		$('#subserviceid').val("-1");
	}

	else {

		var queryType = $('#queryType').val();
		var billDetailsId = $('#billDetailsId').val();
		var doctorId = $("#doctorNameIpdSponsor option:selected").val();

		/* var num = isNaN(parseInt(doctorId)) ? 0 : parseInt(doctorId); */
		// alert(doctorId);
		var patienttId = $("#pId").val();
		// var doctorId =$('#doctorName').val();
		var treatmentId = $("#treatmentId").text();

		var departmentId = $("#depdocdeskid").val();

		var billId = parseInt($("#billNo").html());// $("#bNo").val();
		var sourceTypeId = $("#sourceTypeId").val();

		var otherRate = $("#rateIpdSponsor").val();
		var otherConcessionPer = $("#concessionIpdSponsorPer").val();
		var otherConcession = $("#concessionIpdSponsor").val();
		var quantity = $("#qtyIpdSponsor").val();
		var otherAmount = $("#amountIpdSponsor").val();

		var otherPay = $("#payIpdSponsor").val();
		var otherCoPay = $("#coPayIpdSponsor").val();

		var createdDateTime = $("#finalDate").val();
		/* alert(createdDateTime); */

		/* return false; */
		var subServiceId = parseInt($("#subserviceid").val());
		var pharmacyInvname = $("#perticularIpdSponsor").val();
		if (subServiceId == -1 && pharmacyInvname == "") {
			alert("Please enter valid service Name");
			$('#perticularIpdSponsor').val("");
			$("#rateIpdSponsor").val("");
			$("#qtyIpdSponsor").val("1");
			$("#concessionIpdSponsor").val("0");
			$("#amountIpdSponsor").val("0");
			$("#concessionIpdSponsorPer").val(0);
			$("#payIpdSponsor").val("0");
			$("#coPayIpdSponsor").val("0");
			$("#servIdIpdSponsor").val("0");
			return false;
		}

		// Pooja
		if (update != "update") {
			// alert("else 11699");
			var drdeskflagSpon = "-";
			if (subServiceId == -1
					&& (pharmacyInvname != "" || pharmacyInvname == null
							|| pharmacyInvname == undefined
							|| pharmacyInvname == 0 || isNaN(pharmacyInvname))) {
				subServiceId = 9;
				serviceId = $("#pharmacyInvoice").val();// only for invoice
				// serviceId =$("#servIdIpdSponsor").val();//only for invoice

				drdeskflagSpon = $("#perticularIpdSponsor").val();
				$("#defchargesfromConfIpd").val(0);
			}
		}
		var ratevalidation = $('#rateIpdSponsor').val();

		/*
		 * if (ratevalidation == "" || ratevalidation == null || ratevalidation ==
		 * undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
		 * ratevalidation = 0; alert("Please Enter Rate"); return false; }
		 */

		var subservicesname = $("#perticularIpdSponsor").val();
		var servicename = $("#servicename").val();
		var unitId = $("#uId").val();

		var amount = 0;
		var concession = 0;
		var rate = 0;
		var pay = 0;
		var coPay = 0;

		if (IpdGenRate == 0) {
			/*
			 * rate=otherRate; amount=(otherRate * quantity) ; // alert("In
			 * iff"+otherAmount); coPay=otherAmount-otherConcession;
			 * 
			 * pay=0; //alert(otherPay);
			 */
			rate = otherRate;
			amount = (otherRate * quantity);
			// alert("In iff"+otherAmount);
			var otherconAmt = ((otherConcessionPer * amount) / 100).toFixed(2);
			pay = 0;
			coPay = amount - otherconAmt;
			concession = otherconAmt;
		} else {
			/*
			 * //var otherRate=chargesfromConf ; rate=IpdGenRate; amount=(rate *
			 * quantity) ; //alert("In else"+otherAmount);
			 * 
			 * Pay=0; coPay=amount-otherConcession; //alert(otherPay);
			 */
			rate = IpdGenRate;
			amount = (rate * quantity);
			var otherconAmt = ((otherConcessionPer * amount) / 100).toFixed(2);
			// alert("In else"+otherAmount);
			pay = 0;
			coPay = amount - otherconAmt;
			concession = otherconAmt;
		}

		// @author bilal for IPD receipt edit
		// var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();

		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

		/*
		 * alert("coPay >>>>>>>>>>.."+coPay); return false;
		 */
		// Added by sanjay on ipd, service assign save button.send to ris
		var sendToRisIpdBill = 'N';
		if ($("#sendToRisSponsor").prop("checked") == true) {
			sendToRisIpdBill = 'Y';
			// ServiceId 12 is for Investigation Categort Test,if ServiceId
			// change then replace ServiceId
			if (serviceId != 12) {
				alertify
						.error("Select Investigation Test or Uncheck Send To Ris");
				return false;
			}
		}

		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}
		
		var sampleTypeId  =	$('#sampleType').val();
		//var barCode  =	$('#barCode').val();
		var inOutHouse = 0;
		var histopathLab = "N";
		if(serviceId == 11){
			
			inOutHouse = $('#inOutHouseCount').val();
			histopathLab = $('#histopathLab').val();
		}
		
		var barcodeNo=0;
		var customerType = 0; //$('#customerType').val();	
		var customerId = 0; //$('#customerId').val();	
		var businessType = 2;//$('#businessType').val();
		var collectionDate = $('#collectionDate').val();
		var collectionTime = $('#collectionTime').val();
		var regRefDocId = 0;//$('#refDocId').val();
		
		if(sampleTypeId <= 0 || sampleTypeId == undefined){
			sampleTypeId = 0;
		}

		
		if (parseInt($("#doctorNameIpdSponsor option:selected").val()) > 0) {
			

		var specialityId = $('#specialityIdSponsor').val();
		if(specialityId == undefined || specialityId == null || specialityId == "0"){
				alert("Please Select Doctor Speciality!");
				return false;
				specialityId = 0;
		}
		}
		
		var hallSlaveId = $("#hallSlaveId").val();
		
		var templateWiseTestFlag = $("#templateWiseTestFlag").val();
		var defaultFlag = $("#defaultPkgFlag").val();
		
		var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());

		var serviceDetails = {
			listBillDetailsIpd : []
		};
		serviceDetails.listBillDetailsIpd.push({

			patienttId : patienttId,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			doctorId : doctorId,
			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,
			otherConcession : otherConcession,
			quantity : quantity,
			amount : amount,
			concessionPer : otherConcessionPer,
			pay : pay,
			coPay : coPay,
			serviceId : serviceId,
			subServiceId : subServiceId,
			unitId : unitId,
			createdDateTime : addDate,
			recSlaveIdIPD : recSlaveIdIPD,
			urgentFlag : "N",
			callfrom : callfrom,
			masterReceiptId : masterReceiptId,
			subservicesname : subservicesname,
			sponsorId : sponsorId,
			chargesSlaveId : chargesSlaveId,

			otherRate : otherRate,
			otherAmount : otherAmount,
			otherCoPay : otherCoPay,
			otherPay : otherPay,
			concession : concession,
			iscombination : iscombination,
			receiptOf : receiptOf,
			narration : narrationid,
			hallId : hallId,
			hallSlaveId : hallSlaveId,
			narrationidBill : narrationidBill,
			accountStatusIpd : "N",
			emrPer : emrPer,
			sendToRisIpdBill : sendToRisIpdBill,
			sndToLabFlag : sndToLabFlag,
			// drdeskflag : drdeskflag,
			drdeskflag : drdeskflagSpon,
			
			specialityId : specialityId,
			sampleTypeId : sampleTypeId,
			barCode : barcodeNo,
			inOutHouse : inOutHouse,
			histopathLab : histopathLab,
			businessType : businessType,
			customerId : customerId,
			customerType : customerType,
			collectionDate : collectionDate,
			collectionTime : collectionTime,
			regRefDocId : regRefDocId,
			templateWise : templateWiseTestFlag,
			ivfTreatFlag : "N",
			defaultFlag : defaultFlag
		});

		serviceDetails = JSON.stringify(serviceDetails);

		var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("callfrom=" + callfrom);
		inputs.push("module="+ inOutHouse);
		inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/doctordesk/saveIpd",

					error : function() {
						alert('Network Issue!!!');
					},
					success : function(r) {

						if (r == 1 && queryType == 'insert') {
							alertify.success("Service assign Successfully");
							// call for when assign test that time test send to
							// lab immediatly.
							if ($("#ipdTestSendToLab").val() == "on") {
								// call for when assign test that time test send
								// to lab immediatly.
								ipdBillSendToLab(serviceDetails, queryType);
							}

						} else if (r == 2 && queryType == 'update') {
							alertify.success("Service Update Successfully");
						}/*
							 * else if (r ==3) { var r = confirm("Package is not
							 * configure for Hall and sponsor. Do you want
							 * Default Hall Package?"); if (r == true) {
							 * $("#hallId").val(2);
							 * $("#SponsorsourceTypeId").val(0);
							 * $("#chargesSlaveId").val(0);
							 * saveServiceToSponsorPatient('IpdSponsor3');
							 * }else{
							 * 
							 * 
							 * return false; } }else if (r == 4) { var r =
							 * confirm("Package is not configure for Hall and
							 * sponsor. Do you want Default Package?"); if (r ==
							 * true) { $("#hallId").val(0);
							 * $("#SponsorsourceTypeId").val(0);
							 * $("#chargesSlaveId").val(0);
							 * saveServiceToSponsorPatient('IpdSponsor4');
							 * }else{
							 * 
							 * 
							 * return false; } }else{ alert("Network
							 * Issue!!!!"); }
							 */

						if (r > 0) {
							
							if(r == 22){
								
								var r = confirm("Package is not configure for Hall. Do you want Default Hall Package?");
								if (r == true) {
									$("#hallId").val(2);
									$("#SponsorsourceTypeId").val(0);
									//$("#chargesSlaveId").val(0);
									$("#defaultPkgFlag").val(1);
									saveServiceToSponsorPatient('saveBill1');
								} else {
									return false;
								}
							}
							
							if(r == 44){
								
								var r = confirm("Package is not configure for Sponsor. Do you want Default Hall Package?");
								if (r == true) {
									$("#hallId").val(2);
									$("#SponsorsourceTypeId").val(0);
									//$("#chargesSlaveId").val(0);
									$("#defaultPkgFlag").val(1);
									saveServiceToSponsorPatient('saveBill1');
								} else {
									return false;
								}
							}
							
							if (r == 33) {
								var r = confirm("Package is not configure for Hall and sponsor. Do you want Default Hall Package?");
								if (r == true) {
									$("#hallId").val(2);
									$("#SponsorsourceTypeId").val(0);
									//$("#chargesSlaveId").val(0);
									$("#defaultPkgFlag").val(1);
									saveServiceToSponsorPatient('saveBill1');
								} else {
									return false;
								}
							}
							if (r == 4) {
								var r = confirm("Package is not configure for Hall and sponsor. Do you want Default Package?");
								if (r == true) {
									$("#hallId").val(0);
									$("#SponsorsourceTypeId").val(0);
									//$("#chargesSlaveId").val(0);
									saveServiceToSponsorPatient('saveBill1');
								} else {
									return false;
								}
							}

							/*
							 * if (queryType == 'insert') {
							 * alertify.success("Service assign Successfully");
							 * //alert("Service assign Successfully"); } else {
							 * alertify.success("Service Update Successfully");
							 * //alert("Service Update Successfully"); }
							 */

							getPatientBillAmountIpd(treatmentId);

							$('#perticularIpdSponsor').val("");

							$("#rateIpdSponsor").val("");

							$("#qtyIpdSponsor").val("1");
							$("#concessionIpdSponsor").val("0");
							$("#amountIpdSponsor").val("0");
							$("#concessionIpdSponsorPer").val("0");
							$("#payIpdSponsor").val("0");
							$("#coPayIpdSponsor").val("0");
							$("#servIdIpdSponsor").val("0");
							$("#chargesfromConfIpd").val("0");
							$("#defchargesfromConfIpd").val("0");

							calculatePerticularTotal1();
							$("#concessionIpdSponsorPer").val(0);
						}
					}
				});
		$('#queryType').val("insert");
		$('#billDetailsId').val("0");
		$('#subserviceid').val("-1");
		$('#drdeskflagSpon').val("-");
		var sponsorid2 = $("#sponsorid2").val();
		var chargesSlaveId2 = $("#chargesSlaveId2").val();
		// $("#SponsorsourceTypeId").val(sponsorid2);
		// $("#chargesSlaveId").val(chargesSlaveId2);
	}
	//getSponsorSanctionAmount();
	crearAllFields();
	// window.location.reload(true);
	// added by vinod
	resetAllIpd("IpdSponsor");
	$("#perticularIpdSponsor").removeAttr('readonly');
	$("#payOpdSponsor").removeAttr('readonly');
	$("#coPayIpdSponsor").removeAttr('readonly');
	$("#concessionIpdSponsor").removeAttr('readonly');
	$("#qtyIpdSponsor").removeAttr('readonly');
	/*
	 * $(".openAllSlaveIpd").trigger('click'); getBillReceiptDetailsIpd('all');
	 * setTotalPaid();
	 */
	// added by vinod

	$("#narration").val('');
	$('#narrationid').val('');
	$("#divHalltime").css("display", 'none');
	$("#defaultPkgFlag").val(0);
	$("#iscombinationsponsorIpd").val("N");
	$("#sampleWiseBarcodeTableBody").empty();
	userAccess();
}

/*---------------------------------For Previous Bill------------------------------------*/

/*******************************************************************************
 * @author Sagar kadam
 * @date 27_June_2017
 * @Code for autosuggestion
 ******************************************************************************/
function getAllPatientIdRecordsForPrevGenIPD(inputId, callfrom) {

	var deptId = 0;
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byId").val();
	}

	var findingName = $("#" + inputId).val();
	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('deptId=' + deptId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/billNoble/getAllPatientRecordsForPrevOPD",
		success : function(r) {
			// setTempPatientRecords(r);

			genIpdPrevRecordsTemp(r);
			autosuggestionTempForPrevGenIPD(r, inputId);
			// autoCompTablefoipdManualSummaryTempAuto(r,inputId);

		}
	});
}

/*******************************************************************************
 * @author Sagar kadam
 * @date 27_June_2017
 * @Code for autosuggestion
 ******************************************************************************/
function getAllPatientRecordsForPrevGenIPD(inputId, callfrom) {

	var deptId = 2;
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}

	var findingName = $("#" + inputId).val();
	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('deptId=' + deptId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/billNoble/getAllPatientRecordsForPrevOPD",
		success : function(r) {
			// setTempPatientRecords(r);

			// genIpdPrevRecordsTemp(r);
			autosuggestionTempForPrevOPD(r, inputId);
			// autosuggestionTempForPrevGenIPD(r, inputId);
			// autoCompTablefoipdManualSummaryTempAuto(r,inputId);

		}
	});
}

/*******************************************************************************
 * @author Sagar Kadam
 * @date 27_June_2017
 * @Code template for opd Patient records.
 ******************************************************************************/
function genIpdPrevRecordsTemp(r) {
	var htm = '';
	// var dt="29/06/2017";
	var index = 1;
	// var drid=0;
	for ( var i = 0; i < r.listRegTreBillDto.length; i++) {

		var datetime = new Date(r.listRegTreBillDto[i].createdDateTime)
				.toLocaleString();

		htm = htm
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td>"
				+ "<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ r.listRegTreBillDto[i].patientName
				+ "  </td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.listRegTreBillDto[i].patientId
				+ "</td>"

				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.listRegTreBillDto[i].mobile
				+ "</td>"

				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ r.listRegTreBillDto[i].mrnno
				+ "</td>"

				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.listRegTreBillDto[i].invoiceCountt
				+ "</td>"

				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ datetime
				+ "</td>"

				+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
				+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToPreviousGenIpdBill( '
				+ r.listRegTreBillDto[i].treatmentId
				+ ')" type="button"  ></button>' + '</td>';

		+"</tbody>" + "</table>";
		index++;

	}
	$("#IpdGenPreBill").html(htm);
	$("#IpdGenPreBill").processTemplate(r);

}

function sendingToPreviousGenIpdBill(r) {
	var treatcloseForIpd = "treatcloseForIpd";
	window.location = "ehat_ipd_billing.jsp?" + "treatmentId=" + r
			+ "&treatcloseForIpd=" + treatcloseForIpd;

}

/*******************************************************************************
 * @author : Sagar Kadam
 * @date :29-June-2017
 * @codeFor : Autosuggestion Template for patient Treatment
 ******************************************************************************/
function autosuggestionTempForPrevGenIPD(response, id) {
	// var qty = id.slice(0, -1); // for dyamic col getting id

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

						$('#' + id).val(ui.item.patientName);
					}
					/*
					 * This function use for Enter keypress search
					 */

					// getPreviousTreatmentPatient(id,'search');
					getAllPatientRecordsForPrevGenIPD(id, 'search');

					// $("#mrnNo").val(101);
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
					if (!data || data.listRegTreBillDto.length === 0
							|| !data.listRegTreBillDto
							|| data.listRegTreBillDto.length === 0) {
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
						result = data.listRegTreBillDto;// Response List for All
						// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 4_July_2017
 * @Code Getting Previous General Bill Data By.
 ******************************************************************************/
function getPatientPreviousBillAmountForGenIpd(r, callFrom) {

	// var k=31;
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/ipdbill/getPatientPreviousBillAmountForGenIpd",
		success : function(r) {
			// setTempPatientRecords(r);
			setBillDetailsTempForPreviousIPdBill(r, callFrom);
			$("#saveBill").prop("disabled", true);
			$("#perticular").prop("disabled", true);
			$("#servId").prop("disabled", true);
			$("#doctorName").prop("disabled", true);
			$("#rate").prop("disabled", true);
			$("#qty").prop("disabled", true);
			$("#amount").prop("disabled", true);
			$("#concession").prop("disabled", true);
			$("#pay").prop("disabled", true);
			$("#coPay").prop("disabled", true);
			$("#concessionIpdPer").prop("disabled", true);

		}
	});
}

function setBillDetailsTempForPreviousIPdBill(r, callFrom) {

	var setBill = "";
	var totAmt = 0;

	var totqyt = 1;
	var pharmaId = $("#pharmacyInvoice").val();
	var pharmacy = $("#pharmacy").val();
	var treatmentId = $('#treatmentId').text();
	for ( var i = 0; i < r.listServiceIpdDto.length; i++) {

		if (r.listServiceIpdDto[i].serviceId == 1) {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ r.listServiceIpdDto[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ r.listServiceIpdDto[i].billDetailsId
					+ '"> </td>'

					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle">'
					+ '<div class="row">'
					+ '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName
					+ '</div>'
					+ '</div>'
					+ '</a>'
					+ '</h3>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</td>'
					+ '<td><div class="text-center">1</div></td>'
					+ '<td>'
					+ '<div class="text-right mainAddedInTotal" id="tamt'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;display:none"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'Yes\','
					+ r.listServiceIpdDto[i].serviceId + ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';

			totAmt = totAmt + r.listServiceIpdDto[i].amount;

		} /*
			 * else if (r.listServiceIpdDto[i].serviceId == 2) { setBill=setBill
			 *  + '<tr>' + '<td class="only-checkbox" >' + '<input
			 * type="checkbox"
			 * onclick="setSlaveChk('+(r.listServiceIpdDto[i].serviceId)+')"
			 * checked=checked id="chkOpdBillReg'+
			 * r.listServiceIpdDto[i].serviceId+'" name="opdBillCheckboxReg"
			 * value="'+ r.listServiceIpdDto[i].serviceId+'">' + '</td>' + '<td>' + '<div
			 * class="text-left">' + '<div class="panel-group" id="accordion">' + '<div
			 * class="panel">' + '<div class="panel-heading">' + '<h3 class="panel-title">' + '<a
			 * class="accordion-toggle openAllSlave" data-toggle="collapse"
			 * data-parent="#accordion" href="#collapseOnePreGen'+i+'"
			 * onclick="getSubServiceDetails('+treatmentId+','+
			 * r.listServiceIpdDto[i].serviceId +')">' + '<div class="row">' + '<div
			 * class="col-md-10">' + r.listServiceIpdDto[i].serviceName +'</div>' + '<div
			 * class="col-md-1">' + '<i class="fa fa-chevron-down"
			 * id="list'+i+'"></i>' + '</div>' + '</div>' + '</a>' + '</h3>' + '</div>' + '<div
			 * id="collapseOnePreGen'+i+'" class="panel-collapse collapse">' + '<div
			 * class="panel-body">' + '<table class="table table-hover">' + '<thead>' + '<tr>' + '<th class="only-checkbox">#</th>' + '<th>Doctor
			 * Name</th>' + '<th>' + '<div class="text-center">Amount</div>' + '</th>';
			 * 
			 * var concessionFlow=$('#concessionFlow').val();
			 * 
			 * if(concessionFlow == "on"){ setBill = setBill + '<th>' + '<div
			 * class="text-center">Disc</div>' + '</th>' + '<th>' + '<div
			 * class="text-center">Disc %</div>' + '</th>';
			 * 
			 * }else{ setBill = setBill + '<th style="display:none;">' + '<div
			 * class="text-center">Disc</div>' + '</th>' + '<th style="display:none;">' + '<div
			 * class="text-center">Disc %</div>' + '</th>';
			 *  } setBill = setBill
			 *  + '<th>' + '<div class="text-center">Pay</div>' + '</th>'
			 *  + '<th>' + '<div class="text-right">Date</div>' + '</th>' + '<th class="only-checkbox">Edit</th>' + '<th class="only-checkbox">Cancel</th>' + '<th class="only-checkbox">ChB</th>' + '</tr>' + '</thead>' + '<tbody
			 * id="serviceData">'
			 *  + '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</td>' + '<td><div
			 * class="text-center">' + r.listServiceIpdDto[i].serviceCount +'</div></td>' + '<td>' + '<div
			 * id="tamt'+(r.listServiceIpdDto[i].serviceId)+'"
			 * class="text-right">' + (r.listServiceIpdDto[i].amount).toFixed(2) +'</div></td>'
			 *  + '<td  class="text-center" ><a style="cursor:pointer;"> ' +'<button
			 * class="btn btn-xs btn-success editUserAccess" ' +'
			 * onclick=printIpdServiceWise('+treatmentId+',\'general\',\'Yes\','+
			 * r.listServiceIpdDto[i].serviceId +') ' +'value="EDIT"><i
			 * class="fa fa-print"
			 * id=btnServWise'+r.listServiceIpdDto[i].serviceId+'></i></button></a>
			 * </td>'
			 * 
			 *  + '</tr>';
			 * 
			 * totqyt=totqyt+ r.listServiceIpdDto[i].serviceCount;
			 * totAmt=totAmt+r.listServiceIpdDto[i].amount; }
			 */

		else if (r.listServiceIpdDto[i].serviceId == 3) {
			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ r.listServiceIpdDto[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse"data-parent="#accordion" href="#collapseTwoPreGen'
					+ i + '" onclick="getBedDetailsForPreviousBill('
					+ treatmentId + ',' + r.listServiceIpdDto[i].serviceId
					+ ')">' + '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'

					+ '<div id="collapseTwoPreGen' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					+ '<th>Bed + Hall</th>'

					/* + '<th>Doc Name</th>' */

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'
						+ '<th>' + '<div class="text-center">Disc %</div>'
						+ '</th>';

			} else {
				setBill = setBill + '<th style="display:none;">'
						+ '<div class="text-center">Disc</div>' + '</th>'
						+ '<th style="display:none;">'
						+ '<div class="text-center">Disc %</div>' + '</th>';

			}
			setBill = setBill + '<th>' + '<div class="text-center">Pay</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-center">Co-Pay</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'
					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>'

					+ '<tbody id="bedData">'

					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>' + '<div class="text-right">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'Yes\','
					+ r.listServiceIpdDto[i].serviceId + ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		}

		else if (r.listServiceIpdDto[i].serviceId == 4) {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseTwoPreGen'
					+ i
					+ '" onclick="getSubServiceDetails1ForOTAlsoPreviousBill('
					+ i + ',' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + ')">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseTwoPreGen' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>' + '<th>OT Name</th>'

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'
						+ '<th>' + '<div class="text-center">Disc %</div>'
						+ '</th>';

			} else {
				setBill = setBill + '<th style="display:none;">'
						+ '<div class="text-center">Disc</div>' + '</th>'
						+ '<th style="display:none;">'
						+ '<div class="text-center">Disc %</div>' + '</th>';

			}
			setBill = setBill

			+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>';
			if (r.listServiceIpdDto[i].iscombination == 'Y') {
				setBill = setBill + '<th class="only-checkbox">Pkg</th>';
			}
			setBill = setBill + '<th class="only-checkbox">ChB</th>'

			+ '</tr>' + '</thead>' + '<tbody id="OT' + i + '">'
			/*
			 * '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center"></div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
			 */
			+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'Yes\','
					+ r.listServiceIpdDto[i].serviceId + ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		} else if (r.listServiceIpdDto[i].serviceId == 5) {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseTwoPreGen'
					+ i
					+ '" onclick="getSubServiceDetails1ForConsultingVisitingChargesForPrevBill('
					+ i + ',' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + ')">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseTwoPreGen' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					/* + '<th>OT Name</th>' */

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'
						+ '<th>' + '<div class="text-center">Disc %</div>'
						+ '</th>';

			} else {
				setBill = setBill + '<th style="display:none;">'
						+ '<div class="text-center">Disc</div>' + '</th>'
						+ '<th style="display:none;">'
						+ '<div class="text-center">Disc %</div>' + '</th>';

			}
			setBill = setBill

			+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'
					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>' + '<tbody id="CVCPreBill' + i + '">'

					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'Yes\','
					+ r.listServiceIpdDto[i].serviceId + ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		} else if (r.listServiceIpdDto[i].serviceId == pharmaId) {
		} else if (r.listServiceIpdDto[i].serviceId == pharmacy) {
		}

		else {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseTwoPreGen'
					+ i + '" onclick="getSubServiceDetails1ForPreviousBill('
					+ i + ',' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + ')">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseTwoPreGen' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					+ '<th>SubService Name</th>'

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setBill = setBill + '<th>'
						+ '<div class="text-center">Disc</div>' + '</th>'
						+ '<th>' + '<div class="text-center">Disc %</div>'
						+ '</th>';

			} else {
				setBill = setBill + '<th style="display:none;">'
						+ '<div class="text-center">Disc</div>' + '</th>'
						+ '<th style="display:none;">'
						+ '<div class="text-center">Disc %</div>' + '</th>';

			}
			setBill = setBill

			+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

			+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>';
			if (r.listServiceIpdDto[i].iscombination == 'Y') {
				setBill = setBill + '<th class="only-checkbox">Pkg</th>';
			}
			setBill = setBill

			+ '<th class="only-checkbox">ChB</th>'

			+ '</tr>' + '</thead>' + '<tbody id="serviceData' + i + '">'
			/*
			 * '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center"></div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
			 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
			 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
			 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
			 */
			+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>'

					+ '<td  class="text-center" ><a style="cursor:pointer;"> '
					+ '<button class="btn btn-xs btn-success " '
					+ '  onclick=printIpdServiceWise(' + treatmentId
					+ ',\'general\',\'Yes\','
					+ r.listServiceIpdDto[i].serviceId + ') '
					+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
					+ r.listServiceIpdDto[i].serviceId
					+ '></i></button></a> </td>'

					+ '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;

		}
	}

	// alert(totqyt);
	// alert(totAmt);
	// alert(callFrom);
	if (callFrom == "cghs") {
		$("#IpdSponsor").html("");
		$("#billDetails").html("");

		// alert("in chgs");
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text((totAmt).toFixed(2));

		$("#cghsBill").html(setBill);

		// $("#cghsBill").html(setBill);
	} else if (callFrom == "IpdSponsor") {
		// alert(callFrom);
		getPatientBillAmountIpdForSponsor(treatmentId);
		/*
		 * $("#cghs").html(""); //alert("in chgs");
		 * $("#totalQtty").text(totqyt); $("#totalAmmt").text(totAmt);
		 * 
		 * $("#sponsor").html(setBill);
		 */

	} else {
		$("#cghsBill").html("");
		$("#IpdSponsor").html("");
		// alert("in general");
		$("#totalQty").text(totqyt);
		$("#totalAmt").text((totAmt).toFixed(2));
		$("#totAmt").text((totAmt).toFixed(2));

		$("#billDetails").html(setBill);
	}

}

function getBedDetailsForPreviousBill(t, s) {
	// alert("hiiii");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/ipdbill/getPatientBedBill",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getBedDetailsTempForPreviousBill(r, s);
			// setBillDetailsTemp(r);
		}
	});
}

function getBedDetailsTempForPreviousBill(t, s) {

	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	var nursing = "Nursing";
	var hallName = "";
	for ( var i = 0; i < t.listBedIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listBedIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');

		var netAmt = Number(t.listBedIpdDto[i].amount)
				- Number(t.listBedIpdDto[i].concession);

		/*
		 * var dname= t.listBedIpdDto[i].docName;
		 * 
		 * if(dname==null) { dname="-"; }
		 */
		if (t.listBedIpdDto[i].paidByCashFlag == "Y") {
			if ((t.listBedIpdDto[i].paidFlag == "Y")
					|| t.listBedIpdDto[i].cancle == "Y") {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';
			}
		} else {
			if ((t.listBedIpdDto[i].paidFlag == "Y")
					|| t.listBedIpdDto[i].cancle == "Y") {
				setService = setService + '<tr id="tr'
						+ (t.listBedIpdDto[i].billDetailsId) + '">';
			} else {
				setService = setService + '<tr id="tr'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" editOnClickForBed('
						+ t.listBedIpdDto[i].billDetailsId + ')">';
			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listBedIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listBedIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].billDetailsId + ' </td>';

		if (t.listBedIpdDto[i].subServiceId == 0) {

			setService = setService + '<td id="catName'
					+ (t.listBedIpdDto[i].billDetailsId) + '"> ' + (nursing)
					+ ":" + (hallName) + ' </td>';
		} else {
			hallName = t.listBedIpdDto[i].bedHall;
			setService = setService + '<td id="catName'
					+ (t.listBedIpdDto[i].billDetailsId) + '"> '
					+ t.listBedIpdDto[i].bedHall + ' </td>';

		}
		/*
		 * + '<td id="doccName'+(t.listBedIpdDto[i].billDetailsId)+'"> '+
		 * dname+' </td>'
		 */

		+'<td style="display:none;" id="subserviceid'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].subServiceId + ' </td>'

				/*
				 * + '<td style="display:none;" id="dId'+(t.listBedIpdDto[i].billDetailsId)+'"> '+
				 * t.listBedIpdDto[i].docId+' </td>'
				 */

				+ '<td style="display:none;" id="sId'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].amount + ' </td>';

		/*
		 * + '<td id="char'+(t.listBedIpdDto[i].billDetailsId)+'">' + '<div
		 * class="text-center">'+ t.listBedIpdDto[i].rate +'</div>' + '</td>';
		 */

		// added by vinod
		if (t.listBedIpdDto[i].cancle == "Y") {

			setService = setService + '<td style="display:none;"> '
					+ '<div class="text-center" id="tAmt'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ t.listBedIpdDto[i].rate + '</div>' + '</td>'
					+ '<td id="char' + (t.listBedIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listBedIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';

		} else {

			if (t.listBedIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listBedIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listBedIpdDto[i].billDetailsId) + '" value="'
						+ netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ (t.listBedIpdDto[i].rate).toFixed(2) + '</div>'
						+ '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" value="'
						+ netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">' + t.listBedIpdDto[i].quantity
				+ '</div>' + '</td>'

				+ '<td id="con' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listBedIpdDto[i].amount).toFixed(2) + '</div>' + '</td>';

		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService + '<td id="conS'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].concession).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="conPer' + (t.listBedIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listBedIpdDto[i].concessionPer).toFixed(2) + '</div>'
					+ '</td>';
		} else {
			setService = setService + '<td style="display:none;" id="conS'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].concession).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td style="display:none;" id="conPer'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIpdDto[i].concessionPer).toFixed(2) + '</div>'
					+ '</td>';
		}
		setService = setService + '<td id="p'
				+ (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listBedIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'

				+ '<td id="cP' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listBedIpdDto[i].coPay).toFixed(2) + '</div>' + '</td>'

				+ '<td id="dateSub' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-right" id="dateSubservice">' + datetime12
				+ '</div>';
		setService = setService + '</td>';

		if ((t.listBedIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForBed('
					+ t.listBedIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listBedIpdDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listBedIpdDto[i].cancle == "Y"
					|| t.listBedIpdDto[i].isModify == "N") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success "  disabled="disabled" onclick="editOnClickForBed('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled" onclick="editOnClickForBed('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listBedIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listBedIpdDto[i].cancle
					+ '" id=btnCancle'
					+ t.listBedIpdDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listBedIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listBedIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}

		setService = setService + '<td class="only-checkbox" >';
		if (t.listBedIpdDto[i].paidByCashFlag == "Y") {
			if (t.listBedIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId + '">';
			}
		} else {
			if (t.listBedIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId
						+ '"  onclick=setService("general",'
						+ t.listBedIpdDto[i].billDetailsId + ')>';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIpdDto[i].billDetailsId
						+ '" onclick=setService("general",'
						+ t.listBedIpdDto[i].billDetailsId + ')>';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#bedData").html(setService);
}

function getSubServiceDetails1ForOTAlsoPreviousBill(i, t, s)

{
	// alert("Hi kishor");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetailsTemp1ForOTAlsoPreviousBill(i, r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function getSubServiceDetailsTemp1ForOTAlsoPreviousBill(j, t, s) {

	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].amount)
				- Number(t.listSubServiceIpdDto[i].concession);
		var cghsCode = "(" + t.listSubServiceIpdDto[i].cghsCode + ")";
		if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
				|| cghsCode == "(-)" || cghsCode == "(null)") {
			cghsCode = "";
		}
		if (dname == null) {
			dname = "-";
		}

		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
		} else {
			setService = setService + '<tr id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
		}
		setService = setService

		+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>'

				+ '<td id="catName' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> ' + t.listSubServiceIpdDto[i].categoryName + cghsCode
				+ ' </td>'

				+ '<td id="doccName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> ' + dname
				+ ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>'
					+ '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].amount).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].amount).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

				+ '<td id="char' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
				+ '</td>';

		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService + '<td id="conS'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="conPer'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		} else {
			setService = setService + '<td style="display:none;" id="conS'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display:none;" id="conPer'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		}
		setService = setService + '<td id="p'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="dateSub' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success "  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceIpdDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}
		if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPopUpDataForOT('
					+ t.listSubServiceIpdDto[i].serviceId
					+ ','
					+ t.listSubServiceIpdDto[i].subServiceId
					+ ','
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ',\'general\', '
					+ t.listSubServiceIpdDto[i].amount
					+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';
		}

		setService = setService + '<td class="only-checkbox" >';
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"  id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		} else {
			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#OT" + j).html(setService);

}

function getSubServiceDetails1ForConsultingVisitingChargesForPrevBill(i, t, s) {
	// alert("Hi kishor");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetails1ForConsultingVisitingChargesForPrevBillTemp(i,
					r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}
function getSubServiceDetails1ForConsultingVisitingChargesForPrevBillTemp(j, t,
		s) {

	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].amount)
				- Number(t.listSubServiceIpdDto[i].concession);

		if (dname == null) {
			dname = "-";
		}
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
		} else {
			setService = setService + '<tr id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
		}
		setService = setService

		+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>'

				/*
				 * + '<td id="catName'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+
				 * t.listSubServiceIpdDto[i].categoryName+' </td>'
				 */
				+ '<td id="doccName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> ' + dname
				+ ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherRate + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>'
					+ '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

				+ '<td id="char' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
				+ '</td>';

		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService

			+ '<td id="conS' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="conPer'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		} else {
			setService = setService

			+ '<td style="display:none;" id="con'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display:none;" id="conPer'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		}
		setService = setService + '<td id="p'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="dateSub' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForCVC('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success "  disabled="disabled" onclick="editOnClickForCVC('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success "  disabled="disabled" onclick="editOnClickForCVC('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceIpdDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger " disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}

		setService = setService + '<td class="only-checkbox" >';
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		} else {
			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#CVCPreBill" + j).html(setService);

}

function getSubServiceDetails1ForPreviousBill(i, t, s)

{
	// alert("Hi kishor");
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetailsTemp1ForPreviousBill(i, r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function getSubServiceDetailsTemp1ForPreviousBill(j, t, s) {
	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;
		var psid = t.listSubServiceIpdDto[i].serviceId;

		var netAmt = Number(t.listSubServiceIpdDto[i].amount)
				- Number(t.listSubServiceIpdDto[i].concession);
		var cghsCode = "(" + t.listSubServiceIpdDto[i].cghsCode + ")";
		if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
				|| cghsCode == "(-)" || cghsCode == "(null)") {
			cghsCode = "";
		}
		if (dname == null) {
			dname = "-";
		}
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
		} else {
			setService = setService + '<tr id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
		}
		setService = setService

		+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';
		if (psid == 14) {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].inventoryName + ' </td>';
		} else if (psid == 16) {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].pharmaName + ' </td>';
		} else if (psid == 11 || psid == 13) {// Added by laxman for sended
												// lab test coloe change.
			if ((t.listSubServiceIpdDto[i].sndtolabflag) == "Y") {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" style="color: green;"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			} else {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			}
		}// code By Sanjay on 26-03-2018 for changes the testname color when
			// it sent to RIS
		else if (psid == 12) {
			if ((t.listSubServiceIpdDto[i].sndtorisflag) == "Y") {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" style="color: #00bfff;"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			} else {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			}
		} else {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].categoryName + cghsCode
					+ ' </td>';
		}

		setService = setService

		+ '<td id="doccName' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> ' + dname + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="sndtolabflag'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].sndtolabflag + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>'
					+ '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"  onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listSubServiceIpdDto[i].serviceId
						+ ','
						+ t.listSubServiceIpdDto[i].subServiceId
						+ ','
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listSubServiceIpdDto[i].amount
						+ ', '
						+ t.listSubServiceIpdDto[i].concession
						+ ','
						+ t.listSubServiceIpdDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		} else {
			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService + '<td id="p'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"  onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listSubServiceIpdDto[i].serviceId
						+ ','
						+ t.listSubServiceIpdDto[i].subServiceId
						+ ','
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listSubServiceIpdDto[i].amount
						+ ', '
						+ t.listSubServiceIpdDto[i].concession
						+ ','
						+ t.listSubServiceIpdDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#serviceData" + j).html(setService);
}

/*******************************************************************************
 * @author Bilal
 * @date 5-JULY-2017
 * @code for update after reciept generated in IPD
 ******************************************************************************/
function editOnClickForRecieptIPD(billRecSlaveId, billDetailsId) {

	var receiptOf = $("#receiptOf").val();
	if (receiptOf == "IpdSponsor") {
		$('#queryType').val('update');
		$('#saveServiceCallFrom').val('recieptIPD');
		$('#billDetailsId').val(billDetailsId);
		$('#receiptSlaveIdIPD').val(billRecSlaveId);

		$('#perticularIpdSponsor').val(
				$('#compNameIPD' + billRecSlaveId).text());

		var a = parseInt($('#sId' + billRecSlaveId).val());

		$('#servIdIpdSponsor').val(a).text();
		$("#serviceid").val(a);
		$('#servIdIpdSponsor').val(a);
		// $('#servId option:not(:selected)').prop('disabled', true);

		var subserviceid = parseInt($('#subsId' + billDetailsId).val());

		$("#subserviceid").val(subserviceid);
		/** *if we edit consultation then quantity should be readonly* */
		if (a == 2 || a == 1) {
			$("#qtyIpdSponsor").prop("readonly", true);
			$("#subserviceid").val(-2);
		} else {
			$("#qtyIpdSponsor").prop("readonly", false);
			$("#subserviceid").val(subserviceid);
		}
		/** *if we edit consultation then quantity should be readonly* */

		var d = parseInt($('#doctorId' + billDetailsId).val());

		$('#doctorNameIpdSponsor').select2('val', d);

		var rate = $("#rateOfReceipt" + billRecSlaveId).val();
		$('#rateIpdSponsor').val(rate);

		var quantity = $("#quan" + billRecSlaveId).val();
		$('#qtyIpdSponsor').val(quantity);

		var disc = $("#disc" + billRecSlaveId).val();
		$('#concessionIpdSponsor').val(disc);

		var amt = $('#billAmtIPD' + billRecSlaveId).val();

		$('#amountIpdSponsor').val(amt);
		$('#amountIpdSponsor').attr('readonly', 'true');

		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();

		var pay = $("#pay" + billRecSlaveId).val();
		var copay = $("#copay" + billRecSlaveId).val();

		var consAmt = ((disc * 100) / amt).toFixed(2);
		$('#concessionIpdPer').val(consAmt);

		if (sponsorId >= 1 && chargesSlaveId > 0 && receiptOf == "IpdSponsor") {
			pay = amt - disc;
			$('#payIpdSponsor').val(pay);
			$('#coPayIpdSponsor').val(copay);
		} else {
			$('#payIpdSponsor').val(pay);

			copay = amt - disc;
			$('#coPayIpdSponsor').val(copay);
		}

	} else {
		$('#queryType').val('update');
		$('#saveServiceCallFrom').val('recieptIPD');
		$('#billDetailsId').val(billDetailsId);
		$('#receiptSlaveIdIPD').val(billRecSlaveId);

		$('#perticular').val($('#compNameIPD' + billRecSlaveId).text());

		var a = parseInt($('#sId' + billRecSlaveId).val());

		$('#servId').val(a).text();
		$('#servId').val(a);
		$("#serviceid").val(a);

		// $('#servId option:not(:selected)').prop('disabled', true);

		var subserviceid = parseInt($('#subsId' + billDetailsId).val());

		/**
		 * *if we edit consultation and registration then quantity should be
		 * readonly*
		 */
		if (a == 2 || a == 1) {
			$("#qty").prop("readonly", true);
			$("#subserviceid").val(-1);
		} else {
			$("#qty").prop("readonly", false);
			$("#subserviceid").val(subserviceid);
		}
		/** *if we edit consultation then quantity should be readonly* */

		var d = parseInt($('#doctorId' + billDetailsId).val());

		$('#doctorName').select2('val', d);

		var rate = $("#rateOfReceipt" + billRecSlaveId).val();
		$('#rate').val(rate);

		var quantity = $("#quan" + billRecSlaveId).val();
		$('#qty').val(quantity);

		var disc = $("#disc" + billRecSlaveId).val();
		$('#concession').val(disc);

		var amt = $('#billAmtIPD' + billRecSlaveId).val();

		$('#amount').val(amt);
		$('#amount').attr('readonly', 'true');

		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();

		var pay = $("#pay" + billRecSlaveId).val();
		var copay = $("#copay" + billRecSlaveId).val();

		var consAmt = ((disc * 100) / amt).toFixed(2);
		$('#concessionIpdPer').val(consAmt);

		if (sponsorId >= 1 && chargesSlaveId > 0 && receiptOf == "IpdSponsor") {
			pay = amt - disc;
			$('#pay').val(pay);
			$('#coPay').val(copay);
		} else {
			copay = amt - disc;
			$('#coPay').val(copay);
			$('#pay').val(pay);
		}

	}
	$("#narration").val('narration');
}

/*******************************************************************************
 * @author Bilal
 * @date 17-JULY-2017
 * @code for add new service to reciept in IPD
 ******************************************************************************/
function hideBillPanel(billReceiptId) {

	// $("#billPanel").toggle();
	var receiptOf = $("#receiptOf").val();
	if (receiptOf == "general") {
		$('#billPanel').slideToggle('fast', function() {

			if ($(this).is(':visible')) {

				$('#saveServiceCallFrom').val('');
				$('#queryType').val('insert');
				$('#receiptMasterId').val();

			} else {
				// return when condition is true
				$('#saveServiceCallFrom').val('addToIPDreciept');
				$('#queryType').val('insert');
				$('#receiptMasterId').val(billReceiptId);

			}
		});
	} else {
		$('#ipdsponsortab').slideToggle('fast', function() {

			if ($(this).is(':visible')) {

				$('#saveServiceCallFrom').val('');
				$('#queryType').val('insert');
				$('#receiptMasterId').val();

			} else {
				// return when condition is true
				$('#saveServiceCallFrom').val('addToIPDreciept');
				$('#queryType').val('insert');
				$('#receiptMasterId').val(billReceiptId);

			}
		});
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 11-July-2017
 * @codeFor : Show/hide receipt view
 ******************************************************************************/
function setRefundable() {

	$("#payable").val($("#nowRefunded").text());
	$("#btnPayNow").prop("disabled", "true");
	$("#btnRefund").removeAttr('disabled');
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 11-July-2017
 * @codeFor : Show/hide receipt view
 ******************************************************************************/
function hideBillDetails() {

	$("#mainBillDeatils").toggle('slow');
	var curClass = $("#shBillView").attr('class');

	if (curClass == "fa fa-chevron-up") {

		$("#shBillView").removeClass('fa fa-chevron-up');
		$("#shBillView").addClass('fa fa-chevron-down');
		$("#billText").text('Show Bill View');

		$("#refundBillDetails").css("height", "425px");
		$("#refundBillDetails").css("overflow", "auto");

	} else {

		$("#shBillView").removeClass('fa fa-chevron-down');
		$("#shBillView").addClass('fa fa-chevron-up');
		$("#billText").text('Show Receipt View');

		$("#refundBillDetails").css("height", "182px");
		$("#refundBillDetails").css("overflow", "auto");
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-July-2017
 * @codeFor : Manage Discount
 ******************************************************************************/
function manageDiscountIpd() {

	$("#discount").removeAttr('readonly');
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-July-2017
 * @codeFor : Manage Discount
 ******************************************************************************/
function calDiscountIpd() {

	var payable = $("#payable").val();
	var disc = $("#discount").val();
	if (Number(disc) > Number(payable)) {
		alert("Discount should be greater than payable");
		$("#discount").val(0);
		$("#payNow").val(0);
	} else {

		var nowPay = Number(payable) - Number(disc);
		$("#payNow").val(parseFloat(nowPay).toFixed(2));
	}
}

/*******************************************************************************
 * @author Kishor
 * @date 12-July-2017
 * @code show and hide sponsor tabe based on sponsor id
 ******************************************************************************/
function showAndHideSponsorForIpd() {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	if (sponsorId >= 1 && chargesSlaveId > 0) {

		$('#sponsorHideForIpd').show();

	} else {

		$('#sponsorHideForIpd').hide();

	}
}

/*******************************************************************************
 * @author Bilal
 * @Date 17-july-2017
 * @code for delete from receipt of IPD
 ******************************************************************************/
function deleteOnClickForRecieptIPD(billRecSlaveId, billReceiptMasterId) {
	var r = confirm("Are You Sure You Want To Delete?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/doctordesk/deleteOnClickForRecieptIPD",
			data : {
				"billRecSlaveId" : parseInt(billRecSlaveId)
			},

			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.success(response);
				getBillReceiptDetailsIpd("deleteOPD");
				resetAllIpd('general');
			}

		});
	}
}

/*******************************************************************************
 * @author Bilal
 * @date 20-JULY-2017
 * @code for autosuggestion on billing from configuration and from subservice
 *       based on sponsor id
 ******************************************************************************/
function autosuggetionForDefaultIPD(inputID) {

	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var depdocdeskid = $("#depdocdeskid").val();// departmentId

	var findingName = $("#" + inputID).val();
	var sugVal = $("#inputAuto").val();

	// if (sugVal != findingName && findingName != "") {
	if (sugVal != findingName) {
		if (sponsorId >= 1 && chargesSlaveId > 0) {
			setallchargesConfigOnGenBillingIPD(inputID);
			$("#inputAuto").val(findingName);

		} else {
			// hallwiseRateIPDauto(inputID);
			setallservautocompleteOnBillingIPD(inputID);
			$("#inputAuto").val(findingName);
		}
	}
}

function calculatePerticularTotalIpdSponsor() {
	var receiptOf = $("#receiptOf").val();

	var rate = $("#rateIpdSponsor").val();
	var qty = $("#qtyIpdSponsor").val();
	var concession = $("#concessionIpdSponsor").val();

	if (rate == "") {
		$("#rateIpdSponsor").val(0);
	}
	if (qty == "" || qty == 0) {
		//$("#qtyIpdSponsor").val(1);
		var a = rate * 0;
		setTimeout(function() {
			$("#amountIpdSponsor").val(a);
			$("#concessionIpdSponsorPer").val(0);
			$("#concessionIpdSponsor").val(0);
			$("#payIpdSponsor").val(a);
		}, 50);
	}
	if (concession == "") {
		$("#concessionIpdSponsor").val(0);
	}
	if (concession > (rate * qty)) {
		var quantity = $("#qtyIpdSponsor").val();
		if (quantity == 0) {
			// alert("Quantity Cannot Be 0");
			$("#concessionIpdSponsor").val(0);
			calculatePerticularTotalSponsor();
			return false;
		} else {
			alert("Discount Can Not Be Greater Than " + (rate * qty));
			$("#concessionIpdSponsor").val(0);
			$("#amountIpdSponsor").val(rate * qty);
			$("#coPayIpdSponsor").val(rate * qty);
			return false;
		}
	}
	// var amount = ((rate * qty) - concession);
	var amount = ((rate * qty));
	$("#amountIpdSponsor").val(Math.round(amount));
	// $("#pay").val(amount);
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();

	if (sponsorId >= 1 && chargesSlaveId > 0 && receiptOf == "IpdSponsor") {
		var pay = amount - concession;
		$("#payIpdSponsor").val(Math.round(pay));

	} else {
		var cpay = amount - concession;
		$("#coPayIpdSponsor").val(Math.round(cpay));

	}

	/*
	 * var amountIpdSponsor = $("#amountIpdSponsor").val(); var
	 * concessionIpdSponsor = $("#concessionIpdSponsor").val();
	 * 
	 * var consAmt=((concessionIpdSponsor * 100 ) /
	 * amountIpdSponsor).toFixed(2); $("#concessionIpdSponsorPer").val(consAmt);
	 */

	var SpecialDisc = $("#SpecialDisc").val();
	if (SpecialDisc == 0 && ($("#payIpdSponsor").val()) == 0) {

		calculatePerticularCoPaySponsor();
		// calculatePerticularCoPay1();
	} else {
		// ();
		calculatePerticularPaySponsor();
		// calculatePerticularPay1();
	}
}

function calculatePerticularCoPaySponsor() {
	var pay = $("#payIpdSponsor").val();
	var amount = $("#amountIpdSponsor").val();
	var concession = $("#concessionIpdSponsor").val();
	if (pay == "" || amount == "") {
		return false;
	}

	if (pay < 0) {
		pay = 0;
	} else if (isNaN(pay) == true) {
		pay = 0;
	}

	/* var coPay = ((amount - pay) - concession); */
	var coPay = 0;
	$("#coPayIpdSponsor").val(Math.round(coPay));
}

function calculatePerticularPaySponsor() {
	var coPay = $("#coPayIpdSponsor").val();
	var amount = $("#amountIpdSponsor").val();
	var concession = $("#concessionIpdSponsor").val();
	if (coPay == "" || amount == "") {
		return false;
	}
	if (coPay < 0) {
		coPay = 0;
	} else if (isNaN(coPay) == true) {
		coPay = 0;
	}

	var pay = (amount - concession).toFixed(2);
	$("#payIpdSponsor").val(Math.round(pay));
}

function concessionOnPercentageIpdSponsor() {
	var amountIpdSponsor = $("#amountIpdSponsor").val();
	var concessionIpdSponsorPer = $("#concessionIpdSponsorPer").val();

	if (concessionIpdSponsorPer == "" || concessionIpdSponsorPer == "") {
		return false;
	}
	if (concessionIpdSponsorPer < 0) {
		concessionIpdSponsorPer = 0;
	} else if (isNaN(concessionIpdSponsorPer) == true) {
		concessionIpdSponsorPer = 0;
	}

	if (concessionIpdSponsorPer > 100) {
		alert("Percentage should be less than 100");
		$("#concessionIpdSponsorPer").val(0);
		$("#concessionIpdSponsor").val(0);
		return false;
	}
	// alert(amount);
	// var conAmt=((concessionIpdSponsorPer * amountIpdSponsor)/100).toFixed(2);
	var conAmt = ((concessionIpdSponsorPer * amountIpdSponsor) / 100);

	$("#concessionIpdSponsor").val(Math.round(conAmt));
}

/*******************************************************************************
 * @author Bilal
 * @Date 24-july-2017
 * @code for delete from receipt of IPD
 ******************************************************************************/
function deleteMasterReceiptIPD(recId) {
	
	var idremarkdeletereceipt =$('#idremarkdeletereceipt').val();	
	if(idremarkdeletereceipt == "0" || idremarkdeletereceipt =="undefined"){  // Added Rohini for remark
	
		$('#recId').val(recId);
		setRemarkpopupToDeleteReceipts(); 
		return false;
	}
	
	var r = confirm("Are You Sure You Want To Delete?");
	
	if(r==false){
		return false;
	}
	
	var recPaidAmtIpd = $("#recPaidAmtIpd"+recId).val();
	var netTotal = $("#finalNetAmt").text();
	var refundAmt = $("#finalRefund").text();
	
	var total = Number(netTotal) + Number(refundAmt);
	
	
	 var remarkdeletereceipt = $('#remarkdeletereceipt').val();
	 
		var idremarkdeletereceipt =$('#idremarkdeletereceipt').val();
		if(remarkdeletereceipt == '' || remarkdeletereceipt == undefined || remarkdeletereceipt == null){
			alert('Please fill remark to cancel service !!!!');
			$('#remarkdeletereceipt').focus();
			return false;
		  }
		
	/*if(Number(total) > Number(recPaidAmtIpd)){
		
		alert("Receipt cannot be deleted");
		return false;
	}*/
	
	// if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/doctordesk/deleteMasterReceiptIPD",
			data : {
				"recId" : parseInt(recId),
				"deleteRemark" : remarkdeletereceipt
			},

			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				getBillReceiptDetailsIpd("deleted");
				window.location.reload(true);
			}

		});
	// }
}

/*******************************************************************************
 * @author : Bilal
 * @date : 24-June-2017
 * @codeFor : Set receipt master template for deleted tab
 ******************************************************************************/
function setReceiptTemplateDeletedIpd(res, callFrom) {

	var prevPaid = 0;
	$("#btnRefund").prop('disabled', 'true');
	$("#trDisc").show();

	// $("#btnPayNow").removeAttr('disabled');

	var result = ' <table class="table table-hover" id="receipts"> '
			+ ' <thead> ' + '		<tr> ' + '			<th>#</th> '
			+ '			<th>Receipt Id</th> ' + '			<th>Amount</th> '
			+ '			<th>Paid</th> ' + '			<th>Discount</th> '
			+ '			<th>Remain</th> ' + '			<th>Date</th> '
			+ '			<th>Details</th> ' + '		</tr> ' + '	</thead> ' + '	<tbody> ';

	for ( var i = 0; i < res.listBillReceiptMaster.length; i++) {

		var billReceiptId = res.listBillReceiptMaster[i].billReceiptId;
		var totalAmt = parseFloat(res.listBillReceiptMaster[i].totalAmt)
				.toFixed(2);
		var totAmt = parseFloat(res.listBillReceiptMaster[i].totalPaid)
				.toFixed(2);
		var totDisc = parseFloat(res.listBillReceiptMaster[i].totalDisc)
				.toFixed(2);
		var remainAmt = parseFloat(res.listBillReceiptMaster[i].totalRemain)
				.toFixed(2);
		var datetime = new Date(res.listBillReceiptMaster[i].createdDateTime)
				.toLocaleDateString('en-GB');
		var creditFlag = res.listBillReceiptMaster[i].creditFlag;
		var againstId = res.listBillReceiptMaster[i].againstId;
		if (callFrom == "all") {

			prevPaid = prevPaid + totAmt;
			$("#prevPaid").val(prevPaid);
		}

		result = result + '<tr> ' + '	<td>' + (i + 1) + '</td> ' + '	<td>'
				+ billReceiptId + '</td> ' + '	<td>' + totalAmt + '</td> '
				+ '	<td>' + totAmt + '</td> ' + '	<td>' + totDisc + '</td> '
				+ '	<td>' + remainAmt + '</td> ' + '	<td>' + datetime
				+ '</td> ' + '	<td> '
				/*
				 * <a href="#recSlave'+i+'"
				 * onclick="setCreditPaybleIpd('+res.listBillReceiptMaster[i].totalRemain+')"
				 * data-parent="#accordio" data-toggle="collapse"
				 * class="accordion-toggle"><button><i class="fa
				 * fa-chevron-down"></button></i></a> '
				 */// + ' <button
					// onclick="resetMasterReceiptIPD('+billReceiptId+')"><i
					// class="fa fa-refresh"></i></button> ';
				+ '   <button onclick="resetMasterReceiptIPD(' + billReceiptId
				+ ')"><i class="fa fa-refresh"></i></button> '

				/*
				 * if (againstId > 0) { result=result + ' <button
				 * onclick="resetMasterReceiptIPD('+billReceiptId+')"><i
				 * class="fa fa-refresh"></i></button> '; }else{ result=result + '
				 * <button onclick="resetMasterReceiptIPD('+billReceiptId+')"
				 * disabled><i class="fa fa-refresh"></i></button> '; }
				 */
				/*
				 * if(creditFlag=="Y"){
				 * 
				 * result=result + ' <button disabled
				 * onclick="setCreditPayble('+remainAmt+','+billReceiptId+',\'credit\')"><i
				 * class="fa fa-credit-card"></i></button> ' }else{
				 * 
				 * result=result + ' <button
				 * onclick="setCreditPayble('+remainAmt+','+billReceiptId+',\'credit\')"><i
				 * class="fa fa-credit-card"></i></button> ' }
				 */

				+ '	</td>' + '</tr> ';

		/*
		 * var resultSlave= ' <div class="panel-collapse collapse"
		 * id="recSlave'+i+'" style="height: 0px;">' + ' <div
		 * class="panel-body"> ' + ' <table class="table table-hover"
		 * id="receiptSlave"> ' + ' <thead> ' + ' <tr> ' + ' <th>#</th> ' + '
		 * <th>Comp Name</th> ' + ' <th>Amount</th> ' + ' <th>Date</th> ' + '
		 * <th>Edit</th> ' + ' <th>Delete</th> ' + ' <th>Chk</th> ' + '
		 * </tr> ' + ' </thead> ' + ' <tbody> ';
		 * 
		 * for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
		 * 
		 * var
		 * billRecSlaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
		 * var billAmt
		 * =parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount).toFixed(2);
		 * var
		 * rate=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate).toFixed(2);
		 * var
		 * quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
		 * var
		 * disc=res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession;
		 * var
		 * copay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay).toFixed(2);
		 * var
		 * pay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay).toFixed(2);
		 * var
		 * billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
		 * 
		 * var billAmt2=billAmt-disc;
		 * 
		 * resultSlave = resultSlave + '<tr> ' + ' <td>'+(k+1)+'</td> ' + '
		 * <td id="compNameIPD'+billRecSlaveId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> ' + '
		 * <td id="finalBillAmt'+billRecSlaveId+'">'+billAmt2+'</td> ' + '
		 * <td id="datetimeIPD'+billRecSlaveId+'">'+datetime+'</td> ' + ' <td><button
		 * disabled class="btn btn-xs btn-success editUserAcce SlaveBtn"
		 * value="EDIT"
		 * onclick="editOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
		 * id="btnEdit" class="fa fa-edit" value="EDIT"></i></button></td> ' + '
		 * <td><button disabled class="btn btn-xs btn-success deleteUserAcce
		 * SlaveBtn" value="DELETE"
		 * onclick="deleteOnClickForRecieptIPD('+billRecSlaveId+','+billDetailsId+')"><i
		 * id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> '
		 *  + ' <td><input type="checkbox" class="slaveNotAddedRefund
		 * chkRfndSlave'+recId+'" name="refundRd" value="'+billAmt+'"
		 * id="refundChk'+billDetailsId+'"
		 * onclick="setSlaveRefundAmt('+billDetailsId+')"></td> '
		 *  + ' <td ><input type="hidden" id="billAmtIPD'+billRecSlaveId+'"
		 * value="'+billAmt+'"></td> ' + ' <td ><input type="hidden"
		 * id="rateOfReceipt'+billRecSlaveId+'" value="'+rate+'"></td> ' + '
		 * <td ><input type="hidden" id="quan'+billRecSlaveId+'"
		 * value="'+quantity+'"></td> ' + ' <td ><input type="hidden"
		 * id="disc'+billRecSlaveId+'" value="'+disc+'"></td> ' + ' <td ><input
		 * type="hidden" id="copay'+billRecSlaveId+'" value="'+copay+'"></td> ' + '
		 * <td ><input type="hidden" id="pay'+billRecSlaveId+'"
		 * value="'+pay+'"></td> '
		 *  + '</tr>'; }
		 * 
		 * resultSlave=resultSlave + ' </tbody></table></div></div> ';
		 * result=result +resultSlave;
		 */
	}

	result = result + '	</tbody> ' + '</table> ';

	var len = res.listBillReceiptMaster.length;
	if (len > 0) {

		$("#payable").val(res.listBillReceiptMaster[len - 1].totalRemain);
	}

	$("#cashReceipts").html(result);
}

/*******************************************************************************
 * @author : Bilal
 * @date : 24-June-2017
 * @codeFor : Set reset master receipt of IPD after delete from deleted tab
 ******************************************************************************/
function resetMasterReceiptIPD(recId) {
	var r = confirm("Are You Sure You Want To Reset?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/doctordesk/resetMasterReceiptIPD",
			data : {
				"recId" : parseInt(recId)
			},

			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				$("#deletedReceipt").removeClass("active");
				$("#allReceipt").addClass("active");
				getBillReceiptDetailsIpd("all");
				window.location.reload(true);
				// window.location.reload(true);
			}
		});
	}
}

/*******************************************************************************
 * @author :Bilal
 * @date :27-July-2017
 * @code :for ipd general bill sponsor auto suggetion
 ******************************************************************************/
function setallchargesConfigOnGenBillingIPD(inputID) {
	// var listofunit = [];
	// var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	// var unitlist=listofunit.slice(1);
	var unitlist = "";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype = "all";
	var serviceid = $('#servId').val();

	var sponsorId = 0;// parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = 0;// parseInt($("#chargesSlaveId").val());
	var hallId = 2;
	var hallSlaveId = 0;
	var treatId = $("#treatId").val();

	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined
			|| isNaN(hallSlaveId)) {
		hallSlaveId = 0;
	}
	if (treatId == "" || treatId == null || treatId == undefined
			|| isNaN(treatId)) {
		treatId = 0;
	}
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservicesConf",

		success : function(r) {

			autoCompDoctorDeskOnGenBillingIPD(r, inputID);

		}
	});
}

/*******************************************************************************
 * @author :Bilal
 * @date :27-July-2017
 * @code :for ipd general bill sponsor auto suggetion
 ******************************************************************************/
function autoCompDoctorDeskOnGenBillingIPD(response, id) {

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
	$("#" + id)
			.mcautocomplete(
					{
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ {
							name : 'CategoryName',
							width : '150px',
							valueField : 'categoryName'
						}, {
							name : 'ServiceName',
							width : '100px',
							valueField : 'serviceName'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {

							console.log(ui);

							/*
							 * var hallId2=2;
							 * 
							 * var hallSlaveId2 =$("#ehathallTypeId").val();
							 */

							$('#perticular').val(ui.item.categoryName);
							var isModify = ui.item.isModify;
							if (isModify == "N") {
								$("#rate").prop("disabled", true);
								$("#rateIpdSponsor").prop("disabled", true);
							} else {
								$("#rate").prop("disabled", false);
								$("#rateIpdSponsor").prop("disabled", false);
							}

							$("#saveBill").removeAttr("disabled");
							/*
							 * $("#subservicesname").val(ui.item.categoryName);
							 */$("#subserviceid").val(ui.item.categoryid);
							$("#servicename").val(ui.item.serviceName);
							$("#serviceid").val(ui.item.serviceid);

							var configchages = ui.item.configcharges;

							if (configchages > 0) {

								$("#rate").val(configchages);
								$("#rate2").val(configchages);
							} else {

								$("#rate").val(ui.item.categorycharges);
								$("#rate2").val(ui.item.categorycharges);

							}

							$("#concession").val(ui.item.concession);
							$("#amount").val(ui.item.amount);
							$("#servId").val(ui.item.serviceid);

							// $("#chargesfromConfIpd"
							// ).val(ui.item.configcharges);

							$("#iscombinationIpd").val(ui.item.iscombination);
							$("#categoryidsipd").val(ui.item.categoryid);
							$("#toDate").val(ui.item.toDate);

							// @auhtor-tk @date - 05-feb-2018 @reason open
							// doctor list after selecting service name
							$('#doctorName').select2('open');
							calculatePerticularTotal1();
							calculateEmrCheIpd('general');

							// for Consulting and Visiting
							if ($("#serviceid").val() == 5) {
								document.getElementById("qty").readOnly = true;
							} else {
								document.getElementById("qty").readOnly = false;
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
							if (!data || data.lstService.length === 0
									|| !data.lstService
									|| data.lstService.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'categoryName' : 'NO',
									'serviceName' : 'Match',
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstService;// Response List for
								// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");

						}
					});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 24-July-2017
 * @codeFor : Print Opd Receipts
 ******************************************************************************/
function receiptBillPrint(callFrom, recId, billSettled) {

	var billId = $("#billNo").text();
	var treatId = $("#treatmentId").text();
	var patId = $("#patientId").text();
	var receiptOf = $("#receiptOf").val();
	// var deptId = $("#deptid").val();
	var pendFlag = $("#pendingFlag").val();
	var finalRefundable = $("#finalRefundable").text();// added by kishor
	var chargesSlaveId = $("#chargesSlaveId").val();
	var fb = $("#finalbillis").val();
	var treatcloseForIpd = $("#preIpdId").val();

	if (pendFlag == "Y") {

		billId = $("#pendingBillId").val();
		treatId = $("#pendingTreatId").val();
	} else {

		treatId = parseInt($("#treatmentId").text());
		billId = parseInt($("#billNo").text());
	}

	if (recId == -5) {

		recId = $("#recId").val();
	}

	var paidByCashFlag = $("#paidByCashFlag").val();

	if (paidByCashFlag == "Y" || callFrom == "cashReceiptIpd") {

		window.open("ehat_cashpay_receipt_ipd.jsp?billId=" + billId
				+ "&treatId=" + treatId + "&patId=" + patId + "&recId=" + recId
				+ "&pendFlag=" + pendFlag);
	} else {

		if (callFrom == "receiptIpd") {

			if ($('input[name=outstandingCheckbox]').is(":checked")
					|| billSettled == "Y") {

				window.open("ipd_final_receipt.jsp?billId=" + billId
						+ "&treatId=" + treatId + "&patId=" + patId + "&recId="
						+ recId + "&chargesSlaveId=" + chargesSlaveId
						+ "&finalbillIs" + fb);
			} else {

				window.open("ipd_advance_receipt.jsp?billId=" + billId
						+ "&treatId=" + treatId + "&patId=" + patId + "&recId="
						+ recId + "&pendFlag=" + pendFlag);
			}

		} else if (callFrom == "ipdSummary") {

			//alert("Hi...");
			var risingFlow = $("#risingFlow").val();

			if (risingFlow == "on") {

				var billTypeId = $("input[name='billType']:checked").val();
				window.open("ehat_final_ipd_print_rising.jsp?treatId="
						+ treatId + "&patId=" + patId + "&billTypeId="
						+ billTypeId + "&receiptOf=" + receiptOf
						+ "&finalbillIs=" + fb + "&finalRefundable="
						+ finalRefundable +"&treatcloseForIpd="+treatcloseForIpd);
			} else {

				var billTypeId = $("input[name='billType']:checked").val();
				// window.open("ehat_ipdsumarybillprint.jsp?treatId="+treatId+"&patId="+patId);
				window.open("ehat_final_ipd_print.jsp?treatId=" + treatId
						+ "&patId=" + patId + "&billTypeId=" + billTypeId
						+ "&receiptOf=" + receiptOf + "&finalbillIs=" + fb
						+ "&finalRefundable=" + finalRefundable +"&treatcloseForIpd="+treatcloseForIpd);
			}

		} else if (callFrom == "ipdSummarywithoutDisc") {

			var billTypeId = $("input[name='billType']:checked").val();
			window.open("ehat_final_ipd_print_disc_rising.jsp?treatId="
					+ treatId + "&patId=" + patId + "&billTypeId=" + billTypeId
					+ "&receiptOf=" + receiptOf + "&finalbillIs=" + fb
					+ "&finalRefundable=" + finalRefundable);
			
		}else if (callFrom == "ipdSummaryWithZero") {

			var billTypeId = $("input[name='billType']:checked").val();
			window.open("ehat_final_ipd_print_with_zero.jsp?treatId="
					+ treatId + "&patId=" + patId + "&billTypeId="
					+ billTypeId + "&receiptOf=" + receiptOf
					+ "&finalbillIs=" + fb + "&finalRefundable="
					+ finalRefundable +"&treatcloseForIpd="+treatcloseForIpd);
		} else {

			window.open("ehat_ipd_refund_print.jsp?billId=" + billId
					+ "&treatId=" + treatId + "&patId=" + patId + "&recId="
					+ recId + "");
			// window.open("ehat_ipd_refund.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"");
		}
	}
}

/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 25-July-2018
 * @codeFor : Print Ipd Pharmacy Receipts
 ******************************************************************************/
function receiptBillPrintWithPharmacy(callFrom, recId, billSettled) {

	var billId = $("#billNo").text();
	var treatId = $("#treatmentId").text();
	var patId = $("#patientId").text();
	var receiptOf = $("#receiptOf").val();
	// var deptId = $("#deptid").val();
	var pendFlag = $("#pendingFlag").val();
	var finalRefundable = $("#finalRefundable").text();// added by kishor
	var chargesSlaveId = $("#chargesSlaveId").val();
	var fb = $("#finalbillis").val();
	if (recId == -5) {

		recId = $("#recId").val();
	}
	if (callFrom == "ipdSummary") {

		var billTypeId = $("input[name='billType']:checked").val();

		// window.open("ehat_ipdsumarybillprint.jsp?treatId="+treatId+"&patId="+patId);
		window.open("ehat_final_ipd_with_parmacy_print.jsp?treatId=" + treatId
				+ "&patId=" + patId + "&billTypeId=" + billTypeId
				+ "&receiptOf=" + receiptOf + "&finalbillIs=" + fb
				+ "&finalRefundable=" + finalRefundable);
	} else {

		window.open("ehat_ipd_refund_print.jsp?billId=" + billId + "&treatId="
				+ treatId + "&patId=" + patId + "&recId=" + recId + "");
		// window.open("ehat_ipd_refund.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"");
	}
}

// bank master List...
// @uthor - Sagar
function getBankMasterList2() {
	$('.member').hide();
	$('.member2').hide();

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/bill/getBankMasterList",

		success : function(r) {
			console.log(r);
			setTempForBanktList2(r);// call template
		}
	});
}
// temp for bank list
// @uthor - Sagar
function setTempForBanktList2(r) {

	var list = "<option value='0'>-- Select --</option>";
	for ( var i = 0; i < r.ltBankMaster.length; i++) {

		list = list + "<option value='" + r.ltBankMaster[i].bankId + "'>"
				+ (r.ltBankMaster[i].bankName) + "</option>";
	}
	$("#bankID").html(list);
	$("#bankIdCredit").html(list);
	$("#bankIdCheque").html(list);
	$("#bankIdRtgs").html(list);
	$(".bankList").html(list);

	$("#bankID1").html(list);
}

// hide or show bank name field for billing
// @uthor - Sagar
function BankOnSelect2() {

	/*
	 * var paymode = $("#payMode").val(); if (paymode == 2 || paymode == 3) {
	 * $('.member').show(); $('.member2').show(); } else { $('.member').hide();
	 * $('.member2').hide(); }
	 */

	// var payable=$("#payable").val();
	var payable = 0;

	if ($('#refundableCheckbox').is(':checked')) {

		payable = $("#finalRefundable").html();
	} else {

		payable = $("#finalRemain").html();
	}

	$("#multiPayable").val(payable);
	var paymode = $("#payMode").val();
	$("#payNow").removeAttr("readonly");

	if (paymode == 2 || paymode == 3) {
		$('#headerTable').find('.member').show();
		$('#headerTable').find('.member2').show();
	} else if (paymode == -1) {

		$("#modal-11").addClass("md-show");
		$('#headerTable').find('.member').hide();
		$('#headerTable').find('.member2').hide();
		$("#payNow").prop("readonly", true);
		getBankMasterList2();
		// setMultipaymodeView(1);
		resetMultiPopup();

	} else if (paymode == 4) {

		$('#headerTable').find('.member').hide();
		$('#headerTable').find('.member2').hide();
		//var payable = $("#payable").val();
		var commnAdvc = $("#finalAdvance").html(); // $("#commnAdvc").text();
		var payNow = $("#payNow").val();

		if(Number(commnAdvc) > 0){
			
			if (Number(commnAdvc) > Number(payable)) {

				commnAdvc = Number(commnAdvc) - Number(payable);
				payNow = Number(payable);
				$("#finalAdvance").html(parseFloat(commnAdvc).toFixed(2));
				// $("#commnAdvc").text(commnAdvc);
				$("#payNow").val(parseFloat(payNow).toFixed(2));
			} else {

				// $("#commnAdvc").text(0);
				$("#finalAdvance").html(0.00);
				payNow = Number(commnAdvc);
				$("#payNow").val(parseFloat(payNow).toFixed(2));
			}
		}else{
			
			alert("Common Advance not available..");
			$("#payMode").val(0);
			return false;
		}
		

	} else {
		$('#headerTable').find('.member').hide();
		$('#headerTable').find('.member2').hide();
	}
}

/*******************************************************************************
 * @author :Bilal
 * @date :14-Aug-2017
 * @code :for hall wise charges
 ******************************************************************************/
function hallwiseRateIPDauto(inputID) {
	var listofunit = [];
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	// var unitlist=listofunit.slice(1);
	var unitlist = "";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype = "all";
	var serviceid = 0;
	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	var hallId = 2;
	var hallSlaveId = $("#ehathallTypeId").val();
	// alert(hallSlaveId);
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined
			|| isNaN(hallSlaveId)) {
		hallSlaveId = 0;
	}
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservicesConf",

		success : function(r) {
			/*
			 * alert(r.lstSubService[0].categoryName);
			 */
			setHallWiseRateonBilling(r, inputID);

		}
	});
}

/*******************************************************************************
 * @author Bilal
 * @date 21-JUN-2017
 * @code For fetching Hall id
 ******************************************************************************/
function fetchehatHallTypeSlaveId() {
	var hallId = $("#hallTypeId").val();
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/fetchehatHallNmaeId",
		data : {
			"hallId" : parseInt(hallId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			// alert("hallId >>>>>>>>>>"+response);
			// console.log(response);
			$("#ehathallTypeId").val(response);
		}
	});
}

/*******************************************************************************
 * @author :Bilal
 * @date :14-Aug-2017
 * @code :for hall wise charges
 ******************************************************************************/
function setHallWiseRateonBilling(response, id) {

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
	$("#" + id)
			.mcautocomplete(
					{
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ {
							name : 'CategoryName',
							width : '100px',
							valueField : 'categoryName'
						}, {
							name : 'ServiceName',
							width : '90px',
							valueField : 'serviceName'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {

							console.log(ui);
							// var charges=ui.item.charges;

							$('#perticular').val(ui.item.categoryName);
							/*
							 * $("#subservicesname").val(ui.item.categoryName);
							 */$("#subserviceid").val(ui.item.categoryid);
							$("#servicename").val(ui.item.serviceName);
							$("#serviceid").val(ui.item.serviceid);

							if (ui.item.hallId == 0 || ui.item.hallSlaveId == 0) {
								$("#rate").val(ui.item.categorycharges);
							} else {
								$("#rate").val(ui.item.charges);
							}

							$("#concession").val(ui.item.concession);
							$("#amount").val(ui.item.amount);
							$("#servId").val(ui.item.serviceid);
							$("#chargesfromConfIpd").val(ui.item.charges);

							$("#iscombinationIpd").val(ui.item.iscombination);
							calculatePerticularTotal1();

							return false;

							/*
							 * if( ui.item.categoryDeleted == 'Y' ||
							 * ui.item.charges == 0){
							 * $("#rate").val(ui.item.categorycharges); }else{
							 * $("#rate" ).val(ui.item.charges); }
							 * $('#perticular').val(ui.item.categoryName);
							 * $("#subserviceid").val(ui.item.categoryid);
							 * $("#servicename").val(ui.item.serviceName);
							 * $("#serviceid").val(ui.item.serviceid);
							 * $("#rate").val(ui.item.categorycharges);
							 * $("#concession").val(ui.item.concession);
							 * $("#amount").val(ui.item.amount);
							 * $("#servId").val(ui.item.serviceid);
							 * $("#iscombinationIpd").val(ui.item.iscombination);
							 * calculatePerticularTotal1();
							 * 
							 * return false;
							 */

						},

						// The rest of the options are for configuring the ajax
						// webservice call.
						minLength : 1,
						source : function(request, response) {
							var data = myArray;
							console.log(data);
							console.log(data.lstService.length);
							var result;
							if (!data || data.lstService.length === 0
									|| !data.lstService
									|| data.lstService.length === 0) {

								result = [ {

									'categoryName' : 'NO',
									'serviceName' : 'Match',

								} ];
							} else {
								result = data.lstService;// Response List for

							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");

						}
					});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-August-2017
 * @codeFor : Get Admin Charges details
 ******************************************************************************/
function getAdminChargesIpd(callFrom) {

	var treatmentId = $("#treatmentId").text();
	var billId = $("#billNo").text();
	;

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"treatmentId" : parseInt(treatmentId),
			"billId" : parseInt(billId),
			"callFrom" : callFrom
		},
		url : "ehat/ipdbill/getAdminChargesIpd",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

		}
	});
};

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 21-August-2017
 * @codeFor : Show sponsor for select
 ******************************************************************************/
function showSponsorIpd() {

	var payee = $("#payee").val();

	if (payee == 2) {

		$("#trSpon").show();
	} else {

		$("#trSpon").hide();
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 21-August-2017
 * @codeFor : Show sponsor for select
 ******************************************************************************/
function getCommonAdvcIpd() {

	var callform = "opdBill";
	// var treatmentId=$("#patientId").text();
	var treatmentId = parseInt($("#treatmentId").text());

	jQuery.ajax({
		type : "POST",
		url : "ehat/commanadv/getcommanadvMasterList",
		data : {
			"pID_cID" : treatmentId,
			"callform" : callform
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(response) {

			var totalAdvc = 0;
			for ( var i = 0; i < response.lstCommonadv.length; i++) {

				totalAdvc = Number(totalAdvc)
						+ Number(response.lstCommonadv[i].remaining_amnt);
			}

			$("#commnAdvc").text(parseFloat(totalAdvc).toFixed(2));
			$("#finalAdvance").html(parseFloat(totalAdvc).toFixed(2));
			$("#advancePaid").val(parseFloat(totalAdvc).toFixed(2));
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Set Total Payable
 ******************************************************************************/
function exploreOnClick(callFrom) {

	$(".openAllSlaveIpd").trigger('click');
	/*
	 * var curClass=$("#exploreServ").attr('class');
	 * 
	 * if(curClass=="fa fa-plus"){
	 * 
	 * $("#exploreServ").removeClass('fa fa-plus');
	 * $("#exploreServ").addClass('fa fa-minus');
	 * $("#expPerticularLabels").text('Close All');
	 * 
	 * }else{
	 * 
	 * $("#exploreServ").removeClass('fa fa-minus');
	 * $("#exploreServ").addClass('fa fa-plus');
	 * $("#expPerticularLabels").text('Open All'); }
	 */
}

/*******************************************************************************
 * @author Sagar kadam
 * @date 21/Aug/2017
 * @Code for autosuggestion
 ******************************************************************************/
function getAllPatientRecordsForPrevDigno(inputId, callfrom) {

	var r1 = "";
	var usertype = "";
	var letter = "";
	var sridname = "";
	if (callfrom == "search") {

		sridname = $("#sridnamepr").val();
		letter = $("#byId").val();
		usertype = sridname;
	} else {

		sridname = $("#sridnamepr").val();
		letter = $("#byName").val();
		usertype = sridname;
	}

	var findingName = $("#" + inputId).val();
	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('deptId=' + 3);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/billNoble/getPreviousTreatmentPatient",

		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			digoPrevRecordsSearchTemp(r);
			// autoCompTableforpreviousTreatment(r, inputId);
		}
	});

	/*
	 * 
	 * var deptId = 3; var usertype = ""; var letter = ""; if (callfrom =
	 * "search") { letter = $("#byName").val(); }
	 * 
	 * var findingName = $("#" + inputId).val(); var inputs = [];
	 * inputs.push('findingName=' + findingName); inputs.push('usertype=' +
	 * usertype); inputs.push('letter=' + letter); inputs.push('deptId=' +
	 * deptId); var str = inputs.join('&');
	 * 
	 * jQuery.ajax({ async : true, type : "POST", data : str + "&reqType=AJAX",
	 * url : "ehat/billNoble/getAllPatientRecordsForPrevOPD", success :
	 * function(r) { // setTempPatientRecords(r);
	 * 
	 * //genDignoPrevRecordsTemp(r); //autosuggestionTempForPrevDigno(r,
	 * inputId); digoPrevRecordsSearchTemp(r); //
	 * autoCompTablefoipdManualSummaryTempAuto(r,inputId);
	 *  } });
	 */}

/*******************************************************************************
 * @author Sagar Kadam
 * @date 21/Aug-2017
 * @Code template for Digno Patient records.
 ******************************************************************************/
function genDignoPrevRecordsTemp(r) {
	var htm = '';
	// var dt="29/06/2017";
	var index = 1;
	// var drid=0;
	for ( var i = 0; i < r.listRegTreBillDto.length; i++) {

		var datetime = new Date(r.listRegTreBillDto[i].createdDateTime)
				.toLocaleString();

		htm = htm
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td>"
				+ "<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ r.listRegTreBillDto[i].patientName
				+ "  </td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.listRegTreBillDto[i].patientId
				+ "</td>"

				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ datetime
				+ "</td>"

				+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
				+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToPreviousDignoBill( '
				+ r.listRegTreBillDto[i].treatmentId
				+ ')" type="button"  ></button>' + '</td>';

		+"</tbody>" + "</table>";
		index++;

	}
	$("#IpdGenPreBill").html(htm);
	$("#IpdGenPreBill").processTemplate(r);

}

function digoPrevRecordsSearchTemp(r) {

	var patPrefix = $("#patPrefix").val();
	var patMiddle = $("#patMiddle").val();
	var patSufix = $("#patSufix").val();

	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"

			+ "</tr>" + "</thead>	" + "</table></div>";

	var index = 1;

	htm = htm + "<tbody>";
	for ( var i = 0; i < r.lstRegviewDto.length; i++) {

		var patId = patPrefix + patMiddle + r.lstRegviewDto[i].ptId + patSufix;
		var datetime = new Date(r.lstRegviewDto[i].createdDateTime)
				.toLocaleString();

		htm = htm
				+ "<tr id='div123"
				+ r.lstRegviewDto[i].ptId
				+ "'>"
				+ "<td style='height: 21.5px;' class='col-md-1 center'>"
				+ index
				+ "</td>"
				+ "<td style='height: 21.5px;' class='col-md-4 '>"
				+ r.lstRegviewDto[i].patientName
				+ "</td>"
				+ "<td style='height: 21.5px;' class='col-md-2 center'>"
				+ r.lstRegviewDto[i].mobile
				+ "</td>"

				+ "<td style='height: 21.5px;' class='col-md-1 center'>"
				+ patId
				+ "</td>"
				+ "<td style='height: 21.5px;' class='col-md-2 center'>"
				+ datetime
				+ "</td>"
				+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreDigoBill123("
				+ r.lstRegviewDto[i].ptId
				+ ")'>"
				+ "<img src='images/down.png' id='imgupdown"
				+ r.lstRegviewDto[i].ptId
				+ "' />"
				+ "<input type='hidden' id='hideShowStatus123"
				+ r.lstRegviewDto[i].ptId
				+ "' value='0' /><input type='hidden' id='patientDOB123' value='"
				+ r.lstRegviewDto[i].ptId
				+ "' /></td>"

				+ "</tr>"
				+ "</tbody></table>"
				+ "<tr id='patPreOPDBill123"
				+ r.lstRegviewDto[i].ptId
				+ "' style='width:0%;float:right'><td style='display:none' id='td123"
				+ r.lstRegviewDto[i].ptId
				+ "'>"
				+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
				+ "<tbody1 id='xyz"
				+ r.lstRegviewDto[i].ptId
				+ "'>"
				+ "<tr>"
				+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
				+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
				+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
				+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
				+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
				+ "</tr>" + "</tbody1>" + "</table>" + "</td></tr>";

		index++;

	}
	$("#IpdGenPreBill").html(htm);
	// $("#ehatTable").html(htm);

}

// @Author-Sagar-For previous Digno bill -Autosuggestion for Previous Digno bill
// @date-21/Aug/2017
function autosuggestionTempForPrevDigno(response, id) {
	// var qty = id.slice(0, -1); // for dyamic col getting id

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

						$('#' + id).val(ui.item.patientName);
					}
					/*
					 * This function use for Enter keypress search
					 */

					// getPreviousTreatmentPatient(id,'search');
					getAllPatientRecordsForPrevDigno(id, 'search');

					// $("#mrnNo").val(101);
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
					if (!data || data.listRegTreBillDto.length === 0
							|| !data.listRegTreBillDto
							|| data.listRegTreBillDto.length === 0) {
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
						result = data.listRegTreBillDto;// Response List for All
						// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}
// @Author-Sagar-For previous Digno bill
function sendingToPreviousDignoBill(r) {
	var treatclose = "treatclose";
	window.location = "ehat_billing.jsp?" + "treatmentId=" + r + "&treatclose="
			+ treatclose;

}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 30-August-2017
 * @codeFor : Show sponsor for select
 ******************************************************************************/
function calMultiPayNow(id) {

	/*
	 * var cashAmt=$("#cashAmt").val(); var creditAmt=$("#creditAmt").val(); var
	 * chequeAmt=$("#chequeAmt").val(); var rtgsAmt=$("#rtgsAmt").val();
	 * 
	 * var
	 * total=Number(cashAmt)+Number(creditAmt)+Number(chequeAmt)+Number(rtgsAmt);
	 * var payable=$("#payable").val(); var remain=0; if(payable>=total){
	 * 
	 * remain=Number(payable)-Number(total); }else{
	 * 
	 * alert("Amount should be less than payable"); $("#"+id).val(0); }
	 * 
	 * cashAmt=$("#cashAmt").val(); creditAmt=$("#creditAmt").val();
	 * chequeAmt=$("#chequeAmt").val(); rtgsAmt=$("#rtgsAmt").val();
	 * total=Number(cashAmt)+Number(creditAmt)+Number(chequeAmt)+Number(rtgsAmt);
	 * $("#multiRemain").val(remain); $("#multiPayNow").val(total);
	 */

	var rows = $('#multiPayTable tbody tr.multiPayClass').length;

	var total = 0;
	for ( var i = 1; i <= rows; i++) {

		var cashAmt = $("#txtAmount" + i).val();
		total = Number(total) + Number(cashAmt);
	}

	// var payable=$("#payable").val();
	// var payable=$("#finalRemain").html();

	var payable = 0;

	if ($('#refundableCheckbox').is(':checked')) {

		payable = $("#finalRefundable").html();
	} else {

		payable = $("#finalRemain").html();
	}

	var remain = 0;
	if (payable >= total) {

		remain = Number(payable) - Number(total);
	} else {

		/*
		 * alert("Amount should be less than payable"); $("#"+id).val(0);
		 * total=0; for(var i=1;i<=rows;i++){
		 * 
		 * var cashAmt=$("#txtAmount"+i).val();
		 * total=Number(total)+Number(cashAmt); }
		 */
	}

	/*
	 * cashAmt=$("#cashAmt").val(); creditAmt=$("#creditAmt").val();
	 * chequeAmt=$("#chequeAmt").val(); rtgsAmt=$("#rtgsAmt").val();
	 * total=Number(cashAmt)+Number(creditAmt)+Number(chequeAmt)+Number(rtgsAmt);
	 */
	$("#multiRemain").val(remain);
	$("#multiPayNow").val(total);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 30-August-2017
 * @codeFor : Show sponsor for select
 ******************************************************************************/
function setMultiPayNow() {

	var multiPayNow = $("#multiPayNow").val();
	$("#payNow").val(multiPayNow);

	var payable = 0;

	if ($('#refundableCheckbox').is(':checked')) {

		payable = $("#finalRefundable").html();
	} else {

		payable = $("#finalRemain").html();
	}

	$("#payable").val(parseFloat(payable).toFixed(2));
	$("#modal-11").removeClass("md-show");
}

function closePopup() {

	// $("#idForClose").trigger("click");
	$("#modal-11").removeClass("md-show");
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 30-August-2017
 * @codeFor : Show sponsor for select
 ******************************************************************************/
function resetMultiPopup() {

	var rows = $('#multiPayTable tbody tr.multiPayClass').length;

	for ( var i = 1; i <= rows; i++) {

		$('#multiTr' + i).remove();
	}
	$("#multiPayNow").val(0);
	$("#multiRemain").val(0);
	setMultipaymodeView(1);
}

function setMultipaymodeView(id) {

	var tbody = "";
	tbody = tbody
			+ "<tr class='multiPayClass' id='multiTr"
			+ id
			+ "'>"
			+ "<td><input type='checkbox' id='checkbox"
			+ id
			+ "' name='checkbox' checked='checked'></td>"
			+ "<td>"
			+ "	<select id='payMode"
			+ id
			+ "' onchange='showHideBank("
			+ id
			+ ")' class='form-control input-SmallText' style='width: 100px;'>"
			+ "<option value='1'>Cash</option>"
			+ "<option value='2'>Card</option>"
			+ "<option value='3'>Cheque</option>"
			/* + "<option value='4'>CAdvance</option>" */
			+ "</select>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='txtAmount"
			+ id
			+ "' class='form-control input-SmallText' onkeyup='calMultiPayNow(this.id)'>"
			+ "</td>"
			+ "<td>"
			+ "	<select id='bankID"
			+ id
			+ "' class='form-control input-SmallText bankList' style='width: 100px;' disabled></select>"
			+ "</td>"
			+ "<td><input type='text' style='width: 100px;' id='txtbankNo" + id
			+ "' class='form-control input-SmallText' readonly>" + "</td>"
			+ "<td><input type='text' style='width: 100px;'	id='txtaccNo" + id
			+ "' class='form-control input-SmallText' readonly>"
	"</td>" + "</tr>";

	$("#multiPayTbody").append(tbody);
	getAllPaymentsOnIpdBilling(id);
	$("#bankID" + id).html($("#bankID").html());
}

function getAllPaymentsOnIpdBilling(id) {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/payment/fetchPayList",

		success : function(r) {
			var optionList="<option>---Select---</option>";
			
			for ( var int = 0; int < r.listPay.length; int++) {
				optionList=optionList+"<option value="+r.listPay[int].payId+">"+r.listPay[int].payName+"</option>";
			}
			
			$("#payMode"+id).html(optionList);
		}
	});
}

function showHideBank(id) {

	var payMode = $("#payMode" + id).val();
	if (payMode == 2 || payMode == 3) {

		$("#bankID" + id).prop("disabled", false);
		$("#txtbankNo" + id).prop("readonly", false);
		$("#txtaccNo" + id).prop("readonly", false);
	} else {

		$("#bankID" + id).prop("disabled", true);
		$("#txtbankNo" + id).prop("readonly", true);
		$("#txtaccNo" + id).prop("readonly", true);
		$("#bankID" + id).val(0);
	}

	if(payMode==4){
		
		var payable=$("#payable").val();
		var commnAdvc= $("#finalAdvance").html(); //$("#commnAdvc").text();		
		var payNow=$("#payNow").val();
		
		if(Number(commnAdvc) > 0){
			
			if(Number(commnAdvc)>Number(payable)){
				
				commnAdvc=Number(commnAdvc)-Number(payable);		
				payNow=Number(payable);
				$("#finalAdvance").html(parseFloat(commnAdvc).toFixed(2));
				//$("#commnAdvc").text(commnAdvc);	
				//$("#payNow").val(parseFloat(payNow).toFixed(2));	
				$("#txtAmount"+id).val(payNow);
			}else{
				
				//$("#commnAdvc").text(0);
				$("#finalAdvance").html(0.00);
				payNow=Number(commnAdvc);
				$("#txtAmount"+id).val(payNow);
				//$("#payNow").val(parseFloat(payNow).toFixed(2));
			}	
		}else{
			
			alert("Common Advance not available..");
			$("#payMode"+id).val(1);
			return false;
		}		
	}
	calMultiPayNow();
}

function toCreateTr() {

	var rows = $('#multiPayTable tbody tr.multiPayClass').length;
	// getBankMasterList2();
	setMultipaymodeView(rows + 1);
}

function toRemoveTr() {

	var rows = $('#multiPayTable tbody tr.multiPayClass').length;
	$('#multiTr' + rows).remove();
	calMultiPayNow();
}

function disablePerticular() {

	$("#saveBill").attr("disabled", true);
}
/*******************************************************************************
 * @author : Bilal
 * @date : 09-Sep-2017
 * @codeFor : sponsor charges ipd
 ******************************************************************************/
function getchargesipd() {
	var val = 0;
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();

	var categoryid = $("#categoryidsipd").val();

	var hallId = 2;//$('#hallId').val();
	var hallSlaveId = $('#hallId').val();
	var treatId = $("#treatId").val();
	var toDate = $("#toDate").val();
	// alert("toDate???"+toDate);

	if (toDate == "" || toDate == null || toDate == undefined) {
		toDate = "0";
	}
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
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

	if (treatId == "" || treatId == null || treatId == undefined
			|| isNaN(treatId)) {
		treatId = 0;
	}

	var inputs = [];

	inputs.push('serviceid=' + categoryid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	// inputs.push('toDate=' + toDate);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsor",

		success : function(r) {
			val = r;
			$("#rategeneral").val(r);
			$("#chargesfromConfIpd").val(r);
			console.log(r);
		}
	});
	return val;
}

/*******************************************************************************
 * @author : Sagar
 * @date : 11-sep-2017
 * @codeFor : Get for ipd bill patients
 ******************************************************************************/
function autosuggesstionIpdBillPatTemp(inputId, callfrom) {
	// alert("hi..");
	var finalBill = "generalBill";
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('finalBill=' + finalBill);
	var str = inputs.join('&');
	// var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/autosuggesstionviewIpdbillPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			if (letter == "" || letter == " ") {
				getIpdBillPatients("onload", 0);
			} else {
				setIpdbillPatientsTemp(r);
			}

			// setIpdbillPatTemp(r);
			// autoCompTemp(r,inputId);
		}
	});
}

/*******************************************************************************
 * @author : Kishor
 * @date : 03-Nov-2017
 * @codeFor : Get for Final ipd bill patients
 ******************************************************************************/
function autosuggesstionIpdBillPatTempFinalBill(inputId, callfrom) {
	// alert("hi..");
	var finalBill = "finalBill";
	var usertype = "";
	var letter = "";

	if (callfrom = "search") {
		letter = $("#byName").val();
		if ($("#byid").is(':checked')) {

			usertype = "Y";
		} else {
			usertype = "N";
		}
	}

	var findingName = $("#" + inputId).val();

	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('finalBill=' + finalBill);
	var str = inputs.join('&');
	// var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/autosuggesstionviewIpdbillPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			setIpdbillPatientsTempFinalBill(r);
			// setIpdbillPatTemp(r);
			// autoCompTemp(r,inputId);
		}
	});
}

/*******************************************************************************
 * @author : Sagar Kadam
 * @date : 11-sep-2017
 * @codeFor : Autosuggestion Template for Markvisit
 ******************************************************************************/
function autoCompTemp(response, id) {
	// var qty = id.slice(0, -1); // for dyamic col getting id

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

					// var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.fName != 'Match') {

						$('#' + id).val(ui.item.patientName);
					}
					/*
					 * This function use for Enter keypress search
					 */
					autosuggesstionIpdBillPatTemp(id, 'search');
					// $("#mrnNo").val(101);
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstIpdbillPatients.length);
					var result;
					if (!data || data.lstIpdbillPatients.length === 0
							|| !data.lstIpdbillPatients
							|| data.lstIpdbillPatients.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/* 'dn' : 'No', */
							'patientName' : 'Record',
							'pId' : 'Found',
						/* 'depNm' : 'Match' */
						} ];
					} else {
						result = data.lstIpdbillPatients;// Response List for
															// All
						// Services
					}

					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

/*******************************************************************************
 * @author : Sagar
 * @date : 11-sep-2017
 * @codeFor : Set ipd queue template
 ******************************************************************************/
function setIpdbillPatTemp(res) {

	var count = 0;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed table-stripped cf'>"
			+ "<thead class='cf'>"
			+ "<tr>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
			+ "<th class='col-md-2-1' style='padding-left: 0px;'><label class='TextFont'>Mrn No</label></th>"

			+ "<th class='col-md-2-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>"

			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Age</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Weight</label></th>"

			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Date/Time</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Ward</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Bed No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Action</label></th>"

			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Print</label></th>"
			+ "</tr>"
			+ "</thead>"
			+ "</table>"
			+ "</div>"
			+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
			+ "	<table class='table table-condensed table-stripped cf'>"
			+ "<tbody class='cf'>";

	for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {

		var fullName = res.lstIpdbillPatients[indx].patientName;
		ipdqueueTemp = ipdqueueTemp
				+ "<tr>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
				+ count
				+ "</td>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>12345678-D</td>"

				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ fullName
				+ "</td>"
				+ "	<td class='col-sm-1-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].pId
				+ "</td>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>10yr-D</td>"

				+ "	<td class='col-sm-1-1'  style='height: 21.5px;'>50Kg</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>IPD/2017/06/166</td>"

				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>30/06/2017</td>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>--</td>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>--</td>"

				+ "<td class='center' style='width: 7%;'>"

				+ "<button onclick=viewBedWard("
				+ res.lstIpdbillPatients[indx].treatId
				+ ") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "</td>"
				+ "<td class='center' style='width: 7%;'>"
				+ "<button onclick=printIPDFormJsp("
				+ res.lstIpdbillPatients[indx].pId
				+ ") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
				+ "</td>"

				+ "</tr>";

		count = count + 1;
	}
	ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
	$("#ipdBillPatients").html(ipdqueueTemp);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 09-Oct-2017
 * @codeFor : Manage discount popup
 ******************************************************************************/
function showManagePopUp(type) {
	$("#docdiscdiv").show();
	$("#hosdiscdiv").show();
	$("#dDiscount").prop("readonly", false);
	$("#sDiscount").prop("readonly", false);
	$("#dDiscountInPercentage").prop("readonly", false);
	$("#sDiscountInPercentage").prop("readonly", false);
	$("#IdHeaderApprovedDisc").hide();
	$("#idApprovedDiscountTextTr").hide();
	$("#idApprovedDiscountTr").hide();
	$("#IdHeaderApprovedSurgeonDisc").hide();
	$("#idApprovedSurgeonDiscountTr").hide();
	$("#idApprovedSurgeonDiscountTextTr").hide();
	$("#pharmadiscdiv").show();
	if (type == "save") {
		$("#dNarration").val("");
		// $("#dTotal").val($("#finalRemain").html());
		$("#dTotal").val($("#grandTotal").html());

		$("#dDiscount").val(0);
		$("#dDiscountInPercentage").val(0);
		// $("#dPayable").val($("#finalRemain").html());

		var payable = Number($("#grandTotal").html())
				- (Number($("#finalDiscount").html()) + Number($("#conTotal")
						.html()));

		$("#dPayable").val(payable);
		$("#discountId").val(0);

		var sdisc = $("#SpecialDisc").val();
		if (sdisc == 0) {
			// $("#disconPay").attr('disabled', true);
			// $("#docdisconPay").attr('disabled', true);
		} else {
			$("#disconPay").attr('disabled', false);
			$("#docdisconPay").attr('disabled', false);
		}

		$("#surgeonlist").val("select");
		$("#sNarration").val("");
		$("#sTotal").val(0);
		$("#sPayable").val(0);
		$("#sDiscount").val(0);
		$("#sDiscountInPercentage").val(0);
		
		var refDoctorName = $("#refDoctor").text();
		if(refDoctorName==null || refDoctorName==undefined || refDoctorName==" "){
			$("#discountFromIpd option[value='RefDoctor']").remove();
			
		}else{
			$("#refDoctorNameIpd").text(refDoctorName);
		}
		

		var spId = $("#chargesSlaveId").val();
		if (spId > 0) {

			$("#disconPay").prop("checked", true);
			$("#docdisconPay").prop("checked", true);

		} else {

			$("#disconCoPay").prop("checked", true);
			$("#docdisconCoPay").prop("checked", true);
		}
	}
	$(".popup").show('show');

	// treatmentId = parseInt($("#treatmentId").text());
	// getSubServiceDetails1ForOT(0, treatmentId, 4);

	fetchSurgonList("onclick");
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 09-Oct-2017
 * @codeFor : Close manage discount popup
 ******************************************************************************/
function closeManagePopUp() {
	$(".popup").hide('hide');
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 16-Oct-2017
 * @codeFor : Save ipdbill discount
 ******************************************************************************/
function saveEditIPDDiscount() {

	var callFrom = "hospital";
	var unitId = parseInt($("#unitId").val());
	var userId = parseInt($("#userId").val());
	var treatmentId = parseInt($("#treatmentId").text());
	var patientId = parseInt($("#patientId").text());
	var centerPatientId = parseInt($("#patientId").text());
	// var discRemark

	var remark = $("#discRemark11").val();
	var authBy = parseInt($("#discAuthSel").val());

	// var totalAmount=$("#dTotal").val();
	var billId = $("#billNo").text();
	var dDiscount = $("#dDiscount").val();
	var dDiscountInPercentage = $("#dDiscountInPercentage").val();
	var totalAmount = $("#dTotal").val();
	// var totalPayable = $("#dPayable").val();

	if (typeof dDiscountInPercentage == 'undefined') {
		dDiscountInPercentage = 0.0;
	} else {
		dDiscountInPercentage = parseFloat($("#dDiscountInPercentage").val());
	}
	var dNarration = $("#dNarration").val();
	// var discountId = $("#discountId").val();

	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(dDiscount)) {
		alert("Discount(Rs) field should be only digits with a single dot allowed");
		$("#dDiscount").focus();
		return false;
	}
	if (!pattern.test(dDiscountInPercentage)) {
		alert("Discount(%) field should be only digits with a single dot allowed");
		$("#dDiscountInPercentage").focus();
		return false;
	}

	var payFlag = "";

	if ($("#disconPay").prop('checked') == true) {
		payFlag = $("#disconPay").val();
	} else if ($("#disconCoPay").prop('checked') == true) {
		payFlag = $("#disconCoPay").val();
	}
	if (payFlag == "") {
		alert("Please select PayFlag to give Discount");
		return false;
	}
	if (dDiscount == 0 || dDiscount == "") {
		alert("Discount field should not be empty.");
		$("#dDiscount").focus();
		return false;
	}
	/*
	 * if (remark == "" || remark == 0) { alert("Discount remark should not be
	 * empty."); $("#discRemark").focus(); return false; }
	 */
	
	var discountFrom = $("#discountFromIpd").val();
	if(discountFrom==null||discountFrom==undefined){
		discountFrom="-";
	}

	var sourceCatId = $("#SponsorsourceTypeId").val();
	var sponsorCatId = $("#chargesSlaveId").val();

	var inputs = [];
	inputs.push("treatmentId=" + treatmentId);
	inputs.push('billId=' + billId);
	inputs.push('patientId=' + patientId);
	inputs.push("unitId=" + unitId);
	inputs.push("createdBy=" + userId);
	inputs.push('totalAmt=' + totalAmount);
	inputs.push('totalDisc=' + dDiscount);
	inputs.push('totalDiscInPer=' + dDiscountInPercentage);
	inputs.push('discNarrtn=' + dNarration);
	inputs.push('callFrom=' + callFrom);
	inputs.push('payFlag=' + payFlag);
	inputs.push('remark=' + encodeURIComponent(remark));
	inputs.push('authBy=' + authBy);
	inputs.push('sourceCatId=' + sourceCatId);
	inputs.push('sponsorCatId=' + sponsorCatId);
	inputs.push('centerPatientId=' + centerPatientId);
	inputs.push('discountFrom=' + discountFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/saveEditIPDDiscount",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('Network Issue');
		},
		success : function(r) {

			if (r == 1) {

				alert("Discount saved successfully");
			} else {

				alert("Network Issue");
			}

			location.reload();
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 06-Jan-2018
 * @codeFor : Save ipdbill Surgon discount
 ******************************************************************************/
function saveDoctorDiscount() {

	var callFrom = "hospital";
	var unitId = parseInt($("#unitId").val());
	var userId = parseInt($("#userId").val());
	var treatmentId = parseInt($("#treatmentId").text());
	var patientId = parseInt($("#patientId").text());

	var remark = $("#docDiscRemark").val();
	var authBy = parseInt($("#docDiscAuthSel").val());

	// var totalAmount=$("#dTotal").val();
	var billId = $("#billNo").text();

	var sNarration = $("#sNarration").val();
	var sDiscount = $("#sDiscount").val();
	var sDiscountInPercentage = parseFloat($("#sDiscountInPercentage").val());
	var docid = $("#surgeonlist").val();
	// var opId = docid.split("@");
	// var discountSaveEditType = $("#discountSaveEditType").val();
	var totalAmount = $("#sTotal").val();
	var totalPayable = $("#sPayable").val();

	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(sDiscount)) {
		alert("Discount(Rs) field should be only digits with a single dot allowed");
		$("#sDiscount").focus();
		return false;
	}
	if (!pattern.test(sDiscountInPercentage)) {
		alert("Discount(%) field should be only digits with a single dot allowed");
		$("#sDiscountInPercentage").focus();
		return false;
	}

	var payFlag = "";

	if ($("#docdisconPay").prop('checked') == true) {
		payFlag = $("#docdisconPay").val();
	} else if ($("#docdisconCoPay").prop('checked') == true) {
		payFlag = $("#docdisconCoPay").val();
	}

	if (payFlag == "") {
		alert("Please select PayFlag to give Discount");
		return false;
	}
	if (sDiscount == 0 || sDiscount == "") {
		alert("Discount field should not be empty.");
		$("#sDiscount").focus();
		return false;
	}

	/*
	 * var inputs = []; inputs.push('action=saveIPDDoctorDiscount');
	 * inputs.push('sNarration=' + sNarration); inputs.push('sDiscount=' +
	 * sDiscount); inputs.push('sDiscountInPercentage=' +
	 * sDiscountInPercentage); inputs.push('totalAmount=' + totalAmount);
	 * inputs.push('totalPayable=' + totalPayable); inputs.push('opId=' +
	 * opId[0]); inputs.push('payFlag=' + payFlag);
	 * inputs.push('discountSaveEditType=' + discountSaveEditType);
	 * inputs.push('doctorid=' + opId[1]); var str = inputs.join('&');
	 * 
	 * jQuery.ajax({ async : true, type : "POST", data : str + "&reqType=AJAX",
	 * url : "BillServlet", timeout : 1000 * 60 * 15, cache : false, error :
	 * function() { alert('error'); }, success : function(r) { alert(r);
	 * location.reload(); } });
	 */

	var sourceCatId = $("#SponsorsourceTypeId").val();
	var sponsorCatId = $("#chargesSlaveId").val();

	var inputs = [];
	inputs.push("treatmentId=" + treatmentId);
	inputs.push('billId=' + billId);
	inputs.push('patientId=' + patientId);
	inputs.push("unitId=" + unitId);
	inputs.push("createdBy=" + userId);
	inputs.push('totalAmt=' + totalAmount);
	inputs.push('totalDisc=' + sDiscount);
	inputs.push('totalDiscInPer=' + sDiscountInPercentage);
	inputs.push('discNarrtn=' + sNarration);
	inputs.push('callFrom=' + callFrom);
	inputs.push('payFlag=' + payFlag);
	inputs.push('remark=' + encodeURIComponent(remark));
	inputs.push('authBy=' + authBy);
	inputs.push('sourceCatId=' + sourceCatId);
	inputs.push('sponsorCatId=' + sponsorCatId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/saveDoctorDiscount",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('Network Issue');
		},
		success : function(r) {

			if (r == 1) {

				alert("Discount saved successfully");
			} else {

				alert("Network Issue");
			}

			location.reload();
		}
	});
}

function setManagePayable(callfrom) {
	// var dPayable = 0.0;
	var dDiscount = 0.0;
	var dTotal = 0.0;
	$("#dDiscountInPercentage").val(0);
	$("#sDiscountInPercentage").val(0);

	/*
	 * var billComps = $("#billComps").html(); var billBean = eval('(' +
	 * billComps + ')');
	 */

	if (callfrom == "Hospital") {
		dPayable = parseFloat($("#dPayable").val());
		dDiscount = parseFloat($("#dDiscount").val());
		var dTotal=(Number(dDiscount)/Number(dPayable))*100;
		if(Number(dDiscount)>Number(dPayable)){
			alert("Discount should not be greater than payable");
			$("#discount").val(0);
			$("#dDiscount").val(0);
			$("#payNow").val(0);
		}
	} else {
		dPayable = parseFloat($("#sTotal").val());
		dDiscount = parseFloat($("#sDiscount").val());
		dTotal = parseFloat($("#sTotal").val());
		$("#dDiscountInPercentage").val(parseFloat(dTotal).toFixed(2));
	}

	if (dDiscount > dPayable) {
		alert("Discount Cannot Be Greater Than Total Amount");
		if (callfrom == "Hospital") {
			// $("#dPayable").val($("#dTotal").val());
			$("#dDiscount").val("0");
		} else {
			// $("#sPayable").val($("#sTotal").val());
			$("#sDiscount").val("0");
		}
		return false;
	}
	// var finalDiscountForTotal = 0;
	/*
	 * for ( var di = 0; di < billBean.liDisc.length; di++) {
	 * finalDiscountForTotal = finalDiscountForTotal + billBean.liDisc[di].disc; }
	 */
	/* var serviceTax = billBean.hospDetail[0].serTax; */
	/*
	 * if (callfrom == "Hospital") { dTotal = dTotal - finalDiscountForTotal; }
	 * else { dTotal = dTotal; } if (isNaN(dDiscount) == true) { dTotal =
	 * dTotal; } else { dTotal = dTotal - dDiscount; }
	 */
	/*
	 * serviceTax = (serviceTax / 100); var serviceTaxTotal = (dTotal) + (dTotal *
	 * serviceTax);
	 */

	if (isNaN(dDiscount) == true) {
		dTotal = dTotal;
			} else {
		$("#dDiscountInPercentage").val(parseFloat(dTotal).toFixed(2)); 
		dTotal = dTotal - dDiscount;
	}

	/*
	 * if (callfrom == "Hospital") { $("#dPayable").val(dTotal.toFixed(2)); }
	 * else { $("#sPayable").val(dTotal.toFixed(2)); }
	 */
}

function setPayableForPercentageDiscnt(callfrom) {
	var overalldisount = 0;
	var totalDiscount = 0;
	var sTotal = 0;
	var sPayable = 0;
	if (callfrom == "Hospital") {
		dPayable = parseFloat($("#dPayable").val());
		dDiscount = parseFloat($("#dDiscount").val());
		overalldisount = parseFloat($("#overalldisount").val());
		// dTotal = parseFloat($("#dTotal").val());
		dTotal = parseFloat($("#dPayable").val());
		var dPercentageDiscount = parseFloat($("#dDiscountInPercentage").val());

		var serviceTax = 0;
		if (dTotal > 0) {

			if ($("#dDiscountInPercentage").val().trim().length > 0) {
				var dPercntgDisc = dTotal * (dPercentageDiscount / 100);

				if (dPercntgDisc > dTotal) {
					alert("Discount Cannot Be Greater Than Total Amount");
					if (callfrom == "Hospital") {

						var payable = Number($("#grandTotal").html())
								- (Number($("#finalDiscount").html()) + Number($(
										"#conTotal").html()));
						// $("#dPayable").val(payable);
						$("#dDiscount").val("0");
						$("#dDiscountInPercentage").val("0");
					}
					return false;
				}
				if (callfrom == "Hospital") {
					dTotal = dTotal - overalldisount;
				} else {
					dTotal = dTotal;
				}
				if (isNaN(dDiscount) == true) {
					dTotal = dTotal;
				} else {
					dTotal = dTotal - dPercntgDisc;
				}
				serviceTax = (serviceTax / 100);
				var serviceTaxTotal = (dTotal) + (dTotal * serviceTax);

				$("#dDiscount").val(dPercntgDisc.toFixed(2));
				// $("#dPayable").val(serviceTaxTotal.toFixed(2));

				if ($("#dPayable").val() < 0) {

					alert("Payable should be greater than 0");
					$("#dDiscount").val(0);
					$("#dDiscountInPercentage").val(0);
					return false;
				}
			}
		} else {

			alert("Discount Cannot Be Greater Than Total Amount");
			$("#dDiscountInPercentage").val("0");
		}

	} else {
		if ($("#sTotal").val().trim().length > 0) {
			sTotal = parseFloat($("#sTotal").val());
			sPayable = parseFloat($("#sPayable").val());
			var sDiscount = parseFloat($("#sDiscount").val());
			var sPercentageDiscount = parseFloat($("#sDiscountInPercentage")
					.val());

			if ($("#sDiscountInPercentage").val().trim().length > 0) {
				var percntgDisc = sTotal * (sPercentageDiscount / 100);
				var totalPayable = sTotal - percntgDisc;
				$("#sDiscount").val(percntgDisc.toFixed(2));
				$("#sPayable").val(totalPayable.toFixed(2));
			} else {
				$("#sDiscount").val(0);
				$("#sPayable").val(sPayable);
				$("#sTotal").val(sTotal);
			}
		} else {
			$("#sDiscount").val(0);
			$("#sPayable").val($("#sPayable").val());
			$("#sTotal").val($("#sTotal").val());
		}
	}
}

function discountApprovalSearch(searchOn, discountType) {
	var searchBy;
	var value;
	var temp = 0;
	if (searchOn == "onload") {
		searchBy = "byName";
		value = "value";
	} else {
		if (discountType == "Hospital") {
			var byName = $("#byNameSearch").val();
			var byId = $("#byIdSearch").val();

			if (byName != "") {
				var strArr = new Array();
				strArr = byName.split("");
				if (strArr[0] == " ") {
					temp = 1;
				}
			}
			if (temp == 1) {
				alert("shouldn't be blank or contain blank space at the Beginning!!");
				$("#byNameSearch").val("");
				$("#byNameSearch").focus();
				return false;
			}

			if (byName != "" && byId != "") {
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
			}
		}else if(discountType == "ApprovedDiscount") {
			var byName = $("#byNameSearch").val();
			var byId = $("#byIdSearch").val();

			if (byName != "") {
				var strArr = new Array();
				strArr = byName.split("");
				if (strArr[0] == " ") {
					temp = 1;
				}
			}
			if (temp == 1) {
				alert("shouldn't be blank or contain blank space at the Beginning!!");
				$("#byNameSearch").val("");
				$("#byNameSearch").focus();
				return false;
			}

			if (byName != "" && byId != "") {
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
			}
		}
		
		
		else {
			var byName = $("#byNameSearchForSurgeon").val();
			var byId = $("#byIdSearchForSurgeon").val();

			if (byName != "") {
				var strArr = new Array();
				strArr = byName.split("");
				if (strArr[0] == " ") {
					temp = 1;
				}
			}
			if (temp == 1) {
				alert("shouldn't be blank or contain blank space at the Beginning!!");
				$("#byNameSearchForSurgeon").val("");
				$("#byNameSearchForSurgeon").focus();
				return false;
			}

			if (byName != "" && byId != "") {
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
			}
		}
	}

	var inputs = [];
	//inputs.push('action=showDiscountApproval');
	inputs.push('searchOn=' + searchOn);
	inputs.push('searchBy=' + searchBy);
	inputs.push('discountType=' + discountType);
	inputs.push('value=' + encodeURIComponent(value));

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "BillServlet",
		url : "./ehat/admindata/showDiscountApproval",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {			
			ajaxResponse = r;
			$("#billDetails").html(ajaxResponse);
			billBean = eval('(' + ajaxResponse + ')');
			if (billBean.pl.length == 0 && searchOn != "onload") {
				alert("Patient Not Found");
			} else {
				if (discountType == "Hospital") {
					$("#BillContainer").setTemplate(discountApprovalForIPD);
					$("#BillContainer").processTemplate(billBean);
				} else {
					$("#BillContainerForSurgeon").setTemplate(
							discountApprovalForIPD);
					$("#BillContainerForSurgeon").processTemplate(billBean);
					discountPatientAutosuggestionsearch('onload', 'Surgeon');
				}
			}
		}
	});
}

function setAutoPatientName(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();

	var autoType = '';
	var auto = '';
	if (callFrom == "IPD_OPD_PatientDatabase") {
		auto = 'PatientName';
	} else if (callFrom == "OPDOldPatientDatabase") {
		auto = 'OPDManagementPatient';
	} else if (callFrom == "IPD_BedWardPatientDatabase") {
		auto = 'ipdbedward';
	} else if (callFrom == "IPD_OldPatientDatabase") {
		auto = 'ipdPatient';
	} else if (callFrom == "IPD_Bill_PatientDatabase") {
		auto = 'IPDBillPatient';
	} else if (callFrom == "Diagno_PatientBillDatabase") {
		auto = 'DigonosticPatient';
	} else if (callFrom == "MarkVisit_Database") {
		auto = 'MarkVisitPatient';
	} else if (callFrom == "previousOPDbill") {
		auto = 'PreviousOPDBillPatient';
	} else if (callFrom == "IPD_AdvanceDatabase") {
		auto = 'IPDAdvance';
	} else if (callFrom == "Consentform_Database") {
		auto = 'Consentform';
	} else if (callFrom == "Manage_ReferenceDatabase") {
		auto = 'Manage_Reference';
	} else if (callFrom == "OPDDoctorDesk_Dashboard") {
		auto = 'OPDDoctorDesk';
		autoType = inputID.substring(5);
	} else if (callFrom == "OperationDashboard") {
		auto = 'ManageOperationPatient';
	} else if (callFrom == "OperationSummaryDashboard") {
		auto = 'previousOperation';
	} else if (callFrom == "prevIPD_BillDatabase") {
		auto = 'preIPDBillPatient';
		autoType = 'g';
	} else if (callFrom == "BillingRegister") {
		auto = 'preIPDBillPatient';
		autoType = 'c';
	} else if (callFrom == "Pharmacy_Invoice") {
		auto = 'ipdPatient';
	} else if (callFrom == "CardioAssignTestPatientDatabase") {
		auto = 'CardiologyAssignPatient';
		// Auto Suggetion for Admin Model
	} else if (callFrom == "UserMgmt_Database"
			|| callFrom == "User_Access_Mgmt" || callFrom == "HRMgmt_Database") {
		auto = 'UserName';
	} else if (callFrom == "HallType_Management") {
		auto = 'HallTypeName';
	} else if (callFrom == "BedWard_Management") {
		auto = 'HallName';
	} else if (callFrom == "ChartMgmt_Database") {
		auto = 'ChartName';
	} else if (callFrom == "PhysiotherapyTest") {
		auto = 'PhysioTestName';
	} else if (callFrom == "DentalService_Database") {
		auto = 'DentalService';
	} else if (callFrom == "CasualityService_Database") {
		auto = 'CasualityTestName';
	} else if (callFrom == "OTandIPDservice_Database") {
		auto = 'IpdService';
		testType = $("#testType").val();
		if (testType == "bed") {
			autoType = 'b';
		} else if (testType == "gas") {
			autoType = 'g';
		} else if (testType == "instrument") {
			autoType = 'i';
		}
	} else if (callFrom == "NursingStation_BedSideProcedures") {
		auto = 'IpdService';
		autoType = 'b';
	} else if (callFrom == "NursingStation_GasesMonitors") {
		auto = 'IpdService';
		autoType = 'g';
	} else if (callFrom == "NursingStation_Instruments") {
		auto = 'IpdService';
		autoType = 'i';
	} else if (callFrom == "InvestigationTest") {
		auto = 'Investigation_Test';
	} else if (callFrom == "InvestigationTestGroup") {
		auto = 'Invest_Test_Group';
	} else if (callFrom == "InvestigationBodyPart") {
		auto = 'Invest_Body_Part';
	} else if (callFrom == "prev_databaseForConsentForm") {
		auto = 'prev_databaseForConsentForm';
	} else if (callFrom == "OPD_Appoinment") {
		auto = 'PatientName';
	} else if (callFrom == "Previous_ManualSummary") {
		auto = 'Previous_ManualSummary';
	} else if (callFrom == "Previous_AutoSummary") {
		auto = 'Previous_AutoSummary';
	} else if (callFrom == "Medicine") {
		auto = 'medicine';
	} else if (callFrom == "PreOperativeCheckListMasterDetails") {
		auto = 'PreOperativeCheckList';
	} else if (callFrom == "OTOperationAction") {
		auto = 'PreOperativeCheckList';
	} else if (callFrom == "PreviousDiagno_PatientBillDatabase") {
		auto = 'PreviousDiagno_PatientBillDatabase';
	} else if (callFrom == "ShowTopPatForCertificate") {
		auto = 'ShowTopPatForCertificate';
	} else if (callFrom == "OtherServicesCharges") {
		auto = 'OtherServicesCharges';
	} else if (callFrom == "Anaesthetist_Fee_Management") {
		auto = 'Anaesthetist_Fee_Management';
	} else if (callFrom == "Anaesthetist_Fee_Management") {
		auto = 'Anaesthetist_Fee_Management';
	} else if (callFrom == "Pre-Anaesthetic_Assessment") {
		auto = 'Pre-Anaesthetic_Assessment';
	}// Tushar Code For Visiting Doctor Fee @ 1Feb2017
	else if (callFrom == "Visiting_Doc_Fee_Management") {
		auto = 'Visiting_Doc_Fee_Management';
	}// Tushar Code For Medication Route Master @ 13Feb2017
	else if (callFrom == "routeMaster") {
		auto = 'routeMaster';
	}

	/*
	 * else if (callFrom == "OPD_Appoinment") { //alert("in OPDAppoinment's
	 * condition "); auto = 'AutoPatientNameforAppointment'; }
	 */

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
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {

					ajaxResponse = r;// decodeURIComponent(r);
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
					$("#pathiddenid").val(idValue);
					setTimeout(function() {
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

		$("#" + inputID).val((item.text).trim());
		// @author : Touheed Khan
		// for channeling doctor in Motivator
		$("#txtDoctorId").val((item.value).trim());
		// @author : Amol Saware
		// for search user in HR module
		/*
		 * var
		 * currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
		 * if(currentPage=="HRManagement"){ searchViewUser('HRDashBoard'); }
		 */
	}

}

function discountPatientAutosuggestionsearch(callfrom, discountType) {
	var resultData = [];
	if (discountType == "Hospital") {
		var inputId = "byNameSearch";
		var byName = $("#byNameSearch").val();
	} else {
		var inputId = "byNameSearchForSurgeon";
		var byName = $("#byNameSearchForSurgeon").val();
	}

	var auto = 'discountApproval';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('byName=' + byName);
	inputs.push('discountType=' + discountType);
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
					ajaxResponse = r;
					var arrValue;
					var availableTags = [];
					var template = "";
					var idValue;
					availableTags = ajaxResponse.split("\n");
					for ( var j = 0; j < availableTags.length; j++) {
						arrValue = (availableTags[j]).split("_");
						idValue = arrValue[1];
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + (idValue)
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					setTimeout(function() {
						$("#div" + inputId + " .typeahead").html(template);
						if (callfrom != "onload") {
							$("#div" + inputId + " .typeahead").show();
						}
						$('#' + inputId).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputId).data('typeahead').source = resultData;
					}, 300);
				}
			});
	function displayResult(item) {
		if (discountType == "Hospital") {
			$("#byNameSearch").val(item.text);
			$("#" + inputId).val((item.text).trim());
		} else {
			$("#byNameSearchForSurgeon").val(item.text);
			$("#" + inputId).val((item.text).trim());
		}
	}
}

var discountApprovalForIPD = "{#foreach $T.pl as pl}"
		+ "	<tr>"
		+ "		<td class='col-md-1-1' style='width: 5%;'>{count++}.</td>"
		+ "		<td class='col-md-2-1' >{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "		<td class='col-md-1-1' style=''>{$T.pl.pi}</td>"
		+ "		<td class='col-md-1-1 '>{$T.pl.tm}</td>"
		+ "		<td class='col-md-2-1'>{$T.pl.wttp} ({$T.pl.category})</td>"
		+ "		<td class='col-md-1-1'>{$T.pl.totalPayble}</td>"
		+ "		<td class='col-md-1-1' style=''>{$T.pl.annIncm}</td>"
		+ "		<td class='col-md-1-1' style=''><input type='text' class='form-control input-SmallText' id='approveDiscount_{$T.pl.bmiBsaID}' value='{$T.pl.annIncm}' onkeypress='return validatePrice(event)'></td>"
		+ "		<td class='col-md-1-1'><textarea class='form-control input-SmallText' style='' id='approveNarration_{$T.pl.bmiBsaID}' value='{$T.pl.sdisc}'></textarea></td>"
		+ "		<td class='col-md-2-1 center'>"
		+ "			<button class='btn btn-xs btn-success' style='font-size: 10px;' "
		+ "			onclick=approvedDiscountForIPD({$T.pl.bmiBsaID},'confirm','{$T.pl.education}') data-toggle='tooltip' data-placement='top' title='Approve Discount' >Approved</button>   <button class='btn btn-xs btn-danger' onclick=approvedDiscountForIPD({$T.pl.bmiBsaID},'cancel','{$T.pl.education}') data-toggle='tooltip' data-placement='top' title='Disapprove Discount'><i class='fa fa-times'></i>"
		+ "		</td>" + "	</tr>" + "	{#/for}";

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 23-oct-2017
 * @codeFor : Fetch Ipd bill discount
 ******************************************************************************/
function fetchIpdbilDiscount(callFrom) {

	// alert(callFrom);

	var treatId = 0;

	if (callFrom == "ipdBill") {

		treatId = $("#treatmentId").text();
	}

	/*
	 * var unitId = parseInt($("#unitId").val()); var userId =
	 * parseInt($("#userId").val()); var treatmentId =
	 * parseInt($("#treatmentId").text()); var patientId =
	 * $("#patientId").text();
	 */

	var inputs = [];

	inputs.push("callFrom=" + callFrom);
	inputs.push("treatmentId=" + treatId);
	/*
	 * inputs.push("unitId=" + unitId); inputs.push("userId=" + userId);
	 * inputs.push("treatmentId=" + treatmentId); inputs.push("patientId=" +
	 * patientId);
	 */
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/fetchIpdbilDiscount",
		success : function(r) {

			if (callFrom == "Hospital") {

				setIpdbilDiscount(r);

			} else if (callFrom == "Surgeon") {
				                   
				setIpdbilSurgonDiscount(r);
			} else if (callFrom == "ApprovedDiscount") {
				                   
				setIpdbilApprovedDiscount(r);
			} else {

				setPatientTotalDisc(r, treatId);
			}
		}
	});
}

function setIpdbilDiscount(r) {	//alert(JSON.stringify(r));
 
	var tdata = "";
	var countH = 0;
	for ( var i = 0; i < r.listIpdBillDiscount.length; i++) {

		if (r.listIpdBillDiscount[i].approvedStat == "N"
				&& r.listIpdBillDiscount[i].discFlag == "H") {			

			tdata = tdata
					+ "<tr>"
					+ "<td class='col-md-1-1'>"
					+ (i + 1)
					+ "</td> "
					+ "<td class='col-md-2-1'>"
					+ r.listIpdBillDiscount[i].discNarrtn
					+ "</td>"
					/*+ "<td class='col-md-1-1'>"
					+ r.listIpdBillDiscount[i].patientId
					+ "</td>"*/
					+ "<td class='col-md-1-1'>"
					+ r.listIpdBillDiscount[i].centerPatientId
					+ "</td>"
					
					+ "<td class='col-md-1-1'>"
					+ r.listIpdBillDiscount[i].totalAmt
					+ "</td>"
					+ "<td class='col-md-1-1' id='givenDisc"
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "'>"
					+ r.listIpdBillDiscount[i].totalDisc
					+ "</td>"
					+ "<td class='col-md-1-1'><input type='text' class='form-control' id='approved"
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "' value='"
					+ r.listIpdBillDiscount[i].totalDisc
					+ "'></td>"
					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='remark"
					+ r.listIpdBillDiscount[i].billDiscountId
					
					+ "'>" + r.listIpdBillDiscount[i].discRemark
							+"</textarea></td>"
					/*+ "<td class='col-md-1-1'><input type='text' class='form-control' id='Authorized by"
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "'></td>"*/
					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='discRemark"+r.listIpdBillDiscount[i].billDiscountId+"' " +
					"value='"+ r.listIpdBillDiscount[i].userName+ "' disabled>"+ r.listIpdBillDiscount[i].userName+ "</textarea></td>"
					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='discRemark"+r.listIpdBillDiscount[i].billDiscountId+"' " +
						"value='"+ r.listIpdBillDiscount[i].discRemark+ "'>"+ r.listIpdBillDiscount[i].discRemark+" </textarea></td>"
					+ "<td class='col-md-2-1 center'><label class='TextFont'><button class='btn btn-xs btn-primary' onclick='" +
							"saveApprovedDiscount" +
							"("
					+ r.listIpdBillDiscount[i].billDiscountId
					+ ")'>Approve</button></label></td>" + "</tr>";
			
			countH = countH + 1;
		}
	}
	// tdata = tdata +"</tbody></table>";
	$("#BillContainer").html(tdata);
	$("#hospCount").text(countH);
};

//added by vishant
function setIpdbilApprovedDiscount(r) {	//alert(JSON.stringify(r));
	 
	var tdata = "";
	var countH = 0;
	
	for ( var i = 0; i < r.listIpdBillDiscount.length; i++) {

		if (r.listIpdBillDiscount[i].approvedStat == "Y") {			

			tdata = tdata
					+ "<tr>"
					+ "<td class='col-md-1-1'>"
					+ (i + 1)
					+ "</td> "
					+ "<td class='col-md-2-1'>"
					+ r.listIpdBillDiscount[i].discNarrtn
					+ "</td>"
					/*+ "<td class='col-md-1-1'>"
					+ r.listIpdBillDiscount[i].patientId
					+ "</td>"*/
					+ "<td class='col-md-1-1'>"
					+ r.listIpdBillDiscount[i].centerPatientId
					+ "</td>"
					
					+ "<td class='col-md-1-1'>"
					+ r.listIpdBillDiscount[i].totalAmt
					+ "</td>"
					+ "<td class='col-md-1-1' id='givenDisc"
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "'>"
					+ r.listIpdBillDiscount[i].totalDisc
					+ "</td>"
					+ "<td class='col-md-1-1'><input type='text' class='form-control' disabled id='approved"
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "' value='"
					+ r.listIpdBillDiscount[i].totalDisc
					+ "'></td>"
					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' disabled id='remark" 
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "'>" +r.listIpdBillDiscount[i].discRemark
							+"</textarea></td>"
					/*+ "<td class='col-md-1-1'><input type='text' class='form-control' id='Authorized by"
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "'></td>"*/
					+ "<td class='col-md-1-1'><textarea type='text' disabled class='form-control' id='userName"+r.listIpdBillDiscount[i].billDiscountId+"' " +
					"value='"+ r.listIpdBillDiscount[i].userName+ "' disabled>"+ r.listIpdBillDiscount[i].userName+ "</textarea></td>"
					+ "<td class='col-md-1-1'><textarea type='text' disabled class='form-control' id='discRemark"+r.listIpdBillDiscount[i].billDiscountId+"' " +
						"value='"+ r.listIpdBillDiscount[i].discRemark+ "'>"+ r.listIpdBillDiscount[i].discRemark+" </textarea></td>"
					/*+ "<td class='col-md-2-1 center'><label class='TextFont'><button class='btn btn-xs btn-primary' onclick='saveApprovedDiscount("
					+ r.listIpdBillDiscount[i].billDiscountId
					+ ")'>Approve</button></label></td>"*/ + "</tr>";
			
			countH = countH + 1;
		}
	}
	// tdata = tdata +"</tbody></table>";
	$("#ApprovedDiscountBill").html(tdata);
	$("#hospCount").text(countH);
};

function setIpdbilSurgonDiscount(r) {

	var tdata = "";
	var countS = 0;
	for ( var i = 0; i < r.listIpdBillDiscount.length; i++) {

		if (r.listIpdBillDiscount[i].approvedStat == "N"
				&& r.listIpdBillDiscount[i].discFlag == "S") {

			countS = countS + 1;
			
			tdata = tdata
					+ "<tr>"
					+ "<td class='col-md-1-1'>"
					+ (countS)
					+ "</label></td> "
					+ "<td class='col-md-2-1'>"
					+ r.listIpdBillDiscount[i].discNarrtn
					+ "</td>"
					/*+ "<td class='col-md-1-1'>"
					+ r.listIpdBillDiscount[i].patientId
					+ "</td>"
					*/
					+ "<td class='col-md-1-1'>"
					+ r.listIpdBillDiscount[i].centerPatientId
					+ "</td>"
					
					+ "<td class='col-md-1-1'>"
					+ r.listIpdBillDiscount[i].totalAmt
					+ "</td>"
					+ "<td class='col-md-1-1' id='givenDisc"
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "'>"
					+ r.listIpdBillDiscount[i].totalDisc
					+ "</td>"
					+ "<td class='col-md-1-1'><input type='text' class='form-control' id='approved"
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "' value='"
					+ r.listIpdBillDiscount[i].totalDisc
					+ "'></td>"
					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='remark"
					+ r.listIpdBillDiscount[i].billDiscountId
					+ "'></textarea></td>"
					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='discRemark"+r.listIpdBillDiscount[i].billDiscountId+"' " +
					"value='"+ r.listIpdBillDiscount[i].userName+ "'disabled>"+ r.listIpdBillDiscount[i].userName+ "</textarea></td>"
					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='discRemark"+r.listIpdBillDiscount[i].billDiscountId+"' " +
						"value='"+ r.listIpdBillDiscount[i].discRemark+ "'>"+ r.listIpdBillDiscount[i].discRemark+"</textarea></td>"
					+ "<td class='col-md-2-1 center'><label class='TextFont'><button class='btn btn-xs btn-primary' onclick='saveApprovedDiscount("
					+ r.listIpdBillDiscount[i].billDiscountId
					+ ")'>Approve</button></label></td>" + "</tr>";
			
		}
	}
	// tdata = tdata +"</tbody></table>";
	$("#BillContainerSurgeon").html(tdata);
	$("#surgnCount").text(countS);
}

function setPatientTotalDisc(r, treatId) {

	var totDisc = 0;
	var discTbl = "";
	for ( var i = 0; i < r.listIpdBillDiscount.length; i++) {

		var approvedAmt = r.listIpdBillDiscount[i].approvedAmt;
		var totalDisc = r.listIpdBillDiscount[i].totalDisc;
		var narrtn = r.listIpdBillDiscount[i].approvedRemark;

		if (r.listIpdBillDiscount[i].treatmentId == treatId
				&& r.listIpdBillDiscount[i].approvedStat == "Y") {

			totDisc = Number(totDisc) + Number(approvedAmt);

			if (narrtn == "null") {

				narrtn = "-";
			}

			discTbl = discTbl
					+ '<tr><td style="border-top: none;" class="numeric col-md-6-1">'
					+ narrtn
					+ '</td>'
					+ '<td style="border-top: none;" class="numeric col-md-0-1">'
					+ approvedAmt
					+ '</td> '
					/*
					 * + '<td style="border-top: none;" class="numeric col-md-0-1"> ' + '<button
					 * class="btn btn-xs btn-success editUserAccess"
					 * value="EDIT" onclick=""> ' + '<i class="fa fa-edit"></i></button></td> ' + '<td style="border-top:none ;" class="numeric col-md-0-1"> ' + '<button
					 * class="btn btn-xs btn-danger deleteUserAccess"
					 * value="DELETE" onclick=""> ' + '<i class="fa
					 * fa-trash-o"></i></button> ' + '<input type="hidden"
					 * value="Hospital" id="discStatus94"></td> '
					 */
					+ '<td style="border-top: none;color: green;" class="numeric col-md-0-1"> '
					+ '<i class="fa fa-thumbs-up"></i>	</td></tr>';

		} else if (r.listIpdBillDiscount[i].treatmentId == treatId
				&& r.listIpdBillDiscount[i].approvedStat == "N") {

			discTbl = discTbl
					+ '<tr><td style="border-top: none;" class="numeric col-md-6-1">'
					+ narrtn
					+ '</td>'
					+ '<td style="border-top: none;" class="numeric col-md-0-1">'
					+ totalDisc
					+ '</td> '
					/*
					 * + '<td style="border-top: none;" class="numeric col-md-0-1"> ' + '<button
					 * class="btn btn-xs btn-success editUserAccess"
					 * value="EDIT" onclick=""> ' + '<i class="fa fa-edit"></i></button></td> ' + '<td style="border-top:none ;" class="numeric col-md-0-1"> ' + '<button
					 * class="btn btn-xs btn-danger deleteUserAccess"
					 * value="DELETE" onclick=""> ' + '<i class="fa
					 * fa-trash-o"></i></button> ' + '<input type="hidden"
					 * value="Hospital" id="discStatus94"></td> '
					 */
					+ '<td style="border-top: none;color: red;" class="numeric col-md-0-1"> '
					+ '<i class="fa fa-spinner fa-spin fa-0x fa-fw"></i></td></tr>';
		}
	}

	$("#finalDiscount").html(parseFloat(totDisc).toFixed(2));
	$("#overalldisount").val(parseFloat(totDisc).toFixed(2));

	var payable = $("#payable").val();
	var payNow = payable - totDisc;
	// $("#payNow").val(parseFloat(payNow).toFixed(2));
	$("#listDiscount").html(discTbl);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 16-Oct-2017
 * @codeFor : Save ipdbill discount
 ******************************************************************************/
function saveApprovedDiscount(discId) {

	var callFrom = "hospital";
	var userId = parseInt($("#userId").val());
	var approvedAmt = $("#approved" + discId).val();
	var remark = $("#remark" + discId).val();
	var givenDisc = $("#givenDisc" + discId).html();
	var approvedDiscRemark = $("#discRemark" + discId).val();

	if (Number(approvedAmt) > Number(givenDisc)) {

		alert("Approved amount should be less than given discount");
		$("#approved" + discId).val(givenDisc);
		$("#approved" + discId).focus();
		return false;
	}

	var inputs = [];
	inputs.push("discId=" + discId);
	inputs.push("userId=" + userId);
	inputs.push("approvedAmt=" + approvedAmt);
	inputs.push("remark=" + remark);
	inputs.push("callFrom=" + callFrom);
	inputs.push("approvedDiscRemark=" + approvedDiscRemark);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/saveApprovedDiscount",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('Network Issue');
		},
		success : function(r) {

			if (r == 1) {

				alert("Discount approved successfully");
			} else {

				alert("Network Issue");
			}

			location.reload();
		}
	});
}

function generateInvoice(treatId) {

	var billTypeId = $("input[name='billType']:checked").val();
	var userId = parseInt($("#userId").val());
	var inputs = [];
	inputs.push("treatId=" + treatId);
	inputs.push("billTypeId=" + billTypeId);
	inputs.push("userId=" + userId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/genarateInvoice",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('Network Issue');
		},
		success : function(r) {

			if (r == 1) {

				alert("Invoice generated successfully");
				window.location.replace("ipd_final_billing.jsp");

			} else if (r == 2) {

				alert("Invoice already generated");

			} else if (r == 3) {

				alert("First save discharge summary");

			} else {

				alert("Network Issue");
			}
			// location.reload();
		}
	});
}

function accurate() {
	if ($("#byid").is(':checked')) {
		$("#byName").val("");
		$('#byName').attr('onkeyup', 'return validateNumbers(event)');
		$('#byName').attr('onkeyup',
				'autosuggesstionIpdBillPatTempFinalBill(this.id,"auto")');
		$("#byName").attr("placeholder", "Bill Id");
	} else {
		$("#byName").val("");
		$('#byName').removeAttr('onkeyup', 'return validateNumbers(event)');
		$('#byName').attr('onkeyup',
				'autosuggesstionIpdBillPatTempFinalBill(this.id,"auto")');
		$("#byName").attr("placeholder", "Name/Patient Id/Mob.No/MRN No");
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 08-Nov-2017
 * @codeFor : Get all total amounts
 ******************************************************************************/
/*
 * function fetchAllReceiptTotals(callFrom) {
 * 
 * var unitId = parseInt($("#unitId").val()); var userId =
 * parseInt($("#userId").val()); var treatmentId =
 * parseInt($("#treatmentId").text()); var sponsorCatId=
 * $("#chargesSlaveId").val(); //var patientId =
 * parseInt($("#patientId").text());
 * 
 * var inputs = []; inputs.push("unitId=" + unitId); inputs.push("treatmentId=" +
 * treatmentId); inputs.push("sponsorId=" + sponsorCatId);
 * inputs.push("createdBy=" + userId); inputs.push("callFrom=" + callFrom);
 * //inputs.push("patientId=" + patientId);
 * 
 * var str = inputs.join('&'); jQuery.ajax({ async : false, type : "POST", data :
 * str + "&reqType=AJAX", url : "ehat/bill/fetchAllReceiptTotals", error :
 * function() { alert('Network Issue!!!'); }, success : function(r) {
 * 
 * $("#finalBillTotal").html(parseFloat(r.actualAmt).toFixed(2));
 * $("#grandTotal").html(parseFloat(r.actualAmt).toFixed(2));
 * //$("#finalDiscount").html(parseFloat(r.totalDisc).toFixed(2));
 * //$("#finalAdvance").html(parseFloat(r.actualAmt).toFixed(2));
 * $("#finalPaid").html(parseFloat(r.totalPaid).toFixed(2));
 * $("#finalRefund").html(parseFloat(r.refundAmt).toFixed(2));
 * 
 * var refDiff=0.00;
 * 
 * var gTot=parseFloat(r.actualAmt).toFixed(2); var
 * totPaid=(parseFloat(r.totalPaid) - parseFloat(r.refundAmt)).toFixed(2);
 * if(totPaid > gTot){ refDiff=Number(totPaid) - Number(gTot); var def=0.00;
 * if(refDiff > 0){ $("#refundableDiff").html(parseFloat(refDiff).toFixed(2));
 * }else{ $("#refundableDiff").html(parseFloat(def).toFixed(2)); } }else{
 * $("#refundableDiff").html(parseFloat(refDiff).toFixed(2)); }
 * 
 * var disc=$("#finalDiscount").html(); var
 * remain=Number(r.actualAmt)-(Number(disc) + (Number(r.totalPaid)));
 * 
 * if(remain<0){ remain=0; }
 * 
 * var refundable = (Number(r.totalPaid) - Number(r.refundAmt))-Number(refDiff);
 * //var refundable = (Number(r.totalPaid) - Number(r.refundAmt));
 * $("#finalRefundable").html(parseFloat(refundable).toFixed(2));
 * $("#finalRemain").html(parseFloat(remain).toFixed(2)); } }); }
 */
/*******************************************************************************
 * @author :BILAL
 * @Date :1-11-2017
 * @Code :For Narration pop up on billing after edit from receipt
 ******************************************************************************/
function setnarationpopupipd() {

	$("#modal-12").addClass("md-show");
}

function closePopupnarrationipd() {
	$("#modal-12").removeClass("md-show");
}

function setNarrationipd() {

	var receiptEditSponsor = $("#receiptOf").val();
	var narrationid = $('#narrationid').val();

	if (narrationid == "" || narrationid == null || narrationid == undefined) {
		$("#narrationid").focus();
		return false;
	}

	$("#narration").val('notnarration');
	if (receiptEditSponsor == "IpdSponsor") {
		saveServiceToSponsorPatient('IpdSponsor');
	} else {
		saveServiceToPatient('general');
	}
}
/*******************************************************************************
 * End of narration popup
 ******************************************************************************/

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Hide ipd bill print popup
 ******************************************************************************/
function hidepurOrderPrint() {

	$("#ipdBillPrints").modal('hide');

	$(".check-uncheck").each(function() {
		$(this).attr("checked", false);
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Show ipd bill print popup
 ******************************************************************************/
function showPrintsModal() {

	$("#ipdBillPrints").modal('show');
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Check all ipd bill prints on popup
 ******************************************************************************/
function checkAllPurchaseOrders() {

	$(".check-uncheck").each(function() {

		$(this).attr("checked", true);
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : uncheck all ipd bill prints on popup
 ******************************************************************************/
function uncheckAllPurchaseOrders() {

	$(".check-uncheck").each(function() {

		$(this).attr("checked", false);
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Show outstanding after checked in payable
 ******************************************************************************/
function showOutstandingPayable() {

	if ($('#outstandingCheckbox').is(':checked')) {

		$("#btnPayNow").prop('disabled', false);
		$("#btnRefund").prop('disabled', true);
		$("#outstandingCheckbox").prop('checked', true);
		$("#trRefPer").hide();		
		$("#trPayable").show();
		var oustanding = $("#finalRemain").html();
		$("#payable").val(parseFloat(oustanding).toFixed(2));
		$("#payNow").val(parseFloat(oustanding).toFixed(2));
		$("#refundableCheckbox").prop('checked', false);

	} else {

		$("#trPayable").hide();
		$("#payable").val(0);
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Show refundable after checked in payable
 ******************************************************************************/
function showRefundable() {

	if ($('#refundableCheckbox').is(':checked')) {

		$("#trPayable").show();
		var oustanding = parseFloat($("#finalRefundable").html());

		if ($('#refundableDiffCheckbox').is(':checked')) {

			var refCheck = parseFloat($("#refundableDiff").html());

			var fulltot = oustanding + refCheck;
			// alert(fulltot);
			$("#payable").val(parseFloat(fulltot).toFixed(2));
			$("#payNow").val(parseFloat(fulltot).toFixed(2));

		} else {
			$("#payable").val(parseFloat(oustanding).toFixed(2));
			$("#payNow").val(parseFloat(oustanding).toFixed(2));
		}

		$("#refPer").val(100.00);
		$("#btnPayNow").prop('disabled', true);
		$("#btnRefund").prop('disabled', false);
		$("#outstandingCheckbox").prop('checked', false);
		$("#payeeTr").hide();
		$("#trRefPer").show();
		// $("#refundableDiffCheckbox").prop("disabled", true);
		// calRefundPer();
	} else {

		if ($('#refundableDiffCheckbox').is(':checked')) {

			var refCheck = parseFloat($("#refundableDiff").html());

			var fulltot = refCheck;
			// alert(fulltot);
			$("#payable").val(parseFloat(fulltot).toFixed(2));
			$("#payNow").val(parseFloat(fulltot).toFixed(2));

			$("#btnPayNow").prop('disabled', true);
			$("#btnRefund").prop('disabled', false);
			$("#outstandingCheckbox").prop('checked', false);
			$("#payeeTr").hide();
			$("#trRefPer").show();
			$("#refPer").val(100.00);
		} else {

			$("#trRefPer").hide();
			$("#trPayable").hide();
			$("#btnPayNow").prop('disabled', false);
			$("#btnRefund").prop('disabled', true);
			$("#payable").val(0);
			$("#payeeTr").show();
			// $("#refundableDiffCheckbox").prop("disabled", false);
			$("#payNow").val(parseFloat(0.00).toFixed(2));
			$("#refPer").val(0);
		}
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Open previous pending popup
 ******************************************************************************/
function openPreviousPendingPopup() {
	$("#previousPendingPopup").modal('show');

	/*
	 * var ajaxResponse = $("#pendingAmountDiv").html();
	 * 
	 * var pobj = eval('(' + ajaxResponse + ')');
	 * 
	 * ReceiptCount = 1;
	 * $("#pendingDetailsDiv").setTemplate(previousPendingTemplateForBilling);
	 * $("#pendingDetailsDiv").processTemplate(pobj);
	 */

}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Set previous pending popup
 ******************************************************************************/
function setUIPreviousRemainingValue(callfrom) {

	var opdBillingIDPendingAmountTemp = "";
	var selectedGroups = new Array();
	$("input[name='preAmtcheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
	});
	if (selectedGroups.length > 1) {
		alert("Please Select Single Receipt");
		return false;
	} else {
		var pendingAmountDiv = $("#pendingAmountDiv").html();

		var jsonBean = eval('(' + pendingAmountDiv + ')');
		var myObj;

		for ( var k = 0; k < jsonBean.listRecMaster.length; k++) {
			var id = jsonBean.listRecMaster[k].idrm;
			if (selectedGroups[0] == id) {
				myObj = jsonBean.listRecMaster[k];
				break;
			}
		}

		opdBillingIDPendingAmountTemp = myObj.idrm + "_" + myObj.deptName
				+ "#@#";
		var pay_amount = $("#paypendingAmt_" + selectedGroups[0]).val();

		var r = confirm("Please confirm to Pay This Amount?");
		if (r == true) {

			var commonAdvanceFlag = 'N';
			var myobj1 = JSON.stringify(myObj);
			var inputs = [];
			inputs.push('action=payPreviousPendingAmountAndPrintReceipt');
			inputs.push('myobj1=' + myobj1);
			inputs.push('commonAdvanceFlag=' + commonAdvanceFlag);
			inputs.push('pay_amount=' + pay_amount);
			inputs.push('previousPendingType=' + opdBillingIDPendingAmountTemp);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = r;
					var res = ajaxResponse.split("-");
					alert(res[0]);
					fetchPrevAmt('opd');

					// var advanceobj = JSON.parse(ajaxResponse);
					window.open("PreviousPendingPaymentReceiptPrint.jsp?"
							+ "myobj1=" + encodeURIComponent(myobj1)
							+ "&receipt_id=" + encodeURIComponent(res[1]));
					// fetchPrevAmt('opd');
				}
			});
		} else {
			return false;
		}
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 26-July-2017
 * @codeFor : Close previous pending popup
 ******************************************************************************/
function closePreviousPendingPopup() {

	$("#previousPendingPopup").modal('hide');
}

/*******************************************************************************
 * @author : Sagar Kadam
 * @date :29-June-2017
 * @codeFor : Autosuggestion Template for patient Treatment
 ******************************************************************************/
function autosuggestionTempForPrevOPD(response, id) {
	// var qty = id.slice(0, -1); // for dyamic col getting id

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

						$('#' + id).val(ui.item.patientName);
					}
					/*
					 * This function use for Enter keypress search
					 */

					// getPreviousTreatmentPatient(id,'search');
					getAllPatientRecordsForPrevOPD(id, 'search');

					// $("#mrnNo").val(101);
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
					if (!data || data.listRegTreBillDto.length === 0
							|| !data.listRegTreBillDto
							|| data.listRegTreBillDto.length === 0) {
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
						result = data.listRegTreBillDto;// Response List for All
						// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}
/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 08-Nov-2017
 * @codeFor : Get all total amounts
 ******************************************************************************/
function calRefundAmt() {

	var payable = $("#payable").val();
	var ref = $("#refPer").val();
	var refAmt = (Number(payable) * Number(ref)) / 100;
	if (Number(refAmt) > Number(payable)) {
		alert("Refund should not be greater than payable");
		$("#refPer").val(0);
		$("#payNow").val(0);
	} else {

		// var nowPay=Number(payable)-Number(refAmt);
		$("#payNow").val(parseFloat(refAmt).toFixed(2));
	}
}
/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 08-Nov-2017
 * @codeFor : Get all total amounts
 ******************************************************************************/
function calRefundPer() {

	var payable = $("#payable").val();
	var refAmt = $("#payNow").val();
	var refPer = (Number(refAmt) / Number(payable)) * 100;
	if (Number(refAmt) > Number(payable)) {
		alert("Refund should not be greater than payable");
		$("#refPer").val(0);
		$("#payNow").val(0);
	} else {

		$("#refPer").val(parseFloat(refPer).toFixed(2));
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 08-Nov-2017
 * @codeFor : Get all total amounts
 ******************************************************************************/
function fetchPrevPendingIpd(callFrom) {

	var unitId = parseInt($("#unitId").val());
	var userId = parseInt($("#userId").val());
	var treatmentId = parseInt($("#treatmentId").text());
	var sponsorCatId = $("#chargesSlaveId").val();
	// var patientId = parseInt($("#patientId").text());

	var inputs = [];
	inputs.push("unitId=" + unitId);
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("sponsorId=" + sponsorCatId);
	inputs.push("createdBy=" + userId);
	inputs.push("callFrom=" + callFrom);
	// inputs.push("patientId=" + patientId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/fetchPrevPendingIpd",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			if (callFrom == "onload") {

				var totRemain = r.totalRemain;
				if (totRemain <= 0 || isNaN(totRemain)) {

					totRemain = 0.00;
				}
				$("#previousRemainingValue").html(
						parseFloat(totRemain).toFixed(2));
			} else {

				setPendingRecIpd(r);
			}
		}
	});
}

function setPendingRecIpd(res) {

	$("#receiptUl").empty();

	var setreceiptUl = " <li class='active' id='pendingReceipt'>"
			+ " <a data-toggle='tab'><i class='fa fa-user-md'></i>"
			+ " Previous Pending Receipts</a></li>"
			+ " <li id='curReceipt'>"
			+ " <a data-toggle='tab' onclick='window.location.reload(true);'><i class='fa fa-user-md'></i>"
			+ " Current Receipts</a></li>"
			+ " <li style='float: right;'>"
			+ " <a onclick='hideBillDetails()' id='forPending'><b><label id='billText'>  Show Receipts View   </label>"
			+ " <i id='shBillView' class='fa fa-chevron-up'></i></b></a></li>";

	$("#receiptUl").html(setreceiptUl);
	$("#forPending").trigger('onclick');

	var result = ' <table class="table table-hover" id="receipts"> '
			+ ' <thead> ' + '		<tr> ' + '			<th>#</th> '
			+ '			<th>Receipt/Bill Id</th> ' + '			<th>Amount</th> '
			+ '			<th>Paid</th> ' + '			<th>Discount</th> '
			/* + ' <th>Refund</th> ' */
			+ '			<th>Remain</th> ' + '			<th>Date</th> '
			+ '			<th>Details</th> ' + '		</tr> ' + '	</thead> ' + '	<tbody> ';

	for ( var i = 0; i < res.listBillReceiptMaster.length; i++) {

		var billId = res.listBillReceiptMaster[i].billId;
		var depId = res.listBillReceiptMaster[i].departmentId;
		var treatId = res.listBillReceiptMaster[i].treatmentId;
		var recId = res.listBillReceiptMaster[i].billReceiptId;
		// var againId=res.listBillReceiptMaster[i].againstId;
		var totalAmt = parseFloat(res.listBillReceiptMaster[i].actualAmt)
				.toFixed(2);
		var totAmt = parseFloat(res.listBillReceiptMaster[i].totalPaid)
				.toFixed(2);
		// var
		// refAmt=parseFloat(res.listBillReceiptMaster[i].refundAmt).toFixed(2);
		var totDisc = parseFloat(res.listBillReceiptMaster[i].totalDisc)
				.toFixed(2);
		var remainAmt = parseFloat(
				Number(res.listBillReceiptMaster[i].totalRemain)).toFixed(2);
		var datetime = new Date(res.listBillReceiptMaster[i].createdDateTime)
				.toLocaleDateString('en-GB');

		// prevPaid=prevPaid+totAmt;

		result = result + '<tr> ' + '	<td>' + (i + 1) + '</td> ';
		if (billId > 0) {

			result = result + ' <td>' + recId + '</td> ';
		} else {

			result = result + '	<td>' + recId + '</td> ';
		}

		result = result + '	<td>' + totalAmt + '</td> ' + '	<td>' + totAmt
				+ '</td> ' + '	<td>' + totDisc + '</td> '
				/* + ' <td>'+refAmt+'</td> ' */
				+ '	<td>' + remainAmt + '</td> ' + '	<td>' + datetime
				+ '</td> ' + '   <td> '
				/*
				 * + ' <button onclick=receiptBillPrint("receipt",'+recId+')
				 * data-toggle="tooltip" title="Print Receipt"
				 * data-placement="left"><i class="fa fa-print"></i></button> '
				 */
				+ '   <button onclick="setCreditPayble(' + remainAmt + ','
				+ recId + ',\'pending\',' + treatId + ',' + depId + ','
				+ billId + ')"><i class="fa fa-credit-card"></i></button> '
				+ '	</td>' + '</tr> ';
	}

	result = result + '	</tbody> ' + '</table> ';

	$("#cashReceipts").html(result);

}

function saveOpdPendingDetails(callFrom) {

	var unitId = parseInt($("#unitId").val());
	var userId = parseInt($("#userId").val());
	var refDocId = 0;
	var treatmentId = 0;

	var pendingFlag = $("#pendingFlag").val();
	if (pendingFlag == "Y") {

		treatmentId = $("#pendingTreatId").val();
	} else {

		treatmentId = parseInt($("#treatmentId").text());
	}

	var payable = parseFloat($("#payable").val());
	var discountAmt = 0; // parseFloat($("#discountAmt").val()); ;
	var discount = 0;
	var disAuth = 0;
	var disNarrtn = "";
	var disRemark = "";
	var payNow = parseFloat($("#payNow").val());
	var payMode = $("#payMode").val();
	var batchNo = "";
	var bnumber = "";
	var bName = "";
	var againstId = $("#recId").val();
	var sourceCatId = $("#SponsorsourceTypeId").val();
	var sponsorCatId = $("#chargesSlaveId").val();
	var receiptOf = $("#receiptOf").val();

	var payeeSprlastId = 0;
	var payeeSprMainId = 0;
	var payeeTypeId = $("#payee").val();
	if (payeeTypeId == 2) {

		var size = $("#dynamicItems li").length;
		payeeSprlastId = $("#lis" + (size - 1)).val();
		payeeSprMainId = $("#lis0").val();
	}

	callFrom = $("#callFromForSave").val();

	if (sponsorCatId > 0) {

		if (receiptOf != "sponsor") {

			alert("Please pay amount from sponsor tab");
			return false;
		}
	}

	var multiPayDetails = {
		listMultiBillReceiptMaster : []
	};

	if (payMode == 2 || payMode == 3) {

		bnumber = $("#batchnumber").val();
		bName = $("#bankID").val();
		batchNo = $("#newBatchNumber").val();
	} else if (payMode == -1) {

		var rows = $('#multiPayTable tbody tr.multiPayClass').length;
		for ( var i = 1; i <= rows; i++) {

			var payModePop = $("#payMode" + i).val();
			var bankId = $("#bankID" + i).val();
			var bNum = $("#txtbankNo" + i).val();
			var accNo = $("#txtaccNo" + i).val();
			var amt = $("#txtAmount" + i).val();
			setReceiptList(multiPayDetails, payModePop, bankId, bNum, accNo,
					amt);
		}
		/*
		 * var cashAmt=$("#cashAmt").val(); if(cashAmt>0){
		 * 
		 * setReceiptList(multiPayDetails,1,0,0,cashAmt); }
		 * 
		 * var bankIdCredit=$("#bankIdCredit").val(); var
		 * creditBNum=$("#creditBNum").val(); var
		 * creditAmt=$("#creditAmt").val(); if(creditAmt>0){
		 * 
		 * setReceiptList(multiPayDetails,2,bankIdCredit,creditBNum,creditAmt); }
		 * 
		 * var bankIdCheque=$("#bankIdCheque").val(); var
		 * chequeBNum=$("#chequeBNum").val(); var
		 * chequeAmt=$("#chequeAmt").val(); if(chequeAmt>0){
		 * 
		 * setReceiptList(multiPayDetails,3,bankIdCheque,chequeBNum,chequeAmt); }
		 * 
		 * var bankIdRtgs=$("#bankIdRtgs").val(); var
		 * rtgsBNum=$("#rtgsBNum").val(); var rtgsAmt=$("#rtgsAmt").val();
		 * if(rtgsAmt>0){
		 * 
		 * setReceiptList(multiPayDetails,4,bankIdRtgs,rtgsBNum,rtgsAmt); }
		 */

	} else {

		bnumber = 0;
		bName = 0;
		batchNo = 0;
	}

	/*
	 * if(payNow<=0){
	 * 
	 * alert("Pay now should be greater than zero"); $("#payNow").val(0);
	 * $("#payNow").focus(); return false; }
	 */

	if (payable <= 0) {

		alert("Payable should be greater than zero");
		return false;
	} else {

		if (payNow > payable) {

			alert("Amount should be less than payable");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		} else if (payNow < 0) {

			alert("Amount should be greater than 0");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}
	}

	if (discount > 0) {

		if (disAuth == 0) {

			alert("please select autherised person");
			return false;
		}
		if (disNarrtn == "") {

			alert("please fill narration");
			return false;
		}

	}

	var paidByCashFlag = $("#paidByCashFlag").val();
	var paidByCashServices = $("#paidByCashServices").val();

	var masterIdsChecked = [];
	var servIdsChecked = [];
	var regBillDetId = 0;

	$('input[name=opdBillCheckboxReg]:checked').each(function() {

		masterIdsChecked.push($(this).val());

		if ($(this).val() == 1) {

			regBillDetId = $("#regBillId").val();
		}
	});

	$('input[name=opdBillCheckboxReg]:not(:checked)').each(function() {

		if ($(this).val() == 1) {

			regBillDetId = $("#regBillId").val();
		}
	});

	$('input[name=opdBillCheckbox]:not(:checked)').each(function() {

		servIdsChecked.push($(this).val());
	});

	multiPayDetails = JSON.stringify(multiPayDetails);

	var inputs = [];
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("unitId=" + unitId);
	inputs.push("createdBy=" + userId);
	inputs.push("totalAmt=" + payable);
	inputs.push("discount=" + discount);
	inputs.push("discountAmt=" + discountAmt);
	inputs.push("disAuth=" + disAuth);
	inputs.push("disNarrtn=" + disNarrtn);
	inputs.push("totalPaid=" + payNow);
	inputs.push("masterIdsChecked=" + masterIdsChecked);
	inputs.push("servIdsChecked=" + servIdsChecked);
	inputs.push("refDocId=" + refDocId);
	inputs.push("payMode=" + payMode);
	inputs.push("bNumber=" + bnumber);
	inputs.push("batchNo=" + batchNo);
	inputs.push("bName=" + bName);
	inputs.push("callFrom=" + callFrom);
	inputs.push("againstId=" + againstId);
	inputs.push("sourceCatId=" + sourceCatId);
	inputs.push("sponsorCatId=" + sponsorCatId);
	inputs.push("multiPayDetails=" + multiPayDetails);
	inputs.push("receiptOf=" + receiptOf);
	inputs.push("payeeTypeId=" + payeeTypeId);
	inputs.push("payeeSprMainId=" + payeeSprMainId);
	inputs.push("payeeSprlastId=" + payeeSprlastId);
	inputs.push("disRemark=" + disRemark);
	inputs.push("regBillDetId=" + regBillDetId);
	inputs.push("paidByCashFlag=" + paidByCashFlag);
	inputs.push("paidByCashServices=" + paidByCashServices);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bill/saveBillDetails",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			if (r > 0) {

				resetMultiPopup();
				alertify.success("Receipt generated succesfully");
				// receiptBillPrint("receipt",r,"");
			} else if (r == -2) {

				alert("Common advance not enough to pay bill...");
			} else {

				alertify.error("Network issue");
			}
			// resetAll(receiptOf);
			window.location.reload(true);
			var c = $("#preId").val();
			/*
			 * if(c!="treatclose"){
			 * 
			 * closePatientTreatment(treatmentId); }
			 */
		}
	});
};

/*******************************************************************************
 * @author : Mohd Tarique Aalam
 * @date : 14-12-2017
 * @codeFor : Get Payment mode list
 ******************************************************************************/
function getAllPayments() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/payment/fetchPayList",

		success : function(r) {
			setTempPaymode(r);// call template
		}
	});
}

function setTempPaymode(r) {
	var list = "<option value='0' class='un'>-- Select --</option>";
	for ( var i = 0; i < r.listPay.length; i++) {

		list = list + "<option value='" + r.listPay[i].payId + "' class='un'>"
				+ (r.listPay[i].payName) + "</option>";
	}
	list = list + "<option value='-1' class='un'>Multiple</option>";
	$("#payMode").html(list);
}

/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @date 14_DEC_2017
 * @Code Fetching Narration Data
 ******************************************************************************/

function getAllNarrations() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/narration/fetchNarrList",

		success : function(r) {
			setTempNarrations(r);// call template
		}
	});
}

function setTempNarrations(r) {
	var list = "<option value='0'>--Select Narration--</option>";
	for ( var i = 0; i < r.listNarr.length; i++) {

		list = list + "<option value='" + r.listNarr[i].narrId
				+ "' class='un'>" + (r.listNarr[i].narrName) + "</option>";
	}

	$("#narrSel").html(list);
	$("#dNarration").html(list);
	$("#sNarration").html(list);
}

/*------------------------------------------------------------------------*/

/*******************************************************************************
 * @author Sagar kadam
 * @date 14_July_2017
 * @Code for autosuggestion
 ******************************************************************************/
function getAllRecordsForPrevDigo(inputId, callfrom) {

	var deptId = 3;
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}

	var findingName = $("#" + inputId).val();
	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('deptId=' + deptId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/billNoble/getPreviousTreatmentPatient",
		success : function(r) {
			// setTempPatientRecords(r);

			digoPrevRecordsTemp(r);
			// autosuggestionTempForPrevOPD(r,inputId);
			// autoCompTablefoipdManualSummaryTempAuto(r,inputId);

		}
	});
}

/*******************************************************************************
 * @author Sagar Kadam
 * @date 27_June_2017
 * @Code template for opd Patient records.
 ******************************************************************************/
function digoPrevRecordsTemp(r) {

	var patPrefix = $("#patPrefix").val();
	var patMiddle = $("#patMiddle").val();
	var patSufix = $("#patSufix").val();

	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; display :none;'><div class='TextFont'>Patient ID</div></th>"  //display none by sonu singh for UHID
			+"<th class='col-md-1-1 center' style='height: 21.5px; '><div class='TextFont'>UHID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"

			+ "</tr>" + "</thead>	" + "</table></div>";

	var index = 1;

	htm = htm + "<tbody>";
	for ( var i = 0; i < r.lstRegviewDto.length; i++) {

		var patId = patPrefix + patMiddle + r.lstRegviewDto[i].ptId + patSufix;
		var datetime = new Date(r.lstRegviewDto[i].createdDateTime)
				.toLocaleString();

		htm = htm
				+ "<tr id='div123"
				+ r.lstRegviewDto[i].ptId
				+ "'>"
				+ "<td style='height: 21.5px;' class='col-md-1 center'>"
				+ index
				+ "</td>"
				+ "<td style='height: 21.5px;' class='col-md-4 '>"
				+ r.lstRegviewDto[i].patientName
				+ "</td>"
				+ "<td style='height: 21.5px;' class='col-md-2 center'>"
				+ r.lstRegviewDto[i].mobile
				+ "</td>"

				+ "<td style='height: 21.5px;' class='col-md-1 center'>"
				+ patId
				+ "</td>"
				+ "<td style='height: 21.5px;' class='col-md-2 center'>"
				+ datetime
				+ "</td>"
				+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreDigoBill123("
				+ r.lstRegviewDto[i].ptId
				+ ")'>"
				+ "<img src='images/down.png' id='imgupdown"
				+ r.lstRegviewDto[i].ptId
				+ "' />"
				+ "<input type='hidden' id='hideShowStatus123"
				+ r.lstRegviewDto[i].ptId
				+ "' value='0' /><input type='hidden' id='patientDOB123' value='"
				+ r.lstRegviewDto[i].ptId
				+ "' /></td>"

				+ "</tr>"
				+ "</tbody></table>"
				+ "<tr id='patPreOPDBill123"
				+ r.lstRegviewDto[i].ptId
				+ "' style='width:0%;float:right'><td style='display:none' id='td123"
				+ r.lstRegviewDto[i].ptId
				+ "'>"
				+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
				+ "<tbody1 id='xyz"
				+ r.lstRegviewDto[i].ptId
				+ "'>"
				+ "<tr>"
				+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
				+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
				+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
				+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
				+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
				+ "</tr>" + "</tbody1>" + "</table>" + "</td></tr>";

		index++;

	}
	$("#IpdGenPreBill").html(htm);
	// $("#ehatTable").html(htm);
}
function hideShowPreDigoBill123(count) {

	var hideShowStatus = $("#hideShowStatus123" + count).val();

	if (hideShowStatus == 0) {

		$("#imgupdown" + count).attr('src', "images/up.png");
		$("#patPreOPDBill123" + count).show();
		$("#hideShowStatus123" + count).val(1);
		closeTreatmentDetailsOfPatient1234(count);

	} else {

		$("#imgupdown" + count).attr('src', "images/down.png");
		$("#patPreOPDBill123" + count).hide();
		$("#hideShowStatus123" + count).val(0);
		// closeTreatmentDetailsOfPatient(count,callfrom);

	}
}
function closeTreatmentDetailsOfPatient1234(patientId) {
	// alert("hi");
	// var r = confirm("Do You Want To Close Treatment ??");
	var ajaxr = "";
	jQuery.ajax({
		async : true,
		type : "POST",
		/*
		 * url : "ehat/billNoble/closetreatmentdetails", data : { "patientId" :
		 * patientId
		 */
		url : "ehat/billNoble/getPrevPatdetails",
		data : {
			"patientId" : patientId,
			"deptId" : 3,
		},
		timeout : 1000 * 60 * 5,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(response) {
			console.log(response);
			ajaxr = response;
			// alert(response.listTreatment[0].treatmentId);
			setTempForInnerLoop1234(response);
			// alertify.success(response);
			/*
			 * resetUlList(); getConfigTemp();
			 */

		}
	});
	return ajaxr;
}

function setTempForInnerLoop1234(r1) {
	// alert("hi");
	var htm = " class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
	+"<td style='height: 21.5px;' class='col-md-2 center' class=''>treatment Id</td>"
			+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>Admission  No</td>"
			+ "<td style='height: 21.5px;' class='col-md-5 ' class=''>Date</td>"
			+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>BIll No</td>"
			+ "<i class='fa fa-eye View'></i></button></td>> </tr>";

	for ( var j = 0; j < r1.listTreatment.length; j++) {
		var datetime = new Date(r1.listTreatment[j].createdDateTime)
				.toLocaleDateString('en-GB');

		htm = htm
				+ "<tr id='div123"
				+ r1.listTreatment[j].patientId
				+ "' class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
		htm = htm
				+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"
				+ r1.listTreatment[j].patientId + "</td>";
		htm = htm + "<td style='height: 21.5px;' class='col-md-2 ' class=''>"
				+ r1.listTreatment[j].opdipdno + "</td>";
		htm = htm + "<td style='height: 21.5px;' class='col-md-5 ' class=''>"
				+ datetime + "</td>";
		htm = htm + "<td style='height: 21.5px;' class='col-md-2 ' class=''>"
				+ r1.listTreatment[j].treatmentId + "</td>";
		htm = htm + "<td style='height: 21.5px;' class='col-md-1 '>";
		htm = htm
				+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='sendingToPreviousDignoBill("
				+ r1.listTreatment[j].treatmentId + ")'>";
		htm = htm + "<i class='fa fa-eye View'></i></button></td>";
		htm = htm + "<input type='hidden' value='"
				+ r1.listTreatment[j].patientId + "' id='rowCount' /></tr>";

		$("#patPreOPDBill123" + r1.listTreatment[j].patientId).html(htm);
		$("#td123" + r1.listTreatment[j].patientId).show();
		$("#xyz" + r1.listTreatment[j].patientId).html(htm);
	}

}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 08-Nov-2016
 * @reason : Authorised Users List
 ******************************************************************************/
function fetchAuthorisedBy(callFrom) {
	callFrom = "onload";

	var inputs = [];
	inputs.push('action=fetchAuthorisedBy');
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/admindata/fetchAuthorisedBy",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			/*var data = eval('(' + r + ')');
			$("#discAuthSel").setTemplate(authorisedByListTemplate);
			$("#discAuthSel").processTemplate(data);

			$("#docDiscAuthSel").setTemplate(authorisedByListTemplate);
			$("#docDiscAuthSel").processTemplate(data);*/
			setAuthorisedBy(r);
		}
	});
}

function setAuthorisedBy(r){
	
	var htm = "<option value=0>-- Select Authorised By --</option>";
	for(var i=0;i<r.doctorList.length;i++){
		
		htm = htm + "<option value="+r.doctorList[i].doctor_ID+">"+r.doctorList[i].doc_name+"</option>";
	}
	$("#discAuthSel").html(htm);
	$("#docDiscAuthSel").html(htm);
	$("#discAuthSel").select2();
	$("#docDiscAuthSel").select2();
}

// @Touheed Template authorised by @date 23-Aug-2016
var authorisedByListTemplate = "<option value='0'>-- Select --</option>{#foreach $T.listDoctor as dpl}"
		+ "<option value='{$T.dpl.ui}'>{$T.dpl.dn}</option>{#/for}";

function fetchSurgonList(callFrom) {

	var unitId = parseInt($("#unitId").val());
	var userId = parseInt($("#userId").val());
	var treatmentId = parseInt($("#treatmentId").text());
	var sponsorCatId = $("#chargesSlaveId").val();

	var inputs = [];
	inputs.push("unitId=" + unitId);
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("sponsorId=" + sponsorCatId);
	inputs.push("createdBy=" + userId);
	inputs.push("callFrom=" + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/fetchSurgonList",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			if (callFrom == "onclick") {

				var sList = "<option value='0'> -- Select -- </option>";

				for ( var i = 0; i < r.listBillReceiptMaster.length; i++) {

					sList = sList + "<option value='"
							+ r.listBillReceiptMaster[i].doctorIds + "'>"
							+ r.listBillReceiptMaster[i].bName + "</option>";
				}

				$("#surgeonlist").html(sList);
			} else {

				var docId = $("#surgeonlist").val();
				for ( var i = 0; i < r.listBillReceiptMaster.length; i++) {

					if (docId == r.listBillReceiptMaster[i].doctorIds) {

						var totAmt = r.listBillReceiptMaster[i].totalAmt;

						$("#sTotal").val(totAmt);
						$("#sPayable").val(totAmt);
					}
				}
			}
		}
	});
}

function calPerForConGenIpd() {

	var amount = $("#amount").val();
	var concession = $("#concession").val();

	var consAmt = ((concession * 100) / amount);// .toFixed(2);
	$("#concessionIpdPer").val(consAmt);
}

function calPerForConSponIpd() {

	var amount = $("#amountIpdSponsor").val();
	var concession = $("#concessionIpdSponsor").val();

	var consAmt = ((concession * 100) / amount);// .toFixed(2);
	$("#concessionIpdSponsorPer").val(consAmt);
}

/*******************************************************************************
 * @author : Kishor
 * @date : 30-March-2018
 * @codeFor : Get for ipd bill patients
 ******************************************************************************/
function autosuggesstionBillComparisonPatTemp(inputId, callfrom) {
	// alert("hi..");
	var finalBill = "generalBill";
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('finalBill=' + finalBill);
	var str = inputs.join('&');
	// var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/autosuggesstionviewIpdbillPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			if (letter == "" || letter == " ") {
				getIpdBillPatientsForComparison("ipd");
			} else {
				setIpdbillPatientsTempComparison(r);
			}

			// setIpdbillPatTemp(r);
			// autoCompTemp(r,inputId);
		}
	});
}

/*******************************************************************************
 * @author : Kishsor Lokhande
 * @date : 09-June-2017
 * @codeFor : Set ipd queue template
 ******************************************************************************/
function setIpdbillPatientsTempComparison(res) {

	var count = 1;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed table-stripped cf'>"
			+ "<thead class='cf'>"
			+ "<tr>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
			+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
			+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Sonsor Name</label></th>"
			+ "<th class='col-md-1-1 ' style=''><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>"

			+ "<th class='col-md-2-1 ' style=''><label class='TextFont' style='padding-left: 20px;'>Mobile No</label></th>"

			+ "<th class='col-md-2-1 ' style=''><label class='TextFont' style='padding-left: 20px;'>MRN No</label></th>"

			+ "<th class='col-md-2-1 left' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
			+ "<th class='col-md-2-1 right' style=''><label class='TextFont' style='padding-left: 20px;'>View Bill</label></th>"
			+ "</tr>"
			+ "</thead>"
			+ "</table>"
			+ "</div>"
			+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
			+ "	<table class='table table-condensed table-stripped cf'>"
			+ "<tbody class='cf'>";

	for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {

		var fullName = res.lstIpdbillPatients[indx].patientName;
		var categoryName = res.lstIpdbillPatients[indx].categoryName;
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

				// For Sonsor Name
				+ "	<td class='col-sm-3-1' id='divSp"
				+ count
				+ "' style='height: 21.5px;'>"
				+ categoryName
				+ "</td>"

				+ "	<td class='col-sm-1-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].pId
				+ "</td>"

				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mobile
				+ "</td>"

				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mrnno
				+ "</td>"

				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].opdipdno
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnDelete"
				+ count + "' " + "		onclick=viewBillForIPDForComparison("
				+ res.lstIpdbillPatients[indx].treatId
				+ ",'generalBill') style='font-size: 12px;' />" + "	</td></tr>";

		count = count + 1;
	}
	ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
	$("#ipdBillPatients").html(ipdqueueTemp);
	$("#ipdBillPatients1").html(ipdqueueTemp);

}

function printsForPatients(tId) {
	$("#treatIdForPopUp").val(tId);
	$("#PopUpForPrintCaseRecord").show('show');
	// printsForPatientsIdentification(tId);
	// printsForPatientsCaseRecord(tId);
	// window.open("print_for_patient_identification.jsp?"+"treatID="
	// +encodeURIComponent(tId));
	// window.open("print_for_patient_case_record.jsp?"+"treatID="
	// +encodeURIComponent(tId));
}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 08-March-2018
 * @codeFor : For when assign test that time test send to lab immediatly.
 ******************************************************************************/
function ipdBillSendToLab(serviceDetails, queryType) {
	var inputs = [];

	// patient details push
	inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
	inputs.push("queryType=" + queryType);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/ipdBillSendToLab",

		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

		}
	});
}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 08-March-2018
 * @codeFor : if delete from bill,Disable lab delete flag.
 ******************************************************************************/
function deleteIpdLabTest(billDetId, treatmentId, deleteType) {

	var deptId = $('#deptId').val();
	var billDId = billDetId.join(',');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/cancelLabTest",
		data : {

			"billDetId" : billDId,
			"cancleType" : deleteType,
			"deptId" : deptId,
		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {

			if (r == "0") {
				deleteTestSmplColFlg = "Y";
				return false;
			} else if (r == "-1") {
				alert("Network error...!");
				return false;
			} else if (r == "1") {
				deleteTestSmplColFlg = "N";
				// call for cancel service.
				// deletesIpdSrvDetails();
			}
		}

	});

}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 08-March-2018
 * @codeFor : Disable/Enable lab delete flag.
 ******************************************************************************/
function cancelIpdLabTest(billDetailsId, callFrom) {

	// GET selected value
	var deptId = $('#deptId').val();
	var a = $('#btnCancle' + billDetailsId).val();
	var cancleType = "N";
	var billDetId = $('#bdId' + billDetailsId).text();
	var treatmentId = $('#treatmentId').text();
	if (a == "N") {
		cancleType = "Y";
		$('#tr' + billDetailsId).attr("disabled", true);
	}

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/cancelLabTest",
		data : {

			"billDetId" : billDetId,
			"cancleType" : cancleType,
			"deptId" : deptId,

		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {

			if (r == "0") {
				cancelTestSmplColFlag = "Y";
				return false;
			} else if (r == "-1") {
				alert("Network error...!");
				return false;
			} else if (r == "1") {
				cancelTestSmplColFlag = "N";
				// call for cancel service.
				// cancleIpdServices(billDetailsId,cancleType,callFrom);
			}
		}

	});
}

function printsForPatientsIdentification() {
	var tId = $("#treatIdForPopUp").val();

	if (document.getElementById('idCaseRecord').checked) {
		window.open("print_for_patient_identification.jsp?" + "treatID="
				+ encodeURIComponent(tId));
		setTimeout(function() {
			$("#PopUpForPrintCaseRecord").hide('show');
		}, 500);
	}
	if (document.getElementById('idIdentificationSheet').checked) {
		window.open("print_for_patient_case_record.jsp?" + "treatID="
				+ encodeURIComponent(tId));
		setTimeout(function() {
			$("#PopUpForPrintCaseRecord").hide('show');
		}, 500);
	}

}

function closePrintPopup() {
	$("#PopUpForPrintCaseRecord").hide('show');
}

/*******************************************************************************
 * @author Tarique Aalam
 * @base Fetching super master of service based on there id
 * @since 19-july-2018
 ******************************************************************************/
function fetchSuperCatForBillng(serviceId, categery) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			//alert('Network Issue!');
		},
		success : function(response) {
			// $("#cpoeCharges2").val(response.lstSubService[0].charges);
			// calculateEmerChrForDocDesskOpd();
			if (categery == "general") {
				$('#rate2').val(response.lstSubService[0].charges);
			} else {
				$('#rateIpdSponsor2').val(response.lstSubService[0].charges);
			}

		}
	});
}

/*******************************************************************************
 * @author Vinod Udawant
 * @base Add amt to ipd outstanding
 * @since 7-sept-2018
 ******************************************************************************/
function addAmtToIpdOutstanding() {

	var iPatientAMT = $("#iPatientAMT").val();
	var indentCheck = $('#indentCheck').is(':checked');

	var patientSaleAmt = $("#patientSaleAmt").val();
	var patientCheck = $('#patientCheck').is(':checked');

	var otAmt = $("#otAmt").val();
	var otCheck = $('#otCheck').is(':checked');

	var narAmt = $("#narAmt").val();
	var narCheck = $('#narCheck').is(':checked');

	if (iPatientAMT != "No Pending Balance" && indentCheck == false) {

		alert("Please check intdent sale checkbox");
		return false;
	}

	if (Number(patientSaleAmt) > 0 && patientCheck == false) {

		alert("Please check patient sale checkbox");
		return false;
	}

	if (Number(otAmt) > 0 && otCheck == false) {

		alert("Please check OT checkbox");
		return false;
	}

	if (Number(narAmt) > 0 && narCheck == false) {

		alert("Please check narcotics checkbox");
		return false;
	}

	var chargesConf = $("#chargesfromConfIpd").val();

	var emrPer = $('#emrPer').val(); // added by Tarique Aalam
	if (emrPer == "" || emrPer == null || emrPer == undefined) {
		emrPer = 0;
	}

	var billDetailsId = 0;

	var narration = "";
	var narrationid = "-";
	var drdeskflag1 = $('#drdeskflag').val();
	var update = $('#queryType').val();
	if (update == "update") {
		// alert("in 2977");
		if (drdeskflag1 == "" || drdeskflag1 == null
				|| drdeskflag1 == undefined) {
			drdeskflag1 = "-";
		}

		var drdeskflag = drdeskflag1.trim();
	}

	var narrationBill = "";
	var narrationidBill = "-";

	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	$("#sponsorid2").val(sponsorId);
	$("#chargesSlaveId2").val(chargesSlaveId);
	var serviceId = $("#serviceid").val();
	var sponsorid2 = $("#sponsorid2").val();
	var chargesSlaveId2 = $("#chargesSlaveId2").val();

	var callfrom = $('#saveServiceCallFrom').val();
	var masterReceiptId = $('#receiptMasterId').val();
	var iscombination = $("#iscombinationIpd").val();
	var receiptOf = $("#receiptOf").val();
	var recSlaveIdIPD = $('#receiptSlaveIdIPD').val();
	var hallId = $('#hallId').val();

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	if (recSlaveIdIPD == "" || recSlaveIdIPD == null
			|| recSlaveIdIPD == undefined || isNaN(recSlaveIdIPD)) {
		recSlaveIdIPD = 0;
	}
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (masterReceiptId == "" || masterReceiptId == null
			|| masterReceiptId == undefined || isNaN(masterReceiptId)) {
		masterReceiptId = 0;
	}

	var sndToLabFlag = $("#sndtolabflag").val().trim();
	var ot_flag = 'N';
	var queryType = $('#queryType').val();
	var masterReceiptId = 0;
	var doctorId = 0;
	var patienttId = $("#pId").val();
	var treatmentId = $("#treatmentId").text();
	var departmentId = $("#depdocdeskid").val();
	var billId = parseInt($("#billNo").html());
	var sourceTypeId = $("#sourceTypeId").val();
	var rate = 0;
	var concession = 0;
	var concessionPer = 0;
	var quantity = 0;
	var amount = 0;
	var pay = 0;
	var coPay = 0;
	var createdDateTime = $("#finalDate").val();
	var subServiceId = 0;

	var update = $('#queryType').val();
	if (update != "update") {

		var pharmacyInvname = $("#perticular").val(); // Pooja
		var drdeskflag = "-";
		if (subServiceId == -1
				&& (pharmacyInvname != "" || pharmacyInvname == null
						|| pharmacyInvname == undefined || pharmacyInvname == 0 || isNaN(pharmacyInvname))) {
			subServiceId = 9;
			serviceId = $("#pharmacyInvoice").val();// only for invoice
			// serviceId =$("#servId").val();//only for invoice
			drdeskflag = $("#perticular").val();

		}
	}

	var subservicesname = $("#perticular").val();
	// var servicename = $("#servicename").val();
	var perticularSName = $("#perticular").val();

	var unitId = $("#uId").val();

	var otherAmount = 0;
	var otherCoPay = 0;
	var otherPay = 0;
	var otherRate = 0;
	var otherConcession = 0;

	var recSlaveIdIPD = 0;

	var tempDate = createdDateTime.split("/");
	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

	if (subservicesname == "" || subservicesname == null) {

		subservicesname = "pharmacy";
	}
	if (unitId == 0) {
		unitid = $("#allunitid").val();
	}
	// Added by sanjay on ipd, service assign save button.send to ris
	var sendToRisIpdBill = 'N';

	var totalAmount = $("#pendingTot").val();
	var discPer = $("#disc1").val();
	var discAmt = $("#disc2").val();
	var finalAmt = $("#fAmt").val();

	serviceId = 16;

	rate = totalAmount;
	concession = 0;
	concessionPer = discPer;
	quantity = 1;
	amount = finalAmt;
	pay = 0;
	coPay = finalAmt;

	otherRate = totalAmount;
	otherConcession = 0;
	otherAmount = finalAmt;
	otherCoPay = finalAmt;
	otherPay = finalAmt;

	var serviceDetails = {
		listBillDetailsIpd : []
	};
	serviceDetails.listBillDetailsIpd.push({

		patienttId : patienttId,
		perticularSName : perticularSName,
		billDetailsId : billDetailsId,
		serviceId : serviceId,
		doctorId : doctorId,
		treatmentId : treatmentId,
		departmentId : departmentId,
		billId : billId,
		sourceTypeId : sourceTypeId,
		rate : rate,
		concession : concession,
		concessionPer : concessionPer,
		quantity : quantity,
		amount : amount,
		pay : pay,
		coPay : coPay,
		serviceId : serviceId,
		subServiceId : subServiceId,
		unitId : unitId,
		createdDateTime : addDate,
		recSlaveIdIPD : recSlaveIdIPD,
		urgentFlag : "N",
		callfrom : callfrom,
		masterReceiptId : masterReceiptId,
		subservicesname : subservicesname,
		sponsorId : sponsorId,
		chargesSlaveId : chargesSlaveId,

		otherRate : otherRate,
		otherAmount : otherAmount,
		otherCoPay : otherCoPay,
		otherPay : otherPay,
		otherConcession : otherConcession,
		iscombination : iscombination,
		receiptOf : receiptOf,
		narration : narrationid,
		hallId : hallId,
		narrationidBill : narrationidBill,
		accountStatusIpd : "N",
		emrPer : emrPer,
		sendToRisIpdBill : sendToRisIpdBill,
		ot_flag : ot_flag,
		sndToLabFlag : sndToLabFlag,
		drdeskflag : drdeskflag
	});

	serviceDetails = JSON.stringify(serviceDetails);
	var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());

	var inputs = [];

	// patient details push
	inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
	inputs.push("queryType=" + queryType);
	inputs.push("callfrom=" + callfrom);
	inputs.push("module=0");
	inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveIpd",

		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			alert("Pharmacy added in outstanding Successfully");
			window.location.reload(true);
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 10-09-2018
 * @codeFor : Get pharmecy added in billing or not
 ******************************************************************************/
function getPharmacyInIpdBillOrNot() {

	var callF = "";
	var treatmentId = $('#treatmentId').text();
	var deptId = parseInt($("#deptId").val());
	var userId = parseInt($("#userId").val());
	var unitId = parseInt($("#unitId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());

	var inputs = [];
	inputs.push("unitId=" + unitId);
	inputs.push("deptId=" + deptId);
	inputs.push("userId=" + userId);
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("chargesSlaveId=" + chargesSlaveId);
	inputs.push("callFrom=" + callF);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bill/getPharmacyInBillOrNot",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			if (r > 0) {

				$("#outstandAmt").attr("disabled", true);
			}
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 17-Oct-2018
 * @codeFor : Set Service For Cash Payment
 ******************************************************************************/
function setServiceForCash() {

	var r = confirm("Are You Sure To Activate Paid Service In Cash");
	if (r == true) {

		var callFrom = "-";
		var treatmentId = $("#treatmentId").text();
		var unitId = $("#unitId").val();
		var userId = parseInt($("#userId").val());
		var chargesSlaveId = parseInt($("#chargesSlaveId").val());
		var depId = 2;
		var servIdsChecked = [];

		$('input[id=chkOpdBillReg1]:checked').each(function() {

			var regBillId = $("#regBillId").val();
			servIdsChecked.push(regBillId);
		});

		$('input[name=opdBillCheckbox]:checked').each(function() {

			servIdsChecked.push($(this).val());
		});

		if (servIdsChecked == "") {

			alert("Please check services for cash payment");
			$(".openAllSlaveIpd").trigger('click');
			return false;
		}

		var inputs = [];
		inputs.push("treatmentId=" + treatmentId);
		inputs.push("unitId=" + unitId);
		inputs.push("userId=" + userId);
		inputs.push("chargesSlaveId=" + chargesSlaveId);
		inputs.push("depId=" + depId);
		inputs.push("callFrom=" + callFrom);
		inputs.push("servIdsChecked=" + servIdsChecked);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/setServiceForCash",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				var payable = r.amount;
				$("#payNow").val(parseFloat(payable).toFixed(2));
				$("#paidByCashFlag").val("Y");
				$("#paidByCashServices").val(servIdsChecked);
			}
		});
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 19-Oct-2018
 * @codeFor : Set Credit bill mode
 ******************************************************************************/
function setCreditBillMode() {

	var outstandingAmt = $("#finalRemain").html();

	if (Number(outstandingAmt) > 0
			&& ($("#creditBill").is(":checked") == false)) {

		$("#creditBill").prop("checked", true);
	}
}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 14-Jan-2018
 * @codeFor : resetPayMode()
 ******************************************************************************/
function resetPayMode() {
	$("#payMode").val(1);
}

function setService(callFrom, id) {

	if (callFrom == "general") {

		var a = parseInt($('#sId' + id).text());
		$("#bedServiceId").val(a);
		$("#servId").val(a);
		return false;

	} else if (callFrom == "sponsor") {

		var a = parseInt($('#sponServId' + id).text());
		$("#bedServiceId").val(a);
		$("#servIdIpdSponsor").val(a);
		return false;
	}
}

function setCollectionCharges(servId,subServId){
	
	var response = "";
	var unitId = $("#unitId").val();
	var businessType = $("#businessType").val();
	var	patientId   =  $("#pId").val();
	var treatmentId  =  $("#tId").val();
	
	var inputs = [];
		inputs.push('serviceId=' + servId);
		inputs.push('subServiceId=' + subServId);
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/checkDuplicateCollectionCharges",
		success : function(r) {
			response = r;
			if(servId == 12){
				
				var risSampleTypeId = $("#risSampleTypeId").val();
				$("#sampleType").val(risSampleTypeId);
				$("#barcodeNo").val("NA");
			}else{
				
				var collectionChargesSampleTypeId = $("#collectionChargesSampleTypeId").val();
				$("#sampleType").val(collectionChargesSampleTypeId);
				$("#barcodeNo").val("NA");
			}
		}
	});
	return response;
}

function checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId){
	var response = "";
	var inputs = [];
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/checkDuplicateServicesFromPackage",
		success : function(r) {
			response = r;
		}
	});
	return response;
}

function setPackageBarcodePopup(serviceId, subServiceId){
	var unitId = $("#unitId").val();
	var businessType = $("#businessType").val();
	var billDetailsId =$('#billDetailsId').val();
	var	patientId   =  $("#pId").val();
	var treatmentId  =  $("#tId").val();
	
	var iscombination = $("#iscombination").val();
	if(iscombination == "Y"){
		var packageSampleTypeId = $("#packageDefaultSampleTypeId").val();
		if(packageSampleTypeId == 0){
			alert("Please add sample type for package.");
			closeAndResetBarcodePopup();
			return false;
		}else{
			$('#sampleType').val(packageSampleTypeId);
		}
	}
	
	$("#barcodeNo").val("NA");
	var checkDuplicate = checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	if(checkDuplicate == "Package" || checkDuplicate == "Profile"){
		var msg = "";
		if(checkDuplicate == "Package"){
			msg = "Given package is already exists.";
		}else{
			msg = "Some of the tests are already exists.";
		}
		alert(msg);

		closeAndResetBarcodePopup();
		
		return false;
	}
	
	var inputs = [];
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getSampleWiseProfileFromPackage",
		success : function(r) {
			resetBarcodePopup();
			//getDefaultBarcodeForPackage(serviceId, subServiceId, unitId, businessType, patienttId, treatmentId, billDetailsId);
			setTemplateForSampleWiseBarcode(r);
		}
	});
}

function getDefaultBarcodeForPackage(serviceId, subServiceId, unitId, businessType, patienttId, treatmentId, billDetailsId){
	var response = "";
	var inputs = [];
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getDefaultBarcodeForPackage",
		success : function(r) {
			response = r;
		}
	});
	return response;
}

function setTemplateForSampleWiseBarcode(r){
	
	var htm = "";
	for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++){
		htm = htm
			+ '<tr class="">'
				+ ' <td class="col-md-1 center"><input type="hidden" id="barcodeSampleId'+(i+1)+'" value="0">'+(i+1)+'</td>'
				+ ' <td class="col-md-1 center">'+r.labSampleWiseMasterDtoList[i].samplename+'<input type="hidden" id="barcodeSampleName'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].sampleId+'"></td>'
				+ ' <td class="col-md-1 center" id="barcodeSampleTests'+i+'">'+r.labSampleWiseMasterDtoList[i].testName+'<input type="hidden" id="barcodeSampleTestsId'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].masterId+'"></td>'
				+ ' <td class="col-md-1 center" id="barcodeSampleNumber'+(i+1)+'"><input type="text" class="form-control" id="barcodeSampleNo'+(i+1)+'" onchange="barcodeValidation(this.id)" placeholder="Enter Barcode No" name="barcodeSampleNo'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].barCode+'" maxlength="14"></td>'
			+ '</tr>';
	}
	$("#sampleWiseBarcodeTableBody").append(htm);
	//$("#sampleWiseBarcode").modal('show');
}

function saveSampleWiseBarcodes(){
	var response = 0;//checkDuplicateBarcodeForPackage("savePackage");
	if(response > 0){
		alert("Barcode Number allready Exists !!!.");
	}else{
		$("#sampleWiseBarcode").modal('hide');
	}
}

function checkDuplicateBarcodeForPackage(callFrom){
	var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());
	var barcode = "";
	var response = "";
	
	if(callFrom == "editPackage"){
		barcode = $("#packageBarcodeId").val();
	}
	
	var unitId = $("#unitId").val();
	var businessType = $("#businessType").val();
	var billDetailsId =$('#billDetailsId').val();
	var	patientId   =  $("#pId").val();
	var treatmentId  =  $("#tId").val();
	
	var inputs = [];
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
		inputs.push('barcode=' + barcode);
		inputs.push('sampleWiseBarcodes=' + sampleWiseBarcodes);
		inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/checkDuplicateBarcodeForPackage",
		success : function(r) {
			response = r;
		}
	});
	return response;
}

function closeAndResetBarcodePopup(){
	resetBarcodePopup();
	clearAllFieldsOfOpd();
	$("#sampleWiseBarcode").modal('hide');
}

function resetBarcodePopup(){
	var tableHeaderRowCount = 1;
	var reagentTable = document.getElementById('sampleWiseBarcodeTable');
	var rowCount = reagentTable.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		reagentTable.deleteRow(tableHeaderRowCount);
	}
}

function readSampleWiseBarcodes(){
	var subList = {	labSampleWiseMasterDtoList : [] };
	var count = 0;
	var totalRow = $('#sampleWiseBarcodeTableBody tr').length;
	for(var i = 1; i <= totalRow; i++) {
		count++;
		var sampleTypeId = $("#barcodeSampleName" + count +"").val();
		var masterIds = $("#barcodeSampleTestsId" + count + "").val();
		var barcodeSampleNo = $("#barcodeSampleNo" + count + "").val();
		
		var subServiceIds = masterIds.split(",");
		
		if(subServiceIds.length > 1){
			for(var num = 0; num < subServiceIds.length; num++)
				subList.labSampleWiseMasterDtoList.push({
					subServiceId	: subServiceIds[num],
					sampleTypeId	: sampleTypeId,
					barCode       	: barcodeSampleNo
			});
		}else{
			subList.labSampleWiseMasterDtoList.push({
				subServiceId	: masterIds,
				sampleTypeId	: sampleTypeId,
				barCode       	: barcodeSampleNo
			});
		}
	}
	return subList;
}

/************
* @author	: Vinod Udawant
* @codeFor	: Get all amount details
 ************/
function getBillAmountDetails(callFrom) {
	
	var unitId = $("#unitId").val();
	var depId = $("#depdocdeskid").val();
	var userId = $("#userId").val();
	var treatmentId = $("#treatId").val();
	var serviceId = -1;
	var chargesSlaveId = $("#chargesSlaveId").val();
	var sponsorCatId = 0;
	var pharmacyInvoice = $("#pharmacyInvoice").val();
	var pharmacyServId = $("#pharmacyServId").val();
	var callformComAdv = "ipdBill";
	var callformRcptTot = "ipd";
	var callformPrevPending = "onload";
	
	if(chargesSlaveId > 0){
		sponsorCatId = 1;
	}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"unitId" : unitId,
			"depId" : depId,
			"userId" : userId,
			"treatmentId" : treatmentId,
			"serviceId" : serviceId,
			"chargesSlaveId" : chargesSlaveId,
			"sponsorCatId" : sponsorCatId,
			"pharmacyInvoice" : pharmacyInvoice,
			"pharmacyServId" : pharmacyServId,
			"callformComAdv" : callformComAdv,
			"callformRcptTot" : callformRcptTot,
			"callformPrevPending" : callformPrevPending
		},
		url : "ehat/ipdbillmgt/getAllAmountDetails",
		success : function(r) {
			
			r = r.lstAmountDetails[0];
			
			setPrevioudPendingAmt(r);
			//setPayableAmt(r,callFrom);
			setCommonAdvanceAmt(r);
			setAllReceiptTotals(r);
		}
	});
}

function setPrevioudPendingAmt(r){
	
	var totRemain=r.total_remain;
	if(totRemain <= 0 || isNaN(totRemain)){
		
		totRemain=0.00;					
	}
	$("#previousRemainingValue").html(parseFloat(totRemain).toFixed(2));
}

function setPayableAmt(r,callFrom){
	
	var totAmt=0,totCons=0,totPayable=0;
	
	if(callFrom=="sponsor"){
		
		totAmt = totAmt + r.other_amount;
		totCons = totCons + r.other_concession;
	}else{
		
		totAmt = totAmt + r.amount;
		totCons = totCons + r.concession;	
	}

	/*for(var inx=0;inx<r.listBillDetails.length;inx++){
		
		var servId=r.listBillDetails[inx].serviceId;
		
		if(sId==-1){
			
			$("#chkOpdBillReg"+servId).removeAttr("disabled");
			$("#chkOpdBillReg"+servId).prop("checked","checked");
		}
	
	}*/		
	totPayable=totAmt-totCons;
	$("#payable").val(parseFloat(totPayable).toFixed(2));	
	$("#payNow").val(parseFloat(totPayable).toFixed(2));	
}

function setCommonAdvanceAmt(r){
	
	var totalAdvc = 0;
	
	totalAdvc = Number(r.remaining_common_amnt);
	
	var otherwise=parseFloat(0.00).toFixed(2);
	if(totalAdvc <= 0){
		
		$("#finalAdvance").html(otherwise); 
		$("#advancePaid").val(otherwise); 
	}else{
		
		$("#finalAdvance").html(parseFloat(totalAdvc).toFixed(2)); 
		$("#advancePaid").val(parseFloat(totalAdvc).toFixed(2)); 
	}	
}

function setAllReceiptTotals(r){
	
	var otherwise=parseFloat(0.00).toFixed(2);
	var finalBillTotal=parseFloat(r.totAmt).toFixed(2);			
	var grandTotal=parseFloat(r.totAmt).toFixed(2);		
	var conTotal=parseFloat(r.totConcn).toFixed(2);		
	var finalDiscount=parseFloat($("#finalDiscount").html()).toFixed(2);		
	var finalPaid=parseFloat(r.totPaid).toFixed(2);		
	var finalRefund=parseFloat(r.totRefund).toFixed(2);	
	var finalPharmaPaid=parseFloat($("#PharmacyAdvancePaid").html()).toFixed(2);	
	var finalPharmaReturn=parseFloat($("#PharmacyCashReturn").html()).toFixed(2);	
	var paidBySponsor=parseFloat(r.totalSpnsrpaid).toFixed(2);	
				
	if(finalPharmaPaid<=0 || isNaN(finalPharmaPaid)){
		
		finalPharmaPaid=otherwise;
	}
	
	if(finalPharmaReturn<=0 || isNaN(finalPharmaReturn)){
		
		finalPharmaReturn=otherwise;
	}
	
	if(finalBillTotal<=0 || isNaN(finalBillTotal)){
		
		finalBillTotal=otherwise;
	}
	
	if(grandTotal<=0 || isNaN(grandTotal)){
		
		grandTotal=otherwise;
	}
	
	if(conTotal<=0 || isNaN(conTotal)){
		
		conTotal=otherwise;
	}
	
	if(finalDiscount<=0 || isNaN(finalDiscount)){

		finalDiscount=otherwise;
	}
	
	if(finalPaid<=0 || isNaN(finalPaid)){
		
		finalPaid=otherwise;
	}
	
	if(paidBySponsor<=0 || isNaN(paidBySponsor)){
		
		paidBySponsor=otherwise;
	}
	
	if(finalRefund<=0 || isNaN(finalRefund)){
		
		finalRefund=otherwise;
	}		
	
	var phramaAmt=Number(finalPharmaPaid)-Number(finalPharmaReturn);			
	//var billDeductn=(Number(finalPaid)+Number(phramaAmt)) - Number(finalRefund);
	var billDeductn=(Number(finalPaid)+Number(phramaAmt));
	var finalNetAmt=Number(finalBillTotal)-(Number(finalDiscount)+Number(conTotal));
	//var remain=Number(finalNetAmt)-(Number(billDeductn)+Number(paidBySponsor));
	var remain=(Number(finalNetAmt)+Number(finalRefund))-(Number(billDeductn)+Number(paidBySponsor));
	var finalRefundable=0.00;
	
	if(remain < 0 || isNaN(remain)){
		
		remain=otherwise;
		//alert(finalDiscount);				
		finalRefundable=Number(billDeductn)-(Number(finalNetAmt)+Number(finalRefund));
	}
	
	//finalRefundable=Number(finalRefundable)-(Number(finalRefund));

	if(finalRefundable<=0 || isNaN(finalRefundable)){
		
		finalRefundable = otherwise;
	}		
	
	if(finalNetAmt<=0 || isNaN(finalNetAmt)){
		
		finalNetAmt = otherwise;
	}
	
	$("#finalBillTotal").html(finalBillTotal);
	$("#finalNetAmt").html(parseFloat(finalNetAmt).toFixed(2));
	$("#conTotal").html(conTotal);			
	$("#grandTotal").html(grandTotal);
	$("#finalDiscount").html(finalDiscount);
	$("#finalPaid").html(finalPaid);
	$("#paidBySponsor").html(paidBySponsor);
	$("#finalRefund").html(finalRefund);
	$("#finalRemain").html(parseFloat(remain).toFixed(2));
	$("#finalRefundable").html(parseFloat(finalRefundable).toFixed(2));
}

/************
* @author	: Vinod Udawant
* @codeFor	: To get charges configured for sponsor
 ************/
function getSponsorTestCharges(isComServlastId,serviceid) {
	
	var hallSlaveId = $("#hallSlaveId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var isComServId = $("#packageID").val();
	var unitId = $("#unitId").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesSlaveId" : chargesSlaveId,
			"hallSlaveId" : hallSlaveId,
			"isComServId" : isComServId,
			"isComServlastId" : isComServlastId,
			"serviceid" : serviceid,
			"unitId" : unitId,
		},
		url : "ehat/ipdtestautosuggest/getSponsorTestCharges",
		success : function(r) {
			
			if(r.lstSponsorTestChargesDto.length > 0){
				
				r = r.lstSponsorTestChargesDto[0];
				
				$("#sponsorTestCharges").val(parseFloat(r.charges).toFixed(2));
				$("#yearWiseSponsorTestCharges").val(parseFloat(r.yearWiseCharges).toFixed(2));
			}
		} 
	});
}

//Added By Annapurna
function getDoctorConsultationChargesForIpd(){
	var subserviceid = $("#subserviceid").val();
	var serviceId = $("#serviceid").val();
	if(serviceId == 2 && subserviceid!=310){  //rahul
		
		var deptId = 2;//$('#deptId').val();
		var halltype_id = $('#hallTypeId').val();
		var patientId = $('#pId').val();
		var treatmentId = $('#tId').val();
		var billId = $('#billNo').text();
		var unitId = $('#unitId').val();
		var userId = $('#userId').val();
		var chargesSlaveId = $('#chargesSlaveId').val();
		var doctorId = 0;
		if(chargesSlaveId > 0){
			doctorId = $('#doctorNameIpdSponsor').val();
		}else{
			doctorId = $('#doctorName').val();
		}
		
		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/ipdbillmgt/getDoctorConsultationChargesForIpd",
			data	: {
				
				"patientId" : patientId,
				"treatmentId" : treatmentId,
				"billId" : billId,
				"unitId" : unitId,
				"depId" : deptId,
				"userId" : userId,
				"serviceId" : 2,
				"chargesSlaveId" : chargesSlaveId,
				"doctorId" : doctorId,
				"hallTypeId" : halltype_id
			},
			timeout : 1000 * 60 * 5,
			cache 	: false,
			success : function(r) {
				
				if(r.lstConstCharges.length > 0){
					
					var charges = 0;
					
					if(chargesSlaveId == 0){
						
						charges = r.lstConstCharges[0].n_amount;
						$("#rate").val(charges);
						$("#amount").val(charges);
						$("#coPay").val(charges);
					//	$("#amount").val(charges);
						
					}else{
						
						charges = r.lstConstCharges[0].n_other_amount;
						$("#rateIpdSponsor").val(charges);
						$("#payIpdSponsor").val(charges);
						$("#amountIpdSponsor").val(charges);
					}
				}
			}
		});
	}
}

// Added by Rohinis for Ipd general bill services
function getSubServiceDetailsTemp1ipdbill(j, t, s) {
	// alert(t.listSubServiceInventoryDto.length);
	 //alert(JSON.stringify(t));
	
	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	//OT Inventory 	
	if(t.listSubServiceInventoryDto.length > 0){
	for ( var i = 0; i < t.listSubServiceInventoryDto.length; i++) {
	var a = 1 + i;
	var datetime12 = new Date(t.listSubServiceInventoryDto[i].createdDate)
			.toLocaleDateString('en-GB');
	var dname = t.listSubServiceInventoryDto[i].docName;

	var netAmt = Number(t.listSubServiceInventoryDto[i].amount)
			- Number(t.listSubServiceInventoryDto[i].concession);

	var sid = t.listSubServiceInventoryDto[i].serviceId;
	var cghsCode = "(" + t.listSubServiceInventoryDto[i].cghsCode + ")";
	if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
			|| cghsCode == "(-)" || cghsCode == "(null)") {
		cghsCode = "";
	}

	if (dname == null) {
		dname = "-";
	}
	if (t.listSubServiceInventoryDto[i].paidByCashFlag == "Y") {
		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")
				|| t.listSubServiceInventoryDto[i].cancle == "Y"
				|| t.listSubServiceInventoryDto[i].isModify == "N") {

			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">';

		} else {

			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">';

		}
	} else {
		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")
				|| t.listSubServiceInventoryDto[i].cancle == "Y"
				|| t.listSubServiceInventoryDto[i].isModify == "N") {

			setService = setService + '<tr id="tr'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">';

		} else {

			setService = setService + '<tr  id="tr'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">';

		}
	}

	setService = setService

	// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
	+ '<td style="display:none;" id="row'
			+ (t.listSubServiceInventoryDto[i].billDetailsId)
			+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

			+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].billDetailsId + ' </td>';

	if (sid == 14) {

		setService = setService + '<td id="catName'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
				+ t.listSubServiceInventoryDto[i].inventoryName + ' </td>';
	}else if(sid == 11 || sid == 13 ){
		
		        if(t.listSubServiceInventoryDto[i].sndtolabflag == "Y"){
		        	
		        	setService = setService + '<td id="catName'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '" style="color: green;"> '
					+ t.listSubServiceInventoryDto[i].categoryName + cghsCode
					+ ' </td>';
		        }else{
		        	setService = setService + '<td id="catName'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
					+ t.listSubServiceInventoryDto[i].categoryName + cghsCode
					+ ' </td>';
		        }
		        
	}else if(sid == 12 ){
		
        if(t.listSubServiceInventoryDto[i].sndtorisflag == "Y"){
        	
        	setService = setService + '<td id="catName'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '" style="color: #00bfff;"> '
			+ t.listSubServiceInventoryDto[i].categoryName + cghsCode
			+ ' </td>';
        }else{
        	setService = setService + '<td id="catName'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].categoryName + cghsCode
			+ ' </td>';
        }
        
}
	else {

		setService = setService + '<td id="catName'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
				+ t.listSubServiceInventoryDto[i].categoryName + cghsCode
				+ ' </td>';
	}

	setService = setService

	+ '<td id="doccName' + (t.listSubServiceInventoryDto[i].billDetailsId)
			+ '"> ' + dname + ' </td>'

			+ '<td style="display:none;" id="subserviceid'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].subServiceId + ' </td>'

			+ '<td style="display:none;" id="dId'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].docId + ' </td>'

			+ '<td style="display:none;" id="sId'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].serviceId + ' </td>'

			+ '<td style="display:none;" id="amt'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].amount + ' </td>'

			+ '<td style="display:none;" id="emrP'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].emrPer + ' </td>'

			+ '<td style="display:none;" id="othIpdRate'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].otherRate + ' </td>'

			+ '<td style="display:none;" id="drdeskflag'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].drdeskflag + ' </td>'
			
			
			+	'<td style="display:none;" id="barCode'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">0</td>'
			+	'<td style="display:none;" id="spclId'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].specialityId+' </td>'
			+	'<td style="display:none;" id="sampleType'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].sampleTypeId+' </td>'
			+	'<td style="display:none;" id="barCodeId'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">0</td>'
			+	'<td style="display:none;" id="inOutHouse'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">'+ t.listSubServiceInventoryDto[i].inOutHouse+'</td>'
			+	'<td style="display:none;" id="histopathLab'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">'+ t.listSubServiceInventoryDto[i].histopathLab+'</td>'
			+	'<td style="display:none;" id="collectionDate'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].collectionDate+' </td>'
			+	'<td style="display:none;" id="collectionTime'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].collectionTime+' </td>'
			+	'<td style="display:none;" id="regRefDocId'+(t.listSubServiceInventoryDto[i].billDetailsId)+'">0</td>'
			+	'<td style="display:none;" id="isTemplateWiseTest'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].templateWise +' </td>'
			+	'<td style="display:none;" id="isCombination'+(t.listSubServiceInventoryDto[i].billDetailsId)+'"> '+ t.listSubServiceInventoryDto[i].iscombination +' </td>'
			
			+ '<td style="display:none;" id="sndtolabflag'
			+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
			+ t.listSubServiceInventoryDto[i].sndtolabflag + ' </td>';

	if (t.listSubServiceInventoryDto[i].paidByCashFlag == "Y") {
		// added by vinod
		if (t.listSubServiceInventoryDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
					+ '</div>' + '</td>';

		} else {

			if (t.listSubServiceInventoryDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
						+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceInventoryDto[i].quantity + '</div>' + '</td>'

				+ '<td id="char'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceInventoryDto[i].amount).toFixed(2) + '</div>'
				+ '</td>';

		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService + '<td id="con'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="conPer'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';

		} else {
			setService = setService + '<td style="display:none;" id="con'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display:none;" id="conPer'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		}
		setService = setService
		/*
		 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
		 * class="text-center">' +
		 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
		 */

		+ '<td id="cP' + (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceInventoryDto[i].coPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="dateSub'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceInventoryDto[i].cancle == "Y"
					|| t.listSubServiceInventoryDto[i].isModify == "N") {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceInventoryDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceInventoryDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceInventoryDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceInventoryDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}
		if (t.listSubServiceInventoryDto[i].iscombination == 'Y') {
			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled"  data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
					+ t.listSubServiceInventoryDto[i].serviceId
					+ ','
					+ t.listSubServiceInventoryDto[i].subServiceId
					+ ','
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ',\'general\', '
					+ t.listSubServiceInventoryDto[i].amount
					+ ', '
					+ t.listSubServiceInventoryDto[i].concession
					+ ','
					+ t.listSubServiceInventoryDto[i].ot_flag
					+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ '></i></button></a></td>';
		}
		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceInventoryDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceInventoryDto[i].serviceId
					+ '"disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceInventoryDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceInventoryDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceInventoryDto[i].serviceId
					+ '" disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceInventoryDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceInventoryDto[i].billDetailsId + '">';
		}
	} else {
		// added by vinod
		if (t.listSubServiceInventoryDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
					+ '</div>' + '</td>';

		} else {

			if (t.listSubServiceInventoryDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
						+ (t.listSubServiceInventoryDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceInventoryDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceInventoryDto[i].quantity + '</div>' + '</td>'

				+ '<td id="char'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceInventoryDto[i].amount).toFixed(2) + '</div>'
				+ '</td>';

		var concessionFlow = $('#concessionFlow').val();

		if (concessionFlow == "on") {
			setService = setService + '<td id="con'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td id="conPer'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';

		} else {
			setService = setService + '<td style="display:none;" id="con'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concession).toFixed(2)
					+ '</div>' + '</td>'

					+ '<td style="display:none;" id="conPer'
					+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceInventoryDto[i].concessionPer).toFixed(2)
					+ '</div>' + '</td>';
		}
		setService = setService
		/*
		 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
		 * class="text-center">' +
		 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
		 */

		+ '<td id="cP' + (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ (t.listSubServiceInventoryDto[i].coPay).toFixed(2) + '</div>'
				+ '</td>'

				+ '<td id="dateSub'
				+ (t.listSubServiceInventoryDto[i].billDetailsId) + '">'
				+ '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceInventoryDto[i].cancle == "Y"
					|| t.listSubServiceInventoryDto[i].isModify == "N") {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled"   onclick="editOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceInventoryDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceInventoryDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceInventoryDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceInventoryDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled"  onclick="cancleOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceInventoryDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled"  onclick="cancleOnClick('
						+ t.listSubServiceInventoryDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}
		if (t.listSubServiceInventoryDto[i].iscombination == 'Y') {
			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled"  data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
					+ t.listSubServiceInventoryDto[i].serviceId
					+ ','
					+ t.listSubServiceInventoryDto[i].subServiceId
					+ ','
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ ',\'general\', '
					+ t.listSubServiceInventoryDto[i].amount
					+ ', '
					+ t.listSubServiceInventoryDto[i].concession
					+ ','
					+ t.listSubServiceInventoryDto[i].ot_flag
					+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
					+ t.listSubServiceInventoryDto[i].billDetailsId
					+ '></i></button></a></td>';
		}
		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceInventoryDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceInventoryDto[i].serviceId
					+ '" checked=checked id="chkOpdBill'
					+ (t.listSubServiceInventoryDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceInventoryDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceInventoryDto[i].serviceId
					+ '" disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceInventoryDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceInventoryDto[i].billDetailsId + '">';
		}
	}

	setService = setService + '</td>';

	setService = setService + '</tr>';
	setService = setService + '<tr>';
}

}
	/*//OT Drugs and OT CathLab 
	if(t.listBillNobleServiceDto.length > 0){
		for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listBillNobleServiceDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listBillNobleServiceDto[i].docName;

		var netAmt = Number(t.listBillNobleServiceDto[i].amount)
				- Number(t.listBillNobleServiceDto[i].concession);

		var sid = t.listBillNobleServiceDto[i].serviceId;
		var cghsCode = "(" + t.listBillNobleServiceDto[i].cghsCode + ")";
		if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
				|| cghsCode == "(-)" || cghsCode == "(null)") {
			cghsCode = "";
		}

		if (dname == null) {
			dname = "-";
		}
		if (t.listBillNobleServiceDto[i].paidByCashFlag == "Y") {
			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")
					|| t.listBillNobleServiceDto[i].cancle == "Y"
					|| t.listBillNobleServiceDto[i].isModify == "N") {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';

			} else {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';

			}
		} else {
			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")
					|| t.listBillNobleServiceDto[i].cancle == "Y"
					|| t.listBillNobleServiceDto[i].isModify == "N") {

				setService = setService + '<tr id="tr'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';

			} else {

				setService = setService + '<tr onclick="editOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId + ')" id="tr'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';

			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listBillNobleServiceDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].billDetailsId + ' </td>';

		if (sid == 14) {

			setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
					+ t.listBillNobleServiceDto[i].inventoryName + ' </td>';
		}  else {

			setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
					+ t.listBillNobleServiceDto[i].categoryName + cghsCode
					+ ' </td>';
		}

		setService = setService

		+ '<td id="doccName' + (t.listBillNobleServiceDto[i].billDetailsId)
				+ '"> ' + dname + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="emrP'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].emrPer + ' </td>'

				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].otherRate + ' </td>'

				+ '<td style="display:none;" id="drdeskflag'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].drdeskflag + ' </td>'
				
				
				+	'<td style="display:none;" id="barCode'+(t.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="spclId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].specialityId+' </td>'
				+	'<td style="display:none;" id="sampleType'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sampleTypeId+' </td>'
				+	'<td style="display:none;" id="barCodeId'+(t.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="inOutHouse'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ t.listBillNobleServiceDto[i].inOutHouse+'</td>'
				+	'<td style="display:none;" id="histopathLab'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ t.listBillNobleServiceDto[i].histopathLab+'</td>'
				+	'<td style="display:none;" id="collectionDate'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionDate+' </td>'
				+	'<td style="display:none;" id="collectionTime'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionTime+' </td>'
				+	'<td style="display:none;" id="regRefDocId'+(t.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="isTemplateWiseTest'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].templateWise +' </td>'
				+	'<td style="display:none;" id="isCombination'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].iscombination +' </td>'
				
				+ '<td style="display:none;" id="sndtolabflag'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].sndtolabflag + ' </td>';

		if (t.listBillNobleServiceDto[i].paidByCashFlag == "Y") {
			// added by vinod
			if (t.listBillNobleServiceDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listBillNobleServiceDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '">'
							+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
							+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listBillNobleServiceDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBillNobleServiceDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';

			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 

			+ '<td id="cP' + (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBillNobleServiceDto[i].cancle == "Y"
						|| t.listBillNobleServiceDto[i].isModify == "N") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBillNobleServiceDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBillNobleServiceDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBillNobleServiceDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBillNobleServiceDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listBillNobleServiceDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listBillNobleServiceDto[i].serviceId
						+ ','
						+ t.listBillNobleServiceDto[i].subServiceId
						+ ','
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listBillNobleServiceDto[i].amount
						+ ', '
						+ t.listBillNobleServiceDto[i].concession
						+ ','
						+ t.listBillNobleServiceDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listBillNobleServiceDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBillNobleServiceDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listBillNobleServiceDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBillNobleServiceDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBillNobleServiceDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBillNobleServiceDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBillNobleServiceDto[i].billDetailsId + '">';
			}
		} else {
			// added by vinod
			if (t.listBillNobleServiceDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listBillNobleServiceDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '">'
							+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
							+ (t.listBillNobleServiceDto[i].rate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBillNobleServiceDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listBillNobleServiceDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBillNobleServiceDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';

			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBillNobleServiceDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 

			+ '<td id="cP' + (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBillNobleServiceDto[i].cancle == "Y"
						|| t.listBillNobleServiceDto[i].isModify == "N") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBillNobleServiceDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBillNobleServiceDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBillNobleServiceDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBillNobleServiceDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
							+ t.listBillNobleServiceDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listBillNobleServiceDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listBillNobleServiceDto[i].serviceId
						+ ','
						+ t.listBillNobleServiceDto[i].subServiceId
						+ ','
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listBillNobleServiceDto[i].amount
						+ ', '
						+ t.listBillNobleServiceDto[i].concession
						+ ','
						+ t.listBillNobleServiceDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listBillNobleServiceDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listBillNobleServiceDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBillNobleServiceDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listBillNobleServiceDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBillNobleServiceDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBillNobleServiceDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBillNobleServiceDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBillNobleServiceDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';
	}

	}
//
*/
	/*for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].amount)
				- Number(t.listSubServiceIpdDto[i].concession);

		var sid = t.listSubServiceIpdDto[i].serviceId;
		var cghsCode = "(" + t.listSubServiceIpdDto[i].cghsCode + ")";
		if (cghsCode == "" || cghsCode == "-" || cghsCode == "()"
				|| cghsCode == "(-)" || cghsCode == "(null)") {
			cghsCode = "";
		}

		if (dname == null) {
			dname = "-";
		}
		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")
					|| t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			} else {

				setService = setService + '<tr bgcolor="lightblue" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			}
		} else {
			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")
					|| t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {

				setService = setService + '<tr id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			} else {

				setService = setService + '<tr onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId + ')" id="tr'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

			}
		}

		setService = setService

		// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';

		if (sid == 14) {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].inventoryName + ' </td>';
		} else if (sid == 16) {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].pharmaName + ' </td>';
		} else if (sid == 11 || sid == 13) {// Added by laxman for sended lab
											// test coloe change.
			if ((t.listSubServiceIpdDto[i].sndtolabflag) == "Y") {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" style="color: green;"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			} else {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			}
		}// code By Sanjay on 26-03-2018 for changes the testname color when
			// it sent to RIS
		else if (sid == 12) {
			if ((t.listSubServiceIpdDto[i].sndtorisflag) == "Y") {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" style="color: #00bfff;"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			} else {
				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].categoryName + cghsCode
						+ ' </td>';
			}
		} else {

			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].categoryName + cghsCode
					+ ' </td>';
		}

		setService = setService

		+ '<td id="doccName' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> ' + dname + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="emrP'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].emrPer + ' </td>'

				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherRate + ' </td>'

				+ '<td style="display:none;" id="drdeskflag'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>'
				
				
				+	'<td style="display:none;" id="barCode'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="spclId'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].specialityId+' </td>'
				+	'<td style="display:none;" id="sampleType'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].sampleTypeId+' </td>'
				+	'<td style="display:none;" id="barCodeId'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="inOutHouse'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ t.listSubServiceIpdDto[i].inOutHouse+'</td>'
				+	'<td style="display:none;" id="histopathLab'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ t.listSubServiceIpdDto[i].histopathLab+'</td>'
				+	'<td style="display:none;" id="collectionDate'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].collectionDate+' </td>'
				+	'<td style="display:none;" id="collectionTime'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].collectionTime+' </td>'
				+	'<td style="display:none;" id="regRefDocId'+(t.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
				+	'<td style="display:none;" id="isTemplateWiseTest'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].templateWise +' </td>'
				+	'<td style="display:none;" id="isCombination'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].iscombination +' </td>'
				
				+ '<td style="display:none;" id="sndtolabflag'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].sndtolabflag + ' </td>';

		if (t.listSubServiceIpdDto[i].paidByCashFlag == "Y") {
			// added by vinod
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';

			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 

			+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listSubServiceIpdDto[i].serviceId
						+ ','
						+ t.listSubServiceIpdDto[i].subServiceId
						+ ','
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listSubServiceIpdDto[i].amount
						+ ', '
						+ t.listSubServiceIpdDto[i].concession
						+ ','
						+ t.listSubServiceIpdDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '"disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		} else {
			// added by vinod
			if (t.listSubServiceIpdDto[i].cancle == "Y") {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>' + '</td>';

			} else {

				if (t.listSubServiceIpdDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
							+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
							+ '</div>' + '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listSubServiceIpdDto[i].billDetailsId)
							+ '" value="' + netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

					+ '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';

			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concession).toFixed(2)
						+ '</div>' + '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			
			 * + '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' +
			 * (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 

			+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
					+ '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y"
						|| t.listSubServiceIpdDto[i].isModify == "N") {

					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success " disabled="disabled"   onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listSubServiceIpdDto[i].cancle
							+ '" id=btnCancle'
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
							+ t.listSubServiceIpdDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}
			if (t.listSubServiceIpdDto[i].iscombination == 'Y') {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#packIpd"  onclick="getPackagedataforIpd('
						+ t.listSubServiceIpdDto[i].serviceId
						+ ','
						+ t.listSubServiceIpdDto[i].subServiceId
						+ ','
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ',\'general\', '
						+ t.listSubServiceIpdDto[i].amount
						+ ', '
						+ t.listSubServiceIpdDto[i].concession
						+ ','
						+ t.listSubServiceIpdDto[i].ot_flag
						+ ')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
			setService = setService + '<td class="only-checkbox" >';

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listSubServiceIpdDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listSubServiceIpdDto[i].billDetailsId + '">';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}*/

	$("#serviceData" + j).html(setService);
}


//This function use for set Sponsor Rate To Self Patient @Kishor
function setSponsorRateToSelfPatientIPD(){
	 var r = confirm("Are You Sure You Want To Convert Sponsor Rate?");
		if (r == true) {
		var labservicelist = [];
		var labservicelist1 = [];
		var servicelist2 = [];
		var treatmentId = $('#treatId').val();
		var patientId = parseInt($("#patientId").text());
		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();
		
		$('input[name=opdBillCheckbox]:checked').each(function() {

			labservicelist.push(parseInt($(this).val()));
			var a=parseInt($(this).val());
			labservicelist1.push(parseInt($("#subserviceid"+a).text()));
			servicelist2.push(parseInt($("#sId"+a).text()));
		});

		/*if (labservicelist.length == 0) {
			alert("Please check at least One Service to Convert to Sponsor Or Open all Services.");
			return false;

		}*/		
		
		// note: jQuery's filter params are opposite of javascript's native implementation :(
		var unique = $.makeArray($(servicelist2).filter(function(i,itm){ 
		    // note: 'index', not 'indexOf'
		    return i == $(servicelist2).index(itm);
		}));

		//alert(labservicelist1);
		var inputs = [];
		inputs.push("labservicelist=" + encodeURIComponent(labservicelist1));
		inputs.push("servicelist=" + encodeURIComponent(unique));
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('patientId=' + patientId);
		inputs.push('sponsorId=' + sponsorId);
		inputs.push('chargesSlaveId=' + chargesSlaveId);
		inputs.push('callFrom=' + "IPD");
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/ipdbill/setSponsorRateToSelfPatient",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			cache : false,

			success : function(r) {

				// fetchbilldetails();
				//getPatientBillAmountIpd(treatId);
				alert(r);
				window.location.reload(true);
			}

		});
		}
}

/************
* @author	: Vinod Udawant
* @codeFor	: To get charges configured for sponsor
 ************/
function getHallWiseTestCharges(isComServlastId,serviceid) {
	
	var hallSlaveId = $("#hallSlaveId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var isComServId = $("#packageID").val();
	var unitId = $("#unitId").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesSlaveId" : chargesSlaveId,
			"hallSlaveId" : hallSlaveId,
			"isComServId" : isComServId,
			"isComServlastId" : isComServlastId,
			"serviceid" : serviceid,
			"unitId" : unitId,
		},
		url : "ehat/ipdtestautosuggest/getHallWiseTestCharges",
		success : function(r) {
			
			if(r.lstSponsorTestChargesDto.length > 0){
				
				r = r.lstSponsorTestChargesDto[0];
				
				$("#hallWiseTestCharges").val(parseFloat(r.charges).toFixed(2));
				
			}
		} 
	});
}


function updateIpdBillDetails() {
	
	var treatmentId = $("#tId").val();
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatId" : treatmentId
		},
		url : "ehat/ipdbill/updateIpdBillDetails",
		success : function(r) {
			
		}
	});
}

function deleteRefundReceipt(callFrom, recId){
	
	var treatmentId = $("#tId").val();
	$("#billRefundId").val(recId);

	var remarkDeletedRefund = $('#idremarkdeletedrefundipd').val();
	
	if(callFrom == 'refundIpd')
	{
		setRemarkpopupDeletedRefundIpd(); 
		return false;
	}
	
	var remarkDeletedRefund = $('#remarkDeletedRefund').val();
   
		if(remarkDeletedRefund == '' || remarkDeletedRefund == undefined || remarkDeletedRefund == null){
			alert('Please fill remark to refund Deleted!!!!');
			$('#remarkDeletedRefund').focus();
			return false;
		  }
		
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatId" : treatmentId,
			"recId" : recId ,
			"remarkDeletedRefund" : remarkDeletedRefund
		},
		url : "ehat/ipdbill/deleteRefundReceipt",
		success : function(r) {
			
			if(r > 0)
				alertify.success("Refund receipt deleted successfully");
			window.location.reload(true);
		}
	});
}


function setRemarkpopupDeletedRefundIpd(){
	
	$('#idremarkdeletedrefundipd').val('1');
	$("#modal-21").addClass("md-show");
}
function cancelRemarkpopupDeletedRefundIpd(){
	
	$('#idremarkdeletedrefundipd').val('1');
	$("#modal-21").removeClass('md-show').addClass("md-hide");
}

function submitRemarkDeletedRefundIpd(){
	var treatmentId = $("#tId").val();
	var recId = $("#billRefundId").val();
   
   var treatmentId1= treatmentId.replaceAll("[^a-zA-Z0-9,.]","");	
	deleteRefundReceipt('submitRefund',recId);	
}
//Added by Rohini for remark to cancel test.

function setRemarkpopupCancelTestipd(){
	
	$('#idremarkcanceltestipd').val('1');
	$("#modal-19").addClass("md-show");
}

function submitRemarkCancelTestIpd(){
	//$("#modal-19").removeClass("md-show");
   var billDetailsId =	$('#billDetailsId').val();
   
   var billDetId= billDetailsId.replaceAll("[^a-zA-Z0-9,.]","");
   var callFrom =	$('#callFrom').val();	
	cancleOnClick(billDetId,callFrom);	
}

function closeRemarkpopupCancelTest(){

	$("#modal-19").removeClass("md-show");	
	$('#remarkcanceltestipd').val('');
	$('#idremarkcanceltestipd').val('0');
}

function getB2BChargesForIpd(isComServlastId,serviceid){
	
	var b2bCharges = 0;
	var customerId = $("#customerId").val();
	
	if(customerId > 1){
		
		//var chargesSlaveId = $("#chargesSlaveId").val();
		var isComServId    = $("#packageID").val();
		var unitId         = $("#unitId").val();
		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"chargesSlaveId"  : customerId,
				"isComServId"     : isComServId,
				"isComServlastId" : isComServlastId,
				"serviceid"       : serviceid,
				"unitId"          : unitId,
			},
			url : "ehat/testautosuggest/getB2BTestCharges",
			success : function(r) {
				
				b2bCharges = r.b2bCharges;
			}
		});
	}	
	
	return b2bCharges;
}


/************
* @author	: Vishant Pawar
* @date		: 20-Dec-2023
* @codeFor	: Save Remark When patient outsanding amount is pending
 ************/
function submitOutStandingRemark() 
{
	
	 var outStandingRemark = $("#outStandingRemark").val();
	 var OutStandingReason = $("#OutStandingReason").val();
	 var treatmentId = $("#tId").val();

	if (userName == "") {
		alert(" Please Fill All Details ");
		 $("#userNameandpasswordPopUpNew").hide();
		return false;
	}
	
	var inputs = [];
	inputs.push('outStandingRemark=' + outStandingRemark);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('outStandingReson=' + OutStandingReason);

	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url  : "ehat/bill/saveOutStandingRemark",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r==1){
				alertify.success("Remark Saved Successfully");
				$("#remarkPopUpNew").hide();
				closeTreatmentAfterPopup(treatmentId);
			}
			else{
				alertify.success("opps something went wrong!!");
				$("#remarkPopUpNew").hide();
				closeTreatmentAfterPopup(treatmentId);
			}
			
		}
	});
}

function hideRemarkPopup() {
	 $("#remarkPopUpNew").hide();
	}

function closeTreatmentAfterPopup(tretId){
	
	
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/billNoble/closetreatmentforipd",
		data : {
			"treatmentId" : tretId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			msg1 = "please close discharge summary first!!!";
			// msg = msg+"Treatment Closed Successfully...";
			if (response == msg1) {
				alertify.error(response);

			} else {
				alertify.success(response);
				window.location.href = "ipd_previous_billing.jsp";
			}
			;
			// alert(response);
			// alertify.error(response);
			// window.location.href = "patientRecordsDetails.jsp";
			/*
			 * resetUlList(); getConfigTemp();
			 */

		}
	});
	
}


/*******************************************************************************
 * @author Vishant Pawar
 * @date 02_JAN_2024
 * @Code Fetching Reason Data
 ******************************************************************************/

function getAllReasons() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/narration/fetchNarrList",

		success : function(r) {
			setTempReasons(r);// call template
		}
	});
}

function setTempReasons(r) {
	var list = "<option value='0'>--Select Narration--</option>";
	for ( var i = 0; i < r.listNarr.length; i++) {

		list = list + "<option value='" + r.listNarr[i].narrName
				+ "' class='un'>" + (r.listNarr[i].narrName) + "</option>";
	}

	$("#OutStandingReason").html(list);
}


//Added by Rohini for remark to delete receipt .

function setRemarkpopupToDeleteReceipts(){
	
	$('#idremarkdeletereceipt').val('1');
	$("#modal-20").addClass("md-show");
}

function submitRemarkDeleteReceipt(){
	
    var recId =	$('#recId').val();	
    deleteMasterReceiptIPD(recId);
}

function closeRemarkpopupDeleteReceipt(){	
	$("#modal-20").removeClass("md-show");	
	$('#remarkdeletereceipt').val('');
	$('#idremarkdeletereceipt').val('0');
}

function cancelRemarkpopupCancelTest(){
	$("#modal-20").removeClass("md-show");
	$('#remarkdeletereceipt').val('');
	$('#idremarkdeletereceipt').val('0');	
	$('#recId').val('0');
	return false;
}

//added by vishant @reason to distribute service wise amount
function setIpdBillDetailsDistribute(){
	
	var treatmentId = $("#treatId").val();
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/ipdbill/setIpdBillDetailsDistribute",
		data : {
			"treatmentId" : treatmentId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			
		}
	});
}


//added by vishant @reason to distribute service wise amount for bulk settlement
function setBulkSettleDistributeOnloadIpd(){
	
	var treatmentId = $("#treatId").val();
	if(treatmentId!=null|| treatmentId!=""){
	
		jQuery.ajax({
			type : "POST",
			url : "ehat/bill/setBulkSettleDistributeOnload",
			data : {
				"treatmentId" : treatmentId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				
			}
		});
	}
}

