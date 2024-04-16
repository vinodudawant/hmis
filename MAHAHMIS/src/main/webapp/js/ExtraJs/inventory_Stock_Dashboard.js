/*********
@author  : paras suryawanshi 
@date	 :29nov2016
@code	 : fetch AllStockItems.
**********/

function fetchAllStockItems() {
	var inputs = [];
	inputs.push('action=fetchAllAvailableStock');
	inputs.push('isEdit=Dashboard');
	var str = inputs.join('&');
	jQuery.ajax({
		async 	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",
		url 	: "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		
		success : function(r) {
		
			pobj1 = eval('(' + r + ')');
			$("#Lowinqty").setTemplate(invStockLowinquantity);
			$("#Lowinqty").processTemplate(pobj1);
		
		}
	});
}

/*********
@author  : paras suryawanshi 
@date	 :29nov2016
@code	 : template for item low-in-qty.
**********/

var SrNo = 1;
var invStockLowinquantity = "{#foreach $T.ltbatchstockAllItemsDTO as ltbatchstockAllItemsDTO}"
                              + "<tr class='center'>"
                              + "<td '>{SrNo++}</td>" 
                              + "<td>{$T.ltbatchstockAllItemsDTO.inv_item_code}</td>"
                              + "<td >{$T.ltbatchstockAllItemsDTO.inv_batch_item_name}</td>"
                              + "<td>{$T.ltbatchstockAllItemsDTO.min_stock}</td>" 
                              + "<td>{$T.ltbatchstockAllItemsDTO.inv_item_qty}</td></tr>{#/for}"; 
         
	
	
	
	
	
function fetchMrnApproveStatus() {
	var subinventory ="-";
	// alert("in mrn fecth=="+subinventory);
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetail');
	inputs.push('isEdit=all');
	inputs.push('subinventory=' + subinventory);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj2 = eval('(' + r + ')');
			//alert(r);
			// alert(r);
			$("#inv_pending").setTemplate(inventoryMRNpending);
			$("#inv_pending").processTemplate(pobj2);
			
		}
	});
}
function fetchMrn() {
	var subinventory ="-";
	// alert("in mrn fecth=="+subinventory);
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetail');
	inputs.push('isEdit=today');
	inputs.push('subinventory=' + subinventory);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj2 = eval('(' + r + ')');
			//alert(r);
			// alert(r);
			$("#todayindent").setTemplate(inventoryMRN);
			$("#todayindent").processTemplate(pobj2);
			
		}
	});
}
	
var SrNo1 = 1;
var inventoryMRNpending =  "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}"
                             + "{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='InProcess' || $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='open'}"
                              + "<tr class='center'>"
                              + "<td '>{SrNo1++}</td>" 
                              + "<td>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>"
                              + "<td >{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td>"
                              +"</tr>{#/if}{#/for}";                        
var SrNo2 = 1;
var inventoryMRN =  "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}"
                              + "<tr class='center'>"
                              + "<td '>{SrNo2++}</td>" 
                              + "<td>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td>"
                              + "<td >{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td>"
                              +"</tr>{#/for}";   