

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:save CommonAdvance master
 ***********/

function saveCommonAdvanceAmount(callfrom) {
	var treatmentid =  $("#tr_id").val();
	var patient_ID =  $("#pi_id").val();
	var actualrefund_amnt =0.0;
/*	var treatmentid = $("#commonAd_treatId").val();
*/	var commonadv_amnt = $("#cadvAmt").val();
    var refudAmtFINAL = $("#refudAmtFINAL").val();
    var refund_amnt = $("#refudAmt").val();
    var deduct_amnt = $("#deduct_amnt1").val();
	var narration = $("#cadvNarr").val();
	var commonadv_id = $("#commonadv_id").val();
	var transationflag="Advance";
	var postflag ="N";	
	var depid=$("#depid").val();
	var departmentId = $("#department").val();
	
	if(departmentId == 0){
		alert("Please Select  Department.");
		return false;
	}
	var unitId = 2;
	var bank ="-";
	var number="-";
	var remaining_amnt = 0;
	var refundid=$("#cdrefundid").val();
	 var payMode=$("#payMode").val();
	 var refundStatus="N";
	 var cdrefundid =$('#cdrefundid').val();
	 if(payMode != -1){
		 if (commonadv_amnt == "") {
				alert("Please Enter Amount.");
				return false;
			} else if (commonadv_amnt == 0) {
				alert("Please Enter Amount.");
				return false;
			}
	 }

	 if(parseFloat ( refund_amnt ) > parseFloat ( commonadv_amnt)){
		 alert("Refund amount cannot greater than Balance Amount!!!");
		 return false;
	 }
	 
 if(parseFloat (refund_amnt) > 0){
	 remaining_amnt = commonadv_amnt - refund_amnt;
	 refundStatus ="Y";
       if(cdrefundid >0){
    	 var actualrefund =  $('#actualrefund').val();
    	   if(parseFloat (actualrefund) > 0){
    		   if(parseFloat (refund_amnt) <  parseFloat (actualrefund )){
    			   actualrefund_amnt=refund_amnt;
    			  
    			//   refudAmtFINAL  = actualrefund -refund_amnt ;
    			   var refudAmtFIX  =   actualrefund   -  refund_amnt ;
    			   refund_amnt      =   refudAmtFINAL - refudAmtFIX  ;
    			   refudAmtFINAL    =    0;
    			   remaining_amnt   =  parseFloat ( commonadv_amnt ) +  parseFloat ( refudAmtFIX);
    			   commonadv_amnt   = $('#cadv_totalamt').val();
    			   
    		   }else{
    			   actualrefund_amnt=refund_amnt;
    			  var  refudAmtFIX=parseFloat ( refund_amnt)  - parseFloat (actualrefund );
    			  refund_amnt     = refudAmtFIX;
    			//  refudAmtFINAL =parseFloat ( refudAmtFINAL) + parseFloat(refudAmtFIX);
    			   remaining_amnt =parseFloat ( commonadv_amnt ) - parseFloat (refudAmtFIX );
    			   commonadv_amnt = $('#cadv_totalamt').val();
    		   }
    	   }else{
    		   actualrefund_amnt=refund_amnt;
    		   if( refundStatus =="Y"){
    				 commonadv_amnt = $('#cadv_totalamt').val();
    			 }
    	   }
        }else{
        	   actualrefund_amnt=refund_amnt;
 		   if( refundStatus =="Y"){
				 commonadv_amnt = $('#cadv_totalamt').val();
			 }
	   }
	 }else{
		 remaining_amnt= commonadv_amnt;
		 refundStatus ="N";
	 }
	if(payMode==2 || payMode==3){
		
		bank   =	$("#bankID").val();
		//number =    $("#txtbankNo").val();
		number =    $("#batchnumber").val();
			
	}
	var serviceDetails = {
			lstCommonadv : []
	        };
	
	 refund_amnt = parseFloat (refund_amnt )  +	parseFloat( refudAmtFINAL) ;
	
	 if(payMode==-1){
			
			var rows= $('#multiPayTable tbody tr.multiPayClass').length;
			for(var i=1;i<=rows;i++){
							
				var payModePop=$("#payMode"+i).val();
				var bankId=$("#bankID"+i).val();
				var bNum=$("#txtbankNo"+i).val();
				//var accNo=$("#txtaccNo"+i).val();
				var amt=$("#txtAmount"+i).val();	
				var re_amnt =0.0;
				 if (amt == "") {
						alert("Please Enter Amount.");
						return false;
					} else if (amt == 0) {
						alert("Please Enter Amount.");
						return false;
					}
				 
				 if(refund_amnt > 0){
					 re_amnt = amt - refund_amnt;
				 }else{
					 re_amnt =amt;
				 }
				 actualrefund_amnt= refund_amnt;
				 refund_amnt = refund_amnt +	 refudAmtFINAL ;
				 if( refundStatus =="Y"){
					 amt= $('#cadv_totalamt').val();
				 }
				
				serviceDetails.lstCommonadv.push({
					patient_ID    : patient_ID,
					commonadv_amnt: amt,
					narration     : narration,
					commonadv_id  :commonadv_id,
					unitId        :unitId,
					departmentId  : departmentId,
					transationflag:transationflag,
					postflag      :postflag,
					treatmentId   :treatmentid,
					total_amnt    : re_amnt,
					bank          :bankId,
					number        :bNum,
					paymode       : payModePop,
					remaining_amnt :re_amnt,
					refund_amnt    : refund_amnt,
					deduct_amnt    : deduct_amnt,
					refundid       :refundid,
					refundStatus   : refundStatus,
					actualrefund_amnt:actualrefund_amnt
				    }); 
			}}else{
				
				serviceDetails.lstCommonadv.push({
					patient_ID    :    patient_ID,
					commonadv_amnt: commonadv_amnt,
					narration     : narration,
					commonadv_id  :commonadv_id,
					unitId        :unitId,
					departmentId  : departmentId,
					transationflag:transationflag,
					postflag      :postflag,
					treatmentId   :treatmentid,
					total_amnt:remaining_amnt,
					bank          :bank,
					number        :number,
				    paymode       :payMode,
					remaining_amnt :remaining_amnt,
					refund_amnt    : refund_amnt,
					deduct_amnt    : deduct_amnt,
					refundid       :refundid,
					refundStatus   :refundStatus ,
					actualrefund_amnt:actualrefund_amnt
				    }); 
			}
	
	 
	    serviceDetails = JSON.stringify(serviceDetails);
		var inputs = [];
		inputs.push('serviceDetails=' + serviceDetails);
/*	inputs.push('patient_ID=' + patient_ID);
	inputs.push('commonadv_amnt=' + commonadv_amnt);
	inputs.push('narration=' + narration);
	inputs.push('commonadv_id=' + commonadv_id);
	inputs.push('unitId=' + unitId);
	inputs.push('transationflag=' + transationflag);
	inputs.push('postflag=' + postflag);
	inputs.push('treatmentId=' + treatmentid);
	inputs.push('total_amnt=' + commonadv_amnt);
	inputs.push('bank=' + bank);
	inputs.push('number=' + number);*/
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/commanadv/savecommanadvMaster",
	
		success : function(r) {
			
			alert(r);

			if(callfrom=='printcadv'){
			 $('#print_val').val(callfrom);
			// getcommanadvMasterList();
			 getcommanadvMasterListNew(callfrom);
			
			}else{
				callfrom="default";
				getcommanadvMasterListNew();
				//getcommanadvMasterList();
			}
			
			
			$('#commonadv_id').val(0);
			$('#cadvAmt').val("");
			$("#cadvNarr").val("");
			$("#tdrefund").hide();
			$("#threfund").hide();
			$("#cadvAmt").prop("readonly",false);
			$("#refudAmt").val(0);
			$("#refudAmtFINAL").val(0);
			$("#deduct_amnt1").val(0);
			$("#cdrefundid").val(0);
			$("#payMode").val(1);
		    $("#department").val(0);
			/* getDcTypeMasterList();
			refreshDoctortypMaster();*/
			refreshcommanadvMaster("aftersave");
				
		}
	});
	
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:fetch CommonAdvance master list
 ***********/
function getcommanadvMasterList(callform) {
	var patient_ID = $('#pi_id').val();


	if(patient_ID==0){
		
	//	return false;
		
	}

	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/commanadv/getcommanadvMasterList",
		data	: {
			"pID_cID" : patient_ID,
			"callform"   :callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
		
			CommonAdvanceTemplate(response);
			var values =$('#print_val').val();
			var ln=response.lstCommonadv.length;
			ln=ln-1;
			if(values=='printcadv'){
				for ( var i = 0; i <=response.lstCommonadv.length; i++) {
					if(i==ln){
				   PrintCommonAdvanceprint(response.lstCommonadv[i].commonadv_id);// for save and print.
					}
				}
			}
			
			
		}

	});
 
}
function addCommonAdvance(){
	/*alert("hiii");*/
	/*$("#cadvAmt").attr("readonly", false);
	$("#cadvNarr").attr("readonly", false);	
	$("#commonadv_id").val(0);*/
	$("#cadvAmt").val("");
	$("#cadvNarr").val("");	
	$("#commonadv_id").val(0);
	
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:template for edit, delect CommonAdvance  master list
 ***********/
function CommonAdvanceTemplate(response) {

	var htm = "";
	var index = 1;
	var temprefund="";
	for ( var i = 0; i < response.lstCommonadvrecrd.length; i++) {
		

	var datetime= new Date(response.lstCommonadvrecrd[i].createdDate).toLocaleString();
	
	
/*	dateTime=	datetime.format("YYYY-MM-DD HH:mm:ss");
*/		
		htm = htm
				+ "<tr id='tr"+(i+1)+"'><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				//+ response.lstCommonadvrecrd[i].patient_ID
				+ response.lstCommonadvrecrd[i].centerPatientId
				+ "<input type='hidden' id='trid"+ response.lstCommonadvrecrd[i].commonadv_id +"' value='" + response.lstCommonadvrecrd[i].treatmentId + "'>" 
				+ "<input type='hidden' id='pID"+ response.lstCommonadvrecrd[i].commonadv_id +"' value='" + response.lstCommonadvrecrd[i].patient_ID + "'>" 
				+ "<input type='hidden' id='payMode"+ response.lstCommonadvrecrd[i].commonadv_id +"' value='" + response.lstCommonadvrecrd[i].payMode + "'>" 
				+ "<input type='hidden' id='department"+ response.lstCommonadvrecrd[i].commonadv_id +"' value='" + response.lstCommonadvrecrd[i].department_id + "'>" 
				+	"</td>"
				+ "<td class='col-sm-2-1 center'   id='pn"
				+ response.lstCommonadvrecrd[i].commonadv_id+"' style='height: 21.5px;width:120px'>"
				+ response.lstCommonadvrecrd[i].patient_name
				+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'>"
				+ response.lstCommonadvrecrd[i].trcount
				+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;width:120px'>"
				+ datetime
				+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'>"
				+ "Advance"
				+ "</td>"
				+ "<td class='col-sm-1-1 center' id='recNO"
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ "' style='height: 21.5px;'>"
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ "</td>"
	     		+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'    id='camnt"+ response.lstCommonadvrecrd[i].commonadv_id + "'  >"
				+ Number( response.lstCommonadvrecrd[i].commonadv_amnt).toFixed(2)
				+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'    id='deamnt"+ response.lstCommonadvrecrd[i].commonadv_id + "'  >"
				+ Number(  response.lstCommonadvrecrd[i].deduct_amnt).toFixed(2)
				+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'    id='remnt"+ response.lstCommonadvrecrd[i].commonadv_id + "'  >"
				+ Number(  response.lstCommonadvrecrd[i].refund_amnt ).toFixed(2)
				+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'    id='blamnt"+ response.lstCommonadvrecrd[i].commonadv_id + "'  >"
				+ Number( response.lstCommonadvrecrd[i].remaining_amnt ).toFixed(2)
				+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'    id='narration"+ response.lstCommonadvrecrd[i].commonadv_id + "'  >"
				+ response.lstCommonadvrecrd[i].narration
				+ "</td>";
		if( response.lstCommonadvrecrd[i].deduct_amnt  > 0){
			htm=  htm + "<td class='col-sm-1-1 center'style='height: 21.5px;'>"
			+ "<button class='btn btn-xs btn-success '  disabled='disabled' onclick='editcadvmaster("
			+ response.lstCommonadvrecrd[i].commonadv_id
			+ ")' ><i class='fa fa-edit'></i></button></td>";
			if(response.lstCommonadvrecrd[i].remaining_amnt > 0 || response.lstCommonadvrecrd[i].remaining_amnt ==0){
				htm=  htm + "</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-danger'  onclick='refundcadv("
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ ")' ><i class='fa fa-undo fa-fw'></i></button></td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'onclick='hideShowrefundOp("+  response.lstCommonadvrecrd[i].commonadv_id +","+ (i+1) +")'><img id='imgupdown"+(i+1) +"' src='images/down.png'>"
				+"<input type='hidden' value='0' id='imghide"+(i+1)+ "'></td>"  
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success '  disabled='disabled' onclick='deletecadvmaster("
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ ")' ><i class='fa fa-trash-o'></i></button></td>"
				if(response.lstCommonadvrecrd[i].post_flag=='Y'){
					htm=  htm	+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='getcommanadvrecordPost("+ response.lstCommonadvrecrd[i].commonadv_id + ")'  value='Post' style='background-color: orange' disabled='true' class='btn btn-xs btn-info'><i class='fa fa-cloud-upload'></i></button></td>"

				}
				else{
				htm=  htm	+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='getcommanadvrecordPost("+ response.lstCommonadvrecrd[i].commonadv_id + ")'  value='Post'  class='btn btn-xs btn-info'><i class='fa fa-cloud-upload'></i></button></td>"
				}
				+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='PrintCommonAdvanceprint("+ response.lstCommonadvrecrd[i].commonadv_id + ")' value='PRINT' class='btn btn-xs btn-primary'><i class='fa fa-print'></i></button></td></tr>";
			}else{
				htm=  htm + "</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-danger'  disabled='disabled'  onclick='refundcadv("
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ ")' ><i class='fa fa-undo fa-fw'></i></button></td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;' disabled='disabled' ><img id='imgupdown"+i +"' src='images/down.png'></td>"
		
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success '  disabled='disabled' onclick='deletecadvmaster("
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ ")' ><i class='fa fa-trash-o'></i></button></td>"
				if(response.lstCommonadvrecrd[i].post_flag=='Y'){
					htm=  htm	+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='getcommanadvrecordPost("+ response.lstCommonadvrecrd[i].commonadv_id + ")'  value='Post' style='background-color: orange' disabled='true' class='btn btn-xs btn-info'><i class='fa fa-cloud-upload'></i></button></td>"

				}
				else{
				htm=  htm	+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='getcommanadvrecordPost("+ response.lstCommonadvrecrd[i].commonadv_id + ")'  value='Post'  class='btn btn-xs btn-info'><i class='fa fa-cloud-upload'></i></button></td>"
				}			
				+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='PrintCommonAdvanceprint("+ response.lstCommonadvrecrd[i].commonadv_id + ")' value='PRINT' class='btn btn-xs btn-primary'><i class='fa fa-print'></i></button></td></tr>";
			}
			
				
		}else{
			if(response.lstCommonadvrecrd[i].remaining_amnt==0 || response.lstCommonadvrecrd[i].refund_amnt > 0){
				htm=  htm +  "<td class='col-sm-1-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success ' onclick='editcadvmaster("
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ ")' disabled='disabled' ><i class='fa fa-edit'></i></button></td>";	
			}else{
				htm=  htm +  "<td class='col-sm-1-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success ' onclick='editcadvmaster("
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ ")' ><i class='fa fa-edit'></i></button></td>";	
			}
		
			htm=  htm	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-danger' onclick='refundcadv("
			+ response.lstCommonadvrecrd[i].commonadv_id
			+ ")' ><i class='fa fa-undo fa-fw'></i></button></td>"
			
			+"<td class='col-sm-1-1 center' style='height: 21.5px;'onclick='hideShowrefundOp("+  response.lstCommonadvrecrd[i].commonadv_id +","+ (i+1) +")'><img id='imgupdown"+(i+1) +"' src='images/down.png'>"
			+"<input type='hidden' value='0' id='imghide"+(i+1)+ "'></td>";
			if(response.lstCommonadvrecrd[i].remaining_amnt==0 || response.lstCommonadvrecrd[i].refund_amnt > 0){
				htm=  htm	+"<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success ' onclick='deletecadvmaster("
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ ")'  disabled='disabled' ><i class='fa fa-trash-o'></i></button></td>";
			}else{
				htm=  htm	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success ' onclick='deletecadvmaster("
				+ response.lstCommonadvrecrd[i].commonadv_id
				+ ")' ><i class='fa fa-trash-o'></i></button></td>";
			}
			if(response.lstCommonadvrecrd[i].post_flag=='Y'){
				htm=  htm	+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='getcommanadvrecordPost("+ response.lstCommonadvrecrd[i].commonadv_id + ")'  value='Post' style='background-color: orange' disabled='true' class='btn btn-xs btn-info'><i class='fa fa-cloud-upload'></i></button></td>"
			}
			else{
			htm=  htm	+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='getcommanadvrecordPost("+ response.lstCommonadvrecrd[i].commonadv_id + ")'  value='Post'  class='btn btn-xs btn-info'><i class='fa fa-cloud-upload'></i></button></td>"
			}
			htm=  htm	+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='PrintCommonAdvanceprint("+ response.lstCommonadvrecrd[i].commonadv_id + ")' value='PRINT'  class='btn btn-xs btn-primary'><i class='fa fa-print'></i></button></td></tr>"; 

		}
		var htm1="";	
		var htm2="";
		var chkrefund=0;
	if(response.lstrefundCommonadv !=null){
		htm1= htm1 +"<tr id='trrefundheader"+(response.lstCommonadvrecrd[i].commonadv_id)+"' style='display:none'>"
    	+ "<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
    	+ "<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px'>"
		+ ""
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-top:2px silver solid;border-left:2px silver solid'>"
		+ "#"
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-top:2px silver solid'>"
		+ "Refund Id"
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-top:2px silver solid'>"
		+ "Refund Amount"
		+ "</th>"
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-top:2px silver solid'>"
		+ "Edit"
		+ "</th>"
	/*	+"<th class='col-sm-1-1 center' style='height: 21.5px;border-top:2px silver solid'>"
		+ "Delete"
		+ "</th>"*/
		+"<th class='col-sm-1-1 center' style='height: 21.5px;border-top:2px silver solid'>" 
		+ "Print"
		+ "</th>" +
	    +"<th class='col-sm-1-1 center' style='height: 21.5px;border-top:2px silver solid'>" 
		+ "Post"
		+ "</th></tr>";
		for ( var s = 0; s < response.lstrefundCommonadv.length; s++) {
		    if (response.lstCommonadvrecrd[i].commonadv_id == response.lstrefundCommonadv[s].commonadv_id){
		    	chkrefund=1;
		    	htm2= htm2 +"<tr class='trrefund"+(response.lstCommonadvrecrd[i].commonadv_id)+"' style='display:none'>"
		    	+ "<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
		    	+ "<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-right-style:hidden;border-top-style:hidden'>"
				+ ""
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-top-style:hidden'>"
				+ ""
				+ "</td>"
		    	+"<td class='col-sm-1-1 center' style='height: 21.5px;border-bottom:2px silver solid;border-left:2px silver solid'>"
				+ (s+1)
				+ "</td>"
			    +"<td class='col-sm-1-1 center' style='height: 21.5px;border-bottom:2px silver solid'>"
				+ response.lstrefundCommonadv[s].common_adv_refund_id
				+ "</td>"
		        +"<td  id='cdrefundamt"+  response.lstrefundCommonadv[s].common_adv_refund_id  +"' class='col-sm-1-1 center' style='height: 21.5px;border-bottom:2px silver solid'>"
				+ Number( response.lstrefundCommonadv[s].common_adv_refund_amnt).toFixed(2)
				+ "</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;border-bottom:2px silver solid'>"
		        + "<button class='btn btn-xs btn-success '	onclick='editrefundslave("
				+  response.lstrefundCommonadv[s].common_adv_refund_id + " ,"+ response.lstCommonadvrecrd[i].commonadv_id  +")'><i class='fa fa-edit'></i></i></button>"			+ "</td>"
			/*	+"<td class='col-sm-1-1 center' style='height: 21.5px;border-bottom:2px silver solid'>"
		        + "<button class='btn btn-xs btn-success ' onclick='deleterefund("
				+ response.lstrefundCommonadv[s].common_adv_refund_id
				+ " ,"+ response.lstCommonadvrecrd[i].commonadv_id  +")' ><i class='fa fa-trash-o'></i></button>"			+ "</td>"*/
				if(response.lstCommonadvrecrd[i].post_flag=='Y'){
					htm=  htm	+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='getcommanadvrecordPost("+ response.lstCommonadvrecrd[i].commonadv_id + ")'  value='Post' style='background-color: orange' disabled='true' class='btn btn-xs btn-info'><i class='fa fa-cloud-upload'></i></button></td>"

				}
				else{
				htm=  htm	+ "<td style='height: 21.5px;' class='col-md-1-1 center'><button onclick='getcommanadvrecordPost("+ response.lstCommonadvrecrd[i].commonadv_id + ")'  value='Post'  class='btn btn-xs btn-info'><i class='fa fa-cloud-upload'></i></button></td>"
				}
				+ "<td style='height: 21.5px;border-bottom:2px silver solid' class='col-md-1-1 center'><button onclick='PrintCommonAdvancerefundprint("+ response.lstrefundCommonadv[s].common_adv_refund_id + " ,"+ response.lstCommonadvrecrd[i].commonadv_id  +")' value='PRINT' class='btn btn-xs btn-primary'><i class='fa fa-print'></i></button></td></tr>";

		    }
			
				}
		if(chkrefund==1){
			htm =htm + htm1+htm2;
		}
	}
		
	
		
		index++;

	}

	$("#cadvtbody").html(htm );

	if(response.lstrefundCommonadv==null || response.lstrefundCommonadv=="null"){
		
	}else{

		if(response.lstrefundCommonadv.length > 0){
			
			$("#ajaxcadvresposnse").html( JSON.stringify(response));
		}
	
	}

}


/************
 *@author	: paras suryawanshi
 *@date		:  25-May-2017
 *@code		:edit comonadvance type master list
 ***********/
function editcadvmaster(cId) {
	
	$('#cadvAmt').val($('#camnt' + cId).html());
	$("#cadvNarr").val($('#narration' + cId).html());
	$('#commonadv_id').val(cId);
	$("#tr_id").val($('#trid' + cId).val());
	$("#pi_id").val($('#pID' + cId).val());
	$('#pname').val($('#pn' + cId).html());
	$('#deduct_amnt').val($('#deamnt' + cId).html());  
	$('#payMode').val($('#payMode' + cId).val());
	$('#department').val($('#department' + cId).val());
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:delete doctor type master list
 ***********/
function deletecadvmaster(cadvId) {

//	alert(dcId);
	var r = confirm("Are You Sure You Want To Delete Common advance?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/commanadv/deletecadvmaster",
			data : {
				"cadvId" : cadvId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
		
			success : function(response) {
		//	alert(r);
			getcommanadvMasterListNew();
			}

		});
	}
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:refresh CommanadvMaster 
 ***********/
function refreshcommanadvMaster(callform){
	
	
	$('#cadvAmt').val("");
	$('#pname').val("");
	$('#pid').val("");
	$("#cadvNarr").val("");
	$('#print_val').val(0);
	if(callform=="onload"){
		$("#tr_id").val(0);
		$("#pi_id").val(0);
	}
	$('#commonadv_id').val(0);
	$('#headerTable').find('.member').hide();  
	$('#headerTable').find('.member2').hide();	
	$('#refunstatus').val("N");  
}


/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:Print CommanadvMaster 
 ***********/

function PrintCommonAdvanceprint(cid) {
	var callform="printcadv";

	
	jQuery.ajax({
		type 	: "POST",
		url 	: "ehat/commanadv/getcommanadvrecordList",
		data	: {
			"pID_cID"    : cid,
			"callform"   :callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			//var advanceobj=	JSON.parse(response);
			
			var advanceobj = JSON.stringify(response);
			window.open("CommonAdvPrint.jsp?" + "myobj="
					+ encodeURIComponent(advanceobj) + "&cadvid="
					+ encodeURIComponent(cid));
		
		
				//alert(response.lstCommonadv.length);
					
		}

	});
}
/*******************************************************************************
 * @author Paras  
 * @date 27_June_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function getPatientRecordscadv(inputId,callfrom) {
	
	var pid=0;
	var findingName="";

	if (callfrom =="byname") {
		findingName  = $("#" + inputId).val();
	  $("#pid").val("");
	}else{
	
		 $("#patientName").val("");
		 pid = $("#" + inputId).val();
		
	}
	
   
     var inputs = [];
     inputs.push('findingName=' + findingName);
     inputs.push('pid=' + pid);
     inputs.push('callfrom=' + callfrom);
      var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/commanadv/getrecordspatient",
	success : function(r) {
		//setTempPatientRecords(r);

		 
		
		 if(callfrom=="bypid"){
				for ( var i = 0; i <=r.listRegTreBillDto.length; i++) {
					
					$('#pname').val(r.listRegTreBillDto[0].patientName);
					$('#depid').val(r.listRegTreBillDto[0].departmentId);
					$("#pi_id").val(r.listRegTreBillDto[0].patientId);				
					$("#tr_id").val(r.listRegTreBillDto[0].treatmentId);
					getcommanadvMasterListNew();
				}
		 }else{
			 autopatient(r,inputId);
			 
		 }
			
		
	}
});}




/************
* @author	: Paras
* @date		: 05-June-2017
* @codeFor	: Autosuggestion Template for patient Records
 ************/
function autopatient(response, id) {
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
			
				 
				//$('#'+id).val(ui.item.patientName);
				$('#pname').val(ui.item.patientName);
				$('#depid').val(ui.item.departmentId);
				$("#pi_id").val(ui.item.patientId);				
				$("#tr_id").val(ui.item.treatmentId);
			}
			getcommanadvMasterListNew();
			/*
			 * This function use for Enter keypress search
			 */
			
		//	getPreviousTreatmentPatient(id,'search');
			//getAllPatientRecordsForAuto(id,'search');
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
 

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:fetch CommonAdvance master list
 ***********/
function getcommanadvMasterListNew(callform) {
	var patient_ID = $('#pi_id').val();


	if(patient_ID==0){
		
	//	return false;
		
	}

	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/commanadv/getcommanadvrecordList",
		data	: {
			"pID_cID" : patient_ID,
			"callform"   :callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
		
			CommonAdvanceTemplate(response);
			var values =$('#print_val').val();
			var refundid =$('#cdrefundid').val();
			var cdid =$('#commonadv_id').val();
			var ln=response.lstCommonadvrecrd.length;
			ln=ln-1;
			if(values=='printcadv'){
			var refunstatus =$('#refunstatus').val();  
		  /*  alert(refundid);
            alert(cdid);*/
				if(refunstatus=="Y"){

					if(response.lstrefundCommonadv.length > 0){
						if(refundid == 0){
							for ( var s = 0; s < response.lstrefundCommonadv.length; s++) {
							    if (cdid == response.lstrefundCommonadv[s].commonadv_id){
							    	PrintCommonAdvancerefundprint( response.lstrefundCommonadv[s].common_adv_refund_id,cdid);
							    }
							    }		
						}else{
                  
							PrintCommonAdvancerefundprint(refundid,cdid);
						}
			          
						}
				
				}else{
					for ( var i = 0; i <=response.lstCommonadvrecrd.length; i++) {
						if(i==ln){
					   PrintCommonAdvanceprint(response.lstCommonadvrecrd[i].commonadv_id);// for save and print.
						}
					}
				}
		
			}
			
			
		}

	});
 
}

/************
* @author	: Tarikh Alam
* @date		: 14-12-2017
* @codeFor	: Get Payment mode list
 ************/
function getAllPayments() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/payment/fetchPayList",

				success : function(r) {
					setTempPaymode(r);//call template
				}
			});
}

function setTempPaymode(r) {
	var list = "";    
    for ( var i = 0; i < r.listPay.length; i++) {  

        list = list + "<option value='"+r.listPay[i].payId+"' class='un'>" + (r.listPay[i].payName) + "</option>";    
    }  
    //list = list + "<option value='-1' class='un'>Multiple</option>";  
    $("#payMode").html(list);
}
//hide or show bank name field for billing 
//@uthor - Sagar 
function BankOnSelect(){
	
	var payable=$("#payable").val();	
	$("#multiPayable").val(payable);	
	var paymode=$("#payMode").val();		
	
	if(paymode==2|| paymode==3){
		getBankMasterList();
		$('#headerTable').find('.member').show();
		$('#headerTable').find('.member2').show();
	
	}else if(paymode==-1){
		
		$("#modal-11").addClass("md-show");
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();	
		$("#payNow").prop("readonly",true);	
		getBankMasterList();
		resetMultiPopup();		
		
	}else if(paymode==4){
	
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();
	//	var payable=$("#payable").val();
	//	var commnAdvc= $("#finalAdvance").html(); //$("#commnAdvc").text();		
		//var payNow=$("#payNow").val();
		
		if(Number(commnAdvc)>Number(payable)){
			
			commnAdvc=Number(commnAdvc)-Number(payable);		
			payNow=Number(payable)+Number(payNow);
			$("#finalAdvance").html(parseFloat(commnAdvc).toFixed(2));
			//$("#commnAdvc").text(commnAdvc);	
			$("#payNow").val(parseFloat(payNow).toFixed(2));	
		}else{
			
			//$("#commnAdvc").text(0);
			$("#finalAdvance").html(0.00);
			payNow=Number(payNow)+Number(commnAdvc);
			$("#payNow").val(parseFloat(payNow).toFixed(2));
		}	
		
	}else{
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();		
	}
}

//@uthor - Sagar 
function getBankMasterList() {
	$('.member').hide();
	$('.member2').hide();
	
    jQuery.ajax({
                async : true,
                type : "POST",
                url : "ehat/bill/getBankMasterList",

                success : function(r) {
                	console.log(r);
                	setTempForBanktList(r);//call template
                }
            });
}

function resetMultiPopup(){
	
	var rows= $('#multiPayTable tbody tr.multiPayClass').length;
	
	for(var i=1;i<=rows;i++){
		
		$('#multiTr' + i).remove();
	}
	$("#multiPayNow").val(0);
	$("#multiRemain").val(0);
	setMultipaymodeView(1);		
}

function setMultipaymodeView(id){
		
	var tbody="";
	tbody=tbody	
	+ "<tr class='multiPayClass' id='multiTr"+id+"'>"
	+ "<td><input type='checkbox' id='checkbox"+id+"' name='checkbox' checked='checked'></td>" 
	+ "<td>"
	+ "	<select id='payMode"+id+"' onchange='showHideBank("+id+")' class='form-control input-SmallText' style='width: 100px;'>" 
	+ "<option value='1'>Cash</option>"
	+ "<option value='2'>Card</option>"
	+ "<option value='3'>Cheque</option>"
	+ "</select>"
	+ "</td>"
	+ "<td><input type='text' style='width: 80px;' id='txtAmount"+id+"' class='form-control input-SmallText' onkeyup='calMultiPayNow(this.id)'>"
	+ "</td>"
	+ "<td>"
	+ "	<select id='bankID"+id+"' class='form-control input-SmallText bankList' style='width: 100px;' disabled></select>"
	+ "</td>"
	+ "<td><input type='text' style='width: 100px;' id='txtbankNo"+id+"' class='form-control input-SmallText' readonly>"
	+ "</td>"
	+ "<td><input type='text' style='width: 100px;'	id='txtaccNo"+id+"' class='form-control input-SmallText' readonly>"
	+ "</td>"
	+ "</tr>";	
	
	$("#multiPayTbody").append(tbody);
	$("#bankID"+id).html($("#bankID1").html());
}
function setTempForBanktList(r) {   
	
	var list = "<option value='0'>-- Select --</option>";    
    for ( var i = 0; i < r.ltBankMaster.length; i++) {    

		list = list + "<option value='"+r.ltBankMaster[i].bankId+"'>" + (r.ltBankMaster[i].bankName) + "</option>";    
		}   
	$("#bankID").html(list); 
	$("#bankIdCredit").html(list);  
	$("#bankIdCheque").html(list);  
	$("#bankIdRtgs").html(list);
	$(".bankList").html(list);
	 
	$("#bankID1").html(list);   	
}
function toCreateTr(){
	
	var rows= $('#multiPayTable tbody tr.multiPayClass').length;
	//getBankMasterList();
	setMultipaymodeView(rows+1);	
}
function toRemoveTr(){
	
	var rows= $('#multiPayTable tbody tr.multiPayClass').length;
	$('#multiTr' + rows).remove();
	calMultiPayNow();
}
function calMultiPayNow(id){
	
	/*var rows= $('#multiPayTable tbody tr.multiPayClass').length;
	
	var total=0;
	for(var i=1;i<=rows;i++){
		
		var cashAmt=$("#txtAmount"+i).val();
		total=Number(total)+Number(cashAmt);	
	}
	
	var payable=$("#payable").val();
	var remain=0;
	if(payable>=total){
		
		remain=Number(payable)-Number(total);
	}else{
		
		alert("Amount should be less than payable");
		$("#"+id).val(0);	
		total=0;
		for(var i=1;i<=rows;i++){
			
			var cashAmt=$("#txtAmount"+i).val();
			total=Number(total)+Number(cashAmt);	
		}
	}
	
	
	$("#multiRemain").val(remain);	
	$("#multiPayNow").val(total);*/	
}
/************
* @author	: Vinod Udawant
* @date		: 18-Sept-2017
* @codeFor	: Close multipay popup
 ************/
function closePopup(){
	
	$("#modal-11").removeClass("md-show");
	//$("#idForClose").trigger("click");
}

function showHideBank(id){
	
	var payMode=$("#payMode"+id).val();
	if(payMode==2 || payMode==3){
		
		$("#bankID"+id).prop("disabled",false);
		$("#txtbankNo"+id).prop("readonly",false);
		$("#txtaccNo"+id).prop("readonly",false);		
	}else{
		
		$("#bankID"+id).prop("disabled",true);
		$("#txtbankNo"+id).prop("readonly",true);
		$("#txtaccNo"+id).prop("readonly",true);
		$("#bankID"+id).val(0);
	}
}

function refundcadv(cId){
   var deductamount	= parseFloat ($("#deamnt" + cId).html());

   /*if( deductamount == 0){*/
	    $("#tdrefund").show();
		$("#threfund").show();
		$("#cadvAmt").prop("readonly",true);
		$('#cadvAmt').val($('#blamnt' + cId).html());
		$('#refudAmt').val($('#blamnt' + cId).html());
		$("#cadvNarr").val($('#narration' + cId).html());
		$('#commonadv_id').val(cId);
		$('#refudAmtFINAL').val($('#remnt' + cId).html());
		$("#tr_id").val($('#trid' + cId).val());
		$("#pi_id").val($('#pID' + cId).val());
		$('#pname').val($('#pn' + cId).html());  
		
		$("#deduct_amnt1").val(deductamount);  
		$('#cadv_totalamt').val($('#camnt' + cId).html());
		$('#cdrefundid').val(0);
		$('#refunstatus').val("Y");  
/*   }else{
	   alert("Amount Sholud not be refund!!! ");
	   return false;
   }
*/
	

}


function hideShowrefundOp(id,imgid){
	if($("#imghide" + imgid ).val()==0){
		$("#imgupdown" + imgid).attr('src', "images/up.png");
		$("#imghide" + imgid ).val(1);
		$("#trrefundheader"+id). removeAttr("style");
		$(".trrefund"+id).each(function() {
			$(".trrefund"+id).removeAttr("style");
			
		});
		
		//$("#trrefundheader"+id).css("display","block");
		//$("#trrefund"+id).css("display","block");
		
	}else{
		$("#imgupdown" + imgid).attr('src', "images/down.png");
		$("#imghide" + imgid ).val(0);
		$("#trrefundheader" + id).attr('style', "display:none");
		$(".trrefund"+id).each(function() {
			$(".trrefund"+id).attr('style', "display:none");
			
		});
		
		//$("#trrefundheader"+id).css("display","none");
	//	$("#trrefund"+id).css("display","none");
	}
	
}

function editrefundslave(refundID,cId){
	   var deductamount	= parseFloat ($("#deamnt" + cId).html());

	   /*if( deductamount == 0){*/
		    $("#tdrefund").show();
			$("#threfund").show();
			$("#cadvAmt").prop("readonly",true);
			$('#cadvAmt').val($('#blamnt' + cId).html());
			$('#refudAmt').val($('#cdrefundamt' + refundID).html());
			$("#cadvNarr").val($('#narration' + cId).html());
			$('#commonadv_id').val(cId);
			$('#refudAmtFINAL').val($('#remnt' + cId).html());
			$("#tr_id").val($('#trid' + cId).val());
			$("#pi_id").val($('#pID' + cId).val());
			$('#pname').val($('#pn' + cId).html());  
			
			$("#deduct_amnt1").val(deductamount);  
			$('#cadv_totalamt').val($('#camnt' + cId).html());
			$('#cdrefundid').val(refundID);
			$('#actualrefund').val($('#cdrefundamt' + refundID).html());
			$('#refunstatus').val("Y");  
	/*   }else{
		   alert("Amount Sholud not be refund!!! ");
		   return false;
	   }
	*/
		

}

function deleterefund(refundid, cdv) {
	var blamnt = $('#blamnt' + cdv).html();
	var cdammunt = $('#cdrefundamt' + refundid).html();
	var totalrefund = $('#remnt' + cdv).html();
	//	alert(dcId);
	var r = confirm("Are You Sure You Want To Delete Common advance?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/commanadv/deletecadvrefund",
			data : {
				"cadvId"      : cdv,
				"cdammunt"    : cdammunt,
				"refundid"    : refundid,
				"blamnt"      : blamnt,
				"totalrefund" : totalrefund
			},
			timeout : 1000 * 60 * 5,
			cache : false,

			success : function(response) {
				//	alert(r);
				getcommanadvMasterListNew();
			}

		});
	}

}

function PrintCommonAdvancerefundprint(id,cid){
	

	var callform="printcadv";

	
	jQuery.ajax({
		type 	: "POST",
		url 	: "ehat/commanadv/getcommanadvrefundlist",
		data	: {
			"refundID"    : id,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
/*			var advanceobj=	JSON.parse(response);
*/			
			var advanceobj = JSON.stringify(response );
			window.open("CommonAdvRefundPrint.jsp?" + "myobj="
					+ encodeURIComponent(advanceobj) + "&cadvid="
					+ encodeURIComponent(cid) +"&refundID=" + id);
		
		
			/*	alert(response.lstCommonadv.length);*/
					
		}

	});

}

function getcommanadvrecordPost(cid) {
	var callform="postCadv";

	
	jQuery.ajax({
		async   : false, 
		type 	: "POST",
		url 	: "ehat/commanadv/getcommanadvrecordPost",
		data	: {
			"pID_cID"    : cid,
			"callform"   :callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			
			var advanceobj = JSON.stringify(response);
			alert("Post Successfully");
			location.reload(true)
				
							
		}

	});
}
