/******
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For setting template of diet
 * *****/
function setDietTemplate(){
	
	var htm='';
	htm =htm
	+'<div style="margin-top: 0px; margin-bottom: 0px; " class="col-md-6-1">'
	+'<div style="margin-top: 9px;" class="col-md-4-1">'
	+'<b>From:</b>'
	+'</div>'
	+'<div style="margin-top: 9px;" class="col-md-6-1">'
	+'	<input id="inputFromDateshh"'
	+'	class="form-control input-SmallText" type="text" value=""'
	+'	placeholder="From Date" name="date" readonly="readonly"'
	+'	onchange="checkWithCurrentDate("payAll")"'
	+'	onclick="displayCalendar(document.getElementById(this.id),\'yyyy-mm-dd\',this)">'
	+'</div>'
	+'</div> '
   +'<div style="margin-top: 0px; margin-bottom: 0px; " class="col-md-6-1">'
	+'<div style="margin-top: 9px;" class="col-md-4-1">'
	+'<b>To:</b>'
	+'</div>'
	+'<div style="margin-top: 9px;" class="col-md-6-1">'
	+'	<input id="inputToDateshh"'
	+'	class="form-control input-SmallText" type="text" value=""'
	+'	placeholder="To Date" name="date" readonly="readonly"'
	+'	onchange="checkWithCurrentDate(payAll)"'
	+'	onclick="displayCalendar(document.getElementById(this.id),\'yyyy-mm-dd\',this)">'
	+'</div>'
	+'</div> '
	+'<div style="margin-top: 20px; background: #FFE0C2;'
	+' border-bottom: 1px solid orange; border-top: 1px solid orange; '
	+'padding-left: 3px;" class="col-md-12-1">'
	+'<label id="" ' 
	+' class="btn " style="padding-top: 0px; margin-right: 10px; margin-bottom: 0px; " ' 
	+' onclick="savediets();">'
	+'<i class="far fa-save"></i>Save</label>'
	+'<label value="Edit" id="" class="btn" '
	+'style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left:2%;" '
	+'onclick="editdiet();"> '
	+'<i class="fa fa-edit"></i> Edit</label>'
	+'<label value="Delete" '
	+' id="" class="btn" '
	+'style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left:1%;" '
	+'onclick="deletediet();">'
	+' <i class="fa fa-trash-o"></i>Delete</label>'
	+'<label style="margin-left:27px;padding-top:0px" onclick="Printdiet();" class="btn">'
	+'<i class="fa fa-print"></i>Print</label>'
	+'</div>'
	+'<div'
	+'style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;"'
	+'class="col-md-12-1">'
	+'<div class="tab-content">'
	+'	<div class="tab-pane fade in active">'
	+'	<table border="1"'
	+'	class="table  table-bordered table-striped header-fixed cf">'
	+'	<thead style="background-color: lightgray;">'
	+'		<tr>'
	+'		<th>#</th>'
	+'		<th>Temp Name</th>'
	+'		<th>From</th>'
	+'			<th>To</th>'
	+'			<th>Select</th>'
	+'</tr>'
	+'	</thead>'
	+'<tbody id="dietDetailss">'
	+'	</tbody>'
	+'		</table>'
	+'	</div>'
	+'<input type="hidden" value="0" id="dietprimarykey">'
	+'</div>'
	+'</div>';
	$('#dynamicset').html(htm);
	
	getdietlist();
	getcustomizelist();
}


/******
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For setting template of diet
 * *****/
function setCustomizeTemplatesIDdiet(customizeTemplatesID) {
	$('#customizeTemplatesIDdiet').val(customizeTemplatesID);
	
}
/******
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For getting template of diet
 * *****/
function getcustomizelist(){
	
 	var inputs = [];
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getcustomizelist",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
		    setcustomizelist(r);
			
		}
	});
}
/******
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For setting list of diet
 * *****/
function setcustomizelist(r) {
	ajaxResponse = r;
	
	var list = "";    //<option value='0'>--Select Temp--</option>
    for ( var i = 0; i < r.lts.length; i++) {    
    	

        list = list + "<option value='"+r.lts[i].idCustomizeTemplate+"'>" + (r.lts[i].temp_name) + "</option>";    
    }  
    $("#customizeTemplatesdiet").html(list);
    

	 if (r.lts.length > 0) {
		$('#hiddendiet').html(list);
		$('#customizeTemplatesIDdiet').val(r.lts[0].idCustomizeTemplate);
		getdiet(r.lts[0].idCustomizeTemplate);
	}
}

/******
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For getting template of diet by id
 * *****/
function getdiet(templateId) {
	var inputs = [];
	inputs.push('templateId=' +  encodeURIComponent(templateId));
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getcustomizelistByid",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			setdiet(r);
			
		}
	});
//	
	
	
	
}
function setdiet(r){
	
    for ( var i = 0; i < r.lts.length; i++) {    
    	CKEDITOR.instances['editorSubObjTreatments'].setData(r.lts[i].temp_data);
    	//CKEDITOR.instances['editorSubObjTreatments'].setData(myObj.objectiveTempData);

        
    }
}
/*****
 * @author     :BILAL
 * @Date       :20-03-2018
 * @Code       :For saving diet data 
 * ****/
function savediets(){
	
	var deptid = $("#depdocdeskid").val();
	var dierdata = CKEDITOR.instances['editorSubObjTreatments']
	.getData();
	
	//var dierdatas =$(dierdata).text();
	var billId = $("#bill_Id").val();	
	var treatmentId = $("#tr_Id").val();
	var patientId= $("#pt_Id").val();
	var dietId=$('#dietprimarykey').val();
	
	var selDocSpecDiet =$('#selDocSpecDiet').val();
	var customizeTemplatesdiet =$('#customizeTemplatesdiet').val();
//	alert("customizeTemplatesdiet :"+customizeTemplatesdiet);
	//var tempName =$('#customizeTemplatesdiet').text();
	
	var tempName = $("#customizeTemplatesdiet option:selected").text();
	
	var from = $("#inputFromDateshh").val();
	var to = $("#inputToDateshh").val();
	
	if (from == "" || from == null || from == undefined) {
		alert("Please select from date...");
		return false;
	}
	
	if (to == "" || to == null || to == undefined) {
		alert("Please select To date...");
		return false;
	}
	
	if (selDocSpecDiet == "" || selDocSpecDiet == null || selDocSpecDiet == undefined) {
		selDocSpecDiet = 0;
	}
	
	if (customizeTemplatesdiet == "" || customizeTemplatesdiet == null || customizeTemplatesdiet == undefined) {
		customizeTemplatesdiet = 0;
	}
	
	if (billId == "" || billId == null || billId == undefined) {
		billId = 0;
	}

	if (dietId == "" || dietId == null || dietId == undefined || isNaN(dietId)) {
		dietId = 0;
	}
	
	if (treatmentId == "" || treatmentId == null || treatmentId == undefined ) {
		treatmentId = 0;
	}
	
	if (patientId == "" || patientId == null || patientId == undefined ) {
		patientId = 0;
	}
	var dietlist = {
			lstDietMaster : []
	};
	dietlist.lstDietMaster.push({
		deptid        : deptid,
		dierdata      : dierdata,
		billId     : billId,
		treatmentId   : treatmentId,
		patientId    : patientId,
		dietId       : dietId,
		selDocid    :selDocSpecDiet,
		customizeTempid : customizeTemplatesdiet,
		tempName : tempName,
		fromDate : from,
		toDate : to
	});
	
	
	dietlist     = JSON.stringify(dietlist);
	
	var inputs = [];

	inputs.push('dietlist=' +  encodeURIComponent(dietlist));
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/savediet",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			getdietlist();
			setDietTemplate();
		}
	});
}

/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For getting list of diet based on patient 
 * **********/
function getdietlist(){
	
	
	//var billId = $("#bill_Id").val();	
	var treatmentId = parseInt($("#tr_Id").val());
	var patientId= parseInt($("#pt_Id").val());
	var deptId = parseInt($("#depdocdeskid").val());
	
 	var inputs = [];
	

	//inputs.push('billId=' + billId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId='+patientId);
	inputs.push('deptId='+deptId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getdietlist",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
		    setdietlist(r);
			
		}
	});
}

/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For etting list of diet based on patient 
 * **********/
function setdietlist(res){

	var result='';
	
	for ( var i = 0; i < res.lstDietMaster.length; i++) {
		
		//var deptid        = res.lstDietMaster[i].count;
		//var dierdata       = res.lstDietMaster[i].dierdata;
		//var billId     = res.lstDietMaster[i].billId;
		//var treatmentId   = res.lstDietMaster[i].treatmentId;
		//var patientId    = res.lstDietMaster[i].patientId;
		var dietId       = res.lstDietMaster[i].dietId;
		//var selDocid    = res.lstDietMaster[i].selDocid;
		//var customizeTempid = res.lstDietMaster[i].customizeTempid;
		var tempName = res.lstDietMaster[i].tempName;
		var fromDate = res.lstDietMaster[i].fromDate;
		var toDate = res.lstDietMaster[i].toDate;

		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ tempName
				+ '</td> '
				
				+ '	<td>'
				+ fromDate
				+ '</td> '

				 +'	<td>'
				+ toDate
				+ '</td> '
				+'<td><input value="'+dietId+'"  id="dietid'+dietId+'" name="dietforeditdelete" type="checkbox"></td>'

				+'<input type="hidden" value="'+dietId+'" id="dietId'+dietId+'">'
			/*	+'<input type="hidden" value="'+dierdata+'" id="dierdata'+dietId+'">'*/
				
				+'<input type="hidden" value="'+fromDate+'" id="fromDate'+dietId+'">'
				+'<input type="hidden" value="'+toDate+'" id="toDate'+dietId+'">'
				
				
				+ '</tr> '
				
				;
		
	}
	
	$("#dietDetailss").html(result);

}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For edit
 * **********/
function editdiet(){
	var dietId=$('input[name=dietforeditdelete]:checked').val();
	
	$('#dietprimarykey').val(dietId);
	$('#inputFromDateshh').val($('#fromDate'+dietId).val());
	$('#inputToDateshh').val($('#toDate'+dietId).val());
	
	//CKEDITOR.instances['editorSubObjTreatments'].setData($('#dierdata'+dietId).val());
	
	
    var inputs = [];
	inputs.push('dietId=' + dietId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getdietlistbyid",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			
			CKEDITOR.instances['editorSubObjTreatments'].setData(r.lstDietMaster[0].dierdata);
			
		}
	});
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For delete
 * **********/
function deletediet(){
	var dietId=$('input[name=dietforeditdelete]:checked').val();
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/deletedietbyId",
		data : {
			"dietId"      : parseInt(dietId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			alert(r);
			getdietlist();
			setDietTemplate();
		}
	});
}


function Printdiet() {
	var patientId = $.trim($('#patientId').html());
	var treatmentId = $.trim($('#treatmentId').html());
	var depdocdeskid = $.trim($('#depdocdeskid').val());
	var DietID = "";
	
    var dietIds = [];
    $.each($("input[name=dietforeditdelete]:checked"), function(){            
    	dietIds.push($(this).val());
    });
   
    if(dietIds.length == 0)
    {
    	alert("Please select print.");
    	return false;
    }
    if(dietIds.length > 1)
    {
    	alert("Please select only one print.");
    	return false;
    }
    else
    {
    	DietID = dietIds[0];
    }

		setTimeout(function() {
			window.open(("PrintDiet.jsp?" +"&patientId="+patientId+"&treatmentId="+treatmentId+"&callfrom="+"printHF"+"&depdocdeskid="+depdocdeskid)+"&DietID="+DietID);
		}, 300);
}