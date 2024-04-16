function setPatientSearchType(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient UHID Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
		$("#byName").attr("minlength", "10");
		$("#byName").attr("maxlength", "10");
		
	}else if(patSearchType == 4){
		
		$("#byName").attr("placeholder", "Type Patient AddharNo Here");
		$("#byName").attr("minlength", "12");
		$("#byName").attr("maxlength", "12");
	}
}

/***
 * @author Mohd Tarique Aaalam
 * @code to fetch beds info
 * @date 6/1/2018
 * */
// 
function getBedAvailable(hallID) 
{

	var inputs = [];
	inputs.push('action=GetBedAva');
	inputs.push('hallID=' + hallID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "./ehat/ipd/getAvailableBed",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
				},
				success : function(r) {
					
					var ajaxResponse = r;
					$("#allBedObj").val(JSON.stringify(ajaxResponse));
					//var pobj1 = eval('(' + ajaxResponse + ')');
					var pobj1 = r;
				/*	console.log(pobj1);
					return false;*/
					
					var bedNames = '';
					var bedTotal = '';
					var bedOccupied = '';
					var bedVacBtUnavl = '';
					var bedTotUnAvl = '';
					var bedAvlWait = '';
					var bedTotAvl = '';
					var totalPatient = 0;
					for ( var int = 0; int < pobj1.hl.length; int++) {
						var bclean = 0;
						var bedsAvail = 0;
						var bedsUnAvail = 0;
						//var bedsPer = 0;
						var total = 0;

						// if (!pobj1.hl[int].bl) {
						// int++;
						// } else {

						if (undefined === (pobj1.hl[int].bl)) {
							continue;
						}

						if (pobj1.hl[int].bl.length > 0) {

							for ( var int1 = 0; int1 < pobj1.hl[int].bl.length; int1++) {
								if (pobj1.hl[int].bl[int1].bs == '2') {
									bclean++;
								} else if (pobj1.hl[int].bl[int1].bs == '4') {
									bedsAvail++;
								} else if (pobj1.hl[int].bl[int1].bs == '3') {
									bedsUnAvail++;
								}
							}

							total = (pobj1.hl[int].bl.length);

						}
				
						var vacUnavl = bclean;

						bedNames = bedNames
								+ '<td class="col-md-2-1 text-center">	<span id="bedName"><p style="width:100px;height:20px;">'
								+ pobj1.hl[int].hn + '</p></span></td>';

						bedTotal = bedTotal
								+ '<td class="col-md-2-1 text-center">' + total
								+ '</td>';

						bedOccupied = bedOccupied
								+ '<td class="col-md-2-1 text-center">'
								+ bedsUnAvail + '</td>';

						bedVacBtUnavl = bedVacBtUnavl
								+ '<td class="col-md-2-1 text-center">'
								+ vacUnavl + '</td>';

						bedTotUnAvl = bedTotUnAvl
								+ '<td class="col-md-2-1 text-center">'
								+ (bedsUnAvail + vacUnavl) + '</td>';

						bedAvlWait = bedAvlWait
								+ '<td class="col-md-2-1 text-center">'
								+ bclean + '</td>';

						bedTotAvl = bedTotAvl
								+ '<td class="col-md-2-1 text-center">'
								+ bedsAvail + '</td>';

						// calculate total patient
						totalPatient += bedsUnAvail;

					}// /for

					$("#bedAccupiedPer").html(bedNames);
					$("#bedTotals").html(bedTotal);
					$("#bedOccuppieds").html(bedOccupied);
					$("#bedVacBtUnavl").html(bedVacBtUnavl);
					$("#bedTotUnAvl").html(bedTotUnAvl);
					$("#bedAvlWait").html(bedAvlWait);
					$("#bedTotAvl").html(bedTotAvl);
					$("#IPDQueueCount").html(totalPatient);

				} // success
			});
}



function showHideWard()
{	  
	  $("#bedTable").toggle();
	  var name=$("#wardShow").val();
	  if(name=="show beds statistics")
		  {
		  $("#wardShow").val("hide beds statistics");
		  }
	  else{
		  $("#wardShow").val("show beds statistics");
	  }
	  
}

// code to fetch hall type and hall for filter
function getBedAva2(hallID) {
	var inputs = [];
	inputs.push('action=GetBedAva');
	inputs.push('hallID=' + hallID);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "./ehat/ipd/getAvailableBed",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					var ajaxResponse = r;
					$("#allBedObj").val(ajaxResponse);
					var BedsBean = eval('(' + ajaxResponse + ')');
					console.log(BedsBean);
					 setWardType(BedsBean);
				}
			});
};

function setWardType(response)
{
   $("#wardType1").empty();
    $("#wardType1").append("<option value='0'> Select </option>");
    for ( var i = 0; i < response.hl.length; i++) 
        {
    		var org=response.hl[i].ht;
    		if(org!=duplicate)
    			{
    		    var opt="<option id="+(i+1)+" value="+response.hl[i].ht+" class='ctr'>"+response.hl[i].htnm+"</option>";
                $("#wardType1").append(opt);
    			}
            var duplicate=response.hl[i].ht;
        }    
}

function setHallNamesList(wardID) {
	$("#hallTypeSelectID").empty();
	var ajaxResponse = $("#allBedObj").val();
	myArray = JSON.parse(ajaxResponse);
	var hallTypeString = "<option id='' value='0'>--select--</option>";
	var hallTypeString;
	for ( var i = 0; i < myArray.hl.length; i++) {

		if (myArray.hl[i].ht == wardID)
			hallTypeString = hallTypeString + "<option id='' value='"
					+ myArray.hl[i].hi + "'>" + myArray.hl[i].hn + "</option>";
	}
	
	$("#hallTypeSelectID").append(hallTypeString);
};

//newly updated
/************
* @author	: Badrinath Wagh
* @codeFor	: Get for ipd bill patients
 ************/
function getIpdBillPatients2(callform,pageNumber) 
{
	var startIndex = 0;
	$('#opdpagenation').find('.active').removeClass('active');
	/*$("#wt").css("display","inline");
	$("#wn").css("display","inline");
	$("#allBedsBlockWise").css("display","none");
	$('#callfrom').val("list");
	$('#hallTypeSelectID').val(0);
	var callform = 'ipd';
	var inputs = [];
	 inputs.push("callform="+ callform);
	 inputs.push("wardType="+ 0);
	 inputs.push("hallTypeSelectId="+ 0);
	 inputs.push("ward="+ "-");
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdbill/viewIpdbillPatients2",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			console.log(r);
			setIpdbillPatientsTemp2(r);
		}
	});*/
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	$("#ipdBillPatients").html('');

	/*if($("#blockWisePat").hasClass('active'))
	{
		$("#ipdBillPatients").hide();
	}

	if($("#ipdactive").hasClass('active'))
	{
		$("#ipdBillPatients").show();
	}

	if($("#ipdPhyDisc").hasClass('active'))
	{
		$("#ipdBillPatients").show();
	}*/
	
	$("#divType").val("IPDPatient");
	
	$("#wt").css("display","inline");
	$("#wn").css("display","inline");
	//$("#allBedsBlockWise").css("display","none");
	$('#callfrom').val("list");
	$('#hallTypeSelectID').val(0);
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	
	var deptId=2;
	var usertype = "all";
	var letter="";
//	var Type='activePat';
	
	var unit_id = $('#unitId').val();
	
	var activeBlock = "";

	/*if($("#ipdPhyDisc").hasClass('active'))
	{
		activeBlock="ipdPhyDisc";
	}*/
	//var callform ='ipd';
	var inputs = [];
	 inputs.push('unitId=' + unit_id);
	// inputs.push('Type' + Type);
     inputs.push('findText=' + usertype);
     inputs.push('callFrom=' + 'onload');
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     inputs.push('activeBlock=' + activeBlock);
     inputs.push('startIndex=' + startIndex);
     
	var str = inputs.join('&');
	//alert('str*** '+str)
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdPatients/autoSuggestationIpdPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {	
			//alert('res.lstIpdbillPatientsBeds.length**** '+r.lstIpdbillPatientsBeds.length)
			setIpdbillPatientsTemp2(r,pageNumber);
		}
	});

}

//newly updated
/************
* @author	: Badrinath Wagh
* @codeFor	: Get for ipd bill physical discharged
 ************/
function getPhysicalDischargedPatient1(callform,pageNumber) 
{
	/*$("#wt").css("display","inline");
	$("#wn").css("display","inline");
	$("#allBedsBlockWise").css("display","none");
	$('#callfrom').val("list");
	$('#hallTypeSelectID').val(0);
	var callform = 'ipd';
	var inputs = [];
	 inputs.push("callform="+ callform);
	 inputs.push("wardType="+ 0);
	 inputs.push("hallTypeSelectId="+ 0);
	 inputs.push("ward="+ "-");
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdbill/viewIpdbillPatients2",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			console.log(r);
			setIpdbillPatientsTemp2(r);
		}
	});*/
	var startIndex = 0;
	
	$('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	$("#ipdBillPatients").html('');
	
	$("#divType").val("IPDDischargePat");
	
	$("#wt").css("display","inline");
	$("#wn").css("display","inline");
	$("#allBedsBlockWise").css("display","none");
	$('#callfrom').val("list");
	$('#hallTypeSelectID').val(0);

	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	
	var deptId=2;
	var usertype = "all";
	var letter="";
	
	var unit_id = $('#unitId').val();
	//var callform ='ipd';
	
	var activeBlock = "";

	if($("#ipdPhyDisc").hasClass('active'))
	{
		activeBlock="ipdPhyDisc";
	}
	
	var inputs = [];
	 inputs.push('unit_id=' + unit_id);
     inputs.push('findText=' + usertype);
     inputs.push('callFrom=' + callform);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     inputs.push('activeBlock=' + activeBlock);
     inputs.push('startIndex=' + startIndex);
     
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdPatients/autoSuggestationPhyDischarge",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {	
			setIpdbillPatientsTemp2(r,pageNumber);
		}
	});

}

// Getting patient by filter
function getIpdBillPatientsByFilter(id) {
	var startIndex = 0;
	var ward;
	if(id=="wardType1")
		{
			ward="wardwise";
		}
	else
		{
		   ward="bothwise";
		}
	//alert(ward);
	var wardType=$("#wardType1").val();
	var hallTypeSelectId=$("#hallTypeSelectID").val();
	var callform = 'ipd';
	var inputs = [];
	inputs.push("callform=" + callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/viewIpdbillPatientsByFilter",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			console.log(r);
				setIpdbillPatientsTemp2(r,1);
		}
	});

}


//duplicate
/************
* @author	: mohd Tarique Aaalam
* @date		: 30-June-2017
* @codeFor	: Set ipd queue template
 ************/
function setIpdbillPatientsTemp2(res,pageNumber){
	
	var countAuto = (pageNumber - 1) + '1';
	countAuto = Number(countAuto);
	var risingFlow=$("#risingFlow").val();
	
	var count=1;
	var ipdqueueTemp = "<div class='col-sm-12' style='margin-top:-21px; height: 350px; max-height: auto;'>"
		+ "<table class='table table-condensed table-stripped cf' style='overflow-x: scroll;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>#</th>"
		+ "<th class='col-sm-1' style='height: 21.5px; width: 7%;'>MRN No</th>"

		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Patient Name</th>"
		+ "<th class='col-sm-1 center' style='height: 21.5px; width: 5%;display:none;'>UHID</th>"
		+ "<th class='col-sm-1 center' style='height: 21.5px; width: 5%;' id='thCenterPatientId'>UHID</th>"
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;margin-right:1px;'>Mobile No</th>"

		+ "<th class='col-sm-1 center' style='height: 21.5px; width: 3%;'>Age</label></th>"
		+ "<th class='col-sm-1 center' style='height: 21.5px; width: 3%;'>Weight</label></th>"
		
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Admission No</label></th>"
		+ "<th class='col-sm-1'style='height: 21.5px; width: 3%;'>Admission Date/Time</label></th>"
		+ "<th class='col-sm-1'style='height: 21.5px; width: 3%;'>Doctor Name</label></th>"
	
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Ward</th>"
    	+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Hall</th>"
    	+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Self/Sponsor</th>"
		+ "<th class='col-sm-1 center' style='height: 21.5px; width: 4%;'>Bed No</th>"
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Action</th>";
		/*+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Print</th>"*/  // hide for some time

		if(risingFlow == "off"){
			
			ipdqueueTemp = ipdqueueTemp + "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>View Bill</th>";
		}
		
		ipdqueueTemp = ipdqueueTemp + "</tr>";

		if($("#ipdactive").hasClass('active')){
	   for(var indx=0;indx<res.lstIpdbillPatientsBeds.length;indx++){
		var strVale = res.lstIpdbillPatientsBeds[indx].doctor_id;
		var array = strVale.split(",");
		
		
		var fullName=res.lstIpdbillPatientsBeds[indx].patient_name;
		var datetime= new Date(res.lstIpdbillPatientsBeds[indx].created_date_time).toLocaleString('en-GB');
		var NoDoct ="No Doctor";
		ipdqueueTemp=ipdqueueTemp+"<tr>"
		+ "	<td class='col-sm-1' style='height: 21.5px;width: 3%;'>"+countAuto+"</td>"
		+ "	<td class='col-sm-1' id='mrnno"+count+"' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].mrnno+"</td>"
		+ "	<td class='col-sm-1' id='divPi"+count+"' style='height: 21.5px; width: 3%;'>"+fullName+"</td>"																																														
		+ "	<td class='col-sm-1 center' id='divPi"+count+"' style='height: 21.5px; width: 3%;display:none;'>"+res.lstIpdbillPatientsBeds[indx].patient_id+"</td>"
		+ "	<td class='col-sm-1 center' id='divPi"+count+"' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].patient_id+"</td>"																																																																															+"</td>"
		+ "	<td class='col-sm-1' id='divPi"+count+"' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].mobile+"</td>"

		
		+ "	<td class='col-sm-1 center' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].age+"</td>"

		+ "	<td class='col-sm-1 center'  style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].weight+"</td>"
		+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].opdipdno+"</td>"

		+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+datetime+"</td>"
		
		+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].doctorName+"</td>";
		
		/*+ "<label class=''  style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Doctor:"
		+ res.lstIpdbillPatientsBeds[i].doctorName    
		+ "</label>";*/
		
	
	/*	if (strVale !="") {
			
			if (array.length == 1) {
				for ( var k in array) {

					for ( var g = 0; g < res.lstDoctorDto.length; g++) {

						if (array[k] == 0) {
							ipdqueueTemp = ipdqueueTemp
									+ '<td class="col-sm-1" style="height: 21.5px; width: 3%;">'
									+ NoDoct + '</td>';
								break;
						}
						if (array[k] == res.lstDoctorDto[g].doctor_ID) {
							ipdqueueTemp = ipdqueueTemp
									+ '<td class="col-sm-1" style="height: 21.5px; width: 3%;">'
									+ res.lstDoctorDto[g].doc_name + '</td>';

						}
					}
				}
			} else if(array.length > 1) {
				ipdqueueTemp = ipdqueueTemp
						+ '<td class=" col-sm-1" style="height: 21.5px; width: 3%;">'
						+ '<div class="dropdown">'
						+ ' <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">'
						+ '<span class="caret"></span></button>'
						+ '<ul class="dropdown-menu">';
				for ( var k in array) {

					for ( var g = 0; g < res.lstDoctorDto.length; g++) {

						if (array[k] == res.lstDoctorDto[g].doctor_ID) {
							ipdqueueTemp = ipdqueueTemp + '<li>'
									+ res.lstDoctorDto[g].doc_name + '</li>';

						}
					}
				}
				ipdqueueTemp = ipdqueueTemp + '</ul> </div> </td>';
			}
			else{
				ipdqueueTemp = ipdqueueTemp 
						+ '<td class="col-sm-1" style="padding:5px;width:10%;"><button style="font-size:10px" onclick="showDoctors2('+indx+');">'
						+ 'Show Doctors <i  style="font-size:15px;color:SteelBlue;"  id="shBillView'+indx+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="ipdList'+indx+'" class="box border" style="display:none;overflow-y: scroll;padding:5px; width:150px;"> '
						+ '<table>' 
						+ '<tr> ' + '<th width="505Px"> Doctor Name  </th> </tr>';
			
				for ( var k in array) {

					for ( var g = 0; g < res.lstDoctorDto.length; g++) {

						if (array[k] == res.lstDoctorDto[g].doctor_ID) {
							ipdqueueTemp = ipdqueueTemp + '<tr><td>' + res.lstDoctorDto[g].doc_name+'</td>'
							+ '</tr>';
									+ res.lstDoctorDto[g].doc_name + '</li>';

						}
					}
				}
				ipdqueueTemp = ipdqueueTemp +  '</table></div></td>';
			}
			
		}*/
	
			
		/*ipdqueueTemp = ipdqueueTemp
					+ '<td class=" col-sm-1" style="height: 21.5px; width: 3%;">'+NoDoct+'</td>';
		*/
		ipdqueueTemp = ipdqueueTemp
		+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].ht_name+"</td>"
		+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].h_name+"</td>";
		
		if(res.lstIpdbillPatientsBeds[indx].source_type_id==0)
			{
				ipdqueueTemp = ipdqueueTemp
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>Self</td>";
			}
		else
			{
				ipdqueueTemp = ipdqueueTemp 
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].category_name+"</td>";
			}
		ipdqueueTemp = ipdqueueTemp 
		+ "	<td class='col-sm-1 center' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].bname+"</td>"

		+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"

		+ "<button onclick=viewBedWardIPDphyDis("+res.lstIpdbillPatientsBeds[indx].treatment_id+",'IPD',"+res.lstIpdbillPatientsBeds[indx].patient_id +",'"+res.lstIpdbillPatientsBeds[indx].phyDisFlag+"') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		+ "</td>";
		
	/*	+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"
		+ "<button onclick=printIPDFormJsp("+res.lstIpdbillPatients[indx].pId+") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"*/  // hide for some time
		
	/*	+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"
		+ "<button onclick=viewBillForIPDFinalBill("+res.lstIpdbillPatients[indx].treatId+",'finalBill') class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"*/
		
		if(risingFlow == "off"){
		
			ipdqueueTemp = ipdqueueTemp + "	<td class='col-sm-1' style='height: 21.5px;width: 3%;'>"
			+ "	<input type='button' value='View Bill' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
			+ count + "' " + "onclick=gotoBill("+ res.lstIpdbillPatientsBeds[indx].treatment_id +","+ res.lstIpdbillPatientsBeds[indx].invoice_count+") style='font-size: 10px;' />" 
			+ "	</td>";
		}
		
		 +"</tr>";	
		+ "</thead>"
		+ "</table>"
		+ "</div>";
		
		count=count+1;
		countAuto++;
	}
	
	var numberOfRows="";
	var indexopd=1;
	var opdcount =res.activePatCount;
	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;
	var countopdpage=$("#countopdpage").val();
	if(countopdpage == null || countopdpage == undefined || countopdpage == ""){

	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;
	if(pageNumber == 1)
	{
	if(numberOfPages > 5){
	    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	    displayPagination=5;
	}
	for(var j=0;j<displayPagination;j++){
		if(j == Number(pageNumber-1))
			{
		        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getIpdBillPatients2('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

			}
			else
			{
		        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getIpdBillPatients2('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
			}
			indexopd=indexopd+1;
	}
	if(numberOfPages>5){
	    numberOfRows +="<li class='next' onclick='nextPagination45("+indexopd+","+Math.round(numberOfPages+1)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	}

	$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
	$('#opdpagenation').html(numberOfRows);
	
	}
	}
		}
		else if ($("#ipdPhyDisc").hasClass('active')){

			for(var indx=0;indx<res.lstIpdbillPatientsBeds.length;indx++){
				var strVale = res.lstIpdbillPatientsBeds[indx].doctor_id;
				var array = strVale.split(",");
				
				
				var fullName=res.lstIpdbillPatientsBeds[indx].patient_name;
				var datetime= new Date(res.lstIpdbillPatientsBeds[indx].created_date_time).toLocaleString('en-GB');
				var NoDoct ="No Doctor";
				ipdqueueTemp=ipdqueueTemp+"<tr>"
				+ "	<td class='col-sm-1' style='height: 21.5px;width: 3%;'>"+countAuto+"</td>"
				+ "	<td class='col-sm-1' id='mrnno"+count+"' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].mrnno+"</td>"
				+ "	<td class='col-sm-1' id='divPi"+count+"' style='height: 21.5px; width: 3%;'>"+fullName+"</td>"																																														
				+ "	<td class='col-sm-1 center' id='divPi"+count+"' style='height: 21.5px; width: 3%;display:none;'>"+res.lstIpdbillPatientsBeds[indx].patient_id+"</td>"
				+ "	<td class='col-sm-1 center' id='divPi"+count+"' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].patient_id+"</td>"																																																																															+"</td>"
				+ "	<td class='col-sm-1' id='divPi"+count+"' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].mobile+"</td>"

				
				+ "	<td class='col-sm-1 center' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].age+"</td>"

				+ "	<td class='col-sm-1 center'  style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].weight+"</td>"
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].opdipdno+"</td>"

				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+datetime+"</td>"
				
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].doctorName+"</td>";
				
				/*+ "<label class=''  style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Doctor:"
				+ res.lstIpdbillPatientsBeds[i].doctorName    
				+ "</label>";*/
				
			
			/*	if (strVale !="") {
					
					if (array.length == 1) {
						for ( var k in array) {

							for ( var g = 0; g < res.lstDoctorDto.length; g++) {

								if (array[k] == 0) {
									ipdqueueTemp = ipdqueueTemp
											+ '<td class="col-sm-1" style="height: 21.5px; width: 3%;">'
											+ NoDoct + '</td>';
										break;
								}
								if (array[k] == res.lstDoctorDto[g].doctor_ID) {
									ipdqueueTemp = ipdqueueTemp
											+ '<td class="col-sm-1" style="height: 21.5px; width: 3%;">'
											+ res.lstDoctorDto[g].doc_name + '</td>';

								}
							}
						}
					} else if(array.length > 1) {
						ipdqueueTemp = ipdqueueTemp
								+ '<td class=" col-sm-1" style="height: 21.5px; width: 3%;">'
								+ '<div class="dropdown">'
								+ ' <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">'
								+ '<span class="caret"></span></button>'
								+ '<ul class="dropdown-menu">';
						for ( var k in array) {

							for ( var g = 0; g < res.lstDoctorDto.length; g++) {

								if (array[k] == res.lstDoctorDto[g].doctor_ID) {
									ipdqueueTemp = ipdqueueTemp + '<li>'
											+ res.lstDoctorDto[g].doc_name + '</li>';

								}
							}
						}
						ipdqueueTemp = ipdqueueTemp + '</ul> </div> </td>';
					}
					else{
						ipdqueueTemp = ipdqueueTemp 
								+ '<td class="col-sm-1" style="padding:5px;width:10%;"><button style="font-size:10px" onclick="showDoctors2('+indx+');">'
								+ 'Show Doctors <i  style="font-size:15px;color:SteelBlue;"  id="shBillView'+indx+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="ipdList'+indx+'" class="box border" style="display:none;overflow-y: scroll;padding:5px; width:150px;"> '
								+ '<table>' 
								+ '<tr> ' + '<th width="505Px"> Doctor Name  </th> </tr>';
					
						for ( var k in array) {

							for ( var g = 0; g < res.lstDoctorDto.length; g++) {

								if (array[k] == res.lstDoctorDto[g].doctor_ID) {
									ipdqueueTemp = ipdqueueTemp + '<tr><td>' + res.lstDoctorDto[g].doc_name+'</td>'
									+ '</tr>';
											+ res.lstDoctorDto[g].doc_name + '</li>';

								}
							}
						}
						ipdqueueTemp = ipdqueueTemp +  '</table></div></td>';
					}
					
				}*/
			
					
				/*ipdqueueTemp = ipdqueueTemp
							+ '<td class=" col-sm-1" style="height: 21.5px; width: 3%;">'+NoDoct+'</td>';
				*/
				ipdqueueTemp = ipdqueueTemp
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].ht_name+"</td>"
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].h_name+"</td>";
				
				if(res.lstIpdbillPatientsBeds[indx].source_type_id==0)
					{
						ipdqueueTemp = ipdqueueTemp
						+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>Self</td>";
					}
				else
					{
						ipdqueueTemp = ipdqueueTemp 
						+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].category_name+"</td>";
					}
				ipdqueueTemp = ipdqueueTemp 
				+ "	<td class='col-sm-1 center' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatientsBeds[indx].bname+"</td>"

				+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"

				+ "<button onclick=viewBedWardIPDphyDis("+res.lstIpdbillPatientsBeds[indx].treatment_id+",'IPD',"+res.lstIpdbillPatientsBeds[indx].patient_id +",'"+res.lstIpdbillPatientsBeds[indx].phyDisFlag+"') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "</td>";
				
			/*	+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"
				+ "<button onclick=printIPDFormJsp("+res.lstIpdbillPatients[indx].pId+") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
				+ "</td>"*/  // hide for some time
				
			/*	+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"
				+ "<button onclick=viewBillForIPDFinalBill("+res.lstIpdbillPatients[indx].treatId+",'finalBill') class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
				+ "</td>"*/
				
				if(risingFlow == "off"){
				
					ipdqueueTemp = ipdqueueTemp + "	<td class='col-sm-1' style='height: 21.5px;width: 3%;'>"
					+ "	<input type='button' value='View Bill' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
					+ count + "' " + "onclick=gotoBill("+ res.lstIpdbillPatientsBeds[indx].treatment_id +","+ res.lstIpdbillPatientsBeds[indx].invoice_count+") style='font-size: 10px;' />" 
					+ "	</td>";
				}
				
				 +"</tr>";	
				+ "</thead>"
				+ "</table>"
				+ "</div>";
				
				count=count+1;
				countAuto++;
			}
			
			var numberOfRows="";
			var indexopd=1;
			var opdcount =res.phyDisPatCount;
			var numberOfPages=(opdcount/10);
			var displayPagination=numberOfPages;
		//	var countopdpage=$("#countopdpage").val();
		//	if(countopdpage == null || countopdpage == undefined || countopdpage == ""){

		//	var numberOfPages=(opdcount/10);
		//	var displayPagination=numberOfPages;
			if(pageNumber == 1)
			{
			if(numberOfPages > 5){
			    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			    displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				 if(j == Number(pageNumber-1))
					{
				        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getPhysicalDischargedPatient1('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

					}
					else
					{
				        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getPhysicalDischargedPatient1('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
					}
					indexopd=indexopd+1;
			}
			if(numberOfPages>5){
			    numberOfRows +="<li class='next' onclick='nextPagination78("+indexopd+","+Math.round(numberOfPages+1)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}

			$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
			$('#opdpagenation').html(numberOfRows);
			
			}
			
				
		}
	
	ipdqueueTemp=ipdqueueTemp+"</tbody></table></div>";
	$("#ipdBillPatients").html(ipdqueueTemp);
}

function nextPagination78(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPagination78("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getPhysicalDischargedPatient1('onload',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination78("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPagination78(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPagination78("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getPhysicalDischargedPatient1('onload',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination78("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

function nextPagination45(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPagination45("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getIpdBillPatients2('onload',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination45("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPagination45(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPagination45("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getIpdBillPatients2('onload',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination45("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function viewBedWardIPDphyDis(treatmentId,callfrom,pid,phyDisFlag){
	 
	window.location.href = "IPD_DoctorStation2.jsp?" + "tid=" + treatmentId + "&callfrom=" + callfrom+"&pid="+pid+"&phyDisFlag="+phyDisFlag;		
}


/*******************************************************************************
 * @author : Tarique Aalam
 * @date : 9-1-2018
 * @codeFor : View Final Ipd bill of ipd patients
 ******************************************************************************/
function gotoIPDFinalBill(treatId,finalbill,phyDisFlag) {
//alert(finalbill);
	window.location.href = "ehat_ipd_billing.jsp?" + "treatmentId="
			+ encodeURIComponent(treatId)+ "&finalbillIs=" + encodeURIComponent(finalbill)+ "&phyDisFlag=" + encodeURIComponent(phyDisFlag);;
}

/*******************************************************************************
 * @author Tarique Aalam
 * @date 9_1_2018
 * @Code viewDoctorDeskAlldepartment
 ************************************/
function viewDoctorDeskAlldepartment(treatmentId) {

	var depdoctordesk =$("#depdoctordesk").val();

		setTimeout(function() {
			window.location.href = "IPD_DoctorStation.jsp?treatmentId=" + treatmentId  ;
			
		}, 300);

} 

/*******************************************************************************
 * @author : Tarique Aalam
 * @date : 7-2-2018
 * @codeFor : fetch records acoording to filter
 ******************************************************************************/
function getIpdBillPatientsBedsByFilter(id) {
	var hallTypeId=$('#wardType1').val();
	var hallId=$('#hallTypeSelectID').val();
	var filter;
	if(id=="wardType1")
		{
			filter="halltypewise";
		}
	else
		{
			filter="bothwise";
		}
	
	var callform ='ipd';
	var inputs = [];
	inputs.push("callform=" + callform);
	inputs.push("hallTypeId=" + hallTypeId);
	inputs.push("hallId=" + hallId);
	inputs.push("filter=" + filter);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/viewIpdbillPatientsBedsFilter",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			$('#ba3').html(0);
			$('#ba4').html(0);
			$('#bclean2').html(0);
			
			createGraphicalViewBeds(r);
		}
	});

}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : autosuggestion for IPD Blockwise Patients
 ******************************************************************************/ 

function setAutoPatientNameBlock(inputID,callFrom,e) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	

	if(patSearchType == 1 || patSearchType == 3)
	{
		 var key = e.which;
		
		 if(key == 13) {
			
			 getBlockwiseBillInfo(inputID);
		 }
	}else{
		getBlockwiseBillInfo(inputID);
	}
}

/* =============
Code By  : Badrinath Wagh
Code For : get Blockwise Bill Patients Info.
================*/

function getBlockwiseBillInfo(inputID){
	var startIndex = 0;
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	var unit_id = $('#unitId').val();
	var activeBlock = "";

	if($("#ipdPhyDisc").hasClass('active'))
	{
		activeBlock="ipdPhyDisc";
	}
	
	var callFrom=patSearchType;
	var inputs = [];	
	
	
	 inputs.push('unitId=' + unit_id);
     inputs.push('findText=' + findingName);
     inputs.push('callFrom=' + patSearchType);
     inputs.push('activeBlock=' + activeBlock);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     inputs.push('startIndex=' + startIndex);
     
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdPatients/autoSuggestationIpdPatients",
		cache : false,		
		success : function(r) {
			
			if(patSearchType == 1 || patSearchType == 3 ){
				 if(r.lstIpdbillPatientsBeds.length > 0){
					 createGraphicalViewBeds(r);
					 
					 setIpdbillPatientsTemp2(r,1);
				 }
			}
			
			var template = "";
			for ( var j = 0; j < r.lstIpdbillPatientsBeds.length; j++) {
				
				var arrValue = r.lstIpdbillPatientsBeds[j].patient_id +"-"+r.lstIpdbillPatientsBeds[j].patient_name +"-"+r.lstIpdbillPatientsBeds[j].mobile;
				var idValue = r.lstIpdbillPatientsBeds[j].patient_id;
				var patName = r.lstIpdbillPatientsBeds[j].patient_name;
				resultData.push({
					ID : idValue,
					Name : patName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);
				$("#div" + inputID + " .typeahead").show();
				
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
	});
	
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		var wardType = $('#wardTypeHall').val();
		var wardName = $('#wardName').val();
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		getPatientInfoByPatientId1(patId);
			
	}
}


function getPatientInfoByPatientId1(patientId){
	var startIndex = 0;
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	var activeBlock = "";

	if($("#ipdPhyDisc").hasClass('active'))
	{
		activeBlock="ipdPhyDisc";
	}
	var inputs = [];
	var unit_id = $('#unitId').val();
	// inputs.push('unit_id=' + 1);
	inputs.push('unitId=' + unit_id);
     inputs.push('findText=' + patientId);
     inputs.push('callFrom=' + 1);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     inputs.push('activeBlock=' + activeBlock);
     inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdPatients/autoSuggestationIpdPatients",
		cache : false,		
		success : function(r) {
			createGraphicalViewBeds(r);
			
			setIpdbillPatientsTemp2(r,1);
		}
	});
	
}



/*******************************************************************************
 * @author : Tarique Aalam
 * @date : 5-2-2018
 * @codeFor : fetch records for beds
 ******************************************************************************/
function getIpdBillPatientsBlockBeds(callform) {
	var startIndex = 0;
	$("#ipdBillPatients").html('');
	$("#divType").val("IPDBed");
	
	$("#wt").css("display","inline");
	$("#wn").css("display","inline");
	$("#allBedsBlockWise").css("display","inline");
	$('#callfrom').val("block");
	$('#hallTypeSelectID').val(0);
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();

	/*if($("#blockWisePat").hasClass('active'))
	{
		$("#ipdBillPatients").hide();
	}

	if($("#ipdactive").hasClass('active'))
	{
		$("#ipdBillPatients").show();
	}

	if($("#ipdPhyDisc").hasClass('active'))
	{
		$("#ipdBillPatients").show();
	}*/
	
	var deptId=2;
	var usertype = "all";
	var letter="";
	
	var unit_id = $('#unitId').val();
	
	var activeBlock = "blockWise";

	/*if($("#ipdPhyDisc").hasClass('active'))
	{
		activeBlock="ipdPhyDisc";
	}*/
	//var callform ='ipd';
	var inputs = [];
	 inputs.push('unitId=' + unit_id);
     inputs.push('findText=' + usertype);
     inputs.push('callFrom=' + callform);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     inputs.push('activeBlock=' + activeBlock);
     inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdPatients/autoSuggestationIpdPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {	
		createGraphicalViewBeds(r);
	//	getPhysicalDischargedPatient1('onload');
		}
	});
}

function createGraphicalViewBeds(r) {
	
	var totalcount=r.totalBedCount;
	$('#ipdBillPatientsblock').empty();	
	if (r.lstIpdbillPatientsBeds.length > 0) {
		$('#ipdBillPatientsblock').html();
		var bedList = "<table class='table'> <tbody class='col-md-12' style='margin-bottom: 78px;'> ";
		var loopCounter = 0;
		// var bedCount = (BedsBean.hl[0].bn);
		var bedCount = (r.lstIpdbillPatientsBeds.length);

		var row1 = 0;
		var row2 = 0;
		var row3 = 0;

		if (bedCount > 0 && bedCount <= 10) { // 1 to 10
			row1 = bedCount;

		} else if (bedCount > 10 && bedCount <= 20) {
			row1 = 10;
			row2 = bedCount;

		} else if (bedCount > 20 && bedCount <= 30) {
			row1 = 10;
			row2 = 20;
			row3 = bedCount;

		} else if (bedCount > 30) {
			row1 = (Math.round(bedCount / 3.5) + 1);
			row2 = row1 * 2;
			row3 = row1 * 3;
		}
		var bedState2=0;
		var bedState3=0;
		var bedState4=0;		
		var count=1;
		
		for ( var i = 0; i < r.lstIpdbillPatientsBeds.length; i++) {

							/*
							 * loopCounter == 0 || loopCounter == 15 ||
							 * loopCounter == 30 || loopCounter == 45
							 */
			
			var datetime= new Date(r.lstIpdbillPatientsBeds[i].createdDateTime).toLocaleString('en-GB');
			
							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "<tr id='' class=''>";
							}

							if (r.lstIpdbillPatientsBeds[i].bedState == 2) {
								
								bedList = bedList
										+ "<td>"
										+ "<div style='width: 160px; min-height: 200px; background-color: orange; border: 1px solid orange;border: 1px solid orange;padding: 5px;border-radius: 10px;box-shadow: 8px 8px 8px #888;'> "
										+ "<img id=img"+count+" src='images/clean1.png' width='100px' height='80px' style='margin-left: 25px;'"
										/*
										 * + "<img src='images/clean.jpg'
										 * width='100px' height='56px'"
										 */
										+ " onclick='swapImages2("
										+ count
										+ ","
										+ r.lstIpdbillPatientsBeds[i].bedId
										+ ","
										+ r.lstIpdbillPatientsBeds[i].halltypeId
										+ ","
										+ r.lstIpdbillPatientsBeds[i].pIdd 
										+ ","
										+ r.lstIpdbillPatientsBeds[i].treatId 
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; margin-left: 46px;'>Bed Name: "
										+ r.lstIpdbillPatientsBeds[i].bedName + "</label> "
										+ "</div> </td>";
								        bedState2++;
								        $('#bclean2').html(bedState2);
							} else if (r.lstIpdbillPatientsBeds[i].bedState == 4) {

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; min-height: 200px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);padding: 5px;border-radius: 10px;box-shadow: 8px 8px 8px #888;'> "
										+ "<div style='height: 17px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 33px; width: 148px;'>"
										+ "<img id=img"+count+" src='images/bedEmpty1.png' width='40px' height='30px'"
										/*
										 * + "<img src='images/bedEmpty.png'
										 * width='60px' height='30px' "
										 */
										+ " onclick='swapImages2("
										+ count
										+ ","
										+  r.lstIpdbillPatientsBeds[i].bedId 
										+ ","
										+ r.lstIpdbillPatientsBeds[i].halltypeId 
										+ ","
										+ r.lstIpdbillPatientsBeds[i].pIdd 
										+ ","
										+ r.lstIpdbillPatientsBeds[i].treatId 
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>Bed Name: "
										+ r.lstIpdbillPatientsBeds[i].bedName + "</label></div>"
										+ "</div> </td>";
								        bedState4++;
								        $('#ba4').html(bedState4);
							} else if (r.lstIpdbillPatientsBeds[i].bstate == 3) {
								var strVale = r.lstIpdbillPatientsBeds[i].doctor_id;
								var array = strVale.split(","); 

								// for Sponsored Patent Type
								var redDot = "";
								var pay="";
								if(r.lstIpdbillPatientsBeds[i].source_type_id==0)
									{
										pay = pay+"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: -2px;font-size: 9px;'>Self Pay</label>";
									}
								else
									{
										pay = pay+ "<label class='TextFont'  style='width: 148px; height: 15px; color: white; margin-bottom: -2px; height: 15px;font-size: 9px;'>Sponsor Name:"
													+ r.lstIpdbillPatientsBeds[i].category_name 
													+ "</label>"
													+"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: -2px;font-size: 9px;'>Sponsor Pay</label>";
									}
								
							/*	if (bl.bpl[0].objTreat.sdic != 0) {
									redDot = "<label style='float: right; height: 15px; margin-bottom: 0px;'> "
											+ "<img src='images/Red_dot.png' width='13px' height='13px' style='border: 2px solid white;'></images></label> ";

									pay = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>"
											+ bl.bpl[0].objTreat.insuCmpny
											+ "</label>";
								}*/

								// bed allocated to 'patient' or 'relative'
								var bedAllocatedForBedName = "";
								var nameRelative = "";
								var risingFlow = $("#risingFlow").val();
								var datetime= new Date(r.lstIpdbillPatientsBeds[i].created_date_time).toLocaleDateString('en-GB');
								
								// bed allocated to 'patient'
								//if (bl.bpl[0].otrBed.bdalfr == 'P') {

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 150px; margin-bottom: -2px;font-size: 9px;'>"
										    + r.lstIpdbillPatientsBeds[i].patient_name
											+ " "							
											+ "</label>" + redDot;

									bedAllocatedForBedName = "<div class='dropdown' style='margin-top: 0px; height: 33px; width: 148px;'><img id=img"+count+" src='images/bedOcc1.png' width='50px' height='40px'"
							/*				+ " onclick='getIpdBedDetailsForTid2("+r.lstIpdbillPatientsBeds[i].treatId+"),swapImages2("
											+ count
											+ ","
											+ r.lstIpdbillPatientsBeds[i].bedId
											+ ","
											+ r.lstIpdbillPatientsBeds[i].halltypeId 
											+ ","
											+ r.lstIpdbillPatientsBeds[i].pIdd 
											+ ","
											+ r.lstIpdbillPatientsBeds[i].treatId 
											+ ")' "*/
											+ " /> "
											
											 + '<div class="dropdown-content"> '
											 + ' <a  onclick=viewBedWardIPD('+r.lstIpdbillPatientsBeds[i].treatment_id+',"IPD",'+r.lstIpdbillPatientsBeds[i].patient_id +')  > Action</a>';
											
											 if(risingFlow == "off"){
												 
												 bedAllocatedForBedName = bedAllocatedForBedName + ' <a  onclick=gotoBill('+r.lstIpdbillPatientsBeds[i].treatment_id+','+r.lstIpdbillPatientsBeds[i].invoiceCount+')> View Bill</a>';
											 }
											 
											 bedAllocatedForBedName = bedAllocatedForBedName + ' <a  onclick=gotoCoverSheet('+r.lstIpdbillPatientsBeds[i].treatment_id+','+r.lstIpdbillPatientsBeds[i].patient_id+')>  Cover Sheet</a>'  // hide for some time
											 + ' <a  onclick=getIpdBedDetailsForTid2('+r.lstIpdbillPatientsBeds[i].treatment_id+'),swapImages2('
												+ count
												+ ","
												+ r.lstIpdbillPatientsBeds[i].bid
												+ ","
												+ r.lstIpdbillPatientsBeds[i].ht_id 
												+ ","
												+ r.lstIpdbillPatientsBeds[i].patient_id 
												+ ","
												+ r.lstIpdbillPatientsBeds[i].treatment_id 
												+ ')>Shift Bed</a>'
											 + ' </div>'
											
											+ "<label class='TextFont' style='color: white;font-size: 9px;'>Bed Name: "
											+ r.lstIpdbillPatientsBeds[i].bname + "</label></div>";
									
								//} 
								/*else { // bed allocated to 'relative'

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Relative of: "
											+ bl.bpl[0].tit
											+ " "
											+ bl.bpl[0].fn
											+ " "
											+ bl.bpl[0].mn
											+ " "
											+ bl.bpl[0].ln
											+ "</label>";

									bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'> <img src='images/bedOccRelative.png' width='30px' height='25px' "
											+ " onclick='swapImages(this,"
											+ r.lstIpdbillPatientsBeds[i].bedId
											+ ","
											+ r.lstIpdbillPatientsBeds[i].halltypeId
											+ ")' "
											+ " /> "
											+ "<label class='TextFont' style='color: white;'>Bed Name: "
											+ r.lstIpdbillPatientsBeds[i].bedName + "</label></div>";
								}*/

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 160px; min-height: 200px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198);padding: 5px;border-radius: 10px;box-shadow: 8px 8px 8px #888;' id='bbed"
										+ r.lstIpdbillPatientsBeds[i].bid
										+ "'> "
										+ nameRelative
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: -2px; height: 15px;font-size: 9px;'>"
										+ r.lstIpdbillPatientsBeds[i].mrnno 
										+ "</label> "
										+ "<label style='display:none; class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: -2px; height: 15px;font-size: 9px;'>"
										+ r.lstIpdbillPatientsBeds[i].opdipdno 
										+ "</label> "
									/*	+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;font-size: 9px;'>Mobile No:"
										+ r.lstIpdbillPatientsBeds[i].mobile 
										+ "</label> "*/
										+ "<label class='TextFont'  style='width: 148px; height: 15px; color: white; margin-bottom: -2px; height: 15px;font-size: 9px;'>UHID:"
										+ r.lstIpdbillPatientsBeds[i].patient_id 
										+ "</label> "
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; margin-bottom: -2px; height: 15px;font-size: 9px;'>Admited Days:"
										+ r.lstIpdbillPatientsBeds[i].addmit_days 
										+ "</label> "
									/*	+ "<label class='TextFont'  style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;font-size: 9px;'>Ward:"
										+ r.lstIpdbillPatientsBeds[i].hallTypeName 
										+ "</label> "*/
										+ "<label class='TextFont'  style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;font-size: 9px;'>Hall:"
										+ r.lstIpdbillPatientsBeds[i].h_name 
										+ "</label> "
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: -2px;height: 15px;font-size: 9px;'>"
										+ datetime
										+ "</label>"
										
										+ "<label class=''  style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Doctor:"
										+ r.lstIpdbillPatientsBeds[i].doctorName    
										+ "</label> "+ pay;
								
								/*if (strVale !="") {

									if (array.length == 1) {
										for ( var k in array) {

											for ( var g = 0; g < r.lstDoctorDto.length; g++) {
													
												if (array[k] == 0) {
													bedList = bedList
													+ "<label class=''  style='width: 148px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'> Doctor: ------"   
													+ "</label> "+ pay;
														break;
												}
												if (array[k] == r.lstDoctorDto[g].doctor_id) {
													bedList = bedList
													+ "<label class=''  style='width: 193px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Doctor:"
													+ r.lstDoctorDto[g].doc_name    
													+ "</label> "+ pay;

												}
											}
										}
									} else {
										bedList = bedList
												+ "<label class=''  style='width: 148px; height: 15px; color: black; margin-bottom: 5px; height: 15px;font-size:9px;'><span style='color: white;' >Doctor:</span>"
												+ '<div class="dropdown">'
												
												+ ' <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" value="doctor list" style=" height: 20px;">'
												+ '<span class="caret"></span></button>'
												
												+ '<ul class="dropdown-menu">';
										for ( var k in array) {

											for ( var g = 0; g < r.lstDoctorDto.length; g++) {

												if (array[k] == r.lstDoctorDto[g].doctor_ID) {
													bedList = bedList + '<li>'+ r.lstDoctorDto[g].doc_name + '</li>';

												}
											}
										}
										bedList = bedList + '</ul> </div></label><br>'+ pay;
									}
								} else {

									bedList = bedList
									+ "<label class=''  style='width: 148px; height: 15px; color: white; margin-bottom: -8px; height: 15px;font-size:9px;'>Doctor: ------"  
									+ "</label> "+ pay;

								}*/
								
								
								bedList = bedList
										+ bedAllocatedForBedName  
		/*								 +"<div class='dropdown' >"
										 +'<span style="width: 148px; height: 15px; color: white; font-size: 10px;">Goto:</span><button class=" glyphicon glyphicon-off"></button>'
										 + '<div class="dropdown-content"> '
										 + ' <a  onclick=viewBedWard('+r.lstIpdbillPatientsBeds[i].treatId+')> Action</a>'
										 + ' <a  onclick=gotoBill('+r.lstIpdbillPatientsBeds[i].treatId+','+r.lstIpdbillPatientsBeds[i].invoiceCount+')> View Bill</a>'
										 + ' <a  onclick=gotoCoverSheet('+r.lstIpdbillPatientsBeds[i].treatId+')> IPD CoverSheet</a>'  // hide for some time
										 + ' <a  onclick=getIpdBedDetailsForTid2('+r.lstIpdbillPatientsBeds[i].treatId+'),swapImages2('
											+ count
											+ ","
											+ r.lstIpdbillPatientsBeds[i].bedId
											+ ","
											+ r.lstIpdbillPatientsBeds[i].halltypeId 
											+ ","
											+ r.lstIpdbillPatientsBeds[i].pIdd 
											+ ","
											+ r.lstIpdbillPatientsBeds[i].treatId 
											+ ')>Shift </a>'
										 + ' </div>'
										 + '</div>'*/
										
										+"</div>"
										+ "</td>";
								bedState3++;
								 $('#ba3').html(bedState3);
							}

							loopCounter++;

							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "</tr>";
							}
							count++;
						} // end for each function
		
		$('#totalbedscount').html(totalcount);
		bedList = bedList + "</tbody> </table>";
		$('#ipdBillPatientsblock').html(bedList);
		//return bedList;
		count++;
	}
	//Added By Annapurna for total count 
	else{
		$('#totalbedscount').html(totalcount);
		$('#ba3').html(0);
	}
	
}

/*******************************************************************************
 * @author : Tarique Aalam
 * @date : 7-2-2018
 * @codeFor : fetch records acoording to treatment ID
 ******************************************************************************/
function getIpdBedDetailsForTid2(treatment_id,patientId){
	/*$("#tId").val(tid);
	var inputs = [];
	inputs.push('tid=' + tid);
	var str = inputs.join('&');
	
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/registration/getIpdBedDetailsForTid",
	success : function(r) {
		var myObj = JSON.stringify(r);
		$("#divPatId2").html(myObj);
	},
	error :function(r){
		alert("Network Issue!");
		console.log(r);
	}
});*/
	//window.location.href ="ipd_bed_allocation.jsp?"  + "treatId="
	//+ treatment_id +"&callfrom='shiftBed'="+patientId ;
	window.location.href ="ipd_bed_allocation.jsp?"  + "treatId="
	+ treatment_id +"&callFrom='shiftBed'";
}

function swapImages2(picObject, bedID, ht,pId,tId) {
	
	var patinetBedDetals = $("#divPatId2").html();
	var patinetBedDetalsJson = eval('(' + patinetBedDetals + ')');
	//console.log(patinetBedDetalsJson);
	var patientType="";
	var bedStatus ="";
	var picObjectValue ="";
	var bSplit ="";
	var aSplit ="";
	var BedAllocStatus ="";
	var bedId=0;
	if (patinetBedDetals == undefined || patinetBedDetals==""||patinetBedDetals==null) {
		//var pobj = $("#divPatId").html();

		//var pobj1 = eval('(' + pobj + ')');
		 patientType = "P";//$("#pattype").val();
		 bedStatus ="N"; //$("#bedAllocated").val();
		 //picObjectValue = picObject.src; comminte by tarique Aalm
		 picObjectValue=$("#img"+picObject).attr("src");
		 bSplit = picObjectValue.split("bed");
		 aSplit = bSplit.slice(1);
		 BedAllocStatus = "new";//$("#BedAllocStatus").val();
	}else{
		//alert("Json in else");
		//bId,beAllFor,hallId,hallTypeId,isolation
		patientType = patinetBedDetalsJson.beAllFor;
		bedStatus ="Y";
		//picObjectValue = picObject.src;
		picObjectValue=$("#img"+picObject).attr("src");
		bSplit = picObjectValue.split("bed");
		aSplit = bSplit.slice(1);
		
		
		bedId= patinetBedDetalsJson.bId;
		BedAllocStatus = "old";
	}
	
	$("#bedIDPop").val(bedID);

	if (aSplit == "Empty1.png") {
		if (bedStatus == 'N') {

			$(".popup").show();

			// var r = confirm("You Want To Allocate This Bed.");
			// if (r == true) {
			// picObject.src = "images/bedOcc.png";
			// allocateBed(bedID, ht, patientType);
			// }
			// $(".popup").hide();
		}
		if (BedAllocStatus == 'old') {

			$(".popup").show();
			// var r = confirm("You Want To Allocate This Bed.");
			// if (r == true) {
			// picObject.src = "images/bedOcc.png";
			// allocateBed(bedID, ht, patientType);
			// }
		}
	} else {

		if (bedStatus == 'Y') {
			if (bedId == bedID) {

				if (patientType == "R") {
					var p = confirm("You Want To DeAllocate This Bed.");
					if (p == true) {
						picObject.src = "images/bedEmpty1.png";
						deAllocateRelativeBed(bedID, patientType);
					}
				} else {
					var p = confirm("You Want To Shift This Bed. ");
					if (p == true) {
						picObject.src = "images/bedEmpty1.png";
						deAllocateBed2(bedID, ht);
					}else
						{
						// window.location.reload();
						$("#divPatId2").html("");
						
						}
				}
			}
		}
	}

	$(".exit").click(function() {
		$(".popup").hide();
	});
};


function deAllocateBed2(bedID, ht) {

	/*
	 * var inputs = []; inputs.push('action=deAllocateBed');
	 * inputs.push('bedID=' + bedID); inputs.push('tid=' + $("#tid").val()); var
	 * str = inputs.join('&'); jQuery.ajax({ async : true, type : "POST", data :
	 * str + "&reqType=AJAX", url : "BedsServlet", timeout : 1000 * 60 * 5,
	 * catche : false, error : function() { alert("error"); }, success :
	 * function(r) { ajaxResponse = r; // $("#message").html(ajaxResponse);
	 * concor am5
	 */

	$("#BedAllocStatus").val('old');
	$("#DallocBedId").val(bedID);

	alert("Please Select Another Bed.");
	// getBedAva('allBed');

	setTimeout(function() {
		showHallofType2(ht);
	}, 500);

	// $("#bbed" + bedID).hide();
};


function showHallofType2(idht) {
	var pattype = $("#pattype").val();
	if (pattype == 'R') {
		var pobj = $("#divPatId").html();
		pobj1 = eval('(' + pobj + ')');

		if (pattype != pobj1.otrBed.bdalfr) {
			// idht = 'onload';
			$("#bedAllocated").val("N");
		} else {
			$("#bedAllocated").val("Y");
		}
	}
	var hallDetailDiv = $("#hallDetailDiv").val();
	hallDetailDiv = eval('(' + hallDetailDiv + ')');
	if (idht == 'onload') {
		idht = hallDetailDiv.htli[0].idht;
	}
	var allBedObj = $("#allBedObj").val();
	pobj = eval('(' + allBedObj + ')');
	for ( var i = 0; i < pobj.hl.length; i++) {
		if (pobj.hl[i].ht == idht) {
			$("#hl" + pobj.hl[i].hi).show();
			var ba = 0;
			var bclean = 0;
			if (pobj.hl[i].bl != undefined) {
				for ( var j = 0; j < pobj.hl[i].bl.length; j++) {
					if (pobj.hl[i].bl[j].ba == "4") {
						ba++;
					}
					if (pobj.hl[i].bl[j].ba == "2") {
						bclean++;
					}
				}
			}

			$("#ba" + pobj.hl[i].hi).html(ba);
			$("#bclean" + pobj.hl[i].hi).html("Bed Cleaning: " + bclean);
		} else {
			$("#hl" + pobj.hl[i].hi).hide();
		}
	}
	for ( var k = 0; k < hallDetailDiv.htli.length; k++) {

		if (hallDetailDiv.htli[k].idht == idht) {
			$("#ht" + hallDetailDiv.htli[k].idht).css("background-color",
					"#436a9d");
			$("#ht" + hallDetailDiv.htli[k].idht).css("color", "white");
		} else {
			$("#ht" + hallDetailDiv.htli[k].idht).css("background-color",
					"white");
			$("#ht" + hallDetailDiv.htli[k].idht).css("color", "orange");
		}
	}
};


function setBillableBed2() {
	var radBillableBed = $("input[name='radBillableBed']:checked").val();
	if (radBillableBed == "sameBed") {
		$("#divWardType").hide();
		updateBillableBed12();
	} else {
		$("#divWardType").show();
	}
};

function updateBillableBed12() {
	var bedId = $("#bedIDPop").val();
	var hallType;
	var patientType = $("#pattype").val();
	var hallTypeSelectIDBB = 0;

	var radBillableBed = $("input[name='radBillableBed']:checked").val();
	if (radBillableBed == "sameBed") {
		hallTypeSelectIDBB = 0;
		hallType = $("#wardType1").val();
	} else {
		hallTypeSelectIDBB = $("#hallTypeSelectIDBB").val();
		hallType = $("#wardType2").val();
	}
	//alert(bedId, hallType, patientType, hallTypeSelectIDBB);
	allocateBed2(bedId, hallType, patientType, hallTypeSelectIDBB);

	$(".popup").hide();
};


/*function updateBillableBed123() {
	var bedId = $("#bedIDPop").val();
	allocateBed2(bedId);
	$(".popup").hide();
};*/

function allocateBed2(bedID, ht, patientType, billableBedType) {// alert("ID="+$("#treatmentId").val());

	var BedAllocStatus = $("#BedAllocStatus").val();
	var DallocBedId = $("#DallocBedId").val();
	var isolation = 0;
	var pt_Id ='P';
	billableBedType=0;
	var treatmentId= $("#tId").val();
	var unitId =1; //$("#uids").val();
	var userId =1;//$("#userdr_id").val();
	//var $radios = $('input:checkbox[id=txtIsolation]');
//	if ($radios.is(':checked') == true) {
	//	isolation = 1;
	//}
	//if (billableBedType == undefined) {
		//billableBedType = 0;
	//}
	//alert("BedAllocStatus==>"+BedAllocStatus+"  DallocBedId="+DallocBedId)
		var inputs = [];
	inputs.push('ID=' + 0);
	inputs.push('unitId=' + unitId);
	inputs.push('Bed_ID=' + bedID);
	inputs.push('patientType=' + pt_Id);
	inputs.push('Treatment_ID=' + treatmentId);
	inputs.push('createdBy=' + userId);
	inputs.push('BedAllocStatus=' + BedAllocStatus);
	inputs.push('DallocBedId=' + DallocBedId);
	inputs.push('isolation=' + isolation);
	inputs.push('billableBedType=' + billableBedType);
	//return false;
	var str = inputs.join('&');
	alert("Input will str:"+str);
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ipdbed/allocateBedToPatient",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert("error");
				},
				success : function(r) {

					var ajaxResponse = r;
					var jsObj = eval('(' + ajaxResponse + ')');

					alert((jsObj.msg));

					if ((jsObj.msg) == "Bed Allocated Successfully."
							|| (jsObj.msg) == "Bed Shifted Successfully.") {

						if ((jsObj.msg) == "Bed Shifted Successfully.") {
							var bedAllocated = 'Y';
							var pageIncludeType = 'IPD';
							var callFor = "null";

							var ajaxResponse = (jsObj.pl[0]);
							var myObj = JSON.stringify(ajaxResponse);

							/*window.location.href = "IPD_BedWard.jsp?"
									+ "patientId=" + (jsObj.pl[0].pi)
									+ "&treatmentId=" + (jsObj.pl[0].trid)
									+ "&myObj=" + encodeURIComponent(myObj)
									+ "&bedallocated=" + bedAllocated + "&ht="
									+ (jsObj.pl[0].objHall.ht) + "&pattype="
									+ (jsObj.pl[0].otrBed.bdalfr)
									+ "&pageIncludeType=" + pageIncludeType
									+ "&callFor=" + callFor;*/
							
							 location.reload();

						} else if ((jsObj.msg) == "Bed Allocated Successfully.") {
							//ehat_ipd_billing.jsp?treatmentId=34
							// window.location =
							// ("IPD_OldPatientDatabase.jsp?moduleName=ipd&patientID="
							// + $("#pid").val());
							//window.location = ("IPD_BedWardDashboard.jsp");
							window.location.href = "ehat_ipd_billing.jsp?"
								+ "treatmentId=" + (treatmentId.replace(/\s/g, ''));

						}

					} else if ((jsObj.msg) == "This Bed Is Already Allocated For Patient."
							|| (jsObj.msg) == "This Bed Is Already Allocated This Patient.") {

						getBedAva('allBed');

						setTimeout(function() {
							showHallofType2(ht);
						}, 500);

					}

				}
			});

	// document.refresh();
	// window.reload();
};

/************
* @author	: Mohd Tarique Aalam
* @date		: 7-2-2018
* @codeFor	: Filter for for ipd bill patients and beds
 ************/
function filterIpdPatients(id)
{
	var call=$("#callfrom").val();
	if(call=="list")
		{
			getIpdBillPatientsByFilter(id); 
		}
	else
		{
			getIpdBillPatientsBedsByFilter(id);
		}
}

/************
* @author	: Mohd Tarique Aalam
* @date		: 7-2-2018
* @codeFor	: Autosuggesstion for ipd bill patients and beds
 ************/
function autosuggesstion(inputId,callfrom)
{
	$("#allBedsBlockWise").css("display","none");
	var call=$("#callfrom").val();
	if(call=="list")
		{
		autosuggesstionIpdBillPatients2(inputId,callfrom);
		}
	else
		{
		autosuggesstionIpdBillPatientsBlockWise();
		}
}

/************
* @author	: Mohd Tarique Aalam
* @date		: 7-2-2018
* @codeFor	: Autosuggetion for for ipd bill patients
 ************/
function autosuggesstionIpdBillPatients23(inputId,callfrom) {
//alert("hi..");
	var startIndex = 0;
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	var findingName = $("#" + inputId).val();
	var call=$('#callfrom').val();
	var inputs = [];	
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('finalBill=' + "all");
	inputs.push('letter=' + letter);
	inputs.push('startIndex=' + startIndex);
	//var str = inputs.join('&');
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdbill/autosuggesstionviewIpdbillPatients2",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {

				if(call=="list"){
					setIpdbillPatientsTemp2(r,1);
					
				}
				else
					{
					createGraphicalView(r);
					}

		}
	});
}

/************
* @author	: Mohd Tarique Aalam
* @date		: 7-2-2018
* @codeFor	: Autosuggetion for for ipd bill patients
 ************/
function autosuggesstionIpdBillPatientsBlockWise() {
//alert("hi..");
	var usertype ="";
	letter=$("#byName").val();
	var call=$('#callfrom').val();
	var inputs = [];	
	//inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('finalBill=' + "all");
	inputs.push('letter=' + letter);
	//var str = inputs.join('&');
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdbill/autosuggesstionviewIpdbillPatientsBlockWise",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			console.log(r);
			createGraphicalViewBeds(r);
		}
	});
}

function gotoBill(treatId,invoiceCount,phyDisFlag)
{
	if(phyDisFlag != "Y"){
		
		phyDisFlag = "N";
	}
	
	if (invoiceCount > 0) {
		gotoIPDFinalBill(treatId, "finalBill", phyDisFlag);
	} else {
		gotoIPDGeneralBill(treatId, "generalBill", phyDisFlag);
	}
}

/*******************************************************************************
 * @author : Tarique Aalam
 * @date : 9-1-2018
 * @codeFor : View Final Ipd bill of ipd patients
 ******************************************************************************/
function gotoIPDGeneralBill(treatId,generalBill,phyDisFlag) {
//alert(finalbill);
	window.location.href = "ehat_ipd_billing.jsp?" + "treatmentId="
			+ encodeURIComponent(treatId)+ "&finalbillIs=" + encodeURIComponent(generalBill)+ "&phyDisFlag=" + encodeURIComponent(phyDisFlag);
}


/*******************************************************************************
 * @author : Tarique Aalam
 * @date : 26-06-2018
 * @codeFor : View CoverSheet
 ******************************************************************************/
function gotoCoverSheet(treatment_id,patientId) {
//alert(finalbill);
	/*window.location.href = "IPD_CoverSheet2.jsp?" + "treatmentId="
			+ encodeURIComponent(treatment_id);*/
	
	
	window.location.href ="IPD_CoverSheet2.jsp?"  + "tid="
	+ treatment_id +"&callfrom=IPDID&pid="+patientId ;
}

/*******************************************************************************
 * @author : Badrinath Wagh 
 * @date : 06/01/2023
 * @codeFor : Ipd Blockwise Tab
 ******************************************************************************/

function showHideDiv(id)
{
	$("#wardTypeHall").select2('val',0);
	$("#wardName").select2('val',0);
	$("#patSearchType").val(1).trigger('change');
	
	if(id == 'block_wise')
	{
		$("#wardName").removeAttr('onchange');
		$("#wardName").attr("onchange","getIpdBillPatientsBlockBeds('onload')");
		
	} else if(id == 'ipd_active_patient') {

		$("#wardName").removeAttr('onchange');
		$("#wardName").attr("onchange","getIpdBillPatients2('onload','1')");
		
	} else if(id == 'ipdPhyDisc') {

		$("#wardName").removeAttr('onchange');
		$("#wardName").attr("onchange","getPhysicalDischargedPatient1('onload', '1')");
		
	}
	
	$("#ipdBillPatients").show();
	
	/*if($("#blockWisePat").hasClass('active'))
	{
		$("#ipdBillPatients").show();
	}

	if($("#ipdactive").hasClass('active'))
	{
		$("#ipdBillPatients").show();
	}

	if($("#ipdPhyDisc").hasClass('active'))
	{
		$("#ipdBillPatients").show();
	}*/
}



//Added By Annapurna 
function getBedStacticsData() {
	var inputs = [];
	inputs.push('action=GetBedAva');
	//inputs.push('hallID=' + hallID);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "./ehat/ipd/getBedStacticsData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					var ajaxResponse = r;
					$("#allBedObj").val(JSON.stringify(ajaxResponse));
					//var pobj1 = eval('(' + ajaxResponse + ')');
					var pobj1 = r;
				
					
					var bedNames = '';
					var bedTotal = '';
					var bedOccupied = '';
					var bedVacBtUnavl = '';
					var bedTotUnAvl = '';
					var bedAvlWait = '';
					var bedTotAvl = '';
					var totalPatient = 0;
					var arr = [
						'Hall Names', 'Total Beds'
					];
					for ( var int = 0; int < pobj1.lstChargesSlave.length; int++) {
						var bclean = 0;
						var bedsAvail = 0;
						var bedsUnAvail = 0;
						//var bedsPer = 0;
						var total = 0;

						if (undefined === (pobj1.lstChargesSlave[int].listBeds)) {
							continue;
						}

						if (pobj1.lstChargesSlave[int].listBeds.length > 0) {

							for ( var int1 = 0; int1 < pobj1.lstChargesSlave[int].listBeds.length; int1++) {
								if (pobj1.lstChargesSlave[int].listBeds[int1].bs == '2') {
									bclean++;
								} else if (pobj1.lstChargesSlave[int].listBeds[int1].bs == '4') {
									bedsAvail++;
								} else if (pobj1.lstChargesSlave[int].listBeds[int1].bs == '3') {
									bedsUnAvail++;
								}
							}

							total = (pobj1.lstChargesSlave[int].listBeds.length);

						}
				
						var vacUnavl = bclean;

						if(int == 0)
						{
							bedNames = bedNames
									+ '<td class="col-md-2-1 text-center">	<span id="bedName"><p style="width:100px;height:20px;"> Hall Names </p></span></td>';
							
							bedTotal = bedTotal
									+ '<td class="col-md-2-1 text-center">Total Beds</td>';
							
							bedOccupied = bedOccupied
									+ '<td class="col-md-2-1 text-center">Occupied Beds</td>';

							bedVacBtUnavl = bedVacBtUnavl
									+ '<td class="col-md-2-1 text-center">Vacant but unavailable</td>';
		
							bedTotUnAvl = bedTotUnAvl
									+ '<td class="col-md-2-1 text-center">Total Unavailable</td>';
		
							bedAvlWait = bedAvlWait
									+ '<td class="col-md-2-1 text-center">Available With Waiting</td>';
		
							bedTotAvl = bedTotAvl
									+ '<td class="col-md-2-1 text-center">Total Available Beds</td>';
						}
						
						bedNames = bedNames
								+ '<td class="col-md-2-1 text-center">	<span id="bedName"><p style="width:100px;height:20px;">'
								+ pobj1.lstChargesSlave[int].categoryName + '</p></span></td>';

						bedTotal = bedTotal
								+ '<td class="col-md-2-1 text-center">' + total
								+ '</td>';

						bedOccupied = bedOccupied
								+ '<td class="col-md-2-1 text-center">'
								+ bedsUnAvail + '</td>';

						bedVacBtUnavl = bedVacBtUnavl
								+ '<td class="col-md-2-1 text-center">'
								+ vacUnavl + '</td>';

						bedTotUnAvl = bedTotUnAvl
								+ '<td class="col-md-2-1 text-center">'
								+ (bedsUnAvail + vacUnavl) + '</td>';

						bedAvlWait = bedAvlWait
								+ '<td class="col-md-2-1 text-center">'
								+ bclean + '</td>';

						bedTotAvl = bedTotAvl
								+ '<td class="col-md-2-1 text-center">'
								+ bedsAvail + '</td>';

						// calculate total patient
						totalPatient += bedsUnAvail;

					}// /for

					$("#bedAccupiedPer").html(bedNames);
					$("#bedTotals").html(bedTotal);
					$("#bedOccuppieds").html(bedOccupied);
					$("#bedVacBtUnavl").html(bedVacBtUnavl);
					$("#bedTotUnAvl").html(bedTotUnAvl);
					$("#bedAvlWait").html(bedAvlWait);
					$("#bedTotAvl").html(bedTotAvl);
					$("#IPDQueueCount").html(totalPatient);

				} 
			});
}

