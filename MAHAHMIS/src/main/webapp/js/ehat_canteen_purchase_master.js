/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     : For saving item master details 
 * *******/
function saveitemmaster() {

	var purId = $("#subId").val();

	var itemName = $("#itemName").val();
	var itemCode = $("#codename").val();
	var isCategory = $("input:radio[name='privilegesType']:checked").val();
	var selfId = 0;
	var liSize = $("#dynamicItem li").length;
	selfId = $("#li" + (liSize - 1)).val();

	if (purId == "" || purId == null || purId == undefined) {
		purId = 0;
	}

	if (itemName == "" || itemName == "undefined" || itemName == null) {

		$("#itemName").focus();
		alertify.success("Please insert Item Name!! ");
		return false;
	}
	
	if(isCategory == "N" ){
		if (liSize == 0) {
			alert("Please Select Atleast one category !!");
			return false;
		}
	}
	var itemlist = {
		lstmaster : []
	};
	itemlist.lstmaster.push({
		purId : purId,
		isCategory : isCategory,
		selfId : selfId,
		itemName : itemName,
		itemCode : itemCode

	});

	itemlist = JSON.stringify(itemlist);

	var inputs = [];

	inputs.push('itemlist=' + encodeURIComponent(itemlist));

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/savepurchase",
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
 * @Date     :03-04-2018
 * @Code     :For getting list of records 
 * *******/
function getlistCanteenMaster() {
	
	jQuery.ajax({
		type : "GET",
		url : "ehat/canteen/getlistpurchasem",
		
		success : function(r) {
			
			setlistCanteenMaster(r);
		}
	});
}
/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For setting list of records 
 * *******/
function setlistCanteenMaster(res){
	
	var result = '';

	for ( var i = 0; i < res.lstmaster.length; i++) {

		var purId = res.lstmaster[i].purId;
		var itemName = res.lstmaster[i].itemName;
		var itemCode = res.lstmaster[i].itemCode;
		var isCategory= res.lstmaster[i].isCategory;
		

		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ purId
				+ '</td> '
				+ '	<td id="chname'+purId+'">'
				+ itemName
				+ '</td> '
				
				+ '	<td id="coName'+purId+'">'
				+ itemCode
				+ '</td> '
				+'<input type="hidden" value="'+isCategory+'" id="isCat'+purId+'">'
				
				+ '<td><button id="btnEdit" class="btn btn-xs btn-success" onclick="editcanteenmaster('
				+ purId
				+ '),fetchCanteen('+purId+');" value="EDIT">'
				+ '<i class="fa fa-edit"></i></button></td>'

				+ '<td><button id="btnDelete" class="btn btn-xs btn-success" onclick="deletecanteenMaster('
				+ purId
				+ ')" value="DELETE">'
				+ '<i class="fa fa-trash-o"></i></button></td>'

				

				

				+ '</tr> ';

	}

	$("#canteenmaster").html(result);
}
/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For edit or update the CANTEEN purchase details
 * *******/
function editcanteenmaster(subId){
	$('#itemName').val($('#chname' + subId).html());
	$('#codename').val($('#coName' + subId).html());
	$('#subId').val(subId);
	
	var cat = $('#isCat' + subId).val();
	if (cat == "Y") {
		$('input[name="privilegesType"][value="Y"]').prop('checked', true);
		$('input[name="privilegesType"][value="N"]').prop('checked', false);
	} else {
		$('input[name="privilegesType"][value="Y"]').prop('checked', false);
		$('input[name="privilegesType"][value="N"]').prop('checked', true);
		
	}
	
}
/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For edit or update the CANTEEN purchase details
 * *******/
function fetchCanteen(purId) {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			"purId" : parseInt(purId)
		},
		url : "ehat/canteen/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForList2('dynamicItem', response);
		}
	});
}

/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For edit or update the CANTEEN purchase details
 * *******/
function setDyanamicDivForList2(setDiv, response) {
	
	
	var htm = "";
	for ( var i = 0; i < response.lstmaster.length; i++) {
		var count = i;
		var name = response.lstmaster[i].itemName;
		var id = response.lstmaster[i].purId;
		htm = htm
				+ '<li class="select2-search-choice" id="liItme'
				+ i
				+ '">'
				+ '<div>'
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild2('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="li' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';
	}
	$('#' + setDiv).html(htm);
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
			url : "ehat/canteen/deletepurchase",
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
 * @Date     :03-04-2018
 * @Code     :For fetching all categories whose self id zero and is category Y 
 * *******/
function fetchAllCategory(){

	jQuery.ajax({
		type : "GET",
		url : "ehat/canteen/getAllcategory",
		success : function(response) {
			
			multiSelect2(response);
		}
	});

}
/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For fetching all categories whose self id greater than zero and is category Y 
 * *******/
function fetchSubAllCategory(selfId) {

	
	jQuery.ajax({
		type : "GET",
		url : "ehat/canteen/getpurBySelfId",
		data : {
			
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			
			multiSelectSlave2(response);
		}
	});
}
/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For setching all categories whose self id  than zero and is category Y 
 * *******/
function multiSelect2(res) {

	var list = "<option></option>";

	for ( var i = 0; i < res.lstmaster.length; i++) {

		list = list + '<option value="' + (res.lstmaster[i].purId)
				+ '">' + (res.lstmaster[i].itemName) + '</option>';
	}
	$("#listmstr_select").html(list);
}

/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For setching all categories whose self id  than zero and is category Y 
 * *******/
function setDyanamicDiv2(setDiv, getDiv) {
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItme'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild2('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		fetchAllCategory();// for masters
	} else {
		var selfId = $("#li" + 0).val();
		
		if (liSize == 1) {
			fetchSubAllCategory( selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubAllCategory(selfId);
		}
		
	}

}
/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For remove all categories whose self id  than zero and is category Y 
 * *******/
function removeInpuntFild2(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItme' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		fetchAllCategory();
	} else {
		var selfId = $("#li" + 0).val();
		
		if (liSize == 1) {
			fetchSubAllCategory(selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubAllCategory(selfId);
		}
		
	}
}
/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For setching all categories whose self id  than zero and is category Y 
 * *******/
function multiSelectSlave2(response) {

	var list = "<option value='0' ></option>";

	for ( var i = 0; i < response.lstmaster.length; i++) {

		list = list + '<option value="' + (response.lstmaster[i].purId)
				+ '">' + (response.lstmaster[i].itemName) + '</option>';
	}
	$("#listmstr_select").html(list);
}

/*****
 * @author   :BILAL
 * @Date     :03-04-2018
 * @Code     :For auto complete 
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
		url : "ehat/canteen/getbyleter",
		
		success : function(r) {
			
			setlistCanteenMaster(r);
			
		}
	});
} 