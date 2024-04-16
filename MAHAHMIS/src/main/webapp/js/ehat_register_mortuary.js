
/*
 * @author : Abhishek Kumbhar
 * @Date   : 27-Sept-19
 * @Codefor: save Mortuary register Details.
*/
function savemortuarydetails()
{
	var mor_id=$("#mor_id").val();
	if(mor_id == null || mor_id == "" || mor_id == undefined || mor_id =="null")
	{
		mor_id=0;
		
	}
	
	var deceased_name = $("#deceased_name").val();
	if(deceased_name==""||deceased_name==null||deceased_name==undefined){
		alert("Please enter the deceased name");
		return false;
	}
	var status="";
	if($("#live1").prop("checked")==true)
	{
		status ="I";	
	}
	else
	{
		$('#patient_id').val("");
		status ="E";	
	}
	
	var patient_id=$("#patient_id").val();
	if(patient_id == null || patient_id == "" || patient_id == undefined || patient_id =="null")
	{
		patient_id = 0;
	}
	if(($("#live1").prop("checked")==true) && (status =="I") && (patient_id == null || patient_id == "" || patient_id == undefined || patient_id =="null") )
	{
		alert("Please search by patient ID.")
		return false;
	}
	
	var relative_name = $("#relative_name").val();
	var date_in =       $("#date_in").val();
	var time_in = $("#time_in").val();
	var gender1 = $("#gender1").val();
	var age1 = $("#age1").val();
	
	var address1 = $("#address1").val();
	if(address1==""||address1==null||address1==undefined){
		alert("Please enter the address");
		return false;
	}
	var admsn_no = $("#admsn_no").val();
	var date_of_death = $("#date_of_death").val();
	var death_ward = $("#death_ward").val();
	var death_time = $("#death_time").val();
	var mlc_pd = $("#mlc_pd").val();
    var property= $("#property").val();
    var clothing =$("#clothing").val();
    var additional_nt =$("#additional_nt").val();
    var userId=$('#userId').val();
	var unitId=$('#unitId').val();
	var relation=$('#relation').val();

	if(deceased_name == ""){
		alert("Please Enter Deceased Name!!!");
		return false;
	}
	if(relation == ""){//relation == 0)
		alert("Please Select Relation!!!");
		return false;
	}
	if(relative_name == "")
	{
		alert("Please Enter Relative Name!!!");
		return false;
	}
	if(time_in == "")
	{
		alert("Please Enter Time_in!!!");
		return false;
	}
	if(gender1 == "")
	{
		alert("Please Select Gender.");
		return false;
	}
	if(age1 < 0 || age1 == "")
	{
		alert("Please Enter Age");
		return false;
	}
	if(address1 == "")
	{
		alert("Please Enter Address!!!");
		return false;
	}
//	var filter = /^[0-9-+]+$/;
	if (admsn_no == null || admsn_no == "") {
		alert("Please Enter Admission Number.!!!")
		return false;
	} /*else if (!filter.test(admsn_no)) {
		alert("Please Enter Admission Number.!!!");
		return false;
	}*/
	
	if(death_ward == ""){
		alert("Please Enter Ward Name.!!!");
		return false;
	}
	
	if(mlc_pd == ""){
		alert("Please Enter MLC Details.!!!");
		return false;
	}
	
	if(death_time == "")
	{
	alert("Please Select death_time.");
	return false;
	}
	
	if(property=="")
	{
		alert("Please Enter Property.");
		return false;
	}
	if(clothing=="")
	{
		alert("Please Enter clothing.");
		return false;
	}
	if(additional_nt=="")
	{
		alert("Please Enter Additional Notes.");
		return false;
	}
	
	//edited by Annapurna
	var todaysDate;
	var date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	
	//let todaysDate = `${day}/${month}/${year}`; */
	
	/*var date1;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	//var hours = formattedDate.getHours();
	//var minute = formattedDate.getMinutes();
	//var seconds = formattedDate.getSeconds();*/
	 
	todaysDate=('0' + day).slice(-2) + "/" + ('0' + month).slice(-2) + "/"+year
	

	if((Date.parse(date_of_death) > Date.parse(todaysDate))) 
	{
		alert(" Do not select date after current date");
		return false;
		
		}
	var inputs = [];
	inputs.push('patient_id=' + patient_id);
	inputs.push('deceased_name=' + deceased_name);
	inputs.push('relative_name=' + relative_name);
	inputs.push('date_in=' + date_in);
	inputs.push('time_in=' + time_in);
	inputs.push('gender1=' + gender1);
	inputs.push('age1=' + age1);
	inputs.push('address1=' + address1);
	inputs.push('admsn_no=' + admsn_no);
	inputs.push('date_of_death=' + date_of_death);
	inputs.push('death_ward=' + death_ward);
	inputs.push('death_time=' + death_time);
	inputs.push('mlc_pd=' + mlc_pd);
	inputs.push('property=' + property);
	inputs.push('clothing=' + clothing);
	inputs.push('additional_nt=' + additional_nt);
	inputs.push('status=' +status);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' +unitId);
	inputs.push('mor_id=' +mor_id);
	inputs.push('relation=' +relation);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/mortuaryReg/savemortuaryReg",
		data : str + "&reqType=AJAX",
		cache :false,
	
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			if(r < 0)
				{
				alert("Patient is already registered.");
				location.reload(true);
				}
			else if(r == 3)
				{
				alert("Invalid patient id.")
				}
			else if(r == 1)
				{
				alert("Record saved sucessfully.");
				window.location.href ="morturay_beds_allocated.jsp?";
				}
		    else if (r == 0) 
		    	{
		    	alert("Record updated sucessfully.");
		    	location.reload(true);
		    	}
		    else 
		    	{
		    	alert("Oops some problem occured.");
		    	location.reload(true);
		    	}
		}
	});
}

function showPatientId()
{	
	if($("#live1").prop("checked")==true)
		{
		$("#patientdiv").show();
	
			$("#patient_id").val("");
				$("#mor_id").val("");
				$("#deceased_name").val("");
				$("#gender1").val("");
				$("#death_ward").val("");
				$("#death_time").val("");
				$("#age1").val("");
				$("#date_of_death").val("");
				$("#relative_name").val("");
				$("#address1").val("");
				$("#admsn_no").val("");
				$("#time_in").val("");

			    $("#mlc_pd").val("");
			    $("#property").val("");
				$("#clothing").val("");
				$("#additional_nt").val("");
				
				$("#relation").val("");//changedval("0");
		}
	else
		{
		$("#patientdiv").hide();
		
				$("#patient_id").val("");
				$("#mor_id").val("");
				$("#deceased_name").val("");
				$("#gender1").val("");
				$("#death_ward").val("");
				$("#death_time").val("");
				$("#age1").val("");
			    $("#date_of_death").val("");
			    $("#relative_name").val("");
			    $("#address1").val("");
			    $("#admsn_no").val("");
			    $("#time_in").val("");
	
			    $("#mlc_pd").val("");
			    $("#property").val("");
				$("#clothing").val("");
				$("#additional_nt").val("");
				
				$("#relation").val("");//val("0")
				
		
		}

}

/*
 * @author : Abhishek Kumbhar
 * @Date   : 27-Sept-19
 * @Codefor: fetch internal patient Details.
*/

function getInternalPatientdata()
{
	
       var patientid = $("#patient_id").val();
       
       
   	var inputs = [];

       inputs.push('patientid=' + patientid);
   	
   	
   	var str = inputs.join('&');
       
       jQuery.ajax({
   		async : true,
   		type : "POST",
   		url : "ehat/mortuaryReg/getInternalPatientData",
   		data : str + "&reqType=AJAX",
   		cache :false,
   	
   		success : function(r) {
   			if(r == null || r == undefined || r == "")
   			{
   				alert("Record not found.");
   				$("#live1").prop("checked",true);
   				$("#live2").prop("checked",false);
   				$('#patient_id').attr('readonly', false);
   				$("#patient_id").val("");
   				$("#mor_id").val("");
   				$("#deceased_name").val("");
   				$("#gender1").val("");
   				$("#death_ward").val("");
   				$("#death_time").val("");
   				$("#age1").val("");
   			    $("#date_of_death").val("");
   			    $("#relative_name").val("");
   			    $("#address1").val("");
   			    $("#admsn_no").val("");
   			    $("#time_in").val("");

   			    $("#mlc_pd").val("");
   			    $("#property").val("");
   				$("#clothing").val("");
   				$("#additional_nt").val("");
   				
   				return false;
   			}
   			$("#deceased_name").val(r.deceased_name);
   			$("#gender1").val(r.gender1);
   			$("#death_ward").val(r.death_ward);
   			$("#death_time").val(r.death_time);
   			$("#age1").val(r.age1);
			$("#date_of_death").val(r.date_of_death);
			$("#relative_name").val(r.relative_name);
			$("#address1").val(r.address1);
			var mlcFlag = r.mlc_pd;
			if(mlcFlag==null||mlcFlag==""||mlcFlag==undefined){
				mlcFlag='N';
			}
			$("#mlc_pd").val(mlcFlag);	
			$("#death_ward").val(r.death_ward);
			$("#admsn_no").val(r.admsn_no);
			$('#relation').val(r.relation);

   		}
   	});

}

/*
 * @author : Abhishek Kumbhar
 * @Date   : 1-Oct-19
 * @Codefor: fetch All,internal,external mortuary patient Details.
*/


function fetchMortuaryInternal(callform) {
	
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/mortuaryReg/getAllMortuaryRegisterPatient",
		data : {
			"callform" :callform
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			setTempMorPat(r);
   			
		}
	});
}


function setTempMorPat(r) {

	
	
	var index = 1;
	var htm = "<div  id='exgetdeath' class='col-sm-12-1' style=''>"
		+ "<table class='table table-striped table-condensed cf' style='width : 100%; margin-top: 5%;'>"
		+ "<thead>"
		+ "<tr style='background-color: #EEEEEE; height: 30px;'>"
		+ "<th style='width:4%;'><div class='TextFont'>#</div></th>"
		+ "<th style='width:6%;'><div class='TextFont'>Mor ID</div></th>"

		+ "<th  style='width:20%;padding-left:2%;'><div class='TextFont'>Deceased Name</div></th>"
		+ "<th  style='width:6%;'><div class='TextFont'>Mortuary Date</div></th>"
		+ "<th  style='width:6%;'><div class='TextFont'>Mor Time</div></th>"

		+ "<th  style='width:6%;'><div class='TextFont'>Age</div></th>"

		+ "<th style='width:6%;'><div class='TextFont'>Gender</div></th>"
		+ "<th  style='width:6%;' class='center'><div class='TextFont'>Cold Room Name</div></th>"
		+ "<th  style='width:10%;' class='center'><div class='TextFont'>Bed no.</div></th>"
		+ "<th  style='width:6%;'><div class='TextFont'>Edit </div></th>" 
		+ "<th  style='width:6%;'><div class='TextFont'>Delete</div></th>"
		+ "<th  style='width:6%;'><div class='TextFont' style=''>Action</div></th>"

		+ "</tr>" + "</thead>	" + "</table></div>";
	
	if(r.mordto.length > 0)
		{
	for ( var i = 0; i < r.mordto.length; i++) {

			
		var a = "";

		htm = htm
				+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;display:none;'>"
				+ "<table class='table table-condensed cf'>"
				+ "<tbody class='cf'>"
				+ "<td style='width:1%;'>"
				+ index
				+ "</td>"
				+ "<td style='width:6%;'>"
				+ r.mordto[i].mor_id
				+ "</td>"
				+ "<td style='width:6%;padding-left:2%;'>"
				+ r.mordto[i].deceased_name
				+ "</td>"
				+ "<td class='col-sm-1-1 ' >"
				+ r.mordto[i].date_in
				+ "</td>"
				+ "<td class='col-sm-1-1 ' >"
				+ r.mordto[i].time_in
				+ "</td>"
				+ "<td class='col-sm-1-1 ' >"
				+ r.mordto[i].age1
				+ "</td>"
				+ "<td class='col-sm-1-1 ' >"
				+ r.mordto[i].gender1
				+ "</td>" 
				+ "<td class='col-sm-1-1 center' >"
				+ r.mordto[i].cold_room_name
				+ "</td>" 
				+ "<td class='col-sm-1-1 center' >"
				+ r.mordto[i].bed_number
				+ "</td>" 
				+ "<td class='col-sm-1-1 ' >"
				+ "<button onclick=' fetchModDetails("+r.mordto[i].mor_id+"),RegisterMortuaryOpenpopup()'type='button' class='btn btn-xs btn-success'><i class='fa fa-edit'></i></button>"
				+ "</td>" 
				+ "<td class='col-sm-1-1 ' >"
				+ "<button onclick='deletemortuarydetails("+r.mordto[i].mor_id+")'type='button' class='btn btn-xs btn-success'><i class='fa fa-trash-o'></i></button>"
				+ "</td>" 
				+ "<td class='col-sm-1-1 ' >"
				+ "<button onclick='showautopsymodel("+r.mordto[i].mor_id+")'type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "</td>" 
				+ "</tr>" + "</tbody>"
				+ "</table>" + "</div>";
		index++;
			
		
	}
		}
	else
		{
		htm = htm+"<tr><td colspan = 12>No Record Found</td></tr>";
		}

	
	$("#container24").html(htm);
	

}


function editmortuarydetails(morId)
 {
	window.location.href = "mortuary_registration.jsp?morId="+ morId;
	
 }

function fetchModDetails(mor_id){

	//var morId = $("#hiddenModId").val(); 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/mortuaryReg/editmortuarydetails",
		data : {
			"morId" :mor_id
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			if(r.status == 'I')
					{
				$("#live1").prop("checked",true);
				$("#patientdiv").show();
				$("#patient_id").val(r.patient_id);
				$('#patient_id').attr('readonly', true);
				$("#live2").prop("disabled",true);
				$("#live1").prop("disabled",false);
				
				$('#admsn_no').attr('readonly', true);
				$('#death_ward').attr('readonly', true);
				$('#mlc_pd').attr('readonly', true);
					}
			else if(r.status == 'E')
				{
				$("#live2").prop("disabled",false);
				$("#live1").prop("disabled",true);
				$("#live2").prop("checked",true);
				
				$('#admsn_no').attr('readonly', false);
				$('#death_ward').attr('readonly', false);
				$('#mlc_pd').attr('readonly', false);
				}
			
	
				$("#mor_id").val(r.mor_id);
				$("#deceased_name").val(r.deceased_name);
				$("#gender1").val(r.gender1);
				$("#death_ward").val(r.death_ward);
				$("#death_time").val(r.death_time);
				$("#age1").val(r.age1);
			    $("#date_of_death").val(r.date_of_death);
			    $("#relative_name").val(r.relative_name);
			    $("#address1").val(r.address1);
			    $("#admsn_no").val(r.admsn_no);
			    $("#date_in").val(r.date_in);
			    $("#time_in").val(r.time_in);
			    $('#relation').val(r. relation);
			    $("#mlc_pd").val(r.mlc_pd);
			    $("#property").val(r.property);
				$("#clothing").val(r.clothing);
				$("#additional_nt").val(r.additional_nt);
				
			    //var age=$("#agee").val(r.age1);
	
		}
	});
	
}


function setAutoDeceasedName(inputID)
{
	var resultData = [];
	var findingName = $("#searchDashbordmorturay").val();
	var type = $("input[type=radio][name=internal]:checked").val();
	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/mortuaryReg/autosuggesationMortuaryPatient",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			
			if(r.mordto.length != 0)
				{
				setTempMorPat(r);
				}
			mortuaryAutosuggestionName(r,inputID);
			
		}
	});
	
}
function mortuaryAutosuggestionName(response, id) {
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

	$("#" + id).mcautocomplete(
	{
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'deceased_name',
			width : '100px',
			valueField : 'deceased_name'
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
					&& ui.item.deceased_name != 'Match') {
			
				 
				$('#'+id).val(ui.item.deceased_name);
				
			}
			/*
			 * This function use for Enter keypress search
			 */
			setAutoDeceasedName(id,'search');
			return false;
		},
		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.mordto.length);
			var result;
			if (!data || data.mordto.length === 0 || !data.mordto
					|| data.mordto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'deceased_name' : 'Record',
					'mor_id' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.mordto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}
 


function deletemortuarydetails(morId)
{
   

jQuery.ajax({
	async : true,
	type : "POST",
	url : "ehat/mortuaryReg/deletemortuarydetails",
	data : {
		"morId" :morId
	},
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		alert('error');
	},
	success : function(r) {
		alert(r);
		fetchMortuaryInternal("all");
	    }
     });
	}


function getDatewiseData()
{
 var from_date = $("#from_date").val(); 
 var to_date = $("#to_date").val();
 var type = $("input[type=radio][name=internal]:checked").val();
 jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/mortuaryReg/getDatewiseData",
		data : {
			"from_date" :from_date,
			"to_date"   :to_date,
			"type"	    :type
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			//alert("search successfully");
			//alert(JSON.stringify(r));
			setTempMorPat(r);
		
		}
	});

}

function showautopsymodel(morId)
{
	window.location.href ="mortuary_autopsy.jsp?morId="+morId;
}

function RegisterMortuaryOpenpopup()
{
	$("#live1").prop("disabled",false);
	$("#live2").prop("disabled",false);
	var date_in=$("#todays_date").val();
				$("#date_in").val(date_in);
	$("#MortuaryRegister").show();	
}
function RegisterMortuarypopup()
{
	$("#live1").prop("checked",false);
	$("#live2").prop("checked",false);
	$('#patient_id').attr('readonly', false);
	$("#patient_id").val("");
	$("#mor_id").val("");
	$("#deceased_name").val("");
	$("#gender1").val("");
	$("#death_ward").val("");
	$("#death_time").val("");
	$("#age1").val("");
    $("#date_of_death").val("");
    $("#relative_name").val("");
    $("#address1").val("");
    $("#admsn_no").val("");
    $("#date_in").val("");
    $("#time_in").val("");

    $("#mlc_pd").val("");
    $("#property").val("");
	$("#clothing").val("");
	$("#additional_nt").val("");
	
	$("#patientdiv").hide();
	$("#MortuaryRegister").hide();
	
	
}
function MorturayDashBorad()
{
	var name=$("#searchDashbordmorturay").val();
	if(name == null || name == "" || name == undefined)
		{
		getDatewiseData();
			return false;
		}
	else
			
		{
		setAutoDeceasedName(name);
		}
}


function getTemplateListByDepartmentId(){


	//var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('departmentId=' + 15);//diet->diet opd
	inputs.push('unitId=' + 1);
	inputs.push('selectTemplateType=' + 'd');

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/IPD_Discharge/getTemplateListByDepartmentId",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {

			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.pattemplist.length; i++){             
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";
            }
           
            $("#selTempWiseSummary").html(divContent);
            $("#selTempWiseSummary").select2();
            $("#selTempWiseSummary").on("change", function () { 
            	getCustomizeTemplatesIDDischarge(); 
            });
		}		
	});

	
}

function getTemplateListByDepartmentId(){


	//var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('departmentId=' + 15);//diet->diet opd
	inputs.push('unitId=' + 1);
	inputs.push('selectTemplateType=' + 'm');

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/IPD_Discharge/getTemplateListByDepartmentId",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {

			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.pattemplist.length; i++){             
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";
            }
           
            $("#selCustomizeTemp").html(divContent);
            $("#selTempWiseSummary").select2();
            $("#selTempWiseSummary").on("change", function () { 
            	getCustomizeTemplatesIDDischarge(); 
            });
		}		
	});

	
}