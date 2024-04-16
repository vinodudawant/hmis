function getTime(id) {
			//alert(id+"time");
			$("#"+id).datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 1
			});
		}

function showhidetextbox(type){
	if(type=='general'){
		if($("#userTypeId").val()=='admin'){
			$("#gen_userByName").show();
		}	
		
	}
	else{
		//if($("#userType").val()=='admin'){
			$("#userByName").show();
		//}
	}
	
}



function getExpenseList(type){
	var inputs = [];
	var fromdate = $("#fromdate").val();
	var fromtime = $("#fromtime").val();
	var todate = $("#todate").val();
	var totime = $("#totime").val();
	var referto = $("#refto").val();
    var voucherlist=$("#voucherlist").val();
    var ledlist=$("#ledlist").val();
    var userid=$("#userid").val();
    
    if(type!='onload'){
    	if(fromdate=="" || fromdate==undefined || fromdate==null){
        	alertify.error("please enter from date");
        	return false;
        }
    	else if(new Date(todate) < new Date(fromdate)){
    		alertify.error("todate can't be greater than from date");
    		return false;
    	}
        else if(fromtime=="" || fromtime==undefined || fromtime==null){
        	alertify.error("please enter from time");
        	return false;
        }
        if(todate=="" || todate==undefined || todate==null){
        	alertify.error("please enter to date");
        	return false;
        }
        else if(totime=="" || totime==undefined || totime==null){
        	alertify.error("please enter to time");
        	return false;
        }
    }
    
	
		inputs.push('fromdate=' + fromdate);
		inputs.push('fromtime=' + fromtime);
		inputs.push('todate=' + todate);
		inputs.push('totime=' + totime);
		inputs.push('voucherId=' + voucherlist);
		inputs.push('ledgerid=' + ledlist);
		inputs.push('referto=' + referto);
		inputs.push('userid=' + userid);
		
		console.log(voucherlist+" "+ledlist+" "+referto);
	
	inputs.push('callfrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/expensreport/expenselist",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToExpenseTable(r);
			$("#userid").val(0);
		}
	});
}

function clearothers(){
	   $("#refto").val(0);
	   $("#voucherlist").val(0);
	   $("#ledlist").val(0);
	   $("#userid").val(0);
	   $("#userautoid").val("");
}

function setDataToExpenseTable(r){
	alert(JSON.stringify(r));
	var htm = "";
	var index = 1;
	var totalAmt=0;
	var totalPaidAmt=0;
	if(r.length > 0){
		for ( var i = 0; i < r.length; i++) {
			totalAmt=totalAmt+r[i].amount;
			totalPaidAmt=totalPaidAmt+r[i].paidAmount;
			htm = htm
					+ '<tr> '
					+ ' <td  class="text-center">'
					+ (i+1)
					+ '</td>'

					+ ' <td class="text-center">'
					+ r[i].voucherDate
					+ '</td>'
	               
					+ ' <td class="text-center">'
					+ r[i].companyName
					+ '</td>'
								
					+ ' <td class="text-center">'
					+ r[i].grpname
					+ '</td>'
					
					+ ' <td class="text-center">'
					+ r[i].ledgerHeadname
					+ '</td>'
					
					+ ' <td class="text-center">'
					+ getDepartment(r[i].refTo)
					+ '</td>'
					
					+ ' <td class="text-center">'
					+ r[i].paymentTo
					+ '</td>'
				
					+ ' <td class="text-center">'
					+ r[i].amount
					+ '</td>'
					
					+ ' <td class="text-center">'
					+ r[i].paidAmount
					+ '</td>'
					
					+ ' <td class="text-center">'
					+ r[i].paymentMode
					+ '</td>'
					
					+ ' <td class="text-center">'
					+ r[i].userName
					+ '</td>'
					
					+ '</tr>';
		}
		htm = htm + '<tr> '
		+ ' <td  class="text-center"></td>'
		+ ' <td class="text-center"></td>'
		+ ' <td class="text-center"></td>'
		+ ' <td class="text-center"></td>'
		+ ' <td class="text-center"></td>'
		+ ' <td class="text-center"></td>'
		+ ' <td class="text-center">Total</td>'
		+ ' <td class="text-center">'+totalAmt+'</td>'
		+ ' <td class="text-center">'+totalPaidAmt+'</td>'
		+ ' <td class="text-center"></td>'
		+ ' <td class="text-center"></td>'
		+ '</tr>';

	}else{
		htm = htm
		+ "<tr><td colspan='11' class='center text-danger'>Sorry No Records To Display</td></tr>";
	}
	$("#expenselist").html(htm);
}

function clearform(){
	$("#fromdate").val("");
	$("#fromtime").val("");
	$("#todate").val("");
	$("#totime").val("");
      $("#refto").val(0);
   $("#voucherlist").val(0);
   $("#ledlist").val(0);
}



function getDepartment(value){
	if(value==1){
		return "OPD";
	}
	else if(value==2){
		return "IPD";
		}
	else if(value==3){
		return "Diagonostic";
	}
	else{
		return "All";
	}
}



function getVoucherList(type){
	
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/expensreport/voucherlist",
		data: "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(JSON.stringify(r));
			var vlistTemp="";
			vlistTemp = vlistTemp
			+ "<option value='0'>--Select Voucher Group--</option>";
	for ( var i = 0; i < r.length; i++) {
		vlistTemp = vlistTemp + "<option value=" + r[i].voucher_id
				+ " data-name='"+ r[i].voucher_name+"'>"
				+ r[i].voucher_name + "</option>";
	}
	$("#voucherlist").html(vlistTemp);
	if(type=='general_voucher'){
		$("#gen_voucherlist").html(vlistTemp);	
	}
	
		}
	});
}


function getLedgerList(type){
	var inputs = [];
	var id = $("#voucherlist").val();
	
	if(type=='general_voucher'){
		id = $("#gen_voucherlist").val();
	}	
	inputs.push('voucherid='+id);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type: "POST",
		url : "ehat/expensreport/ledgerlistt",
		data: str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ledlistTemp="";
			
	if(type=='general_voucher'){
		ledlistTemp = ledlistTemp
		+ "<option value='0'>--Select Ledger --</option>";
for ( var i = 0; i < r.length; i++) {
	ledlistTemp = ledlistTemp + "<option value='" + r[i].ledger_head_name
			+ "' data-name='"+ r[i].ledger_head_name+"'>"
			+ r[i].ledger_head_name + "</option>";
}
		$("#gen_ledlist").html(ledlistTemp);
	}
	
	else{
		ledlistTemp = ledlistTemp
		+ "<option value='0'>--Select Ledger --</option>";
for ( var i = 0; i < r.length; i++) {
	ledlistTemp = ledlistTemp + "<option value=" + r[i].ledger_head_ID
			+ " data-name='"+ r[i].ledger_head_name+"'>"
			+ r[i].ledger_head_name + "</option>";
}
$("#ledlist").html(ledlistTemp);
	}
	
	
		}
	});
	
}

function expoertexcel(type) {
	
	if(type=='general_voucher'){
		clearGenform();
		
		var div = "general_voucher_table";
		window.open('data:application/vnd.ms-excel,'
				+ encodeURIComponent($('div[id$=' + div + ']').html()));
	}
	else{
		clearform();
		var div = "expense_voucher_table";
		window.open('data:application/vnd.ms-'+ encodeURIComponent($('div[id$=' + div + ']').html())+';filename=exportData.xlsx;' + base64data);
		/*window.open('data:application/vnd.ms-excel,'
				+ encodeURIComponent($('div[id$=' + div + ']').html()));*/	
	}
	
}

function userAutoSuggestion(userid,type){
	
	var resultData = [];
	var username = $("input#" + userid).val();
	if (username == "" || username == null || username == "null"
			|| username == undefined) {

		alertify.error("Please enter search value");
		$("input#" + userid).focus();
		return false;
	}
	var inputs = [];

	inputs.push('searchtext=' + username);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/expensreport/userautoSuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var i = 0; i < response.length; i++) {
				var arrValue = response[i].user_Name;
				var idValue = response[i].user_ID;
				var username = response[i].user_Name;
				resultData.push({
					ID : idValue,
					Name : username
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				if( type=='general'){
					$("div#gen_userByName .typeahead").html(template);
					$("div#gen_userByName .typeahead").show();
				}
				else{
					$("div#userByName .typeahead").html(template);
					$("div#userByName .typeahead").show();	
				}
				

				$("input#" + userid).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + userid).data('typeahead').source = resultData;
			}, 500);
		}
	});
	
	function displayResult(item) {
    if(type=='general'){
	$("#gen_userid").val(item.value);
         }
    else{
    	$("#userid").val(item.value);
    }
		
		
	}

}