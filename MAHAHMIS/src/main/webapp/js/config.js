/*******************************************************************************
 * @author Kishor Lokhande
 * @date 25_May_2017 
 * @code Selecting all chackboxes 
 ******************************************************************************/

function refreshDiv()
{
	//var a=$('#refresh').load(document.URL +  ' #refresh');
	$("#refresh").on("click", function(){
        $("#refresh").load("content.html");
      });
	}

function selectAllCheckBox(){

	var count=$("#liListCount").val();
	
	if($('#selectall').is(":checked")){
		
		$('.untLi').prop('checked', true);
		
		for(var i=0;i<count;i++){
			
			changeClass("untChk"+i,"untLi","untLiChk","unt"+i);
		}
		
	}else{
		
		$('.untLi').prop('checked', false);
		
		for(var i=0;i<count;i++){
			
			changeClass("untChk"+i,"untLi","untLiChk","unt"+i);
		}
		
	}
	}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 26_May_2017 
 * @code Select all units using checkbox.
 ******************************************************************************/
function selectAllCheckBoxdept(){
	
	var countDept=$("#liListCountDept").val();
	
	if( $('#selectallDept').is(":checked"))
	{
		$('.depLi').prop('checked', true);
		for(var i=0;i<countDept;i++){
			
			changeClass("depChk"+i,"depLi","depLiChk","dep"+i);
		}	
	}else
	{
		$('.depLi').prop('checked', false);
		
		for(var i=0;i<countDept;i++){
			
			changeClass("depChk"+i,"depLi","depLiChk","dep"+i);
		}
		
	}
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 26_May_2017 
 * @code Select all units using checkbox.
 ******************************************************************************/
	
	
function selectAllCheckBoxService(){
	
	var countService=$("#liListCountService").val();
	
	if( $('#selectallService').is(":checked"))
	{
		$('.serLi').prop('checked', true);
		for(var i=0;i<countService;i++)
		{
			
			changeClass("serChk"+i,"serLi","serLiChk","ser"+i);
		}	
	}else
	{
		$('.serLi').prop('checked', false);
		
		for(var i=0;i<countService;i++){
			
			changeClass("serChk"+i,"serLi","serLiChk","ser"+i);
		}
		
	}
}
	
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 25_May_2017 
 * @code Removing selected unit.
 ******************************************************************************/

function deleteSelectedUnt(count){
	
	$("#unt"+count).remove();
}
function deleteSelectedDept(count){
	
	$("#dep"+count).remove();
}
function deleteSelectedServ(count){
		
	$("#ser"+count).remove();
}



/*******************************************************************************
 * @author Kishor Lokhande
 * @date 25_May_2017 
 * @code Removing all selected units.
 ******************************************************************************/

function deleteAllSelected(liRmvClass){
		
	$("."+liRmvClass).remove();	
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 26_May_2017 
 * @code Changing Class which is selected
 ******************************************************************************/

function changeClass(chkId,curClass,changeClass,liId){
		
	if($('#'+chkId).is(":checked")){
		
		$("#"+liId).removeClass(curClass);		
		$("#"+liId).addClass(changeClass);	
	}else{
		
		$("#"+liId).removeClass(changeClass );		
		$("#"+liId).addClass(curClass);			
	}	
} 


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 19_May_2017 
 * @code Getting unit masters data
 ******************************************************************************/

function getAllUnit(callFrom) {
	
jQuery
		.ajax({
			async : true,
			type : "POST",
			url : "ehat/unit/fetchUnitList",

			success : function(r) {
				
				if(callFrom=="unitSelectList"){
					
					setTemplateForUnitSelectList(r);
				}else{
					
					//setTempAllService(r);//call template
				}
				 
			}
		});
}

/*******************************************************************************
* @author Kishor Lokhande
* @date 19_May_2017 
* @code Template for fetching data for unit select list
******************************************************************************/

function setTemplateForUnitSelectList(r,callFrom){

var list="<option></option>";

for ( var int = 0; int < r.lstUnit.length; int++) {

	 
		
		list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
	 	
}	
$("#e1").html(list);
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 19_May_2017 
 * @code Setting data in unit select field
 ******************************************************************************/

function unitListSelect(){
		
	var temp= "";
	var uls =$("#e1").val();	
	var ul = $("#e1 option:selected").text();
	
	 
	var flag=0;
	var liLen=$("#liListCount").val();
	for(var i=0;i<liLen;i++){
		
		var hdUl=$("#hdul"+i).val();
		if(hdUl==uls){
			flag=1;
		}
	}
	
	if(flag==1){
		
		alert("Already in list");
	
	}else
	{
		var cnt = $('#units li').length;
		$('#liListCount').val(cnt+1);
		
		 temp= '<li class="untLi" id="unt'+cnt+'">'+  ul +' <input type="hidden" class="untLi1" id="hdul'+(cnt)+'" name="unitList" value="'+uls+'"><div class="col-md-6" style="float:right" > <input type="checkbox" class="untLi" id="untChk'+cnt+'" onchange=changeClass(this.id,"untLi","untLiChk","unt'+cnt+'")>' 
		 +'<div class="col-md-4" style="float:right;padding-top:5px;padding-left:41px"><i class="fa fa-trash-o fa-1x" onclick=deleteSelectedUnt("'+cnt+'") id=unDelete value="DELETE" style="margin-left;cursor: pointer;"> </i>  </div> </div>  </li>';
	}
	
	$("#units").append(temp);
}            

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 19_May_2017 
 * @code Getting data for Department select list
 ******************************************************************************/

function getViewDepts(callFrom) {
	

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dept/viewAllDeptListAll",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(callFrom=="deptSelectList"){
				
				setTemplateForDeptsSelectList(r);
			}else{
				
				//setTempDept(r);//call template
			}
		}
	});
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 19_May_2017 
 * @code Template for fetching data for Department select list
 ******************************************************************************/

function setTemplateForDeptsSelectList(r){
	
	var list1="<option></option>";
	
	
	
	for ( var int = 0; int < r.lstDepts.length; int++) {
		
		
		list1=list1+'<option value="'+(r.lstDepts[int].deptId)+'">'+(r.lstDepts[int].deptName)+'</option>';
	}	
	$("#e2").html(list1);
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 19_May_2017 
 * @code Getting data in Department select field
 ******************************************************************************/

function deptListSelect(){
	var temp1= "";
	
	var dls =$("#e2").val();
	var dlist = $("#e2 option:selected").text();
	var flag=0;
	var liLen=$("#liListCountDept").val();
	for(var i=0;i<liLen;i++){
		
		var hdDl=$("#hddl"+i).val();
		if(hdDl==dls){
			flag=1;
		}
	}
	
	if(flag==1){
		
		alert("Already in list");
	}
		else
		{
			var cntDept = $('#depts li').length;
			$('#liListCountDept').val(cntDept+1);
		
			// temp1= '<li id="dep'+cntDept+'"> '+  dlist +' <input type="hidden" id="dl'+dls+'" name="deptList" value="'+dls+'"> <div class="col-md-6" style="float:right" > <input type="checkbox" class="chkDepts" id="checkyDept"> <div><button class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=depDelete  onclick=deleteSelected("'+cntDept+'")> <i class="fa fa-trash-o"></i> </button> </div> </div> </li>';
	
			
				 temp1= '<li liclass="depLi" id="dep'+cntDept+'">'+  dlist +' <input type="hidden" class="depLi1" id="hddl'+(cntDept)+'" name="deptList" value="'+dls+'"><div class="col-md-6" style="float:right" > <input type="checkbox" class="depLi" id="depChk'+cntDept+'" onchange=changeClass(this.id,"depLi","depLiChk","dep'+cntDept+'")>' 
				 +'<div class="col-md-4" style="float:right;padding-top:5px;padding-left:41px"><i class="fa fa-trash-o fa-1x" onclick=deleteSelectedDept("'+cntDept+'") id=depDelete value="DELETE" style="margin-left;cursor: pointer;"> </i>  </div> </div>  </li>';
				
			 
	}
		$("#depts").append(temp1);
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 19_May_2017 
 * @code Getting data for Service select list
 ******************************************************************************/

function getAllServices(callFrom) {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/serv/fetchServiceList2",
		success : function(r) {
		
			if(callFrom=="servListSelect"){
				
				setTemplateForServiceSelectList(r);
			}else{
				
				//setTempAllService(r);//call template
			}
		}
	});
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 19_May_2017 
 * @code Template for fetching data for Service select list
 ******************************************************************************/

function setTemplateForServiceSelectList(r){
	
	var list2="<option></option>";	
	
	for ( var int = 0; int < r.listService.length; int++) {
		
		list2=list2+'<option value="'+(r.listService[int].serviceId)+'">'+(r.listService[int].serviceName)+'</option>';
	}	
	$("#e4").html(list2);
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 19_May_2017 
 * @code Template for setting data in Service select field
 ******************************************************************************/

function servListSelect(){
	
	var temp2="";
	var sls =$("#e4").val();
	
	var slist = $("#e4 option:selected").text();
	var flag=0;
	var liLen=$("#liListCountService").val();
	for(var i=0;i<liLen;i++){
		
		var hdSl=$("#hdsl"+i).val();
		if(hdSl==sls){
			flag=1;
		}
	}
	
	if(flag==1){
		
		alert("Already in list");
	}
	else{
		
		var cntServ = $('#services li').length;
		$('#liListCountService').val(cntServ+1);
		
		//temp2= '<li id="ser'+cntServ+'"> '+  slist +' <input type="hidden" id="sl'+sls+'" name="serviceList" value="'+sls+'"> <div class="col-md-6" style="float:right" > <input type="checkbox" class="chkService" id="checkyService"></div> <div><button class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=serDelete  onclick=deleteSelected("'+cntServ+'")> <i class="fa fa-trash-o"></i> </button> </div> </li>';		
	
			
		
		 temp2= '<li class="serLi" id="ser'+cntServ+'">'+  slist +' <input type="hidden" class="serLi1" id="hdsl'+(cntServ)+'" name="serviceList" value="'+sls+'"><div class="col-md-6" style="float:right" > <input type="checkbox" class="serLi" id="serChk'+cntServ+'" onchange=changeClass(this.id,"serLi","serLiChk","ser'+cntServ+'")>' 
		 +'<div class="col-md-4" style="float:right;padding-top:5px;padding-left:41px"><i class="fa fa-trash-o fa-1x" onclick=deleteSelectedServ("'+cntServ+'") id=serDelete value="DELETE" style="margin-left;cursor: pointer;"> </i>  </div> </div>  </li>';
	
	}	
	
	$("#services").append(temp2);
	        	
}



/***********
 * @author	: Sagar Kadam
 * @date	: 24-May-2017
 * @reason	: saving master config list into db from ui
 **********/
 		
function saveMasterConfig(callForm){
	
	var	listService =[];
	var	lstDepts = [];
	var ulist={lstUnit:[]};
	var countVal=$("#setcount").val();
	
	if($("#units li").length==0){
		
		alert("Select Unit Master Please!!");
		return false;
	}
	
	if($("#depts li").length==0){
			
			alert("Select Department Master Please!!");
			return false;
		}
		
	if($("#services li").length==0){
		
		alert("Select Services Master Please!!");
		return false;
	}
	
	//unit list
	    $(".untLi1").each(function() {
		 val=$(this).val();
		 
		 ulist.lstUnit.push({
			    unitId	: val,
			    lstDepts: lstDepts	
		}); 	
		
	});
	   //deplist	
	   $(".depLi1").each(function() {
		 val=$(this).val();
		 
		  
		 lstDepts.push({
				 deptId	:val,
				 
			listService : listService
			});
	});
	
	  //serviceList
	  $(".serLi1").each(function() {
		 val=$(this).val();
	  
		 listService.push({
		   serviceId	: val	 
			});
	});
		
	  ulist = JSON.stringify(ulist);
		//alert(ulist);
		 jQuery.ajax({
			    async	: true,
			     type	: "POST",
			 
			     data 	: {
			  "ulist" 	: ulist,
			"setcount"	:countVal
			},
			      url 	: "ehat/masterconfig/saveConfigMaster",
			  timeout 	: 1000 * 60 * 5,
			   cache 	: false,
			   error 	: function() {
				//alert('error');
			},
			  success 	: function(r) {
				//ajaxResponse = r;
				  msg = "duplicate department.....plz remove unit";
				  msg2 = "Oops Some Problem Ocured";
 				if(r==msg || r==msg2){
 					getConfigTemp();
 					alertify.error(r);
 				}else{
 					alertify.success(r);
					callForm=0;
					getConfigTemp();
					resetUlList(callForm);
				}
				
				
				//refreshPage();
			}
		}); 
} 

/***********
 * @author	: Sagar Kadam
 * @date	: 24-May-2017
 * @reason	: To get master config list from db
 **********/
function getAllConfigMasterList(count) {
	
	$("#setcount").val(count);
	var configCount=count;
	var inputs = [];
	inputs.push('configCount=' + configCount);
	var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data    : str + "&reqType=AJAX",
		url 	: "ehat/masterconfig/getConfigMasterListByCount",
		error 	: function() {
			alert('error');
		},
		success : function(r) {
						
			configSelectList(r,count);
			console.log(r);	 
		}
	});
}

/***********
 * @author	: Sagar Kadam
 * @date	: 24-May-2017
 * @reason	: To reset the ul list elements
 **********/

function resetUlList(callForm){
	
	 
   $("#services").html("");
   $("#depts").html("");
   $("#units").html("");
   if(callForm==0){
	    
   $("#setcount").val(0);
	}
}


/***********
 * @author	: Sagar Kadam
 * @date	: 24-May-2017
 * @reason	: To show list on masterconfig ui from db
 **********/
function configSelectList(r,count){
	resetUlList(count);
	
	
	for ( var i = 0; i < r.lstConfigMaster[0].lstUnit.length; i++) {
		 
		  var cnt = $('#units li').length;
		
		  $('#liListCount').val(cnt+1);
		  temp1= '<li class="untLi" id="unt'+cnt+'">'+  r.lstConfigMaster[0].lstUnit[i].unitName +' <input type="hidden" class="untLi1" id="ul'+(cnt)+'" name="unitList" value="'+r.lstConfigMaster[0].lstUnit[i].unitId+'"><div class="col-md-6" style="float:right" > <input type="checkbox" class="untLi" id="untChk'+cnt+'" onchange=changeClass(this.id,"untLi","untLiChk","unt'+cnt+'")>'
		  +'<div class="col-md-4" style="float:right;padding-top:5px;padding-left:41px"><i class="fa fa-trash-o fa-1x" onclick=deleteSelectedUnt("'+cnt+'") id=unDelete value="DELETE" style="margin-left;cursor: pointer;"> </i>  </div> </div>  </li>';	
		  $("#units").append(temp1); 
		
	}

	deptListSelect1(r);
	}
	function deptListSelect1(r){
		
		for ( var i = 0; i < r.lstConfigMaster[0].lstDept.length; i++) {
			   var cntDept = $('#depts li').length;
		    	$('#liListCountDept').val(cntDept+1);
			
			    temp2= '<li class="depLi" id="dep'+cntDept+'">'+  r.lstConfigMaster[0].lstDept[i].deptName +'  <input type="hidden" class="depLi1" id="dl'+(cntDept)+'" name="deptList" value="'+r.lstConfigMaster[0].lstDept[i].deptId+'"><div class="col-md-6" style="float:right" > <input type="checkbox" class="depLi" id="depChk'+cntDept+'" onchange=changeClass(this.id,"depLi","depLiChk","dep'+cntDept+'")>'
			    +'<div class="col-md-4" style="float:right;padding-top:5px;padding-left:41px"><i class="fa fa-trash-o fa-1x" onclick=deleteSelectedDept("'+cntDept+'") id=depDelete value="DELETE" style="margin-left;cursor: pointer;"> </i>  </div> </div>  </li>';			
			    $("#depts").append(temp2);
		}
		 
	serviceListSelect1(r);
	}
		function serviceListSelect1(r){	
			
			for ( var i = 0; i < r.lstConfigMaster[0].lstService.length; i++) {
					var cntServ = $('#services li').length;
					   $('#liListCountService').val(cntServ+1);
					   temp3= '<li class="serLi" id="ser'+cntServ+'">'+  r.lstConfigMaster[0].lstService[i].serviceName +' <input type="hidden" class="serLi1" id="sl'+(cntServ)+'" name="serviceList" value="'+r.lstConfigMaster[0].lstService[i].serviceId+'"> <div class="col-md-6" style="float:right" > <input type="checkbox" class="serLi" id="serChk'+cntServ+'" onchange=changeClass(this.id,"serLi","serLiChk","ser'+cntServ+'")>'
					   +'<div class="col-md-4" style="float:right;padding-top:5px;padding-left:41px"><i class="fa fa-trash-o fa-1x" onclick=deleteSelectedServ("'+cntServ+'") id=serDelete value="DELETE" style="margin-left;cursor: pointer;"> </i>  </div> </div>  </li>';					
					   $("#services").append(temp3);
	 
					}
			}
	
/***********
 * @author	: Sagar Kadam
 * @date	: 24-May-2017
 * @reason	: To get config count from db and set temp on ui
 **********/

function getConfigTemp() {
	jQuery.ajax({
		async : true,
	     type : "POST",
		  url : "ehat/masterconfig/getConfigMasterCount",
		error : function() {
			alert('error');
		},
	  success : function(r) {
			 
		       console.log(r);

			   setConfigTemp(r); // to show ajax response on ui
		}
	});
}


/***********
 * @author	: Sagar Kadam
 * @date	: 24-May-2017
 * @reason	: To set temp on ui
 **********/
function setConfigTemp(r) {
	var htm = '<thead id="ehatTHead1">'
		        +'<tr>'
		        + '<th class="col-md-1 center">#</th>'
		        + '<th class="col-md-1 center">Config Name</th>'
		 
		        + '<th class="col-md-1 center">Select</th>'
		 
	        	+ '</tr></thead>';
	var index = 1;
	for ( var i = 0; i < r.lstConfigMaster.length; i++) {
		htm = htm
				+ "<tr> "
				+ "<td class='col-sm-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td><td class='col-sm-7 center' id='configName"
				+r.lstConfigMaster[i]
				+ "' style='height: 21.5px;'>"
				 
				+"ConfigMaster"+r.lstConfigMaster[i]
				+ "</td><td class='col-sm-2 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success  ' onclick='getAllConfigMasterList("
				+ r.lstConfigMaster[i]
				+ ")' > <i class='fa fa-edit'></i></button></td>"
	        	+ "<td class='col-sm-2 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfigMaster' onclick='deleteConfigMaster("
	        	+ r.lstConfigMaster[i]
	        	+ ")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		 
index++;
	}
	 
	$("#ehatTable1").html(htm);
}



function  deleteConfigMaster(confcnt) {
	//alert("in js" );
	var r = confirm("Are You Sure !!You Want To Delete Config Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url  : "ehat/masterconfig/deleteConfigMaster",
			data : {
	   "confcnt" : confcnt
			},
	     timeout : 1000 * 60 * 5,
		   cache : false,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
		     		alertify.error(response);
		     		resetUlList();
				    getConfigTemp();
				 	 
			}
		});
	}
}


/***********
 * @author	: Sagar Kadam
 * @date	: 24-May-2017
 * @reason	: To get master config list from db
 **********/
function getConfigMasterListByUnitId(count) {
	
	alert("hi");
	var cnt=$("#setcount").val();
	
	alert(cnt);
	var response="";
	var ulist={lstUnit:[]};

	 $(".untLi1").each(function() {
		 val=$(this).val();
		 ulist.lstUnit.push({
			    unitId	: val,
		 
		});
		
	});
	 
	 
	 $(".depLi1").each(function() {
		 val1=$(this).val();
		 
		 /* 
		 lstDepts.push({
				 deptId	:val1
				 
			 
			});*/
	});
 
	 ulist = JSON.stringify(ulist);
	  
	 
	 	var inputs = [];
		inputs.push("ulist="+ encodeURIComponent(ulist));
		inputs.push("configCount="+ encodeURIComponent(cnt));
		
		var str = inputs.join('&');
 			jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url 	: "ehat/masterconfig/getConfigMasterListByUnitId",
			error 	: function() {
			alert('error');
			},
			success : function(r) {
						
				for ( var i = 0; i < r.lstConfigMaster.length; i++) {
					
				if(r.lstConfigMaster[i].deptId==val1){
					
				//	alert("duplicate dept........");
					response="false";
					
					 
					
				}
					
					
					
				}
				
			//configSelectList(r);
			console.log(r);	 
		}
	});
 			return response;
}



