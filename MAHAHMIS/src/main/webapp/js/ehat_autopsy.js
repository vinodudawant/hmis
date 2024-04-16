
/**@author     :Akshay Mache
 * @Date       :16-10-2019
 * @Code       :Save Body Tracking Information**/
function saveBodyTrackingInfo(id)
{
	var mortuaryId = $('#mortuaryId').html();
	var date = '';
	var time = '';
	var handoverTo = '';
	var movedTo = '';
	var notes= '';
	
	if(id == 'release')
	{
		date = $('#release_date').val();
		time = $('#release_time').val();
		handoverTo = $('#release_handover_to').val();
		notes = $('#release_notes_to').val();
		movedTo = "Release";
	}
	else if(id == 'pm')
	{
		date = $('#pm_date').val();
		time = $('#pm_time').val();
		handoverTo = $('#pm_handover_to').val();
		notes = $('#pm_notes_to').val();
		movedTo = "Post Mortem";
	}
	else if(id == 'forensic')
	{
		date = $('#forensic_date').val();
		time = $('#forensic_time').val();
		handoverTo = $('#forensic_handover_to').val();
		notes = $('#forensic_notes_to').val();
		movedTo = "Forensic and Investigation";
	}
	else if(id == 'study')
	{
		date = $('#study_date').val();
		time = $('#study_time').val();
		handoverTo = $('#study_handover_to').val();
		notes = $('#study_notes_to').val();
		movedTo = "Study and Research";
	}
	else if(id == 'other')
	{
		date = $('#other_date').val();
		time = $('#other_time').val();
		handoverTo = $('#other_handover_to').val();
		notes = $('#other_notes_to').val();
		movedTo = "Other";
	}
	if(time == ""||time  == null)
		{
		alert("Please Select Time.")
		return false;
		}
	if(handoverTo == "" ||handoverTo == null)
		{
		alert("Please Enter HandoverTo.");
		return false;
	}
	if(notes == "" || notes == null)
	{
		notes="-";
	}

	var inputs = [];
	inputs.push('mor_id=' + mortuaryId);
	inputs.push('bodyMovedTo=' + movedTo);
	inputs.push('movedDate=' + date);
	inputs.push('movedTime=' + time);
	inputs.push('bodyHandoverTo=' + handoverTo);
	inputs.push('bodyNotesTo=' + notes);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data :str+"&reqType=AJAX",
		url : "ehat/mortuary/savebodytrackinginfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r == 0)
			{
				alert("Information Updated.");
			}
			else if(r == 1)
			{
				alert("Information Saved.");
			}
			else
			{
				alert("Body is already released.");
			}
			
			cleanBodyTrackingField();
			fetchBodyTrackingInfo(id);
			
			if(id == 'release'){
				window.location.href = "mortuary_previous_mortuary.jsp";
			}
		}
	});
}

/**@author     :Akshay Mache
 * @Date       :17-10-2019
 * @Code       :Clear Body Tracking fields**/
function cleanBodyTrackingField()
{
	$("#release_handover_to").val("");
	$("#pm_handover_to").val("");
	$("#forensic_handover_to").val("");
	$("#study_handover_to").val("");
	$("#other_handover_to").val("");
	$("#other_notes_to").val("");
	$("#study_notes_to").val("");
	$("#pm_notes_to").val("");
	$("#forensic_notes_to").val("");
	$("#release_notes_to").val("");
	
	$("#release_time").val("");
	$("#pm_time").val("");
	$("#study_time").val("");
	$("#forensic_time").val("");
	$("#other_time").val("");
	
	
	
	
	
	
}

/**@author     :Akshay Mache
 * @Date       :22-10-2019
 * @Code       :Fetch Body Tracking Information**/
function fetchBodyTrackingInfo(id)
{
	var mortuaryId = $('#mortuaryId').html();
	
	var inputs = [];
	inputs.push('mor_id=' + mortuaryId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data :str+"&reqType=AJAX",
		url : "ehat/mortuary/fetchbodytrackinginfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			setBodyTrackingList(r);
		}
	});
}

/**@author     :Akshay Mache
 * @Date       :22-10-2019
 * @Code       :Set Body Tracking information into table**/
function setBodyTrackingList(result)
{
	var divContent="";
	if(result.list.length > 0){
		for(var i=0;i<result.list.length;i++)
		{
				divContent=divContent+"<tr><td  ><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='width:10%; padding-left: 2%;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"+(i+1)+"' value='"+result.list[i].bodyMovedTo+"'>"+result.list[i].bodyMovedTo+"</td>" +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result.list[i].bodyHandoverTo+"'>"+result.list[i].bodyHandoverTo+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result.list[i].bodyNotesTo+"'>"+result.list[i].bodyNotesTo+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"+(i+1)+"' value='"+result.list[i].movedDate+"'>"+result.list[i].movedDate+"</td> "+
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenTime"+(i+1)+"' value='"+result.list[i].movedTime+"'>"+result.list[i].movedTime+"</td> "
				+"<td class='col-md-1 left center' ><button class='btn btn-xs btn-success ' value='EDIT' id=btnEdit"+ result.list[i].bodyTrackingId
				+ " onclick='editBodyTrackingInfo("+ result.list[i].bodyTrackingId+")'><i class='fa fa-edit'></i></button></td></tr>"
				//+"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocuments("+(i+1)+")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				//+"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='delmorDocument("+result.lstDocUpload[i].imageId+")' type='button'>  </i></td></tr>"; 
		}
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#pmDispTable").html(divContent);
	$("#forensicDispTable").html(divContent);
	$("#studyDispTable").html(divContent);
	$("#otherDispTable").html(divContent);
}

function setNewtempDoctorDesk()
{

	$("#bodytracker").show();
	$("#findingdiv").show();
}

var count1=1;

function createDivFinding(callfrom){
	
var rowCount = $('#Finding1 tr').length;
	
	 rowCount++;

	 divId = "divH" + rowCount;
		
		var x = document.createElement('tr');
		
		x.setAttribute('id', divId);
		
		document.getElementById("Finding1").appendChild(x);
	 	
	    document.getElementById(divId).innerHTML =
		   
	    	 '<td  class="col-md-1" style="text-align: center;"><label>'+ rowCount+ '</label></td>'
	    	
	    	+'<td class="center"  style="width: 33.96%; height: 21.5px; "><textarea type="text" style="width: 95%; "  class="" id="headings'	+ rowCount+ '"></textarea></td>'
			
	    	+'<td  class="center" style="width: 33.96%; height: 21.5px; "><textarea type="text"  style="width:95%; "  class="" id="remarks'	+ rowCount+ '"></textarea></td>'
			
			+ '<td  class="col-md-1" style="text-align: center;"><input type="checkbox" class="center" value=0   name="findingsCompcheckbox"   id="findingsCompcheckbox'+ rowCount+ '"/></td>';
	
		count1++;

}


function setbodytrackarType(id) {
	
	$("#findingdiv").show();
}


function removeChifComp() {
    idList=[];
    var currentId;
    $("#Finding1").find('input[name="findingsCompcheckbox"]').each(function(){
        if($(this).is(":checked")){
           
            currentId=$('#'+this.id).val();
            if(currentId==0){
                $(this).parents("tr").remove();
            }else{
                idList.push(currentId);
            }    
        }
    });
   
    if(idList.length > 0){
        var r = confirm("Are You Sure You Want To Delete this row ?");
        if (r == true) {

            var inputs = [];

            inputs.push('findingsId=' + encodeURIComponent(idList));
            var str = inputs.join('&');
            jQuery.ajax({
                async : true,
                type : "POST",
                data : str + "&reqType=AJAX",
                url : "ehat/mortuaryReg/deleteFindings",
                timeout : 1000 * 60 * 5,
                catche : false,
                error : function() {
                    alert('Network Issue!');
                },
                success : function(r) {
                    fetchfindings();
                }
            });
        }
    }
}
/*function removeChifComp() {
	
	var sfindId ="";
	var listchecked=[];
	var res ="";

	$('input[name="findingsCompcheckbox"]:checked').each(function() {
		
		listchecked = $(this).val();
		 res = listchecked.split(" ");
		 sfindId += res +",";
	 
		});
  
  var findingsId = sfindId.substring(0, sfindId.length-1);

	if (findingsId == "" || findingsId == null || findingsId == undefined) {
		findingsId = 0;
		
		return false;
	}
	
	var r = confirm("Are You Sure You Want To Delete findings ?");
	if (r == true) {

		var inputs = [];

		inputs.push('findingsId=' + encodeURIComponent(findingsId));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/mortuaryReg/deleteFindings",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				alert(r);
				fetchfindings();
				
				
			}
		});

	}
}*/
/**@author     :Navnath Erande
 * @Date       :17-10-2019
 * @Code       :Save Post Pm Report**/


function MortuaryTemleat()
{
var temp=templateData = CKEDITOR.instances['editor1'].getData();	
alert(temp);
}
/*********************/
function setTemplateListByTypemortuary(value){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/serv/getTemplateListByType",
		data	: {
			"value" : value
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setCustTemplateList(r);
			//setCustTemplateListMortuary(r);
		}
	});
}
function setCustTemplateList(r){
	var list="<option value=''>--Select--</option>";
	for ( var i = 0; i < r.pattemplist.length; i++) {

		//list=list+'<option onclick="setMortuarytemp('+r.pattemplist[i].idpattemp+')" value="'+(r.pattemplist[i].idpattemp)+'">'+(r.pattemplist[i].tempname)+'</option>';
		list=list+'<option value="'+(r.pattemplist[i].idpattemp)+'">'+(r.pattemplist[i].tempname)+'</option>';
		
	}
	setTimeout(function() {
		$("#selCustomizeTemp").html(list);
	}, 100);

}

function setMortuarytemp(id)
{
	//alert(id);

	var inputs = [];
	inputs.push('Tempid=' + id);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/mortuary/mortuarytemplategetData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {	
					//alert(JSON.stringify(r));
				
				if(r.idpattemp != null || r.idpattemp != "null" || r.idpattemp != "" )
					{
					CKEDITOR.instances['editorSubjective'].setData(r.tempdata);
					$("#tempname").val(r.tempname);
					}
					
				}
			});
}

function pmreportSave()
{
	var mortuaryId=$("#mortuaryId").html();
	var tempname=tempname=$("#tempname").val();
    var selCustomizeTemp=$("#selCustomizeTemp").html();
	var selCustomizeTemp1=$("#selCustomizeTemp").val();
	var editorSubjective= encodeURIComponent(CKEDITOR.instances['editorSubjective'].getData());
	if(mortuaryId == null || mortuaryId == "null" || mortuaryId == "" ||  mortuaryId ==undefined)
	{
		alert("Please Select Mortuary Id.");
		return false;
		
	}
	// commented by Annapurna
	/*if(tempname == null || tempname == "null" || tempname == "" ||  tempname ==undefined)
	{
		alert("Please Select Template Name.");
		return false;
		
	}*/

	if(editorSubjective == null || editorSubjective == "null" || editorSubjective == "" ||  editorSubjective == undefined)
	{
		alert("Please Write Template.");
		return false;
		
	}

	var inputs = [];
	inputs.push('mor_id=' + mortuaryId);
	inputs.push('template_data=' + editorSubjective);
	inputs.push('template_name=' + tempname);
	inputs.push('idCustomizeTemplate=' +encodeURIComponent( selCustomizeTemp1));
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,//async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/mortuary/postreportdata",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {	
					
					alert(r);
					updatedPmreoprtbyid(mortuaryId);
				
					
				}
			});
				
}
	

/**@author     :Navnath Erande
 * @Date       :17-10-2019
 * @Code       :Previous Mortury search function**/
function  PreviousMorturysearch()
{
	
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data :"&reqType=AJAX",
		url : "ehat/mortuary/PreviousMorturysearch",
		cache : false,	
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		setTempMorPatPrevious(r);
			
		}
	});
	
}

/** @Code       :Previous Mortury search function**/

function  searchPreviousMorturay(inputID)
{
	
	var findingName = $("#searchpreviousmorturay").val();
	var inputs = [];	
	inputs.push('findingName=' + findingName);	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/mortuary/autoSuggestionPreviousMortury",
		cache : false,	
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r.mordto.length == 0)
				{
				alert("Previous mortuary is not available.");
				}
			else
				{
				setTempMorPatPrevious(r);
				
				}
			mortuaryPreAutosuggestion(r,inputID);
			
		}
	});
	
}
function setTempMorPatPrevious(r) {

	var index = 1;
	var htm = "<div  id='exgetdeath' class='col-sm-12-1'>"
		+ "<table class='table table-condensed header-fixed ' style='margin-top: 10px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th  class='active center' style='width: 5%;'><div class='TextFont'>#</div></th>"
		+ "<th  class='active center' style='width: 10%;'><div class='TextFont'>Mor ID</div></th>"

		+ "<th class='col-md-3-1 active' style='height: 21.5px;'><div class='TextFont'>Deceased Name</div></th>"
		+ "<th class='active center' style='width: 10%;'><div class='TextFont'>Mor Date</div></th>"
		+ "<th class='active center' style='width: 10%;'><div class='TextFont'>Mor Time</div></th>"

		+ "<th class='active center' style='width: 10%;'><div class='TextFont'>Age</div></th>"

		+ "<th class='active center' style='width: 10%;'><div class='TextFont'>Gender</div></th>"
		
		+ "<th class='active center' style='width: 10%;'><div class='TextFont'>Action</div></th>"
		+ "</tr>" + "</thead>	" + "</table></div>";
	
	for ( var i = 0; i < r.mordto.length; i++) {

		

		var a = "";

		htm = htm
				+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;display:none;'>"
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td class='center' style='width: 5%;'>"
				+ index
				+ "</td>"
				+ "<td class='center' style='width: 10%;'>"
				+ r.mordto[i].mor_id
				+ "</td>"
				+ "<td class='col-sm-3-1 ' style='height: 21.5px;'>"
				+ r.mordto[i].deceased_name
				+ "</td>"
				+ "<td class='center' style='width: 10%;'>"
				+ r.mordto[i].date_in
				+ "</td>"
				+ "<td class='center'  style='width: 10%;'>"
				+ r.mordto[i].time_in
				+ "</td>"
				+ "<td class='center' style='width: 10%;'>"
				+ r.mordto[i].age1
				+ "</td>"
				+ "<td class='center'  style='width: 10%;'>"
				+ r.mordto[i].gender1
				+ "</td>" 
				+"<td class='center' style='width: 10%;'>"
				+"<button class='btn btn-xs btn-success' type='button' onclick='PreviousMortuaryAction("+r.mordto[i].mor_id+");'>"
				+"<i class='fa fa-eye View'></i>"
				+"</button>"
				+"</td>"
				+ "</tr>" + "</tbody>"
				+ "</table>" + "</div>";
		index++;
	
	}

	
	$("#MortuaryPrevioustable").html(htm);
}
/** @Code       :Previous Mortury Action function**/
function PreviousMortuaryAction(morId)
{
	window.location.href = "ehat_previous_mortuary_autopsy.jsp?"
		+ "id=" + morId;
	
}
/** @Code       :Pm Report update function**/
function PmreportUpdate(mor_id)
{
	// alert("mor_id"+mor_id);
	if(mor_id == null || mor_id == "null" || mor_id == "" ||  mor_id ==undefined)
	{
		return false;
	}
	var inputs = [];	
	inputs.push('morId=' + mor_id);	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/mortuary/updatedPmreoprtbyid",
		cache : false,	
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r.morId == null || r.morId == "null" || r.morId == "" ||  r.morId ==undefined)
			{
		 
			}
			else
				{
				CKEDITOR.instances['editorSubjective'].setData(r.template_data);
				$("#tempname").val(r.template_name);
				}
		}
	});
	
}
/** @Code       :Previous Mortury Single Information function**/
function singlePreviousMorturay(morId)
{
	if(morId == null || morId == "null" || morId == "" ||  morId ==undefined)
	{
		return false;
	}
	var inputs = [];	
	inputs.push('morId=' + morId);	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/mortuary/singlepreviousmorturay",
		cache : false,	
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#previousmortuaryId").html(r.mor_id);
			$("#previousdeceasedName").html(r.deceased_name);
			$("#previousage").html(r.age1);			
			$("#previousdod").html(r.date_of_death);
			$("#previoussex").html(r.gender1);
			$("#previousaddress").html(r.address1);
		}
	});
}
/** @Code       :Previous Mortury body Tracking function**/
function PreviousBodyTracking(mortuary,morid)
{


	var inputs = [];	
	inputs.push('mortuary=' + mortuary);
	inputs.push('morid=' + morid);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/mortuary/previousbodytracking",
		cache : false,	
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#pre_Forensic_date").val(r.movedDate);
			$("#pre_Forensic_time").val(r.movedTime);
			$("#pre_Forensic_handover_to").val(r.bodyHandoverTo);
			$("#pre_forensic_notes").val(r.bodyNotesTo);
			
			$("#pre_release_date").val(r.movedDate);
			$("#pre_release_time").val(r.movedTime);
			$("#pre_release_handover_to").val(r.bodyHandoverTo);
			$("#pre_release_notes").val(r.bodyNotesTo);
			
			$("#pre_pm_date").val(r.movedDate);
			$("#pre_pm_time").val(r.movedTime);
			$("#pre_pm_handover_to").val(r.bodyHandoverTo);
			$("#pre_pm_notes").val(r.bodyNotesTo);
			
			$("#pre_study_date").val(r.movedDate);
			$("#pre_study_time").val(r.movedTime);
			$("#pre_study_handover_to").val(r.bodyHandoverTo);
			$("#pre_study_notes").val(r.bodyNotesTo);
			
			$("#pre_other_date").val(r.movedDate);
			$("#pre_other_time").val(r.movedTime);
			$("#pre_other_handover_to").val(r.bodyHandoverTo);
			$("#pre_other_notes").val(r.bodyNotesTo);
		
		
		
		}
	});
}

function saveFindings()
{
	var listmortuaryFindings1={
			listmortuaryFindings : []
	};
	
	var count = 0;
	var rowCount = $('#Finding1 tr').length;
	
	for ( var i = 1; i <= rowCount; i++) {
		count++;
    var headings= $("#headings"+ count + "").val();
    var remarks = $("#remarks"+ count + "").val();
    if(headings == null && remarks == null || headings == undefined && remarks == undefined ||headings == "" && remarks == "")
    	{
    	
    	}
    else
    	{
   // var findingsId = document.getElementById("findingsCompcheckbox"+count).value;
    var findingsId = $("#findingsCompcheckbox"+ count + "").val();
   
    if (findingsId)
    {

	} else 
	{	
		findingsId = 0;
	}
    
    
    	listmortuaryFindings1.listmortuaryFindings.push({

			"headings" : headings,
			"remarks" : remarks,
			"findingsId" : findingsId,
		});
	
    	}
	}
	
	
	
	listmortuaryFindings1 = JSON.stringify(listmortuaryFindings1);
	console.log(listmortuaryFindings1);
	var mortuaryId= $("#mortuaryId").html();
    var inputs = [];
    inputs.push('listmortuaryFindings=' + encodeURIComponent(listmortuaryFindings1));
	inputs.push('mor_id=' +mortuaryId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/mortuaryReg/saveFindings",
		data : str + "&reqType=AJAX",
		cache :false,
	
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			alert("Save Successfully");
			fetchfindings();
		}
	});
}


function fetchfindings()
{
	
	 var mortuaryId= $("#mortuaryId").html();
		if(mortuaryId == null || mortuaryId == undefined || mortuaryId == " " )
		{
			return false;
		}

		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/mortuaryReg/fetchfindings",
			data : {
				"mortuaryId" :mortuaryId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
	
				setfetchfindings(r);
		
			}
		});

}


function setfetchfindings(r) {
	
	
	var divContent = "";
	
	for ( var i = 0; i < r.listmortuaryFindings.length; i++) {
		      
	  divContent = divContent 
	  + '<tr>'
				+ "<td class='col-md-1 center' style='height: 21.5px;'>" + (i + 1)
				+ "</td>";

	  divContent = divContent 
				+ "<td class='col-md-1 center' style='height: 21.5px;'>"
				+ " <textarea class='center' style='width:95%;' id='headings" + (i + 1)		
				+ "' >"+r.listmortuaryFindings[i].headings+"</textarea></td>";
	  divContent = divContent 
	  			
				+ "<td class='col-md-1 center' style='height: 21.5px;'>"
				+ " <textarea class='center'   style='width:95%;'   id='remarks" + (i + 1)
				+ "''>"+r.listmortuaryFindings[i].remarks+"</textarea>"
				+"</td>";
	 
	  divContent = divContent
		+"<td  style='width:10%;'>"
		+" <input type='checkbox'   class='form-control input-SmallText' id='findingsCompcheckbox"+ (i + 1)+ "' " 
		+"value='" + r.listmortuaryFindings[i].findingsId + "' name='findingsCompcheckbox' ></td>";
	
		+'</tr>';
		}
			
	

	$('#Finding1').html(divContent);
}

function uploadDocument() 
{  
	
	 var mortuaryId = $("#mortuaryId").html();
	 var deceasedName = $("#deceasedName").html();
	 var note = $("#morturayimagesnote").val();
	 var form = $('#fileUploadfrm')[0];
	// var datetime= new Date(result.lstDocUpload[i]. createdDateTime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});
	 
	 if( document.getElementById("imagesfileUploadfrom").files.length == 0 ){
		    alert("Please select file");
		    return false;
		}

	    var data = new FormData(form);
			data.append("mortuaryId", mortuaryId);
			data.append("note", note);
			data.append("deceasedName", deceasedName);
			data.append("Date" , Date);
			
	      jQuery.ajax({                   
	    	 async : true,                   
	    	 type : "POST",
	    	 enctype: 'multipart/form-data',
	    	 processData: false,
	         contentType: false,
	    	 data : data,
	    	 url : "ehat/mortuaryReg/UploadMortuaryimages",                   
	    	 timeout : 1000 * 60 * 5,                   
	    	 catche : false,                    
	    	 error : function() {                                            
	    		 alert("error");
	    	 },                   
	    	 success : function(r) {                      
	    		 alert("File uploaded successfully.");                     
	    		 $("#morturayimagesnote").val("");                       
	    		 $("#imagesfileUploadfrom").val("");                       
	    		
	    		 fetchDoc();                    
	    		 }               
	    	 });
    }
function  fetchDoc()
{
	 var mortuaryId= $("#mortuaryId").html();

	 if(mortuaryId == null || mortuaryId == " " || mortuaryId == undefined || mortuaryId =="null")
		{
			mortuaryId = 0;
			return false;
		}

	 jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"mortuaryId" :mortuaryId
		},
		url : "ehat/mortuaryReg/fetchDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			ajaxResponse = r;
			setUploadDocList(r);			
		}
	});
}
 /* Added By Annapurna */
function getDateWithTimeDoc(date) {
	var date1;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
//	var hours = formattedDate.getHours();
//	var minute = formattedDate.getMinutes();
//	var seconds = formattedDate.getSeconds();
	date1 = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "
	/*+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2)*/;
	return date1;
	
}

function setUploadDocList(result)
{
	var divContent="";
	if(result.lstDocUpload.length > 0){
		for(var i=0;i<result.lstDocUpload.length;i++)
		{
				divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='imageName"+(i+1)+"' value='"+result.lstDocUpload[i].imageName+"'>"+result.lstDocUpload[i].imageName+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='imageNote"+(i+1)+"' value='"+result.lstDocUpload[i].note+"'>"+result.lstDocUpload[i].note+"</td> " +
				"</td> "
				/*Added By Annapurna*/
				+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='imageDate"
				+ (i + 1)
				+ "' value='"
				+ getDateWithTimeDoc(result.lstDocUpload[i].createdDateTime)
				+ "'>"
				+ getDateWithTimeDoc(result.lstDocUpload[i].createdDateTime)
				+ "</td> " + 
/*				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='imageDate"+(i+1)+"' value='"+result.lstDocUpload[i].createdDateTime+"'>"+result.lstDocUpload[i].createdDateTime+"</td> " +
*/				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocuments("+(i+1)+",1)' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
				"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='delmorDocument("+result.lstDocUpload[i].imageId+")' type='button'>  </i></td></tr>"; 
		}
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#docDispTable").html(divContent);
}

function ReadDocuments(rowNumber, callFrom) {
	var doc = $("#imageName"+rowNumber).val();
	var note = $("#imageNote"+rowNumber).val();;
	var id = "";
	var name = "";
	
	if(callFrom == "1")
	{
		name = $("#deceasedName").html();
		id = $("#mortuaryId").html();
	}
	else if(callFrom == "2")
	{
		name = $("#previousdeceasedName").html();
		id = $("#previousmortuaryId").html();
	}

	$('#ViewDocumemnt').attr("src","ehat/mortuaryReg/readmortuaryimage?fileName="+doc+"&name="+name+"&id="+id);
	$('#viewDocModal').modal('show');
	/*$('#ViewDocumemnt').attr("src","ReadDocOnReg?fileName="+doc);
	$('#viewDocModal').modal('show');*/
	
	$('#documentComment').html(note);
}

function setDocPopUp(data)
{
	var result=jQuery.parseJSON(data);
	var divContent="";

	if(!result.length == ""){
		divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>"+(i+1)+"</div></td>" +
			"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><iframe src='ReadDocServlet?fileName="+result.lstDocUpload[i].imagePath+"' ></iframe></td>" +
			"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'>"+result.lstDocUpload[i].note+"</td></tr>"; 
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#ViewDocumemnt").html(divContent);			
}


function delmorDocument(imgid) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"imgid" :imgid
		},
		url : "ehat/mortuaryReg/deletedocmortuary",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			fetchDoc();  		
		}
	});

}

/**@author     :Akshay Mache
 * @Date       :23-10-2019
 * @Code       :Upload Death Certificates**/
function uploadDCDocument()
{
	 var mortuaryId = $("#mortuaryId").html();
	 var deceasedName = $("#deceasedName").html();
	 var note = $("#dcNotes").val();
	 var form = $('#dcfileUploadfrm')[0];
	 
	 if( document.getElementById("dcFile").files.length == 0 ){
		    alert("Please select file");
		    return false;
		}

	    var data = new FormData(form);
			data.append("mortuaryId", mortuaryId);
			data.append("note", note);
			data.append("deceasedName", deceasedName);
			
	      jQuery.ajax({                   
	    	 async : true,                   
	    	 type : "POST",
	    	 enctype: 'multipart/form-data',
	    	 processData: false,
	         contentType: false,
	    	 data : data,
	    	 url : "ehat/mortuary/uploaddeathcertificates",                   
	    	 timeout : 1000 * 60 * 5,                   
	    	 catche : false,                    
	    	 error : function() {                                            
	    		 alert("error");
	    	 },                   
	    	 success : function(r) {                      
	    		 alert("File uploaded successfully.");                     
	    		 $("#dcNotes").val("");                       
	    		 $("#dcFile").val("");                       
	    		
	    		 fetchDcCerti();                    
	    		 }               
	    	 });
}
/** @Code       :Previous Mortury bodyfinding function**/
function preBodyFinding(mortuaryId)
{
	 var inputs = [];
	   
		inputs.push('morid=' +mortuaryId);

		var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/mortuary/prebodyfinding",
		data :str+"&reqType=AJAX",
		cache :false,
	
		error : function() {
			alert("error");
		},
		success : function(r) {
	
			setPrefetchfindings(r);
		}
		});
	
}

function setPrefetchfindings(r) {
	
	
	var divContent = "";
	if(r.listmortuaryFindings.length > 0)
		{
	for ( var i = 0; i < r.listmortuaryFindings.length; i++) {
		      

	  divContent = divContent 
	  + '<tr>'
				+ "<td  class='col-md-1 center' style='height: 21.5px;'>" + (i + 1)
				+ "</td>";

	  divContent = divContent 
				+ "<td class='col-md-1 center' style='width:40%;'>"
				+ " <textarea  readonly='readonly' style='width:100%;' class='center' id='headings" + (i + 1)
				+ "'  value='" + r.listmortuaryFindings[i].headings
				+ "' >" + r.listmortuaryFindings[i].headings+"</textarea ></td>";
	  divContent = divContent 
				+ "<td class='col-md-1 center' style='width:40%;'>"
				+ " <textarea readonly='readonly' style='width:100%;'  class='center' id='remarks" + (i + 1)
				+ "' value='" + r.listmortuaryFindings[i].remarks + "' >" + r.listmortuaryFindings[i].remarks + "</textarea></td>";
	 
	  
	  divContent = divContent
		
		
		+'</tr>';
		}
			
		}
	else
		{
		
		 divContent = divContent+"<tr><td colspan = 5>No Record Found</td></tr>"
		}

	$('#preFinding').html(divContent);
}
/** @Code       :Previous Mortury Images function**/
function preImages(morid)
{
	var inputs = [];
	   
	inputs.push('morid=' +morid);

	var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : "POST",
	url : "ehat/mortuary/preimages",
	data :str+"&reqType=AJAX",
	cache :false,

	error : function() {
		alert("error");
	},
	success : function(r) {

		//alert(JSON.stringify(r));
		setPreUploadDocList(r);
	}
	});
}

/**@author     :Akshay Mache
 * @Date       :23-10-2019
 * @Code       :Fetch Death Certificates**/
function  fetchDcCerti()
{
	var mortuaryId= $('#mortuaryId').html();
	
	if(mortuaryId == null || mortuaryId == " " || mortuaryId == undefined || mortuaryId =="null")
	{
		mortuaryId = 0;
		return false;
	}
	
	var inputs = [];
	inputs.push('mortuaryId=' + mortuaryId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data :str+"&reqType=AJAX",
		url : "ehat/mortuary/fetchcertificates",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			setUploadDcList(r);			
		}
	});
}

/**@author     :Akshay Mache
 * @Date       :23-10-2019
 * @Code       :Show Uploaded Death Certificates**/
function setUploadDcList(result)
{
	var divContent="";
	if(result.certificateList.length > 0)
	{
		for(var i=0;i<result.certificateList.length;i++)
		{
				divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='certiId"+(i+1)+"' value='"+result.certificateList[i].certificateName+"'>"+result.certificateList[i].certificateName+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='certiNote"+(i+1)+"' value='"+result.certificateList[i].certificateNote+"'>"+result.certificateList[i].certificateNote+"</td> " +
/*				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='certiDate"+(i+1)+"' value='"+result.certificateList[i].createdDate+"'>"+result.certificateList[i].createdDate+"</td> " +
*/			/*Added By Annapurna*/
				+ "</td> "
				+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='certiDate"
				+ (i + 1)
				+ "' value='"
				+ getDateWithTimeDoc(result.certificateList[i].createdDate)
				+ "'>"
				+ getDateWithTimeDoc(result.certificateList[i].createdDate)
				+ "</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='readCertificate("+(i+1)+")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
				"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='delDeathCerti("+result.certificateList[i].certificateId+")' type='button'>  </i></td></tr>"; 
		}
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#certiDispTable").html(divContent);
}

/**@author     :Akshay Mache
 * @Date       :23-10-2019
 * @Code       :Delete Death Certificates**/
function delDeathCerti(imgid) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"certiId" :imgid
		},
		url : "ehat/mortuary/deletecertificates",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r == true)
				alert("File deleted.");
			else
				alert("Not deleted.");
			fetchDcCerti();
		}
	});
}

/**@author     :Akshay Mache
 * @Date       :23-10-2019
 * @Code       :Read/View Death Certificate**/
function readCertificate(rowNumber) {
	var doc = $("#certiId"+rowNumber).val();
	var id = $("#mortuaryId").html();
	var name = $("#deceasedName").html();
	var note = $("#certiNote"+rowNumber).val();

	$('#ViewDocumemnt').attr("src","ehat/mortuary/readcertificates?fileName="+doc+"&name="+name+"&id="+id);
	$('#viewDocModal').modal('show');
	
	$('#documentComment').html(note);
}

function setPreUploadDocList(result)
{

	var divContent="";
	if(result.lstDocUpload.length > 0){
		for(var i=0;i<result.lstDocUpload.length;i++)
		{
		
				divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='preImageName"+(i+1)+"' value='"+result.lstDocUpload[i].imageName+"'>"+result.lstDocUpload[i].imageName+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='preImageNote"+(i+1)+"' value='"+result.lstDocUpload[i].note+"'>"+result.lstDocUpload[i].note+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"+(i+1)+"' value='"+result.lstDocUpload[i].createdDateTime+"'>"+result.lstDocUpload[i].createdDateTime+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='preReadDocuments("+(i+1)+",2)' type='button'></i>" +
				"</td></tr>"; 
		}
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#docDispTable").html(divContent);
}

/**@author     :Akshay Mache
 * @Date       :24-10-2019
 * @Code       :Fetch Previous Death Certificates**/
function  fetchPrevDcCerti()
{
	var mortuaryId= $("#previousmortuaryId").html();
	
	if(mortuaryId == null || mortuaryId == "" || mortuaryId == undefined || mortuaryId =="null" || !$.trim(mortuaryId))
	{
		mortuaryId = 0;
		return false;
	}
	var inputs = [];
	inputs.push('mortuaryId=' + mortuaryId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data :str+"&reqType=AJAX",
		url : "ehat/mortuary/fetchcertificates",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			setUploadPrevDcList(r);			
		}
	});
}

/**@author     :Akshay Mache
 * @Date       :24-10-2019
 * @Code       :Show Uploaded Previous Death Certificates**/
function setUploadPrevDcList(result)
{
	var divContent="";
	if(result.certificateList.length > 0)
	{
		for(var i=0;i<result.certificateList.length;i++)
		{
				divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='certiId"+(i+1)+"' value='"+result.certificateList[i].certificateName+"'>"+result.certificateList[i].certificateName+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='certiNote"+(i+1)+"' value='"+result.certificateList[i].certificateNote+"'>"+result.certificateList[i].certificateNote+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='certiDate"+(i+1)+"' value='"+result.certificateList[i].createdDate+"'>"+result.certificateList[i].createdDate+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='readPrevCertificate("+(i+1)+")' type='button'></i></td></tr>"
		}
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#prevCertiDispTable").html(divContent);
}

/**@author     :Akshay Mache
 * @Date       :24-10-2019
 * @Code       :Read/View Previous Death Certificate**/
function readPrevCertificate(rowNumber) {
	var doc = $("#certiId"+rowNumber).val();
	var id = $("#previousmortuaryId").html();
	var name = $("#previousdeceasedName").html();
	var note = $("#certiNote"+rowNumber).val();
	$('#ViewDocumemnt').attr("src","ehat/mortuary/readcertificates?fileName="+doc+"&name="+name+"&id="+id);
	$('#viewDocModal').modal('show');
	
	$('#documentComment').html(note);
}
/**@author     :Navnath Erande
 * @Date       :24-10-2019
 * @Code       :Morturay templet list**/
function setTemplateListByTypemortuary_new(value){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/serv/getTemplateListByType",
		data	: {
			"value" : value
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setCustTemplateList_new(r);
			//setCustTemplateListMortuary(r);
		}
	});
}

function setCustTemplateList_new(r){
	var list="<option value=''>----Select--</option>";
	for ( var i = 0; i < r.customizeTemplateList.length; i++) {

		list=list+'<option value="'+(r.customizeTemplateList[i].idCustomizeTemplate)+'">'+(r.customizeTemplateList[i].temp_name)+'</option>';
		
	}
	setTimeout(function() {
		$("#selCustomizeTemp").html(list);
	}, 100);

}
/** @Code       :Morturay templet data set**/
function setMortuarytemp(id)
{
	//alert(id);

	var inputs = [];
	inputs.push('Tempid=' + id);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/mortuary/mortuarytemplategetData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {	
					//alert(JSON.stringify(r));
				
				if(r.idCustomizeTemplate != null || r.idCustomizeTemplate != "null" || r.idCustomizeTemplate != "" )
					{
					CKEDITOR.instances['editorSubjective'].setData(r.temp_data);
					$("#tempname").val(r.temp_name);
					}
					
				}
			});
}
/** @Code       :Morturay templet Print**/
function Mortuarytempletprinr()
{
	var mortuaryId= $('#mortuaryId').html();
	if(mortuaryId == null  || mortuaryId == undefined || mortuaryId == "")
	{
		 mortuaryId= $('#previousmortuaryId').html();
		var preMortuaryId=mortuaryId;
	}
	
	if(mortuaryId == null || mortuaryId == " " || mortuaryId == undefined || mortuaryId =="null")
	{
		alert("Please select Mortuary Id.");
		return false;
	}
	
	var inputs = [];	
	inputs.push('pmreportupdate_id=' + mortuaryId);	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		cache : false,	
		error : function() {
			alert('error');
		},
		success : function(r) {
			//commented By Annapurna
				/*if(r.pmreport_id == undefined || r.pmreport_id == null ||r.pmreport_id == "")
				{
					
						alert("Please save template data.");
				}
				else
				{*/
					setTimeout(
							function(){
					window.open(("mortuarytempletprint.jsp?&mortuaryId="+mortuaryId));
							},300);
				//}
			}
		});
	
	
	
	
}

function editBodyTrackingInfo(id)
{
	var input = [];
	input.push('bodyTrackingId=' + id);
	var str = input.join('&');
	
	jQuery.ajax({
   		async : false,
   		type : "GET",
   		data : str + "&reqType=AJAX",
   		url : "ehat/mortuary/editbodytrackinginfo",
   		timeout : 1000 * 60 * 5,
   		cache : false,
   		error : function() {
   			alert('error');
   		},
   		success : function(r) {
   			if(r.bodyMovedTo =="Post Mortem")
   			{
   				$("#pm_date").val(r.movedDate);
   				$('#pm_time').val(r.movedTime);
   				$('#pm_handover_to').val(r.bodyHandoverTo);
   				$('#pm_notes_to').val(r.bodyNotesTo);
   			}
   			else if(r.bodyMovedTo == "Forensic and Investigation")
   			{
   				$('#forensic_date').val(r.movedDate);
   				$('#forensic_time').val(r.movedTime);
   				$('#forensic_handover_to').val(r.bodyHandoverTo);
   				$('#forensic_notes_to').val(r.bodyNotesTo);
   			}
   			else if(r.bodyMovedTo == "Study and Research")
   			{
   				$('#study_date').val(r.movedDate);
   				$('#study_time').val(r.movedTime);
   				$('#study_handover_to').val(r.bodyHandoverTo);
   				$('#study_notes_to').val(r.bodyNotesTo);
   			}
   			else if(r.bodyMovedTo == "Other")
   			{
   				$('#other_date').val(r.movedDate);
   				$('#other_time').val(r.movedTime);
   				$('#other_handover_to').val(r.bodyHandoverTo);
   				$('#other_notes_to').val(r.bodyNotesTo);
   			}
   		}
   	});
}
/**@date        :13/11/2019
 * @Name        :Navnath Erande
 *  @Code       :Morturay Previous search Autosuggestion**/
function mortuaryPreAutosuggestion(response,id) {

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
			name : 'Deceased name',
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
			autoSuggestionMortury(id,'search');
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
 
function preReadDocuments(id, callFrom)
{
	var doc = $("#preImageName"+id).val();
	var note = $("#preImageNote"+id).val();;
	var id = "";
	var name = "";
	
	if(callFrom == "1")
	{
		name = $("#deceasedName").html();
		id = $("#mortuaryId").html();
	}
	else if(callFrom == "2")
	{
		name = $("#previousdeceasedName").html();
		id = $("#previousmortuaryId").html();
	}

	$('#ViewDocumemnt').attr("src","ehat/mortuaryReg/readmortuaryimage?fileName="+doc+"&name="+name+"&id="+id);
	$('#viewDocModal').modal('show');
	/*$('#ViewDocumemnt').attr("src","ReadDocOnReg?fileName="+doc);
	$('#viewDocModal').modal('show');*/
	
	$('#documentComment').html(note);
}
//Added By Annapurna

function getTemplateListByDepartmentId(){//a


	//var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('departmentId=' + 15);//diet->diet opd
	inputs.push('unitId=' + 1);
	inputs.push('selectTemplateType=' + 'm');//

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
          //  $("#selTempWiseSummary").select2();
            $("#selCustomizeTemp").on("change", function () { 
            	getCustomizeTemplatesIDDischarge(); 
            });
		}		
	});

	
}

//Added by Annapurna
  function getCustomizeTemplatesIDDischarge(){
	
	var id = $("#selCustomizeTemp").val();
	if(id==""||id==null||id=="null"){
		$("#selTempWiseSummary").val(0);
		
		return false;
		id=0;
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/IPD_Discharge/gettemplatelistbytemplateid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			
			//$("#idCustomizeTemplateci").val(r.idCustomizeTemplate);
			//$('#customizeTemplateNameci').val(r.temp_name);

			CKEDITOR.instances['editorSubjective'].setData(r.tempdata);
			$('#customizeTemplateName').val(r.tempname);
		}
	});
	
}


function setCustomTemplateData(r){
	
	//$('#opdCustomTemplateId').val(r.idCustomizeTemplate);		// PK of "CustomizeTemplate", hidden field on UI, default 0.
	
	$('#varCustomTemplateData').val(r);			// custom template object set to hidden field on UI.
	
	$('#opdCustomTemplateId').val(r.idpattemp);	
	$('#opdCustomTemplateSubjectiveData').val(r.tempdata);	
	//$('#editorSubObjOPDTreatment').val(r.tempdata);	
	CKEDITOR.instances['editorSubObjOPDTreatment'].setData(r.tempdata);
	
}
//Added By Annapurna
function updatedPmReportbyid() {
 //	alert("Hii")
	var morId = $("#morId").val();
	var inputs = [];
	inputs.push('morId=' +morId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "Post",	
		url : "ehat/mortuary/updatedPmreoprtbyid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
	},
		success : function(r){
			
			 /*$("#selCustomizeTemp").val();
			 $('#varCustomTemplateData').val(r);			
			 $('#opdCustomTemplateId').val(r.idpattemp);	
			alert("length:: "+r.length)*/
			$("#selCustomizeTempType").val("m");
			CKEDITOR.instances['editorSubjective'].setData(r.template_data);
			setTemplateListByTypemortuary1('m', r.idCustomizeTemplate);
			
		}
 });
}

function setTemplateListByTypemortuary1(value, templateId){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/serv/getTemplateListByType",
		data	: {
			"value" : value
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setCustTemplateList1(r, templateId);
			//setCustTemplateListMortuary(r);
		}
	});
}
function setCustTemplateList1(r, templateId){
	var list="<option value=''>--Select--</option>";
	for ( var i = 0; i < r.pattemplist.length; i++) {

		//list=list+'<option onclick="setMortuarytemp('+r.pattemplist[i].idpattemp+')" value="'+(r.pattemplist[i].idpattemp)+'">'+(r.pattemplist[i].tempname)+'</option>';
		if(r.pattemplist[i].idpattemp == templateId)
			list=list+'<option value="'+(r.pattemplist[i].idpattemp)+'" selected>'+(r.pattemplist[i].tempname)+'</option>';
		else
			list=list+'<option value="'+(r.pattemplist[i].idpattemp)+'">'+(r.pattemplist[i].tempname)+'</option>';
		
	}
	setTimeout(function() {
		$("#selCustomizeTemp").html(list);
	}, 100);

}