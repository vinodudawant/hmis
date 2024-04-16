/*****
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     : For saving item master details 
 * *******/
function saveitemmaster(){


	var subId = $("#subId").val();
	hospitalUnitId = $("#uId").val();;

	var categoryName = $("#itemName").val();
	var codeName = $("#codename").val();
	var isCategory ='N';
	var serviceId = $('#serviceid').val();

	var selfId = 0;
	var charges = $("#price").val();
	var isModify = 'Y';
	var cgscode  =codeName;
	
	if (subId == "" || subId == null || subId == undefined) {
		subId = 0;
	}

	if (categoryName == "" || categoryName == "undefined"
			|| categoryName == null) {

		$("#itemName").focus();
		alertify.success("Please insert Item Name!! ");
		return false;
	}
	
	if (charges == "" || charges == "undefined"
		|| charges == null || charges == 0) {

	   $("#price").focus();
	   alertify.success("Please insert Price!! ");
	   return false;
    }


	if (serviceId == "" || serviceId == null || serviceId == undefined || isNaN(serviceId)) {
		serviceId = 0;
	}
	
	if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
		charges = 0;
	}
	var subservicelist = {
			lstSubService : []
	};
	subservicelist.lstSubService.push({
		subId        : subId,
		categoryName : categoryName,
		codeName     : codeName,
		isCategory   : isCategory,
		serviceId    : serviceId,
		selfId       : selfId,
		charges      : charges,
		isModify	 : isModify,
		cgscode      : cgscode
	});
	
	
	subservicelist     = JSON.stringify(subservicelist);
	
	var inputs = []; 
	inputs.push('hospitalUnitId=' +  encodeURIComponent(hospitalUnitId));
	inputs.push('subservicelist=' +  encodeURIComponent(subservicelist));
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subservice/saveSubService",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			window.location.reload(true);

		}
	});

}
/*****
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For getting  item master details list
 * *******/
function getlistCanteenMaster() {
	var serviceId = $('#serviceid').val();
	var selfId = 0;

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceByIdcom",
		data : {
			"masterId" : parseInt(serviceId),
			"selfId" : parseInt(selfId)
		},
		success : function(r) {
			
			setlistCanteenMaster(r);
		}
	});
}
/*****
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For setting  item master details list
 * *******/
function setlistCanteenMaster(res){
	
	var result = '';

	for ( var i = 0; i < res.lstSubService.length; i++) {

		var charges = res.lstSubService[i].charges;
		var subId = res.lstSubService[i].subId;
		//var serviceId = res.lstSubService[i].serviceId;
		var categoryName = res.lstSubService[i].categoryName;
		var codeName = res.lstSubService[i].codeName;
		

		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ subId
				+ '</td> '
				+ '	<td id="chname'+subId+'">'
				+ categoryName
				+ '</td> '
				
				+ '	<td id="charges'+subId+'">'
				+ charges
				+ '</td> '
				
				+ '	<td id="coName'+subId+'">'
				+ codeName
				+ '</td> '

				+ '<td><button id="btnEdit" class="btn btn-xs btn-success" onclick="editcanteenmaster('
				+ subId
				+ ')" value="EDIT">'
				+ '<i class="fa fa-edit"></i></button></td>'

				+ '<td><button id="btnDelete" class="btn btn-xs btn-success" onclick="deletecanteenMaster('
				+ subId
				+ ')" value="DELETE">'
				+ '<i class="fa fa-trash-o"></i></button></td>'

				

				

				+ '</tr> ';

	}

	$("#canteenmaster").html(result);
}
/*****
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For edit item master
 * *******/
function editcanteenmaster(subId){
	$('#itemName').val($('#chname' + subId).html());
	$('#codename').val($('#coName' + subId).html());
	$('#price').val($('#charges' + subId).html());
	$('#subId').val(subId);
}
/*****
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For delete item master
 * *******/
function deletecanteenMaster(subId) {

	var r = confirm("Are You Sure You Want To Delete ?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subservice/deleteSubService",
			data : {
				"subId" : parseInt(subId)
			},
			
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				alert(r);
				getlistCanteenMaster();
			}

		});
	}
}
/*****
 * @author   :BILAL
 * @Date     :17-03-2018
 * @Code     :For auto complete  item master
 * *******/
function autosugetionMaster(inputId) {
	
	
	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/subservice/getcateenservices",
		
		success : function(r) {
			
			setlistCanteenMaster(r);
			
		}
	});
} 