 var test= 1;
 var isNew = 1;
 var rowCount = 1;



/*addtoMaintanace @Author Sudhir Jadhav @Date:5DEC2016 modified Date :2jan2016 for Hide Assest Id */
function editAssts(assestName,assestID) {
	$('#addToMaintenacediv').find('input:text').val('');
	$('#addToMaintenacediv').find('textarea').val('');
	$("#ItemInfoTableforMainteance > tbody").html('');
 
	rowCount = 1;
	 $("#assetsItemsName").val(assestName);
	 $("#assetsItemID").val(assestID);
	 	 
	 var today = new Date();
	 
		var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yyyy = today.getFullYear();
	    
	    if(dd<10){
	        dd='0'+dd;
	    } 
	    if(mm<10){
	        mm='0'+mm;
	    } 
	    
	    var today1 = dd+'/'+mm+'/'+yyyy;
	 
	 
	$("#ItemInfoTableforMainteance > tbody")
	.append(
			"<tr id='deleterowforMainteance"
					+ rowCount
					+ "'><td> <input type='checkbox'  name='checkbox"
					+ rowCount
					+ "' id='checkbox"
					+ rowCount
					+ "'/><td style='text-align:center'>"
					+ rowCount
					+ "</td>"
					+ " <td><input type='text' class='form-control input-SmallText itemName tblSize' style='text-align:left;width:300px;'  id='txtItemNameforMaintenance_"
					+ rowCount
					+ "' value='"+assestName+"' />"
					+ "</td> "
					+ "<td style='display: none;'><input type='text' class='form-control input-SmallText itemId' id='txtItemIdforMaintenance_"
					+ rowCount
					+ "' style='text-align:right;width:54px;' value='"+assestID+"' readonly=''/> </td> "
					+ "<td><input type='text' class='form-control input-SmallText itemSrNo'  style='text-align:left;width:300px;'id='txtItemSrNoforMaintenance_"+rowCount
					+ "' value=''></td><td><input type='text'  onclick='setPurchaseDate(this.id)' class='form-control input-SmallText purDate'  style='text-align:left;width:300px;' id='txtPurDate_"+rowCount+"'  value='"+today1+"' /> </td>"
					+ "<td><input type='text'  readonly='readonly' onclick='setPurchaseDate(this.id)' class='form-control input-SmallText purDate'  style='text-align:left;width:300px;' id='txtMainDate_"+rowCount+"'  value='' /> </td>"
					 + "</tr>");

	isNew = 1;
	test=1;
	rowCount = 1;
$("#RowCntManc").val(rowCount);
var totaltblsize = $("#RowCntManc").val();
$("#totaltblsizeforMaintenance").val(totaltblsize);
//added by Tarique Aalam to show calender on single mouse click
setPurchaseDate("txtPurDate_"+rowCount);
setPurchaseDate("txtMainDate_"+rowCount);

	
}
/* ENd addtoMaintanace @Author Sudhir Jadhav @Date:15Nov2016*/

 /**** * Adding row for Adding Maintance Item @author Sudhir @Date:7DCE2016  @Date 20sep2016 @author Sudhir ********/

function toCreateDiv() {
	
	var assetItemsName = $("#assetsItemsName").val();
	var assetsItemID = $("#assetsItemID").val();
	// Add Todays Date  in purchase date Column for Items adding in Maintenace @Date12jan2016 	
	var today = new Date();
	var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    
    var today1 = dd+'/'+mm+'/'+yyyy;
 // End Add Todays Date  in purchase date Column for Items adding in Maintenace @Date12jan2016
    
	//rowCount = 1;
	//this if create New rows from Existing Rows
	 if (test > 0 && isNew > 0) {
		if (rowCount == 1) {

			rowCount = test;

		}
		 rowCount++;

		$("#ItemInfoTableforMainteance > tbody")
		.append(
				"<tr id='deleterowforMainteance"
						+ rowCount
						+ "'><td> <input type='checkbox'  name='checkbox"
						+ rowCount
						+ "' id='checkbox"
						+ rowCount
						+ "'/></td><td style='text-align:center'>"
						+ rowCount
						+ "</td>"
						+ " <td><input type='text' class='form-control input-SmallText itemName tblSize' style='text-align:left;width:300px;'  id='txtItemNameforMaintenance_"
						+ rowCount
						+ "' value='"+assetItemsName+"' />"
						+ "</td> "
						+ "<td style='display: none;'><input type='text' class='form-control input-SmallText itemId' id='txtItemIdforMaintenance_"
						+ rowCount
						+ "' style='text-align:right;width:54px;' value='"+assetsItemID+"' readonly=''/> </td> "
						+ "<td><input type='text' class='form-control input-SmallText itemSrNo'  style='text-align:left;width:300px;'id='txtItemSrNoforMaintenance_"+rowCount
						+ "' value=''></td><td><input type='text'  onclick='setPurchaseDate(this.id)' class='form-control input-SmallText purDate'  style='text-align:left;width:300px;'id='txtPurDate_"+rowCount+"'  value='"+today1+"' readonly='' /></td>"
						 + "</tr>");
		           
		  
		
		$("#RowCntManc").val(rowCount);
		var totaltblsize = $("#RowCntManc").val();
		$("#totaltblsizeforMaintenance").val(totaltblsize);
		
	} else {//this else for Create New Rows form frist rows 
		$("#ItemInfoTableforMainteance > tbody")
		.append(
				"<tr id='deleterowforMainteance"
						+ rowCount
						+ "'><td> <input type='checkbox'  name='checkbox"
						+ rowCount
						+ "' id='checkbox"
						+ rowCount
						+ "'/></td><td style='text-align:center'>"
						+ rowCount
						+ "</td>"
						+ " <td><input type='text' class='form-control input-SmallText itemName tblSize' style='text-align:left;width:300px;'  id='txtItemNameforMaintenance_"
						+ rowCount
						+ "' value='"+assetItemsName+"' />"
						+ "</td> "
						+ "<td style='display: none;'><input type='text' class='form-control input-SmallText itemId' id='txtItemIdforMaintenance_"
						+ rowCount
						+ "' style='text-align:right;width:54px;' value='"+assetsItemID+"' readonly=''/> </td> "
						+ "<td><input type='text' class='form-control input-SmallText itemSrNo'  style='text-align:left;width:300px;'id='txtItemSrNoforMaintenance_"+rowCount
						+ "' value=''></td><td><input type='text'  onclick='setPurchaseDate(this.id)' class='form-control input-SmallText purDate'  style='text-align:left;width:300px;'id='txtPurDate_"+rowCount+"'  value='"+today1+"' readonly=''/></td>"
						 + "</tr>");

		$("#RowCntManc").val(rowCount);
		var totaltblsize = $("#RowCountforMaintenance").val();
		$("#totaltblsizeforMaintenance").val(totaltblsize);
		rowCount++;
	}

}

/**** * ENd  Adding row for Adding Maintance Item @author Sudhir @Date:7DCE2016  @Date 20sep2016 @author Sudhir ********/



/**** toRemoveDivRow  row dynamically in table  Author :sudhir Date:7DEC2016  ******/

function toRemoveDivRow(RowCntManc) {
	var hiddenRowCount = document.getElementById(RowCntManc).value;
	// alert(hiddenRowCount);
	// var rowCount = hiddenRowCount.value;
	var temp = hiddenRowCount;

	 
	var totaltblsize = $("#RowCountforMaintenance").val();
	$("#totaltblsizeforMaintenance").val(totaltblsize);
	
	var totaltblsize = $("#totaltblsizeforMaintenance").val();

	var p = 1;
	for ( var i = 0; i < totaltblsize; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#deleterowforMainteance" + p + "").remove();
			temp = temp - 1;
			$("#RowCountforMaintenance").val(temp);
		}
		p++;
	}
	isNew = 1;
	 
	 
}
/**** ENd toRemoveDivRow  row dynamically in table  Author :sudhir Date:7DEC2016  ******/

/*Save Assets Item Into Maintenace @Author Sudhir @date 7DEC2016*/
function save() {
	var totaltblsize = $("#totaltblsizeforMaintenance").val();
	var currentuserName = $("#currentuserName").val();
	var currentUserID = $("#currentUserID").val();
	var mrllistforMtnc = { ltMaintainanceMachineDTO :[]};
		for ( var i = 1; i <= totaltblsize; i++) {
			var txtItemName = $("#txtItemNameforMaintenance_"+i).val();
			var txtItemId = $("#txtItemIdforMaintenance_"+i).val();
			var grnId = 0;
			var txtItemSrNo = $("#txtItemSrNoforMaintenance_"+i).val();
			
			var txtPurDate = $("#txtPurDate_"+i).val();
			var txtMainDate = $("#txtMainDate_"+i).val(); 
			if(txtMainDate=="" || txtMainDate==null || txtMainDate==undefined)
				{
					alert("Enter Maintainance Date");
					return false;
				}
			var Parts = txtMainDate.split("/");
			txtMainDate=Parts[2]+'-'+Parts[1]+'-'+Parts[0];
			
			 if(txtItemSrNo=="" || txtItemSrNo==null)
			{
				txtItemSrNo="No";
			}
				
			if(txtItemName == null || txtItemName == undefined || txtItemName=="" )
				{
					alert("Enter Assest Name");
					return false;
				}
			
			if((txtItemName != null) && (txtItemName != undefined))
			{							
				mrllistforMtnc.ltMaintainanceMachineDTO
						.push({
							
							machine_maintainance_item_id :txtItemId,
							item_name:txtItemName,
							invsrnoformainteitem:txtItemSrNo,
							from_date:txtPurDate,
						    invgrnid:grnId,
						    currusername:currentuserName,
						    curruserid:currentUserID,
						    maintainance_date:txtMainDate
						});

			}

		}
		var li = mrllistforMtnc.ltMaintainanceMachineDTO.length;
		 if(li == 0)
			{
			alert("Please enter atleast one Item row to Add to Maintenance");
			return false;
			}
		 
			// for Date Validation 
		 for ( var i = 0; i < mrllistforMtnc.ltMaintainanceMachineDTO.length; i++) {
		/* alert(mrllistforMtnc.ltMaintainanceMachineDTO[i].maintainance_date); */
		var maintString = mrllistforMtnc.ltMaintainanceMachineDTO[i].maintainance_date;
		var purchString2 = mrllistforMtnc.ltMaintainanceMachineDTO[i].from_date;
		var maintParts = maintString.split("-");
		var purchParts = purchString2.split("/");
		var maintObject = new Date(parseInt(maintParts[0]),
				parseInt(maintParts[1] - 1), parseInt(maintParts[2]));
		var purchObject = new Date(parseInt(purchParts[2]),
				parseInt(purchParts[1] - 1), parseInt(purchParts[0]));
		if (maintObject.getTime() <= purchObject.getTime()) {
			alert("Select maintainace Date greater than Purchase Date");
			return false;
		}
		for ( var j = 0; j < mrllistforMtnc.ltMaintainanceMachineDTO.length; j++) {
			maintString1 = mrllistforMtnc.ltMaintainanceMachineDTO[j].maintainance_date;
			var maintParts1 = maintString1.split("-");
			var maintObject1 = new Date(parseInt(maintParts1[0]),
					parseInt(maintParts1[1] - 1), parseInt(maintParts1[2]));
			if (i == j) {
				continue;
			}
			if (maintObject.getTime() == maintObject1.getTime()) {
				alert("All Maintainance Date must be different");
				return false;
			}

		}

	}
		   
		   mrllistforMtnc = JSON.stringify(mrllistforMtnc);
		    
		   var inputs = [];
			inputs.push('action=saveMatncAsstDetls');
			inputs.push('mrllistforMtnc=' + mrllistforMtnc);
			inputs.push('queryType=insert');
			var str = inputs.join('&');

			jQuery.ajax({
				async	: false,
				type	: "POST",
				data	: str + "&reqType=AJAX",
				url		: "MachineMaintainenceServlet",
				timeout : 1000 * 60 * 5,
				catche	: false,
				success : function(r) {
						
					 alert(r);
					 
						 $('#addToMaintenacediv').removeClass('fade');
						 $('#addToMaintenacediv').modal('hide'); 			
					window.location.reload("maintenace_machin_demo.jsp");
				}
			});
}
/*Save Assets Item Into Maintenace @Author Sudhir @date 7DEC2016*/

function deletAllAssts(delflag,AsstId) {
	
	var curtusrName = $("#currentuserName").val();
	var curtusrID = $("#currentUserID").val();
	
	var didConfirm = confirm("Are you sure to delete All Assets record?");
	if (didConfirm) {
	 var inputs = [];
		inputs.push('delflag='+delflag);
		inputs.push('AsstId='+AsstId);
		inputs.push('curtusrName='+curtusrName);
		inputs.push('curtusrID='+curtusrID);
		inputs.push('action=deletAllAssts');
		var str = inputs.join('&');

		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "MachineMaintainenceServlet",
			timeout : 1000 * 60 * 5,
			catche	: false,
			success : function(r) {
					
				  alert(r);
				  allAsttabColor();
				 
					 /*$('#addToMaintenacediv').removeClass('fade');
					 $('#addToMaintenacediv').modal('hide');*/ 			
				//window.location.reload("maintenace_machin_demo.jsp");
			}
		});
	}
	
	
}

 

/*this Function is Used fetch all assests for Assests Manegment  @Author Sudhir @Date :9DEC2016*/ 
function allAssestMgnt()
{
var inputs = [];

inputs.push('action=fetchAsstsForMgnt');
inputs.push('isEdit=No');
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "MachineMaintainenceServlet",
	timeout : 1000 * 60 * 5,
	cache : false,	 
	success : function(r) {
		//alert(r);
		var pobj1 = JSON.parse(r); 
		setAsstforMgnt(pobj1);
		
		}
});
}






/********* set Assest Management @author Sudhir Jadhav @DAte 9DEC2016 ********/
function setAsstforMgnt(result)
{
	var data = result;
	var maintID;
	var srNo = " "; 
	var purDate ;
	var maintDate;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'machine_maintainance_id', type: 'Integer'},        
            { name: 'machine_maintainance_item_id', type: 'Integer'},
            { name: 'item_name', type: 'string'},
            { name: 'from_date', type: 'string'},
            { name: 'maintainance_date2', type: 'string'},
            
            { name: 'invsrnoformainteitem', type: 'string'},
            { name: 'sx', type: 'string'},
            { name: 'bc', type: 'string'},
            { name: 'a6', type: 'string'}
           
           
           ],
        localdata: data
    };
      
    
    
   //this function is used for  Updateting  ITems/Assests Into Maintenaice Table @Athor Sudhir jadhav @date 13DEC2016
      var editandupdtAsst= function (row, column, value) {
      var datarow = $("#jqxgrid_asstmgt").jqxGrid('getrowdata', row);
      var asstName = datarow['item_name'];
      //asstName= asstName.trim();
      var asstId = datarow['machine_maintainance_item_id'];
      maintID = datarow['machine_maintainance_id'];
      srNo = datarow['invsrnoformainteitem'];
      purDate = datarow['from_date'];
      maintDate=datarow['maintainance_date2'];
	  return '<div style="text-align: center; margin-top:2px;margin-bottom:2px;"><button  class="btn btn-xs btn-success" data-target="#divSaveAndUpdate" data-toggle="modal" data-toggle="tooltip" data-placement="left" title="Edit" onclick="updateAssts(\''+asstName+'\','+asstId+','+maintID+',\''+srNo+'\',\''+purDate+'\',\''+maintDate+'\')"><i  class="fa fa-edit View"></i></button></div>';
   }
   
 //this function is used for delete Single ITems/Assests Into Maintenaice Table @Athor Sudhir jadhav @date 5DEC2016
      var delSiglAsst= function (row, column, value) {
      var datarow = $("#jqxgrid_asstmgt").jqxGrid('getrowdata', row);
      var astMaitncId = datarow['machine_maintainance_id'];
	  return '<div style="text-align: center; margin-top:2px;margin-bottom:2px;"><button class="btn btn-xs btn-danger" onclick=deletSigAssts("One",'+astMaitncId+')><i class="fa fa-trash-o"></i></button></div>';
}
   
  
      //this function is used for genrate Barcode ITems/Assests Into Maintenaice Table @Athor Sudhir jadhav @date 5DEC2016
      var barcodeSiglAsst = function (row, column, value) {
      var datarow = $("#jqxgrid_asstmgt").jqxGrid('getrowdata', row);
      var mitncId = datarow['machine_maintainance_id'];
      var brSrNO = datarow['invsrnoformainteitem'];
	  return '<div style="text-align: center; margin-top:2px;margin-bottom:2px;"><button class="btn btn-xs btn-success" onclick="barcodeSiglAsst('+mitncId+',\''+brSrNO+'\')"><i class="fa fa-barcode"></i></button></div>';
}
      
      
      
  /*  passing values to $("#jqxgrid").jqxGrid Function @Author  Sudhir Jadhav @Date : 5 Dec2016 */
      var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });  
    $("#jqxgrid_asstmgt").jqxGrid(
    {
        width: 1150,
        source: dataAdapter,
        columnsresize: true,
        pageable: true,
        showstatusbar: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        theme: 'energyblue',
        renderstatusbar: function (statusbar) {
            // appends buttons to the status bar.
            var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
            var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
            container.append(searchButton);
            statusbar.append(container);
            searchButton.jqxButton({  width: 50, height: 20 });
            // search for a record.
            searchButton.click(function (event) {
                var offset = $("#jqxgrid_asstmgt").offset();
                $("#jqxwindow_asstmgt").jqxWindow('open');
                $("#jqxwindow_asstmgt").jqxWindow('move', offset.left + 30, offset.top + 30);
            }); 
        },
        columns: [
			{
			    text: '#', sortable: false, filterable: false, editable: false,
			    groupable: false, draggable: false, resizable: false,
			    datafield: '', columntype: 'number', width: 50,
			    cellsrenderer: function (row, column, value) {
			        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
			    }
			},
			{ text: 'Maintence Id', datafield: 'machine_maintainance_id',width: 50,hidden : true},
			{ text: 'Assest Id', datafield: 'machine_maintainance_item_id',width: 50,hidden : true},
             
            { text: 'Assest Name', datafield:'item_name',width:300},
            { text: 'Purchase Date', datafield: 'from_date', width:200},
            { text: 'Maintainance Date', datafield: 'maintainance_date2', width:200},
            { text: 'Sr No', datafield: 'invsrnoformainteitem', width:200},
            
           
            { text: 'Edit',align:'center', datafield: 'sx',width: 100,cellsrenderer:editandupdtAsst,enabletooltips: false},
                   
            
            { text: 'Print Bar Code',align:'center', datafield: 'bc',width: 110,cellsrenderer:barcodeSiglAsst,enabletooltips: false},
            { text: 'delete', align:'center',datafield: 'a6',width: 100,cellsrenderer:delSiglAsst,enabletooltips: false},
            
            { text: 'Print/delete',align:'center', columntype :'number', dataField:'mid',sortable: false, filterable: false, editable:true,cellsrenderer:function (row, column, value) {
            	return "<input type='checkbox' name='chkbox' id='chkMtncId"+(value + 1)+"' value='"+maintID+"-"+srNo+"' class='chkMId' style='width:25px;height:25px;align:center;'>";
           	}
           },
            
            
        ],
    });
    $("#jqxwindow_asstmgt").jqxWindow({ resizable: false,  autoOpen: false, width: 210, height: 180 });
    // create find and clear buttons.
    $("#findButton_asstmgt").jqxButton({ width: 70});
    $("#clearButton_asstmgt").jqxButton({ width: 70});
    // create dropdownlist.
    $("#dropdownlist_asstmgt").jqxDropDownList({ autoDropDownHeight: true, selectedIndex: 0, width: 200, height: 23, 
        source: [
            'Assest Name',
            'Sr No'
            //'Maintnc Id'
                ]
    });
    if (theme != "") {
        $("#inputField_asstmgt").addClass('jqx-input-' + theme);
    }
    // clear filters.
    $("#clearButton_asstmgt").click(function () {
        $("#jqxgrid_asstmgt").jqxGrid('clearfilters');
    });
    // find records that match a criteria.
    $("#findButton_asstmgt").click(function () {
        $("#jqxgrid_asstmgt").jqxGrid('clearfilters');
        var searchColumnIndex = $("#dropdownlist_asstmgt").jqxDropDownList('selectedIndex');
        var datafield = "";
        switch (searchColumnIndex) {
            case 0:
                datafield = "item_name";
                break;
                
            case 1:
                datafield = "invsrnoformainteitem";
                break;
                
           /* case 2:
                datafield = "machine_maintainance_id";
                break;*/
          }
        var searchText = $("#inputField_asstmgt").val();
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = searchText;
        var filtercondition = 'contains';
        var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        filtergroup.addfilter(filter_or_operator, filter);
        $("#jqxgrid_asstmgt").jqxGrid('addfilter', datafield, filtergroup);
        // apply the filters.
        $("#jqxgrid_asstmgt").jqxGrid('applyfilters');
    });
}

 


function deletSigAssts(delflag,astMaitncId) {
	 
	
	var curtusrName = $("#currentuserName").val();
	var curtusrID = $("#currentUserID").val();
	
	var didConfirm = confirm("Are you sure to delete  Assets record?");
	if (didConfirm) {
	 var inputs = [];
		inputs.push('delflag='+delflag);
		inputs.push('asstMaitncId='+astMaitncId);
		inputs.push('curtusrName='+curtusrName);
		inputs.push('curtusrID='+curtusrID);
		inputs.push('action=deletAllAssts');
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "MachineMaintainenceServlet",
			timeout : 1000 * 60 * 5,
			catche	: false,
			success : function(r) {
					
				  alert(r);
				 
					 /*$('#addToMaintenacediv').removeClass('fade');
					 $('#addToMaintenacediv').modal('hide');*/ 			
				//window.location.reload("maintenace_machin_demo.jsp");
				  
				  allAstMngntclor();
			}
		});
	}
	
	
}
 
/*update  each Assts items @Author Sudhir Jadhav @Date:13DEC2016*/
function updateAssts(assestName,assestID,maintID,srNo,purDate,maintDate) {
	$('#divSaveAndUpdate').find('input:text').val('');
	
	$('#divSaveAndUpdate').find('textarea').val('');
	$("#ItemInforSaveAndUpdate > tbody").html('');
  
	 
	 rowCount = 1;	 
	$("#ItemInforSaveAndUpdate > tbody")
	.append(
			"<tr id='deleterowforMainteance'><td> <input type='checkbox'  name='checkbox' id='checkbox'/><td style='text-align:center'>"
					+ rowCount
					+ "</td>"
					+ " <td><input type='text' class='form-control input-SmallText itemName tblSize' style='text-align:left;width:300px;'  id='txtItemNameforMaintenance_' value='"+assestName+"' />"
					+ "</td> "
					+ "<td><input type='text' class='form-control input-SmallText itemId' id='txtItemIdforMaintenance_' style='text-align:right;width:54px;' value='"+assestID+"' readonly=''/> </td> "
					+ "<td><input type='text' class='form-control input-SmallText itemSrNo'  style='text-align:left;width:300px;'id='txtItemSrNoforMaintenance_' value='"+srNo+"'/> <input type='hidden' id='txtmaitencId' value='"+maintID+"' /> <td><input type='text'  onclick='setPurchaseDate(this.id)' class='form-control input-SmallText purDate'  style='text-align:left;width:300px;' id ='txtPurDate_' value='"+purDate+"' readonly='' /> </td>'"
					+ "<td><input type='text'  onclick='setPurchaseDate(this.id)' class='form-control input-SmallText purDate'  style='text-align:left;width:300px;' id ='txtMainDate_' value='"+maintDate+"' readonly='' /> </td>'"
			    	 + "</tr>");
	//added by Tarique Aalam to show calender on single mouse click
	setPurchaseDate("txtPurDate_");
	setPurchaseDate("txtMainDate_");
 
}
/* End update Assts items @Author Sudhir Jadhav @Date:13DEC2016*/

/**** saveandUpdate particular Assest Item  @Date:14DEC2016  Author:Sudhir */
function saveandUpdate()
{
	var txtItemName = $("#txtItemNameforMaintenance_").val();
	var txtItemId = $("#txtItemIdforMaintenance_").val();
	var grnId = 0;
	var txtPurDate = $("#txtPurDate_").val();
	var txtItemSrNo = $("#txtItemSrNoforMaintenance_").val();
	
	if(txtItemSrNo=="" || txtItemSrNo==null)
		{
			txtItemSrNo="No";
		}
	
	
	var txtmaitencId = $("#txtmaitencId").val();
	
	var curtusrName = $("#currentuserName").val();
	var curtusrID = $("#currentUserID").val();
	var txtMainDate = $("#txtMainDate_").val();
	var Parts = txtMainDate.split("/");
	txtMainDate=Parts[2]+'-'+Parts[1]+'-'+Parts[0];
	// Date Validation
	var maintParts = txtMainDate.split("-");
	var purchParts = txtPurDate.split("/");
	var maintObject = new Date(parseInt(maintParts[0]), parseInt(maintParts[1] - 1),
			parseInt(maintParts[2]));
	var purchObject = new Date(parseInt(purchParts[2]), parseInt(purchParts[1] - 1),
			parseInt(purchParts[0]));
	if (maintObject.getTime() <= purchObject.getTime()) {
		alert("Select maintainace Date greater than Purchase Date");
		return false;
	}
	
	var flag=checkMaintDate(txtPurDate,txtMainDate,txtItemName);
	if(flag>=1)
		{
		alert("Maintainance Date already available in Database");
		return false;
		}
	
	var mrllistforMtnc = {ltMaintainanceMachineDTO:[]};
	if((txtItemName != null) && (txtItemName != undefined) && (txtmaitencId != undefined) && (txtmaitencId != null) )
	{							
		mrllistforMtnc.ltMaintainanceMachineDTO
				.push({
					
					machine_maintainance_id:txtmaitencId,
					machine_maintainance_item_id :txtItemId,
					item_name:txtItemName,
					invsrnoformainteitem:txtItemSrNo,
					from_date:txtPurDate,
				    invgrnid:grnId,
				    currusername:curtusrName,
				    curruserid:curtusrID,
				    maintainance_date:txtMainDate
				});

	}
	
	
	var li = mrllistforMtnc.ltMaintainanceMachineDTO.length;
	 if(li == 0)
		{
		alert("Please enter atleast one Item row to Add to Maintenance");
		return false;
		}
	   
	   mrllistforMtnc = JSON.stringify(mrllistforMtnc);
	   var inputs = [];
		inputs.push('action=saveMatncAsstDetls');
		inputs.push('mrllistforMtnc=' + mrllistforMtnc);
		inputs.push('queryType=update');
		var str = inputs.join('&');

		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "MachineMaintainenceServlet",
			timeout : 1000 * 60 * 5,
			catche	: false,
			success : function(r) {
					
				 alert(r);
				 //alertify.success(r);
				 
					 $('#addToMaintenacediv').removeClass('fade');
					 $('#addToMaintenacediv').modal('hide'); 			
				window.location.reload("maintenace_machin_demo.jsp");
			}
		});
	
}


/************ Active all Assest tab color Author :sudhir @Date:15DEC2016  *********/
function editAsttabColor() {
 	$("#allAssestMgnttab").css("background-color", "");
 	$("#editAsseststab").css("background-color", "#81A981");
 	$("#allAssestMgnttab").css("color", "black");
 	$("#editAsseststab").css("color", "white");
 	
 	$("#txtItemIdforAuto").val('0');
 	$("#byName").val("");
 	allAssest();
 }

/************ all Assest Management tab color Author :sudhir @Date:15DEC2016  *********/
 function allAstMngntclor() {
 	$("#editAsseststab").css("background-color", "");
 	$("#allAssestMgnttab").css("background-color", "#81A981");
 	$("#editAsseststab").css("color", "black");
 	$("#allAssestMgnttab").css("color", "white");
 	$("#byIdMngt").val("");
 	$("#txtItemIdforAuto").val('0');
 	$("#byNameasstmgt").val("");
 	allAssestMgnt();
 	
 }

 
 /*Genrate BarCode for Single Assest Item @Date :19DEC25016 @Author :Sudhir*/
 function barcodeSiglAsst(maintId,srNo) {
	 var link = "maintance_barcode_details.jsp?maintId="+maintId+"&srNo="+srNo;
	 window.open(link); 
}
 
 
 
 /**************all Assest Items *************/
 function allAssest()
	{
	var inputs = [];
	inputs.push('action=fetchAssetsView');
	inputs.push('isEdit=No');
	var str = inputs.join('&');

	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache	: false,
		success : function(ajaxResponse) {
		var pobj1 = JSON.parse(ajaxResponse); 
		setAllAssest(pobj1);
		}
	});
}

 
 
 /**************All Maintenace Assests Items *************/
	function setAllAssest(result)
	{
		var data = result;
	    // prepare the data
	    var source =
	    {
	        datatype: "json",
	        datafields: [
	            { name: 'machine_maintainance_item_id', type: 'Integer'},
	            { name: 'item_name', type: 'string'},
	            { name: 'from_date', type: 'string'},
	            { name: 'sx', type: 'string'},
	            { name: 'a6', type: 'string'}
	           ],
	        localdata: data
	    };
	      
	    
	    
    //this function is used for Inserting ITems/Assests Into Maintenaice Table @Athor Sudhir jadhav @date 5DEC2016
	      var editandInsrtAsst= (function (row, column, value) {
	      var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
	      var asstName = datarow['item_name'];
	      //asstName= asstName.trim();
	      var asstId = datarow['machine_maintainance_item_id'];
 	  return '<div style="text-align: center; margin-top:2px;margin-bottom:2px;"><button  class="btn btn-xs btn-success" data-target="#addToMaintenacediv" data-toggle="modal" data-toggle="tooltip" data-placement="left" title="Edit" onclick="editAssts(\''+asstName+'\','+asstId+')"><i  class="fa fa-edit View"></i></button></div>';
     });
    
  //this function is used for delete All  ITems/Assests Into Maintenaice Table @Athor Sudhir jadhav @date 5DEC2016
	      var deletAsst= function (row, column, value) {
	      var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
	      var asstId = datarow['machine_maintainance_item_id'];
	  return '<div style="text-align: center; margin-top:2px;margin-bottom:2px;"><button class="btn btn-xs btn-danger" onclick=deletAllAssts("All",'+asstId+')><i class="fa fa-trash-o"></i></button></div>';
 } 
    
   /*  passing values to $("#jqxgrid").jqxGrid Function @Author  Sudhir Jadhav @Date : 5 Dec2016 */
	      var dataAdapter = new $.jqx.dataAdapter(source, {
	        downloadComplete: function (data, status, xhr) { },
	        loadComplete: function (data) { },
	        loadError: function (xhr, status, error) { }
	    });  
	    $("#jqxgrid").jqxGrid(
	    {
	        width: 1150,
	        source: dataAdapter,
	        columnsresize: true,
	        pageable: true,
	        showstatusbar: true,
	        autoheight: true,
	        sortable: true,
	        altrows: true,
	        enabletooltips: true,
	        theme: 'energyblue',
	        renderstatusbar: function (statusbar) {
             // appends buttons to the status bar.
             var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
             var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
             container.append(searchButton);
             statusbar.append(container);
             searchButton.jqxButton({  width: 50, height: 20 });
             // search for a record.
             searchButton.click(function (event) {
                 var offset = $("#jqxgrid").offset();
                 $("#jqxwindow").jqxWindow('open');
                 $("#jqxwindow").jqxWindow('move', offset.left + 30, offset.top + 30);
             }); 
         },
	        columns: [
				{
				    text: '#', sortable: false, filterable: false, editable: false,
				    groupable: false, draggable: false, resizable: false,
				    datafield: '', columntype: 'number', width: 50,
				    cellsrenderer: function (row, column, value) {
				        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
				    }
				},
				{ text: 'Assest Id', datafield: 'machine_maintainance_item_id',width: 80, hidden : true},
	             
	            { text: 'Assest Name', datafield:'item_name',width:470},
	            { text: 'Purchase Date', datafield: 'from_date', width:430},
	           
	            { text: 'Add',align:'center', datafield: 'sx',width: 110,cellsrenderer:editandInsrtAsst,enabletooltips: false},
	           
	            { text: 'delete', align:'center',datafield: 'a6',width: 115,cellsrenderer:deletAsst,enabletooltips: false}	           
	        ],
	    });
	    $("#jqxwindow").jqxWindow({ resizable: false,  autoOpen: false, width: 210, height: 180 });
     // create find and clear buttons.
     $("#findButton").jqxButton({ width: 70});
     $("#clearButton").jqxButton({ width: 70});
     // create dropdownlist.
     $("#dropdownlist").jqxDropDownList({ autoDropDownHeight: true, selectedIndex: 0, width: 200, height: 23, 
         source: [
             'Assest Id',
             'Assest Name'              
         ]
     });
     if (theme != "") {
         $("#inputField").addClass('jqx-input-' + theme);
     }
     // clear filters.
     $("#clearButton").click(function () {
         $("#jqxgrid").jqxGrid('clearfilters');
     });
     // find records that match a criteria.
     $("#findButton").click(function () {
         $("#jqxgrid").jqxGrid('clearfilters');
         var searchColumnIndex = $("#dropdownlist").jqxDropDownList('selectedIndex');
         var datafield = "";
         switch (searchColumnIndex) {
             case 0:
                 datafield = "machine_maintainance_item_id";
                 break;
                 
             case 1:
                 datafield = "item_name";
                 break;
           }
         var searchText = $("#inputField").val();
         var filtergroup = new $.jqx.filter();
         var filter_or_operator = 1;
         var filtervalue = searchText;
         var filtercondition = 'contains';
         var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
         filtergroup.addfilter(filter_or_operator, filter);
         $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);
         // apply the filters.
         $("#jqxgrid").jqxGrid('applyfilters');
     });
	}
	 
	
	
	

	/*** auto Suggest for All Assets for Item Name @Date: 20DEC2016 @Author:Sudhir ****/
	function autoSuggest(inputID, typeauto) {
		var resultData = [];

		var txtVal1 = $('#' + inputID).val();
		$("#txtItemIdforAuto").val('0');
		
		/*alert("inputID :"+ inputID);*/
		
		
		if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
			var inputs = [];

			inputs.push('action=fetchItemNamesOnlyAutoSuggest');
			inputs.push('txtVal=' + txtVal1);
			var str = inputs.join('&');

			jQuery.ajax({
						async	: false,
						type	: "POST",
						data	: str + "&reqType=AJAX",
						url		: "InventoryServlet",
						timeout : 1000 * 60 * 15,
						cache	: false,
						success : function(r) {
							//alert(r.length);
							var availableTags = [];
							if (r.length === 32 || r.length <= 0) {
								alert("NO MATCHING FOUND");
								$("#"+ inputID).val('');
								$("#"+ inputID).focus();

							} else {
								ajaxResponse = eval('(' + r + ')');
								// alert(r);

								for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
									availableTags
											.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
													+ "_"
													+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
								}

								// availableTags = ajaxResponse.split("\n");

								var template = "";
								for ( var j = 0; j < availableTags.length; j++) {
									var arrValue = (availableTags[j]).split("_");
									var idValue = (arrValue[1]);
									resultData.push({
										ID : idValue,
										Name : arrValue[0]
									});

									template = template + '<li data-value= "'
											+ (arrValue[1])
											+ '" class=""><a href="#">'
											+ arrValue[0] + '</a></li>';

								}

								$("#div" + inputID + " .typeahead").html(template);
								if (typeauto != 'onload') {
									$("#div" + inputID + " .typeahead").show();
								}

								setTimeout(function() {
									$('#' + inputID).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult,
										scrollBar : true

									});

								}, 500);
							}
						}
					});

			function displayResult(item) {
				$('#' + inputID).val(item.text);
				var arrValue = (inputID).split("_");
				var idValue = (arrValue[1]);
				var currentcode = item.value;
				
				$("#txtItemIdforAuto").val(currentcode);
	 

			}
		}

	}
 
	//search Assest 
	function allAssestSearch() {
		
		var itemId = $("#txtItemIdforAuto").val();
		if(itemId == 0 || itemId == null)
		{
			alert("Please Select Valid Assest Name");
			return false;
		}	
		
 		var inputs = [];
		inputs.push('isEdit=Yes');
		inputs.push('asstId='+itemId);
		inputs.push('action=fetchAssetsView');
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "InventoryServlet",
			timeout : 1000 * 60 * 5,
			cache	: false,
			success : function(ajaxResponse) {
				var pobj1 = JSON.parse(ajaxResponse); 
				if(pobj1.ltMaintainanceMachineDTO.length == 0)
					{
					alert("Record Not Found");
					$("#byName").val('');
					allAsttabColor();
					$("#txtItemIdforAuto").val('0');
					return false;
					}
				else
					{
				setAllAssest(pobj1);
					}
			}
		});
		
		 
		
	}
	
	 
	 /*** auto Suggest for Ast mgnt in Assest Mangnt tab Item Name @Date: 23DEC2016 @Author:Sudhir ****/
		function autoSugestforAstmgnt(inputID, typeauto) {
			var resultData = [];
			var txtVal1 = $('#' + inputID).val();
			$("#txtItemIdforAuto").val('0');
			
			/*alert("inputID :"+ inputID);*/
			
			
			if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
				var inputs = [];

				inputs.push('action=fetchItemNamesOnlyAutoSuggest');
				inputs.push('txtVal=' + txtVal1);
				var str = inputs.join('&');

				jQuery.ajax({
							async	: false,
							type	: "POST",
							data	: str + "&reqType=AJAX",
							url		: "InventoryServlet",
							timeout : 1000 * 60 * 15,
							cache	: false,
							success : function(r) {
								//alert(r.length);
								var availableTags = [];
								if (r.length === 32 || r.length <= 0) {
									alert("NO MATCHING FOUND");
									$("#"+ inputID).val('');
									$("#"+ inputID).focus();

								} else {
									ajaxResponse = eval('(' + r + ')');
									// alert(r);

									for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
										availableTags
												.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
														+ "_"
														+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
									}

									// availableTags = ajaxResponse.split("\n");

									var template = "";
									for ( var j = 0; j < availableTags.length; j++) {
										var arrValue = (availableTags[j]).split("_");
										var idValue = (arrValue[1]);
										resultData.push({
											ID : idValue,
											Name : arrValue[0]
										});

										template = template + '<li data-value= "'
												+ (arrValue[1])
												+ '" class=""><a href="#">'
												+ arrValue[0] + '</a></li>';

									}

									$("#div" + inputID + " .typeahead").html(template);
									if (typeauto != 'onload') {
										$("#div" + inputID + " .typeahead").show();
									}

									setTimeout(function() {
										$('#' + inputID).typeahead({
											source : resultData,
											displayField : 'Name',
											valueField : 'ID',
											onSelect : displayResult,
											scrollBar : true

										});

									}, 500);
								}
							}
						});

				function displayResult(item) {
					$('#' + inputID).val(item.text);
					var arrValue = (inputID).split("_");
					var idValue = (arrValue[1]);
					var currentcode = item.value;
					
					$("#txtItemIdforAuto").val(currentcode);
		 

				}
			}

		}
	  
		//search all Assest Mngt Search  @Date 23/DEC/2016 @Author : Sudhir Jadhav
		function astSearchByastId() {
 			var itemId = $("#txtItemIdforAuto").val();
			if(itemId == 0 || itemId == null)
			{
				alert("Please Select Valid Assest Name");
				return false;
			}	
			
	 		var inputs = [];
			inputs.push('isEdit=Yes');
			inputs.push('asstId='+itemId);
			inputs.push('action=fetchAsstsForMgnt');
			
			var str = inputs.join('&');
			jQuery.ajax({
				async	: false,
				type	: "POST",
				data	: str + "&reqType=AJAX",
				url		: "MachineMaintainenceServlet",
				timeout : 1000 * 60 * 5,
				cache	: false,
				success : function(ajaxResponse) {
					var pobj1 = JSON.parse(ajaxResponse); 
					if(pobj1.ltMaintainanceMachineDTO.length == 0)
						{
						alert("Record Not Found");
						$("#byNameasstmgt").val('');
						allAstMngntclor();
						$("#txtItemIdforAuto").val('0');
						return false;
						}
					else
						{
			setAsstforMgnt(pobj1);
						}
				}
			});
			
			 
			
		}
	 
	
	
	//new Auto Suggetion Functio  form TOhit yet not Used
	function autoCompTable(response,id){
		var qty		= id.slice(0,-1); //for dyamic col getting id
		var myArray = $.parseJSON(response);// parsing response in JSON format 
		$.widget('custom.mcautocomplete', $.ui.autocomplete, {
		    _create: function () {
		        this._super();
		        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
		    },
		    _renderMenu: function (ul, items) {
		        var self = this,
		            thead;
		        if (this.options.showHeader) {
		            table = $('<div class="ui-widget-header" style="width:100%"></div>');
		            $.each(this.options.columns, function (index, item) {
		                table.append('<span style="padding:0 4px;float:left;width:' + item.width + ';">' + item.name + '</span>');
		            });
		            table.append('<div style="clear: both;"></div>');
		            ul.append(table);
		        }
		        $.each(items, function (index, item) {
		            self._renderItem(ul, item);
		        });
		    },
		    _renderItem: function (ul, item) {
		        var t = '',
		            result = '';
		        $.each(this.options.columns, function (index, column) {
		            t += '<span style="padding:0 4px;float:left;width:' + column.width + ';">' + item[column.valueField ? column.valueField : index] + '</span>';
		        });
		        result = $('<li></li>')
		            .data('ui-autocomplete-item', item)
		            .append('<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>')
		            .appendTo(ul);
		        return result;
		    }
		});


		// Sets up the multicolumn autocomplete widget.
		$("#"+ id).mcautocomplete({
		    // These next two options are what this plugin adds to the autocomplete widget.
		    showHeader: true,
		    columns: [{
		        name: 'Service Name',
		        width: '200px',
		        valueField: 'srvName'
		    }, {
		        name: 'Service Charges',
		        width: '110px',
		        valueField: 'srvCharges'
		    }, {
		        name: 'Service Type',
		        width: '188px',
		        valueField: 'sevType'
		    }],

		    // Event handler for when a list item is selected.
		    select: function (event, ui) {
		    	//console.log(ui);
		        this.value = (ui.item ? ui.item.srvName : '');
		       if( ui.item.srvName !='No' && ui.item.srvCharges !='Record' && ui.item.sevType !='Match'){
		    	   $('#results').text(ui.item ? 'Selected: ' + ui.item.srvName + ', ' + ui.item.srvCharges + ', ' + ui.item.sevType : 'Nothing selected, input was ' + this.value);
			        $('#'+qty+'2').val(1);//always quantity column on 2nd position
			        $('#'+qty+'3').val(ui.item.srvCharges);//always opdcharges column on 3rd position
			        $('#'+qty+'3act').val(ui.item.srvCharges);//actual basic charges 
			        $('#'+qty+'3actBasic').val(ui.item.srvCharges);//actual basic charges unchanged
			        $('#'+id+'srid').val(ui.item.srvId);//service id setting
			        $('#'+id+'srtname').val(ui.item.sevType);//service type name setting
			        createRow4Pkg('auto');//adding new row dynamically
			        //getSrvHalWsChrg(qty ,ui.item.srvId,ui.item.sevType, 'auto' );//fetching hall wise charges
			        sethallwiseVals(ui.item.hallFrSrv,ui.item.srvCharges,qty,'autoCompTable');//sending list inside mainlist
			        calSumofSrv('autoCompTable');
		       }
		        
		        return false;
		    },

		    // The rest of the options are for configuring the ajax webservice call.
		    minLength: 1,
		    source: function (request, response) {
		    	var data = myArray;
		    	console.log(data);
		    	console.log(data.serList.length);
		    	var result;
	            if (!data || data.length === 0 || !data.serList || data.serList.length === 0  ) {
	            	/*result = [{
	                    label: 'No match found.'
	                }];*/
	            	result = [{
	                     'srvName'		: 'No',
	                     'srvCharges'	: 'Record',
	                     'sevType'		: 'Match',
	               
	                 }];
	            } else {
	                result = data.serList;//Response List for All Services
	            }
	            response(result);
	          }
		});
	}
	

	/***** printMulBarCode @date : 6 jan 2016  Author :Sudhir jadhav *****/
	function printMulBarCode()
	{
		var mtncIds = [];
        $.each($("input[name='chkbox']:checked"), function(){            
        	mtncIds.push($(this).val());
        });
        
      if(mtncIds.length==0)
      {
      alert("Select at least One Assest Item for BarCode Print !"); 	
      	return false;
      }
       
        var link = "maintance_multipl_barcode_details.jsp?mtncIds="+mtncIds+"";
        window.open(link);
	}
	
	
	/***** deletSelctedAsset  @date : 6 jan2016  Author sudhir jadhav *****/
	function deletSelctedAsset()
	{
		var mtncIds = [];
        $.each($("input[name='chkbox']:checked"), function(){            
        	mtncIds.push($(this).val());
        });
         if(mtncIds.length==0)
       	 {
       alert("Select at least One Assest Item for Delete ! "); 	
       return false;
        }
        var curtusrName = $("#currentuserName").val();
    	var curtusrID = $("#currentUserID").val();
    	var delflag="muldelchk";
    	var didConfirm = confirm("Are you sure to delete  Assets record?");
    	
    	if (didConfirm) {
    		
    	 var inputs = [];
    		inputs.push('delflag='+delflag);
    		inputs.push('asstMaitncId='+mtncIds);
    		inputs.push('curtusrName='+curtusrName);
    		inputs.push('curtusrID='+curtusrID);
    		inputs.push('action=deletAllAssts');
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async	: false,
    			type	: "POST",
    			data	: str + "&reqType=AJAX",
    			url		: "MachineMaintainenceServlet",
    			timeout : 1000 * 60 * 5,
    			catche	: false,
    			success : function(r) {
    					
    				  alert(r);
    				 
    					 /*$('#addToMaintenacediv').removeClass('fade');
    					 $('#addToMaintenacediv').modal('hide');*/ 			
    				//window.location.reload("maintenace_machin_demo.jsp");
    				  
    				  allAstMngntclor();
    			}
    		});
    	}
    

}
	
	
	/*** searchAll Main Function for Search Giving Call According to  Search Required  Author Sudhir Jadhav @date: 10jan2016 ***/
	function searchAll() {
		
	var itemId = $("#txtItemIdforAuto").val();
	var maitncIdMngt = $("#byIdMngt").val();
	
		if(maitncIdMngt != "" && itemId != 0) {
				
				alert("Please search either Assest Name or Id ");
				return false;
			} 
			
			else if(maitncIdMngt == "" && itemId == 0) {
				
				alert("Please search either Assest Name or Id ");
				return false;
			}
			else if(maitncIdMngt != "")
			{
				serchByMainId(maitncIdMngt);
				return false;
			}
			
			else if(itemId != "")
			{
				astSearchByastId();
				return false;
			}
		
		
	}
	
	/*serchByMainId  Search By Maintenace Id @Author :Sudhir Jadhav @Date:10jan2016 */
	function serchByMainId(mainId) {
		
		var inputs = [];
		inputs.push('isEdit=MaintcId');
		inputs.push('asstId='+mainId);
		inputs.push('action=fetchAsstsForMgnt');
		
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "MachineMaintainenceServlet",
			timeout : 1000 * 60 * 5,
			cache	: false,
			success : function(ajaxResponse) {
				
				var pobj1 = JSON.parse(ajaxResponse); 
				if(pobj1.ltMaintainanceMachineDTO.length == 0)
					{
					alert("Record Not Found");
					$("#byIdMngt").val('');
					allAstMngntclor();
					//$("#txtItemIdforAuto").val('0');
					return false;
					}
				else
					{
		setAsstforMgnt(pobj1);
					}
			}
		});
		
	}
	
	
	//set Calender the Assest Item @Author Sudhir @Date 11jan2017        
	function setPurchaseDate(inputID)
	{
		new JsDatePick({
			useMode:2,
			target:inputID,
			/* dateFormat:"%d-%M-%Y", */
			yearsRange:[1920,2099],
			limitToToday:false,
			/* cellColorScheme:"beige", */
			dateFormat:"%d/%m/%Y",
			imgPath:"../img/",
			weekStartDay:1,
			 
		});
	}