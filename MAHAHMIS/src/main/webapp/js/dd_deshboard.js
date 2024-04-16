function fetchDoctorDeskDeshboard(callFrom,pageNumber) {
	var depid = 0;
	var startIndex=0;
	if (callFrom == 'OPDLIST') {
		depid = 1;
		startIndex= (pageNumber-1)+"0";
		  var countpage=$("#countopdpage").val();
		  var countp=countpage-6;
		   for(var k=countp;k <= countpage;k++)
			  {
			  $("#liopd"+k).removeClass('active').addClass('notActive');
			  }
		$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
		
	} else if (callFrom == 'IPDLIST') {
		depid = 2;
		startIndex= (pageNumber-1)+"0";
		var countpage= $("#countipdpage").val();
		 var countp=countpage-6;
		   for(var k=countp;k <= countpage;k++)
			  {
		  $("#liipd"+k).removeClass('active').addClass('notActive');
		  }
	$("#liipd"+pageNumber).removeClass('notActive').addClass('active');
	
	} else if (callFrom == 'ERLIST') {
		depid = -5;
		startIndex= (pageNumber-1)+"0";
		
		var countpage= $("#counterpage").val();
		
		 var countp=countpage-6;
		   for(var k=countp;k <= countpage;k++)
			  {
		  $("#lier"+k).removeClass('active').addClass('notActive');
		  }
	$("#lier"+pageNumber).removeClass('notActive').addClass('active');
	
	} else if (callFrom == 'CLOSEDLIST') {
		depid = 4;
		startIndex= (pageNumber-1)+"0";
	   var  countpage=$("#countclosedpage").val();
	   var countp=countpage-6;
	   for(var k=countp;k <= countpage;k++)
		  {
		  $("#liclosed"+k).removeClass('active').addClass('notActive');
		  }
	$("#liclosed"+pageNumber).removeClass('notActive').addClass('active');
	}
	var inputs = [];
	inputs.push('depid=' + depid);
	inputs.push('startIndex=' + startIndex);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskqueuecontroller/fetchdoctordeskdeshboard",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (callFrom == 'OPDLIST') {
				setOpdDoctorDeskDeshboard(r);
			} else if (callFrom == 'IPDLIST') {
				setIpdDoctorDeskDeshboard(r);
			} else if (callFrom == 'ERLIST') {
				setErDoctorDeskDeshboard(r);
			} else if (callFrom == 'CLOSEDLIST') {
				setClosedDoctorDeskDeshboard(r);
			}
		}
	});
}
function setOpdDoctorDeskDeshboard(r) {
	var htm = "";
	var index = 1;
		var opdcount=$("#unitCountOpd").text();
		
	for (var i = 0; i < r.listRegTreBillDto.length; i++) {
		var date = new Date(r.listRegTreBillDto[i].createdDateTime)
				.toLocaleString();
		htm = htm
				+ '<tr> '
				+ " <td class='col-md-1-1 center' >"
				+ index
				+ '</td>'
				+ " <td class='col-md-2-1 center' style='width:8%;'>"
				+ r.listRegTreBillDto[i].mrnno
				+ "</td>"
				+ " <td class='col-md-2-1 center' style='width:20%;'>"
				+ r.listRegTreBillDto[i].patientName
				+ "</td>"
				+ " <td class='col-md-2-1 center' style='width:10%;'>"
				+ r.listRegTreBillDto[i].age
				+ "/"
				+ r.listRegTreBillDto[i].gender
				+ "</td>"
				+ " <td class='col-md-2-1 center' style='width:10%;'>"
				+ date
				+ "</td>"
				+ " <td class='col-md-1-1 center' style='width:8%;'>"
				+ r.listRegTreBillDto[i].token
				+ "</td>"
				+ "</td>"
				if(r.listRegTreBillDto[i].mlc_id == null || r.listRegTreBillDto[i].mlc_id == undefined || r.listRegTreBillDto[i].mlc_id == "")
				{
				htm = htm+ " <td class='col-md-1-1 center' style='width:5%;'>"
				+ "N"
				+ "</td>"
				}
			else
				{
				htm = htm+ " <td class='col-md-1-1 center' style='width:5%;'>"
				+ "Y"
				+ "</td>"
				}
		htm = htm+ "<td class='col-md-1-1 center' style='width:5%;'>"
				+ "<button onclick=actionDashBoard('"+ r.listRegTreBillDto[i].treatmentId+"','"+ r.listRegTreBillDto[i].patientId+"','OPDID'); type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "</td>" + '</tr>';
		index++;
	}
    var numberOfRows="";
    var indexopd=1;
    var countopdpage=$("#countopdpage").val();
    if(countopdpage == null || countopdpage == undefined || countopdpage == "")
    	{
    var numberOfPages=(opdcount/10);
    var displayPagination=numberOfPages;            
    if(numberOfPages > 5){
        numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
        displayPagination=5;
    }
    for(var j=0;j<displayPagination;j++){
    		if(j == 0)
    		{
    	        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=fetchDoctorDeskDeshboard('OPDLIST',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

    		}
    		else
    		{
    	        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=fetchDoctorDeskDeshboard('OPDLIST',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
    		}
    		indexopd=indexopd+1;
    }
    if(numberOfPages>6){
        numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
   
    $('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages+1))+"</a></li>");
    $('#opdpagenation').html(numberOfRows);
    $("#countopdpage").val(indexopd);
    	}
	$("#setopddoctordeskdeshboard").html(htm);
}


function nextPagination(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=fetchDoctorDeskDeshboard('OPDLIST',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPagination(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=fetchDoctorDeskDeshboard('OPDLIST',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

function setIpdDoctorDeskDeshboard(r) {
	var htm = "";
	var index = 1;
	var ipdcount=$("#unitCountIpd").text();
	for (var i = 0; i < r.listRegTreBillDto1.length; i++) {
		var date = new Date(r.listRegTreBillDto1[i].createdDateTime)
				.toLocaleString();
		htm = htm
				+ '<tr> '
				+ " <td class='col-md-1-1 center'>"
				+ index
				+ '</td>'
				+ " <td class='col-md-2-1 center'>"
				+ r.listRegTreBillDto1[i].mrnno
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ r.listRegTreBillDto1[i].patientName
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ r.listRegTreBillDto1[i].age
				+ "/"
				+ r.listRegTreBillDto1[i].gender
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ date
				+ "</td>"
				+ " <td class='col-md-1-1 center'>"
				+ r.listRegTreBillDto1[i].tokenno
				+ "</td>"
				if(r.listRegTreBillDto1[i].mlc_id == null || r.listRegTreBillDto1[i].mlc_id == undefined || r.listRegTreBillDto1[i].mlc_id == "")
				{
				htm = htm+ " <td class='col-md-1-1 center'>"
				+ "N"
				+ "</td>"
				}
			else
				{
				htm = htm+ " <td class='col-md-1-1 center'>"
				+ "Y"
				+ "</td>"
				}
			
		htm = htm+ "<td class='col-md-1-1 center'>"
				+ "<button onclick=actionDashBoard('"+ r.listRegTreBillDto1[i].treatmentId+ "','"+ r.listRegTreBillDto1[i].patientId+"','IPDID') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "</td>" + '</tr>';
		index++;
	}
	
	var numberOfRows="";
    var indexopd=1;
    var countipdpage=$("#countipdpage").val();
    if(countipdpage == null || countipdpage == undefined || countipdpage == "")
    	{
    var numberOfPages=(ipdcount/10);
    var displayPagination=numberOfPages;            
    if(numberOfPages > 5){
        numberOfRows +="<li style='display:none' class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
        displayPagination=5;
    }
    for(var j=0;j<displayPagination;j++){
    	
    	if(j == 0)
		{
            numberOfRows +="<li class='page-item active' id='liipd"+indexopd+"' onclick=fetchDoctorDeskDeshboard('IPDLIST',"+indexopd+")><a>"+indexopd+"</a></li>";

		}
		else
		{
	        numberOfRows +="<li class='page-item' id='liipd"+indexopd+"' onclick=fetchDoctorDeskDeshboard('IPDLIST',"+indexopd+")><a>"+indexopd+"</a></li>";
		}
    	
        indexopd=indexopd+1;
    }
    if(numberOfPages>6){
        numberOfRows +="<li class='next' onclick='nextPaginationIpd("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    $('#totalNumberOfPagesipd').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages+1))+"</a></li>");
    $('#ipdpagenation').html(numberOfRows);
    $("#countipdpage").val(indexopd);
    	}
	
	$("#setipddoctordeskdeshboard").html(htm);
}

function nextPaginationIpd(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPaginationIpd("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li class='page-item' id='liipd"+j+"' onclick=fetchDoctorDeskDeshboard('IPDLIST',"+j+")><a>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' onclick='nextPaginationIpd("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countipdpage").val(pagecount);
        $('#ipdpagenation').html(numberOfRows);
}


function previousPaginationIpd(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPaginationIpd("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li class='page-item' id='liipd"+j+"'  onclick=fetchDoctorDeskDeshboard('IPDLIST',"+j+")><a>"+j+"</a></li>";
        pagecount++;
    }
        numberOfRows +="<li class='next' onclick='nextPaginationIpd("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    	$("#countipdpage").val(pagecount);
        $('#ipdpagenation').html(numberOfRows);
}

function setErDoctorDeskDeshboard(r) {

	var htm = "";
	var index = 1;
	var unitCountEr=$("#unitCountEr").text();
	for (var i = 0; i < r.listRegTreBillDto.length; i++) {
		var date = new Date(r.listRegTreBillDto[i].createdDateTime)
				.toLocaleString();
		htm = htm
				+ '<tr> '
				+ " <td class='col-md-1-1 center'>"
				+ index
				+ '</td>'
				+ " <td class='col-md-2-1 center'>"
				+ r.listRegTreBillDto[i].mrnno
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ r.listRegTreBillDto[i].patientName
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ r.listRegTreBillDto[i].age
				+ "/"
				+ r.listRegTreBillDto[i].gender
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ date
				+ "</td>"
				+ " <td class='col-md-1-1 center'>"
				+ r.listRegTreBillDto[i].tokenno
				+ "</td>"
				+ "</td>"
				if(r.listRegTreBillDto[i].mlc_id == null || r.listRegTreBillDto[i].mlc_id == undefined || r.listRegTreBillDto[i].mlc_id == "")
					{
					htm = htm+ " <td class='col-md-1-1 center'>"
					+ "N"
					+ "</td>"
					}
				else
					{
					htm = htm+ " <td class='col-md-1-1 center'>"
					+ "Y"
					+ "</td>"
					}
				
		htm = htm	+ "<td class='col-md-1-1 center'>"
				+ "<button onclick=actionDashBoard("+r.listRegTreBillDto[i].treatmentId+",'"+ r.listRegTreBillDto[i].patientId+"','ERID');type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "</td>" + '</tr>';
		index++;
	}
	
	var numberOfRows="";
    var indexopd=1;
    var counterpage=$("#counterpage").val();
    if(counterpage == null || counterpage == undefined || counterpage == "")
    	{
    var numberOfPages=(unitCountEr/10);
    var displayPagination=numberOfPages;            
    if(numberOfPages > 5){
        numberOfRows +="<li style='display:none' class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
        displayPagination=5;
    }
    for(var j=0;j<displayPagination;j++){
    	
    	if(j == 0)
		{
            numberOfRows +="<li class='page-item active' id='lier"+indexopd+"' onclick=fetchDoctorDeskDeshboard('ERLIST',"+indexopd+")><a>"+indexopd+"</a></li>";

		}
		else
		{
	        numberOfRows +="<li class='page-item' id='lier"+indexopd+"' onclick=fetchDoctorDeskDeshboard('ERLIST',"+indexopd+")><a>"+indexopd+"</a></li>";
		}
    	
    	
        indexopd=indexopd+1;
    }
    if(numberOfPages>6){
        numberOfRows +="<li class='next' onclick='nextPaginationEr("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    $('#totalNumberOfPageser').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages+1))+"</a></li>");
    $('#erpagenation').html(numberOfRows);
    $("#counterpage").val(indexopd);
    	}
	$("#seterdoctordeskdeshboard").html(htm);
}

function nextPaginationEr(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPaginationEr("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li class='page-item' id='lier"+j+"' onclick=fetchDoctorDeskDeshboard('ERLIST',"+j+")><a>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' onclick='nextPaginationEr("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    $("#counterpage").val(pagecount);  
    $('#erpagenation').html(numberOfRows);
}


function previousPaginationEr(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPaginationEr("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li class='page-item' id='lier"+j+"' onclick=fetchDoctorDeskDeshboard('ERLIST',"+j+")><a>"+j+"</a></li>";
        pagecount++;
    }
        numberOfRows +="<li class='next' onclick='nextPaginationEr("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#counterpage").val(pagecount);
        $('#erpagenation').html(numberOfRows);
}

function setClosedDoctorDeskDeshboard(r) {
	var htm = "";
	var index = 1;
	var unitCountClosed=$("#unitCountClosed").text();
	for (var i = 0; i < r.listRegTreBillDto.length; i++) {
		var date = new Date(r.listRegTreBillDto[i].createdDateTime)
				.toLocaleString();
		htm = htm
				+ '<tr> '
				+ " <td class='col-md-1-1 center'>"
				+ index
				+ '</td>'
				+ " <td class='col-md-2-1 center'>"
				+ r.listRegTreBillDto[i].mrnno
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ r.listRegTreBillDto[i].patientName
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ r.listRegTreBillDto[i].age
				+ "/"
				+ r.listRegTreBillDto[i].gender
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ date
				+ "</td>"
				+ " <td class='col-md-1-1 center'>"
				if(r.listRegTreBillDto[i].tokenno == null)
					{
					htm = htm+"0"
					}
				else
					{
					htm = htm	+ r.listRegTreBillDto[i].tokenno
					}
			
				htm = htm	+ "</td>"
				+ " <td class='col-md-1-1 center'>"
				if(r.listRegTreBillDto[i].mlc_id == null)
					{
					htm = htm	+ "N"	
					}
				else
					{
					htm = htm	+ "Y"
					}
			
		htm = htm+ "</td>"
				+ "<td class='col-md-1-1 center'>"
				+ "<button onclick=actionDashBoard('"+ r.listRegTreBillDto[i].treatmentId+"','"+ r.listRegTreBillDto[i].patientId+"','CLOSEDID');  type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "</td>" + '</tr>';
		index++;
	}

	var numberOfRows="";
    var indexopd=1;
    var countclosedpage=$("#countclosedpage").val();
    if(countclosedpage == null || countclosedpage == undefined || countclosedpage == "")
    	{
    var numberOfPages=(unitCountClosed/10);
    var displayPagination=numberOfPages;            
    if(numberOfPages > 5){
        numberOfRows +="<li style='display:none' class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
        displayPagination=5;
    }
    for(var j=0;j<displayPagination;j++){
    	if(j == 0)
		{
            numberOfRows +="<li class='page-item active' id='liclosed"+indexopd+"' onclick=fetchDoctorDeskDeshboard('CLOSEDLIST',"+indexopd+")><a>"+indexopd+"</a></li>";

		}
		else
		{
			  numberOfRows +="<li class='page-item' id='liclosed"+indexopd+"' onclick=fetchDoctorDeskDeshboard('CLOSEDLIST',"+indexopd+")><a>"+indexopd+"</a></li>";
		}
        indexopd=indexopd+1;
    }
    if(numberOfPages>6){
        numberOfRows +="<li class='next' id='liclosednext' onclick='nextPaginationClosed("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    $('#totalNumberOfPagesClosed').html("<li id='closednoofpages'><a>No. Of Pages:"+(Math.round(numberOfPages+1))+"</a></li>");
    $('#closedpagenation').html(numberOfRows);
    $("#countclosedpage").val(indexopd);
    	}
	$("#seterdoctordeskdeshboardclosed").html(htm);
}

function nextPaginationClosed(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick=previousPaginationClosed("+currentIndex+","+Math.round(numberOfPages)+")><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li class='page-item' id='liclosed"+j+"' onclick=fetchDoctorDeskDeshboard('CLOSEDLIST',"+j+")><a>"+j+"</a></li>";
        pagecount++;
 }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liclosednext' onclick=nextPaginationClosed("+j+","+Math.round(numberOfPages)+")><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countclosedpage").val(pagecount);
        $('#closedpagenation').html(numberOfRows);
}


function previousPaginationClosed(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick=previousPaginationClosed("+displayPagination+","+Math.round(numberOfPages)+")><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li class='page-item' id='liclosed"+j+"' onclick=fetchDoctorDeskDeshboard('CLOSEDLIST',"+j+")><a>"+j+"</a></li>";
        pagecount++;
    }
        numberOfRows +="<li class='next' id='liclosednext' onclick=nextPaginationClosed("+j+","+Math.round(numberOfPages)+")><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countclosedpage").val(pagecount);
        $('#closedpagenation').html(numberOfRows);
}

function serachDoctorDeskDeshboard(value, callFrom) {
	var selectsearchby = "";
	var depid = 0;
	var serach = "";
	
	if (callFrom == 'OPDLIST') {
		depid = 1;
		selectsearchby = $("#selectsearchopd").val();
		if(value == 'patientopd' )
			{
			serach = $("#patientopd").val();
			}
		else
			{
			serach=value;
			}
		
		if (selectsearchby == 0) {
			alert("Please select serach by");
			return false;
		}

	} else if (callFrom == 'IPDLIST') {
		depid = 2;
		selectsearchby = $("#selectsearchipd").val();
		if(value == 'patientipd' )
		{
		serach = $("#patientipd").val();
		}
	else
		{
		serach=value;
		}
		if (selectsearchby == 0) {
			alert("Please select serach by");
			return false;
		}
	} else if (callFrom == 'ERLIST') {
		depid = -5;
		selectsearchby = $("#selectsearcher").val();
		if(value == 'patienter' )
		{
			serach = $("#patienter").val();
		}
	else
		{
		serach=value;
		}
		
		if (selectsearchby == 0) {
			alert("Please select serach by");
			return false;
		}
	} else if (callFrom == 'CLOSEDLIST') {
		depid = 4;
		selectsearchby = $("#selectsearchclosed").val();
		if(value == 'patientclosed' )
		{
			serach = $("#patientclosed").val();
		}
	else
		{
		serach=value;
		}
		
		if (selectsearchby == 0) {
			alert("Please select serach by");
			return false;
		}
	}

	var inputs = [];
	inputs.push('depid=' + depid);
	inputs.push('selectsearchby=' + selectsearchby);
	inputs.push('value=' + serach);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskqueuecontroller/serachdoctordeskdeshboard",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (callFrom == 'OPDLIST') {
				if (selectsearchby == 1) {
					autoSuggestionAgeSeach(r, value, selectsearchby);
				} else if (selectsearchby == 2) {
					autoSuggestionAgeSeach(r, value, selectsearchby);
				} else if (selectsearchby == 3) {
					autoSuggestionAgeSeach(r, value, selectsearchby);
				} else if (selectsearchby == 4) {
					autoSuggestionAgeSeach(r, value, selectsearchby);
				} else if (selectsearchby == 5) {
					autoSuggestionAgeSeach(r, value, selectsearchby);
				} else if (selectsearchby == 6) {
					autoSuggestionAgeSeach(r, value, selectsearchby);
				}
				setOpdDoctorDeskDeshboard(r);

			} else if (callFrom == 'IPDLIST') {

				if (selectsearchby == 1) {
					autoSuggestionIpdSeach(r, value, selectsearchby);
				} else if (selectsearchby == 2) {
					autoSuggestionIpdSeach(r, value, selectsearchby);
				} else if (selectsearchby == 3) {
					autoSuggestionIpdSeach(r, value, selectsearchby);
				} else if (selectsearchby == 4) {
					autoSuggestionIpdSeach(r, value, selectsearchby);
				} else if (selectsearchby == 5) {
					autoSuggestionIpdSeach(r, value, selectsearchby);
				} else if (selectsearchby == 6) {
					autoSuggestionIpdSeach(r, value, selectsearchby);
				}
				setIpdDoctorDeskDeshboard(r);
			} else if (callFrom == 'ERLIST') {

				if (selectsearchby == 1) {
					autoSuggestionERSeach(r, value, selectsearchby);
				} else if (selectsearchby == 2) {
					autoSuggestionERSeach(r, value, selectsearchby);
				} else if (selectsearchby == 3) {
					autoSuggestionERSeach(r, value, selectsearchby);
				} else if (selectsearchby == 4) {
					autoSuggestionERSeach(r, value, selectsearchby);
				} else if (selectsearchby == 5) {
					autoSuggestionERSeach(r, value, selectsearchby);
				} else if (selectsearchby == 6) {
					autoSuggestionERSeach(r, value, selectsearchby);
				}
				setErDoctorDeskDeshboard(r);
			} else if (callFrom == 'CLOSEDLIST') {

				if (selectsearchby == 1) {
					autoSuggestionClosedSeach(r, value, selectsearchby);
				} else if (selectsearchby == 2) {
					autoSuggestionClosedSeach(r, value, selectsearchby);
				} else if (selectsearchby == 3) {
					autoSuggestionClosedSeach(r, value, selectsearchby);
				} else if (selectsearchby == 4) {
					autoSuggestionClosedSeach(r, value, selectsearchby);
				} else if (selectsearchby == 5) {
					autoSuggestionClosedSeach(r, value, selectsearchby);
				} else if (selectsearchby == 6) {
					autoSuggestionClosedSeach(r, value, selectsearchby);
				}
				setClosedDoctorDeskDeshboard(r);
			}
		}
	});
}

function autoSuggestionAgeSeach(response, inputID, selectsearchby) {
	//alert(inputID);
	var resultData = [];
	var template = "";
	for (var j = 0; j < response.listRegTreBillDto.length; j++) {
		/*var arrValue = response.listRegTreBillDto[j].patientId + "-"
				+ response.listRegTreBillDto[j].patientName;*/
		var arrValue = "";
		if (selectsearchby == 1) {
			arrValue = response.listRegTreBillDto[j].patientId;
		} else if (selectsearchby == 2) {
			arrValue = response.listRegTreBillDto[j].patientName;
		} else if (selectsearchby == 3) {
			arrValue = response.listRegTreBillDto[j].mobile;
		} else if (selectsearchby == 4) {
			arrValue = response.listRegTreBillDto[j].age;
		} else if (selectsearchby == 5) {
			arrValue = response.listRegTreBillDto[j].age;
		} else if (selectsearchby == 6) {
			arrValue = response.listRegTreBillDto[j].age;
		}

		var idValue = response.listRegTreBillDto[j].patientId;
		var patientName = response.listRegTreBillDto[j].patientName;
		resultData.push({
			ID : idValue,
			Name : patientName
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
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

	function displayResult(item) {

		var res = item.text.split('-');
		var pQId = res[0];
		var partyName = res[1];
		serachDoctorDeskDeshboard(pQId, 'OPDLIST');
		$("input#" + inputID).val(partyName);
		$("#" + inputID).val("");
		
	}
}

function autoSuggestionIpdSeach(response, inputID, selectsearchby) {
	var resultData = [];
	var template = "";
	for (var j = 0; j < response.listRegTreBillDto1.length; j++) {
		/*var arrValue = response.listRegTreBillDto[j].patientId + "-"
				+ response.listRegTreBillDto[j].patientName;*/
		var arrValue = "";
		if (selectsearchby == 1) {
			arrValue = response.listRegTreBillDto1[j].patientId;
		} else if (selectsearchby == 2) {
			arrValue = response.listRegTreBillDto1[j].patientName;
		} else if (selectsearchby == 3) {
			arrValue = response.listRegTreBillDto1[j].mobile;
		} else if (selectsearchby == 4) {
			arrValue = response.listRegTreBillDto1[j].age;
		} else if (selectsearchby == 5) {
			arrValue = response.listRegTreBillDto1[j].age;
		} else if (selectsearchby == 6) {
			arrValue = response.listRegTreBillDto1[j].age;
		}

		var idValue = response.listRegTreBillDto1[j].patientId;
		var patientName = response.listRegTreBillDto1[j].patientName;
		resultData.push({
			ID : idValue,
			Name : patientName
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
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

	function displayResult(item) {

		var res = item.text.split('-');
		var pQId = res[0];
		var partyName = res[1];
		serachDoctorDeskDeshboard(pQId, 'IPDLIST');
		$("input#" + inputID).val(partyName);
	}
}

function autoSuggestionERSeach(response, inputID, selectsearchby) {
	var resultData = [];
	var template = "";
	for (var j = 0; j < response.listRegTreBillDto.length; j++) {
		/*var arrValue = response.listRegTreBillDto[j].patientId + "-"
				+ response.listRegTreBillDto[j].patientName;*/
		var arrValue = "";
		if (selectsearchby == 1) {
			arrValue = response.listRegTreBillDto[j].patientId;
		} else if (selectsearchby == 2) {
			arrValue = response.listRegTreBillDto[j].patientName;
		} else if (selectsearchby == 3) {
			arrValue = response.listRegTreBillDto[j].mobile;
		} else if (selectsearchby == 4) {
			arrValue = response.listRegTreBillDto[j].age;
		} else if (selectsearchby == 5) {
			arrValue = response.listRegTreBillDto[j].age;
		} else if (selectsearchby == 6) {
			arrValue = response.listRegTreBillDto[j].age;
		}

		var idValue = response.listRegTreBillDto[j].patientId;
		var patientName = response.listRegTreBillDto[j].patientName;
		resultData.push({
			ID : idValue,
			Name : patientName
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
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

	function displayResult(item) {

		var res = item.text.split('-');
		var pQId = res[0];
		var partyName = res[1];
		serachDoctorDeskDeshboard(pQId, 'ERLIST');
		$("input#" + inputID).val(partyName);
	}
}
function autoSuggestionClosedSeach(response, inputID, selectsearchby) {
	var resultData = [];
	var template = "";
	for (var j = 0; j < response.listRegTreBillDto.length; j++) {
		/*var arrValue = response.listRegTreBillDto[j].patientId + "-"
				+ response.listRegTreBillDto[j].patientName;*/
		var arrValue = "";
		if (selectsearchby == 1) {
			arrValue = response.listRegTreBillDto[j].patientId;
		} else if (selectsearchby == 2) {
			arrValue = response.listRegTreBillDto[j].patientName;
		} else if (selectsearchby == 3) {
			arrValue = response.listRegTreBillDto[j].mobile;
		} else if (selectsearchby == 4) {
			arrValue = response.listRegTreBillDto[j].p_age;
		} else if (selectsearchby == 5) {
			arrValue = response.listRegTreBillDto[j].p_age;
		} else if (selectsearchby == 6) {
			arrValue = response.listRegTreBillDto[j].p_age;
		}

		var idValue = response.listRegTreBillDto[j].patientId;
		var patientName = response.listRegTreBillDto[j].patientName;
		resultData.push({
			ID : idValue,
			Name : patientName
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
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

	function displayResult(item) {

		var res = item.text.split('-');
		var pQId = res[0];
		var partyName = res[1];
		serachDoctorDeskDeshboard(pQId, 'CLOSEDLIST');
		$("input#" + inputID).val(partyName);
	}
}

function serachDateWiseQuque(callFrom) {
	 clearFild();
	var loginDate = "";
	var Tdate="";
	var depid = 0;
	if (callFrom == 'OPDLIST') {
		depid = 1;
		loginDate = $("#fromopdDate").val();
		Tdate = $("#toopdDate").val();
		if (loginDate == null || loginDate == undefined || loginDate == "") {
			alert("Please select fromDate");
			return false;
		}
		if (Tdate == null || Tdate == undefined || Tdate == "") {
			alert("Please select ToDate");
			return false;
		}
	} else if (callFrom == 'IPDLIST') {
		depid = 2;
		loginDate = $("#ipdfromDate").val();
		Tdate = $("#ipdtoDate").val();
		if (loginDate == null || loginDate == undefined || loginDate == "") {
			alert("Please select fromDate");
			return false;
		}
		if (Tdate == null || Tdate == undefined || Tdate == "") {
			alert("Please select ToDate");
			return false;
		}
	} else if (callFrom == 'ERLIST') {
		depid = -5;
		loginDate = $("#fromerDate").val();
		Tdate=$("#toerDate").val();
		if (loginDate == null || loginDate == undefined || loginDate == "") {
			alert("Please select fromDate");
			return false;
		}
		if (Tdate == null || Tdate == undefined || Tdate == "") {
			alert("Please select ToDate");
			return false;
		}
		
	}
	else if (callFrom == 'CLOSEDLIST') {
		depid = 4;
		loginDate = $("#FormDate").val();
		Tdate=$("#ToDate").val();
		if (loginDate == null || loginDate == undefined || loginDate == "") {
			alert("Please select fromDate");
			return false;
		}

		if (Tdate == null || Tdate == undefined || Tdate == "") {
			alert("Please select ToDate");
			return false;
		}
	}
	var inputs = [];
	inputs.push('depid=' + depid);
	inputs.push('fdate=' + loginDate);
	inputs.push('tdate=' + Tdate);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskqueuecontroller/serachdatewisequque",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (callFrom == 'OPDLIST') {
				setOpdDoctorDeskDeshboard(r);
			} else if (callFrom == 'IPDLIST') {
				setIpdDoctorDeskDeshboard(r);
			} else if (callFrom == 'ERLIST') {
				setErDoctorDeskDeshboard(r);
			}
			else if (callFrom == 'CLOSEDLIST') {
				setClosedDoctorDeskDeshboard(r);
			}
		}
	});
}
function actionDashBoard(id,pid,callfrom)
{
	window.location.href = "dd_main_dashboard.jsp?tid="+id+"&callfrom="+callfrom+"&pid="+pid;
}
function doctorDeskPatientCount()
{
	var unitId=$("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskqueuecontroller/doctordeskpatientcount",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#unitCountOpd").text(r.opdcount);
			$("#unitCountIpd").text(r.ipdcount);
			$("#unitCountEr").text(r.ercount);
			$("#unitCountClosed").text(r.closedcount);
			}
		});
}
function refreshDataQuque(id)
{
	$("#patientopd").val("");
	$("#fromopdDate").val("");
	$("#toopdDate").val("");
	
	$("#patientipd").val("");
	$("#ipdfromDate").val("");
	$("#ipdtoDate").val("");
	
	$("#patienter").val("");
	$("#fromerDate").val("");
	$("#toerDate").val("");
	
	$("#patientclosed").val("");
	$("#FormDate").val("");
	$("#ToDate").val("");

	
	
}
function clearFild()
{
	$("#selectsearchopd").val("0");
	$("#patientopd").val("");
	
	$("#selectsearchipd").val("0");
	$("#patientipd").val("");
	
	$("#selectsearcher").val("0");
	$("#patienter").val("");
	
	$("#selectsearchclosed").val("0");
	$("#patientclosed").val("");	
}

function setCurrantDate()
{
	
	$("#fromopdDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#toopdDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#ipdfromDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#ipdtoDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#fromerDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#toerDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#FormDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#ToDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
}
