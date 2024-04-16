

/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For creating new rows or tr 
 * **********/
function toCreateRow(){
	
	
	var rc = $('#ItemInfoTable >tbody >tr').length;
	
	var sn = $("#patientName"+rc).val();
	if(sn!="" && sn!=undefined && sn !=null){
		
		var rowCount= rc + 1;
		
	
		$("#rowcount" ).val(rowCount);
		
			
			 $('#DRRDiv').append('<tr id="remove'+rowCount+'">'
			+'<td>'
			+'<input type="text" id="tableNo'+rowCount+'" name="tableNo'+rowCount+'" readonly="readonly" '
			+'class="form-control input-SmallText # deleteGroup1 # textNoDelete" value="'+rowCount+'" maxlength="3" tabindex="-1">'
			+'<input type="hidden" id="slaveId'+rowCount+'" value="0"></td>'
			
			+'<td>'
			+'<input type="text"   id="patientName'+rowCount+'" name="patientName'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo"'
			+' value="" autocomplete="off"></td>'

			+'<td>'
			+'<input type="text" onkeyup="toCreateRow();"  id="billId'+rowCount+'" name="billId'+rowCount+'" '
			+'class="form-control input-SmallText typeheadCounterPo1" value="" autocomplete="off"></td>'



			+'<td>'
			+'<input type="text" id="ipdNo'+rowCount+'" name="ipdNo'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo" '
			+'autocomplete="off" value="0"></td>'



			+'<td>'
			+'<input type="text"  id="amount'+rowCount+'" name="amount'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="0"></td>'
			

			+'<td>'
			+'<input type="text" id="recAmount'+rowCount+'" name="recAmount'+rowCount+'" '
			+' class="form-control input-SmallText # deleteGroup1 # textNo amtclass"  value="0">'
				
			+'<input type="hidden" value="0" id="serviceid'+rowCount+'">'		
			
						
			+'</td>'

			//
			+'<td>'
			+'<input type="text"  id="pendingAmount'+rowCount+'" name="pendingAmount'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="0"></td>'
			
			+'<td>'
			+'<input type="text"  id="paidAmount'+rowCount+'" name="paidAmount'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="0"></td>'
			
			+'<td>'
			+'<input type="text"  id="from'+rowCount+'" name="from'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value=""></td>'
			
			+'<td>'
			+'<input type="text"  id="narration'+rowCount+'" name="narration'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value=""></td>'
			
			
			//
			
			+'<td>'
			+'<input type="checkbox" class="" '
			+'name="deleteGroups" value="'+rowCount+'" id="deleteGroups'+rowCount+'"></td></tr>');
		
			
	}

	
	
}

function saveduepatient() {

	var rowcount = $('#ItemInfoTable >tbody >tr').length;

	var duemaster = {
		lstdue : []
	};

	var first = $("#patientName1").val();
	if (first == "" || first == null || first == undefined) {
		alert("Please Insert Patient Name For Save!");
		$("#patientName1").focus();
		return false;
	}
	var deleted = 'N';
	for ( var i = 1; i < rowcount; i++) {

		var slaveId = $('#slaveId' + i).val();

		var patientName = $("#patientName" + i).val();

		var billId = $("#billId" + i).val();
		var ipdNo = parseFloat($("#ipdNo" + i).val());
		var amount = $("#amount" + i).val();
		var recAmount = $("#recAmount" + i).val();
		var pendingAmount = $("#pendingAmount" + i).val();
		var paidAmount = $("#paidAmount" + i).val();

		var from = $("#from" + i).val();
		var narration = $("#narration" + i).val();

		if (amount == "" || amount == null || amount == undefined) {
			amount = 0;
		}

		if (recAmount == "" || recAmount == null || recAmount == undefined) {
			recAmount = 0;
		}
		if (pendingAmount == "" || pendingAmount == null
				|| pendingAmount == undefined) {
			pendingAmount = 0;
		}

		if (paidAmount == "" || paidAmount == null || paidAmount == undefined) {
			paidAmount = 0;
		}

		if (patientName == "" || patientName == null
				|| patientName == undefined) {
			alert("Please Insert patient Name !");
			$("#patientName" + i).focus();
			return false;
		}

		duemaster.lstdue.push({
			slaveId : slaveId,
			patientName : patientName,
			billId : billId,
			ipdNo : ipdNo,
			amount : amount,
			recAmount : recAmount,
			pendingAmount : pendingAmount,
			paidAmount : paidAmount,
			fromd : from,
			narration : narration,
			deleted : deleted
		});

	}

	
	duemaster = JSON.stringify(duemaster);

	var inputs = [];

	inputs.push('duemaster=' + encodeURIComponent(duemaster));

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/savedue",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			getPatientDuelist();

		}
	});

}

/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For getting list of canteen 
 * **********/
function getPatientDuelist(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getpatientduelist",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			setPatientDuelist(r);
			
		}
	});
}


/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For edit setting templates 
 * **********/
function setPatientDuelist(res) {
	var htm='';
	var rowCount=1;
    var len = res.lstdue.length;
    if (len > 0) {
		
	
	for ( var i = 0; i < res.lstdue.length; i++) {

		
		var slaveId = res.lstdue[i].slaveId;
		var patientName = res.lstdue[i].patientName;
		var ipdNo = res.lstdue[i].ipdNo;
		var amount = res.lstdue[i].amount;
		var recAmount = res.lstdue[i].recAmount;
		var pendingAmount = res.lstdue[i].pendingAmount;
		var paidAmount = res.lstdue[i].paidAmount;
		var fromd = res.lstdue[i].fromd;
		var narration = res.lstdue[i].narration;
		var billId = res.lstdue[i].billId;
		
	    var totalPending = amount - recAmount;
	    	
	    	htm =htm 
	    	+'<tr id="remove'+rowCount+'">'
			+'<td>'
			+'<input type="text" id="tableNo'+rowCount+'" name="tableNo'+rowCount+'" readonly="readonly" '
			+'class="form-control input-SmallText # deleteGroup1 # textNoDelete" value="'+rowCount+'" maxlength="3">'
			+'<input type="hidden" id="slaveId'+rowCount+'" value="'+slaveId+'"></td>'
			
			+'<td>'
			+'<input type="text" id="patientName'+rowCount+'" readonly="readonly" name="patientName'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo"'
			+' value="'+patientName+'" autocomplete="off"></td>'

			+'<td>'
			+'<input type="text"  id="billId'+rowCount+'" readonly="readonly" name="billId'+rowCount+'" '
			+'class="form-control input-SmallText typeheadCounterPo1" value="'+billId+'" autocomplete="off"></td>'



			+'<td>'
			+'<input type="text" id="ipdNo'+rowCount+'" readonly="readonly" name="ipdNo'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo" '
			+'autocomplete="off" value="'+ipdNo+'"></td>'



			+'<td>'
			+'<input type="text"  id="amount'+rowCount+'" readonly="readonly" name="amount'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="'+amount+'"></td>'
			
			+'<td>'
			+'<input type="text"  id="recAmount'+rowCount+'" readonly="readonly" name="recAmount'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="'+recAmount+'"></td>'
			
			+'<td>'
			+'<input type="text"  id="pendingAmount'+rowCount+'" readonly="readonly" name="pendingAmount'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="'+totalPending+'"></td>'
			

			+'<td>'
			+'<input type="text" id="paidAmount'+rowCount+'" name="paidAmount'+rowCount+'" tabindex="-1"'
			+' class="form-control input-SmallText # deleteGroup1 # textNo amtclass"  value="'+paidAmount+'">'
				
			+'<input type="hidden" value="'+rowCount+'" id="serviceid'+rowCount+'">'		
			
						
			+'</td>'
			
			+'<td>'
			+'<input type="text"  id="from'+rowCount+'"  name="from'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="'+fromd+'"></td>'
			
			+'<td>'
			+'<input type="text"  id="narration'+rowCount+'" name="narration'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="'+narration+'"></td>'
			
			+'<td>'
			+'<input type="checkbox" class="" '
			+'name="deleteGroups"  value="'+rowCount+'" id="deleteGroups'+rowCount+'"></td></tr>';
	    	
	    	rowCount++;
	    
	    
	    
	}
    
	   $('#DRRDiv').html(htm);
	   toCreateRow();
    }
	
}


/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :remove tr from positions  
 * **********/
function deleteRow(){
	var r = confirm("Are you confirm to delete selected row");
	if (r == true) {
		var favorite = [];

		$.each($("input[name='deleteGroups']:checked"), function() {
			favorite.push($(this).val());

		});

		if (favorite.length == 0) {
			alert("Please select checkbox to delete");
			return false;
		}

		for ( var i = 0; i < favorite.length; i++) {

			if ($("#serviceid" + favorite[i]) != null
					&& $('#subId' + favorite[i]).val() != "") {
				$("#deleteGroup" + favorite[i]).prop("checked", false);
				
				$("#remove" + favorite[i]).remove();
				
			} else {
				alert("Can not delete empty row");
				$("#deleteGroup" + favorite[i]).prop("checked", false);
			}
		}
		
		calculatTotal();
	}
	
}
