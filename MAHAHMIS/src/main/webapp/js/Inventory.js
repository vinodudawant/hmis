var count = 1;
var w = 1;
var SrNo = 1;
var gst ;
var inventoryTemp = "<div style='width: 100%;'><div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Item ID</div><div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Item Name</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Price</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Available Quantity</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Add / Remove Quantity</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;'>Save</div></div></div></div><div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.il as il}{#if $T.il.iaq <= $T.il.imq}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.il.ii}</div><div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;color: red;'>{$T.il.in}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width:85%;border-color: black; border-width: thin;background-color:lightgray;' readonly='readonly'  type='text' name='txtPR' id='txtPR' value='{$T.il.ip}' /></div><div style='width: 11.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px; color: red;width:85%;border-color: black; border-width: thin;background-color: lightgray;' type='text' name='txtAQ' id='txtAQ' value='{$T.il.iaq}' readonly='readonly'/></div>{#/if}{#if $T.il.iaq > $T.il.imq}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.il.ii}</div><div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.il.in}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width:85%;border-color: black; border-width: thin;background-color:lightgray;' readonly='readonly' type='text' name='txtPR' id='txtPR' value='{$T.il.ip}'  /></div><div style='width: 11.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px;width:85%;border-color: black; border-width: thin;background-color: lightgray;' type='text' name='txtAQ' id='txtAQ' value='{$T.il.iaq}' readonly='readonly'/></div>{#/if}<div style='width: 16.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;'><input style='font-size: 11px; width:45%;border-color: black; border-width: thin;' type='text' name='txtARQ' id='txtARQ{$T.il.ii}' value='' />&nbsp;<select id='arq{$T.il.ii}' style='padding-left: 2%;border-bottom-color: black;border-bottom-width: thin;'><option value='Add'>Add</option><option value='Remove'>Remove</option></select></div><div style='width: 11%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;'  type='submit' class='edit' name='button' id='button' value='SAVE' onclick='return saveMainInventory({$T.il.ii},{$T.il.iaq})'/></div></div>{#/for}</div>";

var labInventoryTemp = "<div style='width: 100%;'><div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Item ID</div><div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Item Name</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Inventory Ava Qty</div><div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Lab Available Quantity</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Add / Remove Quantity</div><div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Save</div></div></div></div><div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.il as il}{#if $T.il.iaq <= $T.il.imq}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.il.ii}</div><div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;color: red;'>{$T.il.in}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;color: red;' type='text' name='txtMIQ{$T.il.ii}' id='txtMIQ{$T.il.ii}' value='{$T.il.iaq}' readonly='readonly'/></div><div style='width: 14.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;' type='text' name='txtAQ{$T.il.ii}' id='txtAQ{$T.il.ii}' value='{$T.il.laq}' readonly='readonly'/></div> {#/if}  {#if $T.il.iaq > $T.il.imq} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.il.ii}</div><div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.il.in}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;' type='text' name='txtMIQ{$T.il.ii}' id='txtMIQ{$T.il.ii}' value='{$T.il.iaq}' readonly='readonly'/></div><div style='width: 14.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;' type='text' name='txtAQ{$T.il.ii}' id='txtAQ{$T.il.ii}' value='{$T.il.laq}' readonly='readonly'/></div> {#/if}          <div style='width: 16.7%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;'><input style='font-size: 11px; width:45%;border-color: black; border-width: thin;' type='text' name='txtARQ{$T.il.ii}' id='txtARQ{$T.il.ii}' value='' />&nbsp;<select id='selArq{$T.il.ii}' name='selArq{$T.il.ii}' style='padding-left: 2%;border-bottom-color: black;border-bottom-width: thin;'><option value='add'>Add</option><option value='remove'>Remove</option></select></div><div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='button' id='button' value='SAVE' class='edit' onclick='saveLabInventory({$T.il.ii})'/></div></div>{#/for}</div>";

var ccuInventoryTemp = "<div style='width: 100%;'><div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Item ID</div><div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Item Name</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Inventory Ava Qty</div><div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>CCU Available Quantity</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Add / Remove Quantity</div><div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Save</div></div></div></div><div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.il as il}{#if $T.il.iaq <= $T.il.imq}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.il.ii}</div><div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;color: red;'>{$T.il.in}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;color: red;' type='text' name='txtMIQ{$T.il.ii}' id='txtMIQ{$T.il.ii}' value='{$T.il.iaq}' readonly='readonly'/></div><div style='width: 14.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;' type='text' name='txtAQ{$T.il.ii}' id='txtAQ{$T.il.ii}' value='{$T.il.ccuaq}' readonly='readonly'/></div> {#/if}  {#if $T.il.iaq > $T.il.imq} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.il.ii}</div><div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.il.in}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;' type='text' name='txtMIQ{$T.il.ii}' id='txtMIQ{$T.il.ii}' value='{$T.il.iaq}' readonly='readonly'/></div><div style='width: 14.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;' type='text' name='txtAQ{$T.il.ii}' id='txtAQ{$T.il.ii}' value='{$T.il.ccuaq}' readonly='readonly'/></div> {#/if}          <div style='width: 16.7%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;'><input style='font-size: 11px; width:45%;border-color: black; border-width: thin;' type='text' name='txtARQ{$T.il.ii}' id='txtARQ{$T.il.ii}' value='' />&nbsp;<select id='selArq{$T.il.ii}' name='selArq{$T.il.ii}' style='padding-left: 2%;border-bottom-color: black;border-bottom-width: thin;'><option value='add'>Add</option><option value='remove'>Remove</option></select></div><div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='button' id='button' value='SAVE' class='edit' onclick='saveCCUInventory({$T.il.ii})'/></div></div>{#/for}</div>";

var opdInventoryTemp = "<div style='width: 100%;'><div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Item ID</div><div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Item Name</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Inventory Ava Qty</div><div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>OPD Available Quantity</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Add / Remove Quantity</div><div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Save</div></div></div></div><div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.il as il}{#if $T.il.iaq <= $T.il.imq}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.il.ii}</div><div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;color: red;'>{$T.il.in}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;color: red;' type='text' name='txtMIQ{$T.il.ii}' id='txtMIQ{$T.il.ii}' value='{$T.il.iaq}' readonly='readonly'/></div><div style='width: 14.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;' type='text' name='txtAQ{$T.il.ii}' id='txtAQ{$T.il.ii}' value='{$T.il.opdaq}' readonly='readonly'/></div> {#/if}  {#if $T.il.iaq > $T.il.imq} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.il.ii}</div><div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.il.in}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;' type='text' name='txtMIQ{$T.il.ii}' id='txtMIQ{$T.il.ii}' value='{$T.il.iaq}' readonly='readonly'/></div><div style='width: 14.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px; width:85%;border-color: black; background-color: lightgray;border-width: thin;' type='text' name='txtAQ{$T.il.ii}' id='txtAQ{$T.il.ii}' value='{$T.il.opdaq}' readonly='readonly'/></div> {#/if}          <div style='width: 16.7%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;'><input style='font-size: 11px; width:45%;border-color: black; border-width: thin;' type='text' name='txtARQ{$T.il.ii}' id='txtARQ{$T.il.ii}' value='' />&nbsp;<select id='selArq{$T.il.ii}' name='selArq{$T.il.ii}' style='padding-left: 2%;border-bottom-color: black;border-bottom-width: thin;'><option value='add'>Add</option><option value='remove'>Remove</option></select></div><div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='button' id='button' value='SAVE' class='edit' onclick='saveOPDInventory({$T.il.ii})'/></div></div>{#/for}</div>";

var uomInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>UOM Id</div>"
		+ "<div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Description</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.ltUomDTOs as ltUomDTOs}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.ltUomDTOs.uom_Id}'>{$T.ltUomDTOs.uom_Id}</div>"
		+ "<div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltUomDTOs.uom_Id}'>{$T.ltUomDTOs.uom_description}</div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewUOMDetail({$T.ltUomDTOs.uom_Id})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteUOMDetail({$T.ltUomDTOs.uom_Id})'/></div>"
		+ "</div>{#/for}" + "</div>";

/* New Inventory Function */
var inventoryUomTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Uom Name</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltUomDTOs as ltUomDTOs}<tr class='left'><td>{SrNo++}</td><td id='id{$T.ltUomDTOs.uomId}'>{$T.ltUomDTOs.uomId}</td><td style='text-align=left' id='desc{$T.ltUomDTOs.uomId}'>{$T.ltUomDTOs.uomDescription}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewUOMDetail({$T.ltUomDTOs.uomId})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-danger deleteUserAccess' onclick=\"deleteUOMDetail({$T.ltUomDTOs.uomId})\" value='EDIT' disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>"

var vendorInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Id</div>"
		+ "<div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Vendor Name</div>"
		+ "<div style='width: 23%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Mobile #</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.ltVendorDTOs as ltVendorDTOs}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.ltVendorDTOs.vendor_Id}'>{$T.ltVendorDTOs.vendor_Id}</div>"
		+ "<div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltVendorDTOs.vendor_Id}'>{$T.ltVendorDTOs.vendor_name}</div>"
		+ "<div style='width: 24.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltVendorDTOs.vendor_Id}'>{$T.ltVendorDTOs.vedor_mobile}</div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewVendorDetail({$T.ltVendorDTOs.vendor_Id})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteVendorDetail({$T.ltVendorDTOs.vendor_Id})'/></div>"
		+ "</div>{#/for}" + "</div>";

var shelfInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Id</div>"
		+ "<div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Section No</div>"
		+ "<div style='width: 23%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Details</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.ltShelfDTO as ltShelfDTO}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.ltShelfDTO.shelf_Id}'>{$T.ltShelfDTO.shelf_Id}</div>"
		+ "<div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltShelfDTO.shelf_Id}'>{$T.ltShelfDTO.shelf_section_no}</div>"
		+ "<div style='width: 24.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltShelfDTO.shelf_Id}'>{$T.ltShelfDTO.shelf_description}</div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewSheflfDetail({$T.ltShelfDTO.shelf_Id})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteShelfDetail({$T.ltShelfDTO.shelf_Id})'/></div>"
		+ "</div>{#/for}" + "</div>";

/* New Inventory Function */
var inventoryShelfTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Subinventory Name</div></th>" +
		"<th style='height: 21.5px;' class='col-md-2 left'><div>Contact No</div></th> " +
		"<th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltSubInventoryDTO as ltSubInventoryDTO}<tr class='left'>" +
		"<td>{SrNo++}</td><td id='id{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.subinventory_Id}</td>" +
		"<td style='text-align=left' id='desc{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.subinventory_name}</td>" +
		"<td id='desc{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.inv_subInventory_contact_no}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewSubInventoryDetail({$T.ltSubInventoryDTO.subinventory_Id})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteSubInventoryDetail({$T.ltSubInventoryDTO.subinventory_Id})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>"

var formInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Id</div>"
		+ "<div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Form type</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.ltFormDTOs as ltFormDTOs}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.ltFormDTOs.form_Id}'>{$T.ltFormDTOs.form_Id}</div>"
		+ "<div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltFormDTOs.form_Id}'>{$T.ltFormDTOs.form_type}</div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewFormDetail({$T.ltFormDTOs.form_Id})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteFormDetail({$T.ltFormDTOs.form_Id})'/></div>"
		+ "</div>{#/for}" + "</div>";

 
/* New Inventory Function */
var inventoryFormTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Form Type</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltFormDTOs as ltFormDTOs}<tr class='center'> <td>{SrNo++}</td><td id='id{$T.ltFormDTOs.formId}'>{$T.ltFormDTOs.formId}</td><td style='text-align=left' id='desc{$T.ltFormDTOs.formId}'>{$T.ltFormDTOs.formType}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewFormDetail({$T.ltFormDTOs.formId})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-danger deleteUserAccess' onclick=\"deleteFormDetail({$T.ltFormDTOs.formId})\" value='EDIT' disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>"

var categoryInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Id</div>"
		+ "<div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Name of Category</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.CategoryDTO as CategoryDTO}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.CategoryDTO.category_Id}'>{$T.CategoryDTO.category_Id}</div>"
		+ "<div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.CategoryDTO.category_Id}'>{$T.CategoryDTO.category_name}</div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewCategoryDetail({$T.CategoryDTO.category_Id})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteCategoryDetail({$T.CategoryDTO.category_Id})'/></div>"
		+ "</div>{#/for}" + "</div>";


/* New Inventory Function */
var inventoryCategoryTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th>  <th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Name of Category</div></th> <th style='height: 21.5px;' class='col-md-2 left'><div>Prefix</div></th>  <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.CategoryDTO as CategoryDTO}<tr class='left'> <td>{SrNo++}</td><td id='id{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryId}</td><td style='text-align=left' id='desc{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryName}</td> <td style='text-align=left' id='desc{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryPerifix}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewCategoryDetail({$T.CategoryDTO.categoryId})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteCategoryDetail({$T.CategoryDTO.categoryId})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";

/* New Inventory Function */
var SrNoDT=1;
var inventoryDocumentTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Name of Document</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.DocumentDTO as DocumentDTO}<tr class='left'><td>{SrNoDT++}</td><td id='id{$T.DocumentDTO.doc_id}'>{$T.DocumentDTO.doc_id}</td><td style='text-align=left' id='desc{$T.DocumentDTO.doc_id}'>{$T.DocumentDTO.doc_name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewDocumentDetail({$T.DocumentDTO.doc_id})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='iDeleteDoc{$T.DocumentDTO.doc_id}' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteDocumentDetail({$T.DocumentDTO.doc_id})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>"

/* New Inventory Function */
var inventoryDocumentNumberTemp ="<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr><th><div>#</div> </th> <th style='height: 21.5px;' class='col-md-2 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Name of Document</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>Document Series</div></th>" +
				"<th style='height: 21.5px;' class='col-md-2 left'><div>Document Number</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>Prefix</div></th>" +
				"<th style='height: 21.5px;' class='col-md-2 left'><div>Suffix</div></th>" +
				"<th style='height: 21.5px;' class='col-md-2 left'><div>Financial Year</div></th>" +
				" <th style='height: 21.5px;' class='col-md-2 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}<tr class='left'><td>{SrNoDT++}</td><td id='id{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_numbering_id}</td><td  style='text-align=left' id='desc{$T.lstDocumentNUmberDto.doc_id}'><input type='hidden' value='{$T.lstDocumentNUmberDto.doc_financial_year_id}' id='hiddendocID'>{$T.lstDocumentNUmberDto.doc_name}</td>"
		+"<td style='text-align=left' id='id{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</td><td id='desc{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_number}</td>"
		+"<td style='text-align=left' id='id{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_prefix}</td><td style='text-align=left' id='desc{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_suffix}</td><td id='desc{$T.lstDocumentNUmberDto.document_numbering_id}'><input type='hidden' value='{$T.lstDocumentNUmberDto.doc_financial_year_id}' id='hiddendocfinancialID'>{$T.lstDocumentNUmberDto.doc_financial_year}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewDocumentNumberDetail({$T.lstDocumentNUmberDto.document_numbering_id})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteDocumentNumberDetail({$T.lstDocumentNUmberDto.document_numbering_id})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>"

/* New Inventory Function */
		
/*var gst =inventoryTaxSetUps.tax_rate;
alert(gst);*/
var inventoryTaxTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>GST Code</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>SGST</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>CGST</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>IGST</div></th><th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryTaxSetUps as inventoryTaxSetUps}<tr class='left'><td>{SrNoDT++}</td><td id='id{$T.inventoryTaxSetUps.tax_id}'>{$T.inventoryTaxSetUps.tax_id}</td><td style='text-align=left' id='desc{$T.inventoryTaxSetUps.tax_id}'>{$T.inventoryTaxSetUps.tax_code}</td>"
		+ "<td style='text-align=left' id='desc{$T.inventoryTaxSetUps.tax_id}'>{$T.inventoryTaxSetUps.tax_rate/2}</td><td id='desc{$T.inventoryTaxSetUps.tax_id}'>{$T.inventoryTaxSetUps.tax_rate/2}</td><td id='desc{$T.inventoryTaxSetUps.tax_id}'>{$T.inventoryTaxSetUps.tax_rate}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewTaxDetail({$T.inventoryTaxSetUps.tax_id})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteTaxDetail({$T.inventoryTaxSetUps.tax_id})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>"

/* New Inventory Function Financial Year */
var inventoryFinTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 left'><div>Fin Year Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Start Date</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>End Date</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>Financial Year</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryFinancialYears as inventoryFinancialYears}<tr class='left'><td>{SrNoDT++}</td><td id='id{$T.inventoryFinancialYears.fin_year_id}'>{$T.inventoryFinancialYears.fin_year_id}</td><td id='desc{$T.inventoryFinancialYears.fin_year_id}'>{$T.inventoryFinancialYears.fin_year_start_date}</td>"
		+ "<td id='desc{$T.inventoryFinancialYears.fin_year_id}'>{$T.inventoryFinancialYears.fin_year_end_date}</td><td id='desc{$T.inventoryFinancialYears.finYearId}'>{$T.inventoryFinancialYears.fin_year}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewFinDetail({$T.inventoryFinancialYears.fin_year_id})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteFinancialDetail({$T.inventoryFinancialYears.fin_year_id})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";

var selhallid = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.hl as hl}"
		+ "<option  value='{$T.hl.Hall_ID}'>{$T.hl.Hname}</option>" + "{#/for}";
var selOtid = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.hl as hl}"
		+ "<option  value='{$T.hl.idot_name}'>{$T.hl.ot_name}</option>"
		+ "{#/for}";

var selTemplateid = "{#foreach $T.ltTemplateDTOs as ltTemplateDTOs}"
		+ "<option  value='{$T.ltTemplateDTOs.med_template_Id}' >{$T.ltTemplateDTOs.med_template_name}</option>"
		+ "{#/for}";

var defaultStockCardTemp = "<div style='width: 100%;'>	<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'>"
		+ "<div style='width: 4%; border: 1px solid #FFF; color: #FFF; text-align: center;'>##</div>"
		+ "<div style='width: 6%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Product Id</div>"
		+ "<div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Product Name</div>	"
		+ "<div style='width: 9%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Quantity In Hand</div>"
		+ "	<div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Minimum Quantity</div>	"
		+ "	<div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Quantity On Order</div>	"
		+ "	<div style='width: 11%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Quantity Order Level</div>	"
		+ "	</div></div></div>"
		+ " <div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>   {#foreach $T.ltStockCardDTOs as ltStockCardDTOs}<div id=cathDiv{count++}  style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='divSrl{$T.ltStockCardDTOs.stockProductId}'>{sr++}</div>"
		+ "	<div style='width: 8.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='divProdId{$T.ltStockCardDTOs.stockProductId}'>{$T.ltStockCardDTOs.stockProductId}</div>	"
		+ "<div style='width: 15.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='divProdName{$T.ltStockCardDTOs.stockProductId}'>{$T.ltStockCardDTOs.StockProductName}</div>"
		+ "<div style='width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='divQntInHand{$T.ltStockCardDTOs.stockProductId}'>{$T.ltStockCardDTOs.stockQntInHand}</div>"
		+ "<div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='divMinQnt{$T.ltStockCardDTOs.stockProductId}'>{$T.ltStockCardDTOs.stockMinQnt}</div>"
		+ "<div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='divQntOnOrder{$T.ltStockCardDTOs.stockProductId}'>{$T.ltStockCardDTOs.stockQntOnOrder}</div>"
		+ "<div style='width: 11.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='divQntOrderLevel{$T.ltStockCardDTOs.stockProductId}'>{$T.ltStockCardDTOs.stockQntUoToLevel}</div>"
		+ "</div></div>{#/for}<input type='hidden' value='{--sr}' id='rowCount'></div>";
/*
 * var selTemplateid = "<div style='width:
 * 100%;margin-top:20px;margin-left:10px; '>" + "<div style='width: 100%;
 * background-color: #436a9d; padding: 1%; font-weight: bold;'>" + "<div
 * style='width: 100%;'>" + "<div style='width: 16%; border: 1px solid #FFF;
 * color: #FFF; padding-left: 2%; padding-right: 1%;'> Id </div>" + "<div
 * style='width: 32%; border: 1px solid #FFF; color: #FFF; padding-left: 2%;
 * padding-right: 1%;'>Template Name</div>" + "<div style='width: 14%; border:
 * 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>View</div>" + "<div
 * style='width: 14%; border: 1px solid #FFF; color: #FFF; padding-left: 2%;
 * padding-right: 1%;'>Select</div>" + "</div>" + "</div>" + "</div>" + "<div
 * style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid
 * #436a9d;margin-left:10px;margin-bottom:10px;'>{#foreach $T.ltTemplateDTOs as
 * ltTemplateDTOs}" + "<div style='width: 100%; height: 28px; border-bottom:
 * 1px solid #069;'>" + "<div style='width: 20%; height: 23px; text-align:
 * center; border-right: 1px solid #069; padding-top: 5px;'
 * id='id{$T.ltTemplateDTOs.med_template_Id}'>{$T.ltTemplateDTOs.med_template_Id}</div>" + "<div
 * style='width: 34.9%; height: 23px; border-right: 1px solid #069;
 * padding-left: 1%; padding-top: 5px;'
 * id='name{$T.ltTemplateDTOs.med_template_Id}'>{$T.ltTemplateDTOs.med_template_name}</div>" + "<div
 * style='width: 17%; height: 25px; padding-left: 1%; padding-top: 3px;
 * text-align: center;'><input style='font-size: 11px;width:85%;' type='button'
 * name='buttonEdit' id='btnEdit' value='View' class='edit'
 * onclick=\"viewTemplateDetail({$T.ltTemplateDTOs.med_template_Id})\" /></div>" + "<div
 * style='width: 7%; height: 25px; padding-left: 1%; padding-top: 3px;
 * text-align: center;'><input style='font-size: 11px;width:85%;'
 * type='checkbox' name='buttonEdit' id='btnEdit' class='edit'
 * onclick=\"viewTemplateDetail({$T.ltTemplateDTOs.med_template_Id})\" /></div>" + "</div>{#/for}" + "</div>";
 * var selUserid = "<option value='Select'>-Select-</option>" + "{#foreach
 * $T.ul as ul}" + "<option value='{$T.ul.User_ID}'>{$T.ul.User_Name}</option>" +
 * "{#/for}";
 * 
 */
var manufacturerInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 7%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Id</div>"
		+ "<div style='width: 26%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Manufacturer Name</div>"
		+ "<div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Details</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.ltManufacturerDTOs as ltManufacturerDTOs}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.ltManufacturerDTOs.manufacturer_Id}'>{$T.ltManufacturerDTOs.manufacturer_Id}</div>"
		+ "<div style='width: 27.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltManufacturerDTOs.manufacturer_Id}'>{$T.ltManufacturerDTOs.manufacturer_name}</div>"
		+ "<div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltManufacturerDTOs.manufacturer_Id}'>{$T.ltManufacturerDTOs.manufacturer_detail}</div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewManufacturerDetail({$T.ltManufacturerDTOs.manufacturer_Id})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteManufacturerDetail({$T.ltManufacturerDTOs.manufacturer_Id})'/></div>"
		+ "</div>{#/for}" + "</div>";
/* New Inventory Function */
var inventoryManufacturerTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Manufacturer Name</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>Details</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltManufacturerDTOs as ltManufacturerDTOs}<tr class='left'><td>{SrNo++}</td><td id='id{$T.ltManufacturerDTOs.manufacturerId}'>{$T.ltManufacturerDTOs.manufacturerId}</td><td style='text-align=left' id='desc{$T.ltManufacturerDTOs.manufacturerId}'>{$T.ltManufacturerDTOs.manufacturerName}</td><td style='text-align=left' id='desc{$T.ltManufacturerDTOs.manufacturerId}'>{$T.ltManufacturerDTOs.manufacturerDetail}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewManufacturerDetail({$T.ltManufacturerDTOs.manufacturerId})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteManufacturerDetail({$T.ltManufacturerDTOs.manufacturerId})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>"

var trolleyInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Id</div>"
		+ "<div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Trolley Name</div>"
		+ "<div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Type</div>"
		+ "<div style='width: 14%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Location</div>"
		+ "<div style='width: 11%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.ltTrolleyDTOs as ltTrolleyDTOs}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.ltTrolleyDTOs.trolley_Id}'>{$T.ltTrolleyDTOs.trolley_id}</div>"
		+ "<div style='width: 16.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='name{$T.ltTrolleyDTOs.trolley_Id}'>{$T.ltTrolleyDTOs.trolley_name}</div>"
		+ "<div style='width: 16.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='type{$T.ltTrolleyDTOs.trolley_Id}'>{$T.ltTrolleyDTOs.trolley_type}</div>"
		+ "<div style='width: 15%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='hname{$T.ltTrolleyDTOs.trolley_Id}'>{$T.ltTrolleyDTOs.trolley_Hall_name}</div>"
		+ "<input type='hidden' id='hall_id{$T.ltTrolleyDTOs.trolley_hall_id}' value='{$T.ltTrolleyDTOs.trolley_hall_id}'/> "
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewTrolleyDetail({$T.ltTrolleyDTOs.trolley_id})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteTrolleyDetail({$T.ltTrolleyDTOs.trolley_id})'/></div>"
		+ "</div>{#/for}" + "</div>";

var templateInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 7%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Id</div>"
		+ "<div style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Template Name</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.ltTemplateDTOs as ltTemplateDTOs}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.ltTemplateDTOs.templateId}'>{$T.ltTemplateDTOs.templateId}</div>"
		+ "<div style='width: 29.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltTemplateDTOs.templateId}'>{$T.ltTemplateDTOs.templateName}</div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewTemplateDetail({$T.ltTemplateDTOs.templateId})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteTemplateDetail({$T.ltTemplateDTOs.templateId})'/></div>"
		+ "</div>{#/for}" + "</div>";
/********************************************warehouse details*********************************************/
var inventoryWarehouseTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
	+ "<thead class='cf' style='background: white;'>"
	+ "<tr> <th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Warehouse Name</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Location</div></th>" 
	+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
	+ "{#foreach $T.ltWarehouseDTOs as ltWarehouseDTOs}"
	+ "<tr class='left'><td>{SrNo++}</td><td id='id{$T.ltWarehouseDTOs.warehouseId}'>{$T.ltWarehouseDTOs.warehouseId}</td>"
	+ "<td style='text-align=left' id='desc{$T.ltWarehouseDTOs.warehouseId}'>{$T.ltWarehouseDTOs.warehouseName}</td>"
	+ "<td style='text-align=left' id='desc{$T.ltWarehouseDTOs.warehouseId}'>{$T.ltWarehouseDTOs.warehouselocation}</td>"
	+ "<td><button id='btnEdit' class='btn btn-xs btn-success editUserAccess' value='EDIT' onclick='viewWarehouseDetails({$T.ltWarehouseDTOs.warehouseId})' disabled='disabled'>"
	+ "<i class='fa fa-edit'></i></button></td>"
	+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteWarehouseDetail({$T.ltWarehouseDTOs.warehouseId})\" disabled='disabled'>"
	+ "<i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";

/*
 * var trolleyInventoryTemp = "<div style='width: 100%;'>" + "<div
 * style='width: 98%; background-color: #436a9d; padding: 1%; font-weight:
 * bold;'>" + "<div style='width: 100%;'>" + "<div style='width: 10%; border:
 * 1px solid #FFF; color: #FFF; text-align: center;'>Trolley Id</div>" + "<div
 * style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%;
 * padding-right: 1%;'>Trolley name</div>" + "<div style='width: 29%; border:
 * 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Trolley
 * type</div>" + "<div style='width: 29%; border: 1px solid #FFF; color: #FFF;
 * padding-left: 2%; padding-right: 1%;'>Trolley Location</div>" + "<div
 * style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left:
 * 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>" + "<div
 * style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left:
 * 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>" + "</div>" + "</div>" + "</div>" + "<div
 * style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid
 * #436a9d;'>{#foreach $T.ltTrolleyDTOs as ltTrolleyDTOs}" + "<div
 * style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>" + "<div
 * style='width: 11%; height: 23px; text-align: center; border-right: 1px solid
 * #069; padding-top: 5px;'
 * id='id{$T.ltTrolleyDTOs.trolley_Id}'>{$T.ltFormDTOs.trolley_Id}</div>" + "<div
 * style='width: 30.9%; height: 23px; border-right: 1px solid #069;
 * padding-left: 1%; padding-top: 5px;'
 * id='name{$T.ltTrolleyDTOs.trolley_Id}'>{$T.ltTrolleyDTOs.trolley_name}</div>" + "<div
 * style='width: 30.9%; height: 23px; border-right: 1px solid #069;
 * padding-left: 1%; padding-top: 5px;' id='type{$T.ltTrolleyDTOs.trolley_Id}'></div>" + "<div
 * style='width: 30.9%; height: 23px; border-right: 1px solid #069;
 * padding-left: 1%; padding-top: 5px;' id='loc{$T.ltTrolleyDTOs.trolley_Id}'></div>" + "<div
 * style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px;
 * text-align: center;'><input style='font-size: 11px;width:85%;' type='submit'
 * name='buttonEdit' id='btnEdit' value='Edit' class='edit'
 * onclick=\"viewFormDetail({$T.ltTrolleyDTOs.form_Id})\" /></div>" + "<div
 * style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px;
 * text-align: center;'><input style='font-size: 11px;width:85%;' type='submit'
 * name='buttonDelete' id='btnDelete' value='Delete' class='edit'
 * onclick='deleteFormDetail({$T.ltTrolleyDTOs.form_Id})'/></div>" + "</div>{#/for}" + "</div>";
 */

/**
 * ****************Start Common
 * Function************{$T.ltTrolleyDTOs.trolley_type}********{$T.ltTrolleyDTOs.trolley_hall_id}************
 */

var ingredientInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Id</div>"
		+ "<div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Ingredient Content</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.ltIngredientDTOs as ltIngredientDTOs}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.ltIngredientDTOs.ingredient_Id}'>{$T.ltIngredientDTOs.ingredient_Id}</div>"
		+ "<div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltIngredientDTOs.ingredient_Id}'>{$T.ltIngredientDTOs.ingredient_content}</div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewIngredientDetail({$T.ltIngredientDTOs.ingredient_Id})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteIngredientDetail({$T.ltIngredientDTOs.ingredient_Id})'/></div>"
		+ "</div>{#/for}" + "</div>";

/* New Inventory Function */
var inventoryIngredientTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Ingredient Content</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltIngredientDTOs as ltIngredientDTOs}<tr class='left'><td>{SrNo++}</td><td id{$T.ltIngredientDTOs.ingredientId}'>{$T.ltIngredientDTOs.ingredientId}</td><td style='text-align=left' id='desc{$T.ltIngredientDTOs.ingredientId}'>{$T.ltIngredientDTOs.ingredientContent}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewIngredientDetail({$T.ltIngredientDTOs.ingredientId})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-danger deleteUserAccess' onclick=\"deleteIngredientDetail({$T.ltIngredientDTOs.ingredientId})\" value='DELETE' disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";

var packingInventoryTemp = "<div style='width: 100%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Id</div>"
		+ "<div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Packing Name</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Edit</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;text-align: center;border-right: 1px solid #FFF;'>Delete</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>{#foreach $T.ltPackingDTOs as ltPackingDTOs}"
		+ "<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' id='id{$T.ltPackingDTOs.packing_Id}'>{$T.ltPackingDTOs.packing_Id}</div>"
		+ "<div style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='desc{$T.ltPackingDTOs.packing_Id}'>{$T.ltPackingDTOs.packing_type}</div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick=\"viewPackingDetail({$T.ltPackingDTOs.packing_Id})\" /></div>"
		+ "<div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deletePackingDetail({$T.ltPackingDTOs.packing_Id})'/></div>"
		+ "</div>{#/for}" + "</div>";

/* New Inventory Function */
var inventoryPackingTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Packing Name</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltPackingDTOs as ltPackingDTOs}<tr class='left'> <td>{SrNo++}</td><td id='id{$T.ltPackingDTOs.packingId}'>{$T.ltPackingDTOs.packingId}</td><td style='text-align=left' id='desc{$T.ltPackingDTOs.packingId}'>{$T.ltPackingDTOs.packingName}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewPackingDetail({$T.ltPackingDTOs.packingId})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-danger deleteUserAccess' onclick=\"deletePackingDetail({$T.ltPackingDTOs.packingId})\" value='DELETE' disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";

var selCategoryTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.CategoryDTO as CategoryDTO}"
		+ "<option  value='{$T.CategoryDTO.category_Id}'>{$T.CategoryDTO.category_name}</option>"
		+ "{#/for}";

/* New Inventory Document List */
var selInventoryDocumentTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.DocumentDTO as DocumentDTO}"
		+ "<option  value='{$T.DocumentDTO.doc_id}'>{$T.DocumentDTO.doc_name}</option>"
		+ "{#/for}";

/* New Inventory Financial Year List */
var selInventoryFinancialYearTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.inventoryFinancialYears as inventoryFinancialYears}"
		+ "<option  value='{$T.inventoryFinancialYears.fin_year_id}'>{$T.inventoryFinancialYears.fin_year}</option>"
		+ "{#/for}";

var selManufacturerTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltManufacturerDTOs as ltManufacturerDTOs}"
		+ "<option  value='{$T.ltManufacturerDTOs.manufacturer_Id}'>{$T.ltManufacturerDTOs.manufacturer_name}</option>"
		+ "{#/for}";

var selSupplierTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltVendorDTOs as ltVendorDTOs}"
		+ "<option  value='{$T.ltVendorDTOs.vendor_Id}'>{$T.ltVendorDTOs.vendor_name}</option>"
		+ "{#/for}";

var selUOMTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltUomDTOs as ltUomDTOs}"
		+ "<option  value='{$T.ltUomDTOs.uom_Id}'>{$T.ltUomDTOs.uom_description}</option>"
		+ "{#/for}";

var selFormTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltFormDTOs as ltFormDTOs}"
		+ "<option  value='{$T.ltFormDTOs.form_Id}'>{$T.ltFormDTOs.form_type}</option>"
		+ "{#/for}";

var selPackingTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltPackingDTOs as ltPackingDTOs}"
		+ "<option  value='{$T.ltPackingDTOs.packing_Id}'>{$T.ltPackingDTOs.packing_type}</option>"
		+ "{#/for}";

var selShelfTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltShelfDTO as ltShelfDTO}"
		+ "<option  value='{$T.ltShelfDTO.shelf_Id}'>{$T.ltShelfDTO.shelf_section_no}</option>"
		+ "{#/for}";

var selIngredientTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltIngredientDTOs as ltIngredientDTOs}"
		+ "<option  value='{$T.ltIngredientDTOs.ingredient_Id}'>{$T.ltIngredientDTOs.ingredient_content}</option>"
		+ "{#/for}";

var productInventoryTemp = "{#foreach $T.ltProductDTOs as ltProductDTOs}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 2%; height: 23px; border-right: 1px solid #069; padding-left: 2%; padding-top: 5px;'>{count++}</div>"
		+ "<div style='width: 6%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.ltProductDTOs.productId}</div>"
		+ "<div style='width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'>{$T.ltProductDTOs.productName}</div>"
		+ "<div style='width: 10.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;'>{$T.ltProductDTOs.productCategoryName}</div>"
		+ "<div style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;'>{$T.ltProductDTOs.productManufacturerName} </div>"
		+ "<div style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;'>{$T.ltProductDTOs.productVendorName}</div>"
		+ "<div style='width: 5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;'>{$T.ltProductDTOs.productCost} </div>"
		+ "<div style='width: 5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align:left;'>{$T.ltProductDTOs.productMRP}</div>"
		+ "<div style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align:right; padding-right: 1%;'>{$T.ltProductDTOs.stockDTO.stockQntOnHand}</div>"
		+ "<div style='width: 8%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonEdit' id='btnEdit' value='Edit' class='edit' onclick='viewProductDetail({$T.ltProductDTOs.productId})' /></div>"
		+ "<div style='width: 8%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 11px;width:85%;' type='submit' name='buttonDelete' id='btnDelete' value='Delete' class='edit' onclick='deleteProductDetail({$T.ltProductDTOs.productId})'/></div></div>{#/for}";

var trolleyListReqInventoryTemp = "{#foreach $T.ltTrolleyDTOs as ltTrolleyDTOs}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 5%; height: 23px; border-right: 1px solid #069; padding-left: 2%; padding-top: 5px;'>{count++}.</div>"
		+ "<div style='width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' >{$T.ltTrolleyDTOs.trolley_id}</div>"
		+ "<div style='width: 20%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'>{$T.ltTrolleyDTOs.trolley_name}</div>"
		+ "<div style='width: 15%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.ltTrolleyDTOs.trolley_type}</div>"
		+ "<div style='width: 20%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;'>{$T.ltTrolleyDTOs.trolley_Hall_name}</div>"
		+ "<div style='width: 20%; height: 25px; padding-left: 1%; padding-top: 7px; text-align: center;'><a href='FillRequirementDetail.jsp?trolleyid={$T.ltTrolleyDTOs.trolley_id}' style='text-decoration: none; font-size: 11px;width:85%;' class='edit'>Generate Requirement</a></div>"
		+ "</div>{#/for}";

var trolleyInfo = "{#foreach $T.ltTrolleyDTOs as ltTrolleyDTOs}<div style='width: 100%; background-color: #bfdbff; border: 1px solid #39C; padding: 1%;'><div style='width: 90%;'><div style='width: 100%;'><div style='width: 50%;'><div style='width: 100%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Trolley ID .</div>"
		+ " <div style='width: 43%; padding-right: 7%; color: #002c67;' id='divTrolleyId'>{$T.ltTrolleyDTOs.trolley_id}</div> </div>"
		+ " <div style='width: 100%; padding-top: 2%;'> <div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Trolley Type</div>"
		+ " <div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.ltTrolleyDTOs.trolley_type}</div> </div> </div> "
		+ "<div style='width: 48%;'> <div style='width: 100%; '> <div 	style='width: 35%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Trolley Name</div> "
		+ "<div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.ltTrolleyDTOs.trolley_name}</div> </div> <div style='width: 100%; padding-top: 2%;'> "
		+ "<div 	style='width: 35%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Hall Name</div> <div style='width: 25%; padding-right: 7%; color: #002c67;'>{$T.ltTrolleyDTOs.trolley_Hall_name}</div> </div> </div></div> </div></div>{#/for}";

var trolleyAllListReqInventoryTemp = "{#foreach $T.ltTrolleyDTOs as ltTrolleyDTOs}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>"
		+ "<div style='width: 5%; height: 23px; border-right: 1px solid #069; padding-left: 2%; padding-top: 5px;'>{count++}.</div>"
		+ "<div style='width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' >{$T.ltTrolleyDTOs.trolley_id}</div>"
		+ "<div style='width: 20%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'>{$T.ltTrolleyDTOs.trolley_name}</div>"
		+ "<div style='width: 15%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.ltTrolleyDTOs.trolley_type}</div>"
		+ "<div style='width: 20%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;'>{$T.ltTrolleyDTOs.trolley_Hall_name}</div>"
		+ "<div style='width: 20%; height: 25px; padding-left: 1%; padding-top: 7px; text-align: center;'><a href='TrolleyDetails.jsp?trolleyid={$T.ltTrolleyDTOs.trolley_id}' style='text-decoration: none; font-size: 11px;width:85%;' class='edit'>View</a></div>"
		+ "</div>{#/for}";

/** ****************Start Common Function******************************** */
function setInventory(inventoryType) {

	var inputs = 'action=setInventory';

	jQuery.ajax({
		async : true,
		type : "POST",
		data : inputs + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			ItemBean = eval('(' + ajaxResponse + ')');
			if (inventoryType == "MainInventory") {
				$("#InventoryContent").setTemplate(inventoryTemp);
			} else if (inventoryType == "LabInventory") {
				$("#InventoryContent").setTemplate(labInventoryTemp);
			} else if (inventoryType == "CCUInventory") {
				$("#InventoryContent").setTemplate(ccuInventoryTemp);
			} else if (inventoryType == "OPDInventory") {
				$("#InventoryContent").setTemplate(opdInventoryTemp);
			}
			$("#InventoryContent").processTemplate(ItemBean);

		}
	});
};

function setSearchedInventory() {
	var inventoryType = ($('input:radio[name=inventory]:checked').val());
	// alert(inventoryType);

	var byName = $("#byName").val();
	var byId = $("#byId").val();

	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("please search either by Item Id or by Item Name");
		return false;
	} else if (byName == "" && byId == "") {
		alert("please insert something for search");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=setInventory');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('showFun=fetchSearchedItems');
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
				ajaxResponse = r;
				// alert(ajaxResponse);
				ItemBean = eval('(' + ajaxResponse + ')');
				if (ItemBean.il == 0) {
					alert("Item Not Found");

				} else {
					if (inventoryType == "MainInventory") {
						$("#InventoryContent").setTemplate(inventoryTemp);
					} else if (inventoryType == "LabInventory") {
						$("#InventoryContent").setTemplate(labInventoryTemp);
					} else if (inventoryType == "CCUInventory") {
						$("#InventoryContent").setTemplate(ccuInventoryTemp);
					} else if (inventoryType == "OPDInventory") {
						$("#InventoryContent").setTemplate(opdInventoryTemp);
					}
					$("#InventoryContent").processTemplate(ItemBean);
				}
			}
		});

	}
};

/** ****************End Common Function********************************** */

/** ***************Start CCU-Inventory Functions************************* */

function saveCCUInventory(id) {

	var opType = $("#selArq" + id).val();
	var addRemoveQty = $("#txtARQ" + id).val();
	var ccuInventroyQty = $("#txtAQ" + id).val();
	var mainInventroyQty = $("#txtMIQ" + id).val();
	var quantity = ($(id).val());

	if (addRemoveQty == "" || addRemoveQty == null) {
		alert("You Should Insert The Add/Remove Quantity");
		return false;
	}
	var labQty;
	if (opType == "add") {

		if (parseFloat(mainInventroyQty) >= parseFloat(addRemoveQty)) {
			ccuInventroyQty = (parseFloat(addRemoveQty) + parseFloat(ccuInventroyQty));
			mainInventroyQty = (parseFloat(mainInventroyQty) - parseFloat(addRemoveQty));
		} else {
			alert("Item Quantity in Main inventory is Not much sufficient");
			return false;
		}

	} else if (opType = "remove") {

		if (parseFloat(addRemoveQty) <= parseFloat(ccuInventroyQty)) {
			ccuInventroyQty = (parseFloat(ccuInventroyQty) - parseFloat(addRemoveQty));
			mainInventroyQty = (parseFloat(mainInventroyQty) + parseFloat(addRemoveQty));
		} else {
			alert("Item Quantity is Not much sufficient for Removal.");
			return false;
		}

	}

	var inputs = [];

	inputs.push("action=saveCCUInventory");
	inputs.push('ccuInventroyQty=' + ccuInventroyQty);
	inputs.push('mainInventroyQty=' + mainInventroyQty);
	inputs.push('itemId=' + id);

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
			ajaxResponse = r;
			$("#dispMessage").html(ajaxResponse);
			setInventory("CCUInventory");
		}
	});
}

/** ***************End CCU-Inventory Functions************************* */

/** ***************Start OPD-Inventory Functions************************* */

function saveOPDInventory(id) {

	var opType = $("#selArq" + id).val();
	var addRemoveQty = $("#txtARQ" + id).val();
	var opdInventroyQty = $("#txtAQ" + id).val();
	var mainInventroyQty = $("#txtMIQ" + id).val();
	var quantity = ($(id).val());

	if (addRemoveQty == "" || addRemoveQty == null) {
		alert("You Should Insert The Add/Remove Quantity");
		return false;
	}
	var labQty;
	if (opType == "add") {

		if (parseFloat(mainInventroyQty) >= parseFloat(addRemoveQty)) {
			opdInventroyQty = (parseFloat(addRemoveQty) + parseFloat(opdInventroyQty));
			mainInventroyQty = (parseFloat(mainInventroyQty) - parseFloat(addRemoveQty));
		} else {
			alert("Item Quantity in Main inventory is Not much sufficient");
			return false;
		}

	} else if (opType = "remove") {

		if (parseFloat(addRemoveQty) <= parseFloat(opdInventroyQty)) {
			opdInventroyQty = (parseFloat(opdInventroyQty) - parseFloat(addRemoveQty));
			mainInventroyQty = (parseFloat(mainInventroyQty) + parseFloat(addRemoveQty));
		} else {
			alert("Item Quantity is Not much sufficient for Removal.");
			return false;
		}

	}

	var inputs = [];

	inputs.push("action=saveOPDInventory");
	inputs.push('opdInventroyQty=' + opdInventroyQty);
	inputs.push('mainInventroyQty=' + mainInventroyQty);
	inputs.push('itemId=' + id);

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
			ajaxResponse = r;
			$("#dispMessage").html(ajaxResponse);
			setInventory("OPDInventory");
		}
	});
}

/** ***************End OPD-Inventory Functions************************* */

/** ***************Start Lab-Inventory Functions************************* */

function saveLabInventory(id) {

	var opType = $("#selArq" + id).val();
	var addRemoveQty = $("#txtARQ" + id).val();
	var labInventroyQty = $("#txtAQ" + id).val();
	var mainInventroyQty = $("#txtMIQ" + id).val();
	var quantity = ($(id).val());

	if (addRemoveQty == "" || addRemoveQty == null) {
		alert("You Should Insert The Add/Remove Quantity");
		return false;
	}
	var labQty;
	if (opType == "add") {

		if (parseFloat(mainInventroyQty) >= parseFloat(addRemoveQty)) {
			labInventroyQty = (parseFloat(addRemoveQty) + parseFloat(labInventroyQty));
			mainInventroyQty = (parseFloat(mainInventroyQty) - parseFloat(addRemoveQty));
		} else {
			alert("Item Quantity in Main inventory is Not much sufficient");
			return false;
		}

	} else if (opType = "remove") {

		if (parseFloat(addRemoveQty) <= parseFloat(labInventroyQty)) {
			labInventroyQty = (parseFloat(labInventroyQty) - parseFloat(addRemoveQty));
			mainInventroyQty = (parseFloat(mainInventroyQty) + parseFloat(addRemoveQty));
		} else {
			alert("Item Quantity is Not much sufficient for Removal.");
			return false;
		}

	}

	var inputs = [];

	inputs.push("action=saveLabInventory");
	inputs.push('labInventroyQty=' + labInventroyQty);
	inputs.push('mainInventroyQty=' + mainInventroyQty);
	inputs.push('itemId=' + id);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());

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
			ajaxResponse = r;
			$("#dispMessage").html(ajaxResponse);
			setInventory("LabInventory");
		}
	});
}

/** ***************End Lab-Inventory Functions************************* */

/** ***************Start Main-Inventory Functions************************* */
/**
 * ****************Strat Nitin
 * **************************************************
 */
var count = 0;
var total = 0;
var box;
var qty;
var subqty;
function showPopup(rowCount) {
	// alert(rowCount+"sdf");
	myobj = $("#divMyobj").html();

	if (myobj != "null") {
		return false;
	}

	count = rowCount;
	$("#uomPopup").show(500);
	$("#txtboxqty").val('');
	$("#txtnumQty").val('');
	$("#txtSubQty").val('');
	$(".background_overlay").show();
	if (!$("#uomPopup").is(':visible')) {
		return;
	}
	$("#uomPopup").css({
		left : ($(window).width() - $('#uomPopup').width()) / 2.2,
		top : ($(window).width() - $('#uomPopup').width()) / 3.5,
		position : 'absolute'
	});
	$("#closepopup").click(function() {
		$("#uomPopup").hide(400);
		$(".background_overlay").hide();
	});
	$("#OK").click(function() {

		box = $("#txtboxqty").val();

		qty = $("#txtnumQty").val();
		subqty = $("#txtSubQty").val();

		if (box == "" || box == null) {
			box = '1';
		} else if (qty == "" || qty == null) {
			qty = '1';
		} else if (subqty == "" || subqty == null) {
			subqty = '1';
		}

		total = box * qty * subqty;

		if (qty == "" || qty == null) {
			qty = '1';
		}
		if (subqty == "" || subqty == null) {
			subqty = '1';
		}
		total = box * qty * subqty;

		$("#qty" + count).val(total);
		$("#uomPopup").hide(400);
		$(".background_overlay").hide();
	});
}

/*
 * $(document).ready(function() {
 * 
 * });
 */

function createDivGRN() {
	// ar hiddenRowCount = document.getElementById("RowCount");
	var rowCount = $("#RowCount").val();

	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "div" + rowCount;
	// alert(DRRDiv);
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');
	document.getElementById("grnDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<div  style="width: 100%; height: 28px; border-bottom: 1px solid #069;"> <div style="width: 5.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ rowCount
			+ '</div> <div style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%; "> <input type="text" name="" style="width: 89%; border: 0.2px solid; border-color: #069;" onchange="setSplitIdWithAddBatch('
			+ rowCount
			+ ')" class="auto" id="productName'
			+ rowCount
			+ '" value="" >  </div><div	style="width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="packing'
			+ rowCount
			+ '" value="" /></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="qty'
			+ rowCount
			+ '" value="" onfocus="showPopup('
			+ rowCount
			+ ')"/></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 95%;" type="text"	id="mrp'
			+ rowCount
			+ '" value="" /></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="rate'
			+ rowCount
			+ '" value="" /></div> <div style="width: 10%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px;" > <input style=" border: 1px solid #069; visibility :hidden;" value="Add Batch" class="addBatch" type="button" onClick="batchPopup('
			+ rowCount
			+ ')" id="btnAddBatch'
			+ rowCount
			+ '" value="" /> </div><div style="width:; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"> <input type="checkbox" value="" name="checkbox'
			+ rowCount
			+ '" id="checkbox'
			+ rowCount
			+ '"/></div><div id="panel"><div class="dialog" id="myform'
			+ rowCount
			+ '"><a style="float:right;color:white" id="close'
			+ rowCount
			+ '" onClick="batchClose('
			+ rowCount
			+ ')">X</a><form><label id="valueFromMyButton'
			+ rowCount
			+ '"></label><table style="width:130px;color:white"><tr><td>Batch Code <input style="width: 90%; border: 1px solid #069;" type="text" onkeypress="" id="txtBatchCode'
			+ rowCount
			+ '" value="" /> </td></tr><tr> <td>Expiry Date <input id="date-pick'
			+ rowCount
			+ '" name="date-pick'
			+ rowCount
			+ '" value=""	style="width: 90%;" /></td></tr><tr><td><input type="button" value="Save" class="btnOK" id="btnOK'
			+ rowCount
			+ '" onClick="addToHiddenFields('
			+ rowCount
			+ ')" /></td></tr></table><br /></form></div></div><input type="hidden" id="GrnComp'
			+ rowCount
			+ '" value="0"/><input type="hidden" id="productId'
			+ rowCount
			+ '" /></div>  <input type="hidden" id="hiddenBatchCode'
			+ rowCount
			+ '" ><input type="hidden" id="hiddenExpDate'
			+ rowCount
			+ '" ></div>';
	$(".auto").autocomplete(
			"AutoSuggetionServlet?auto=productNameVen&vendorId="
					+ $('#vender').val());
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

	$("#date-pick" + rowCount).datePicker({
		clickInput : true
	});

}

function toRemoveDivGrn(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = RowCount;
	var temp = rowCount;
	var p = 1;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#div" + p + "").remove();
			temp = temp - 1;
			$("#RowCount").val(temp);
		}
		p++;
	}
}
function batchPopup(rowCount) {
	$("#myform" + rowCount).show(500);

	var d = new Date();
	var dformat = [ d.getFullYear(), d.getMonth() + 1, d.getDate() ].join('-');
	$("#date-pick" + rowCount).val(dformat);

}
function batchClose(rowCount) {
	$("#myform" + rowCount).hide(400);
}
function addToHiddenFields(rowCount) {
	if ($('#txtBatchCode' + rowCount).val() == "") {
		alert("Please enter batch code..!");
		return false;
	}
	$('#hiddenBatchCode' + rowCount).val($('#txtBatchCode' + rowCount).val());
	$('#hiddenExpDate' + rowCount).val($('#date-pick' + rowCount).val());
	$("#myform" + rowCount).hide(400);
}

function createDivGIN() {
	// ar hiddenRowCount = document.getElementById("RowCount");
	var rowCount = $("#RowCount").val();

	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "div" + rowCount;
	// alert(DRRDiv);
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');
	document.getElementById("ginDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<div  style="width: 100%; height: 28px; border-bottom: 1px solid #069;"> <div style="width: 5.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ rowCount
			+ '</div> <div style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%; padding-top: 5px;"> <input type="text" name="" style="width: 89%; border: 0.2px solid; border-color: #069;" onchange="setSplit('
			+ rowCount
			+ ')" class="auto" id="productName'
			+ rowCount
			+ '" value="" >  </div><div	style="width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="packing'
			+ rowCount
			+ '" value="" /></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="qty'
			+ rowCount
			+ '" value="" onfocus="showPopup('
			+ rowCount
			+ ')"/></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 95%;" type="text"	id="mrp'
			+ rowCount
			+ '" value="" /></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="rate'
			+ rowCount
			+ '" value="" /></div> <div style="width: 10%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px;" > <input style=" border: 1px solid #069; display: none;" value="Add Batch" class="addBatch" type="button" onClick="batchPopup('
			+ rowCount
			+ ')" id="btnAddBatch'
			+ rowCount
			+ '" value="" /> </div><div style="width:; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"> <input type="checkbox" value="" name="checkbox'
			+ rowCount
			+ '" id="checkbox'
			+ rowCount
			+ '"/></div><div id="panel"><div class="dialog" id="myform'
			+ rowCount
			+ '"><a style="float:right;color:white" id="close'
			+ rowCount
			+ '" onClick="batchClose('
			+ rowCount
			+ ')">X</a><form><label id="valueFromMyButton'
			+ rowCount
			+ '"></label><table style="width:130px;color:white"><tr><td>Batch Code <input style="width: 90%; border: 1px solid #069;" type="text" onkeypress="" id="txtBatchCode'
			+ rowCount
			+ '" value="" /> </td></tr><tr> <td>Expiry Date <input id="date-pick'
			+ rowCount
			+ '" name="date-pick'
			+ rowCount
			+ '" value=""	style="width: 90%;" /></td></tr><tr><td><input type="button" value="Save" class="btnOK" id="btnOK'
			+ rowCount
			+ '" onClick="addToHiddenFields('
			+ rowCount
			+ ')" /></td></tr></table><br /></form></div></div><input type="hidden" id="GinComp'
			+ rowCount
			+ '" value="0"/><input type="hidden" id="productId'
			+ rowCount
			+ '" /></div>  <input type="hidden" id="hiddenBatchCode'
			+ rowCount
			+ '" ><input type="hidden" id="hiddenExpDate'
			+ rowCount
			+ '" ></div>';
	$(".auto").autocomplete(
			"AutoSuggetionServlet?auto=productNameForTrolley&trolleyid="
					+ $('#trolley').val());
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;
}
function setSplit(rowcount) {
	setTimeout(function() {
		var name = $("#productName" + rowcount).val();
		var arr = name.split("_");
		$("#productName" + rowcount).val(arr[0]);
		$("#productId" + rowcount).val(arr[1]);
		$("#packing" + rowcount).val(arr[4]);
		$("#rate" + rowcount).val(arr[5]);
		$("#mrp" + rowcount).val(arr[6]);
	}, 500);
}
function getNextGRNMasterID() {
	var inputs = [];
	inputs.push('action=getGRNMasterID');
	inputs.push('tableName=inv_grn_stock_adj_master');
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
			ajaxResponse = r;
			$("#taxVoucherNo").val(r);
		}
	});
}
function getNextGINMasterID() {
	var inputs = [];
	inputs.push('action=getGINMasterID');
	inputs.push('tableName=inv_gin_stock_adj_master');
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
			ajaxResponse = r;
			$("#taxVoucherNo").val(r);
		}
	});
}
function saveGRN() {

	var liGrnCompObj = {
		liGrnComp : []
	};
	var count = 0;

	var rowCount = $("#RowCount").val();
	for ( var i = 1; i <= rowCount; i++) {
		count++;
		// var chkval = $('#checkbox' + i).attr('checked') ? 1 : 0;
		var Pid = $("#productId" + count + "").val();
		var qty = $("#qty" + count + "").val();
		var mrp = $("#mrp" + count + "").val();
		var rate = $("#rate" + count + "").val();
		var batchcode = $('#hiddenBatchCode' + count).val();
		var expdate = $('#hiddenExpDate' + count).val();
		var idGrnComp = $("#GrnComp" + count + "").val();

		if ($("#qty" + count + "").val() == ''
				|| $("#mrp" + count + "").val() == ''
				|| $("#rate" + count + "").val() == '') {
			alert("Please select MRP/Rate/Quantity !");
			return false;
		}

		if (Pid != undefined) {
			liGrnCompObj.liGrnComp.push({
				"idProd" : Pid,
				"idGrnCom" : idGrnComp,
				"grnQty" : qty,
				"grnMrp" : mrp,
				"grnCt" : rate,
				"stockAdjBatchCode" : batchcode,
				"stockAdjExpDate" : expdate
			});
		}
	}
	if (rowCount == 0) {
		alert("Please add products..!");
		return false;
	}

	if ($("#vender").val() == 'Select') {
		alert("Please select Vendor !");
		return false;
	}
	if ($("#txtDate").val() == '') {
		alert("Please select Date ! ");
		return false;
	}

	liGrnCompObj = JSON.stringify(liGrnCompObj);
	var inputs = [];
	inputs.push('action=saveGRN');
	inputs.push('queryType=' + $("#queryType").val());
	inputs.push('liGrnCompObj=' + liGrnCompObj);
	inputs.push('taxVoucherNo=' + $("#taxVoucherNo").val());
	inputs.push('vender=' + $("#vender").val());
	inputs.push('txtDate=' + $("#txtDate").val());
	inputs.push('txtChallanNo=' + $("#txtChallanNo").val());
	inputs.push('txtRemarks=' + $("#txtRemarks").val());
	inputs.push('txtChallanDate=' + $("#txtChallanDate").val());
	inputs.push('PONo=' + $("#poNo").val());

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			$("#queryType").val('update');
		}
	});
}
function saveGIN() {

	var liGinCompObj = {
		liGinComp : []
	};
	var count = 0;
	var rowCount = $("#RowCount").val();
	for ( var i = 1; i <= rowCount; i++) {
		count++;
		// var chkval = $('#checkbox' + i).attr('checked') ? 1 : 0;
		var Pid = $("#productId" + count + "").val();
		var qty = $("#qty" + count + "").val();
		var mrp = $("#mrp" + count + "").val();
		var rate = $("#rate" + count + "").val();
		var batchcode = $('#hiddenBatchCode' + count).val();
		var expdate = $('#hiddenExpDate' + count).val();
		var idGinComp = $("#GinComp" + count + "").val();
		var stockQnt = $('#StockQnt' + count).val();

		if (parseFloat(qty) > parseFloat(stockQnt)) {
			alert("Entered Quantity of " + $("#productName" + count + "").val()
					+ " is not available !");
			return false;
		}
		if ($("#qty" + count + "").val() == ''
				|| $("#mrp" + count + "").val() == ''
				|| $("#rate" + count + "").val() == '') {
			alert("Please select MRP/Rate/Quantity !");
			return false;
		}
		if (Pid != undefined) {
			liGinCompObj.liGinComp.push({
				"idProd" : Pid,
				"idGinCom" : idGinComp,
				"ginQty" : qty,
				"ginMrp" : mrp,
				"ginCt" : rate,
				"stockAdjBatchCode" : batchcode,
				"stockAdjExpDate" : expdate
			});
		}
	}

	if ($("#trolley").val() == 'Select') {
		alert("Please select Vendor !");
		return false;
	}
	if ($("#txtDate").val() == '') {
		alert("Please select Date ! ");
		return false;
	}

	liGinCompObj = JSON.stringify(liGinCompObj);
	var inputs = [];
	inputs.push('action=saveGIN');
	inputs.push('queryType=' + $("#queryType").val());
	inputs.push('liGinCompObj=' + liGinCompObj);
	inputs.push('taxVoucherNo=' + $("#taxVoucherNo").val());
	inputs.push('trolley=' + $("#trolley").val());
	inputs.push('txtDate=' + $("#txtDate").val());
	inputs.push('txtRemarks=' + $("#txtRemarks").val());

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload();
			$("#queryType").val('update');
		}
	});
}

var GRNListTemp = '{#foreach $T.listGrnMaster as ilG}<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div style="width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count++}</div><div style="width: 21%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;">{$T.ilG.idGrnMaster}</div><div style="width: 23.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.ilG.vname}</div><div style="width: 17%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.ilG.grnDate}</div><div style="width: 10%; height: 25px;border-right: 1px solid #069; padding-left: 5%; padding-top: 3px;"><input type="button" onclick="updateGRN({$T.ilG.idGrnMaster})" id="btnView2" class="edit" value="VIEW" style="font-size: 10px;"></div>{#/for}';

function fetchGRN() {
	var inputs = [];
	inputs.push('action=fetchGRN');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			ajaxResponse = r;
			count = 1;
			$("#GRNResponce").html(ajaxResponse);
			grnBean = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(GRNListTemp);
			$("#container").processTemplate(grnBean);

		}
	});
}

var GINListTemp = '{#foreach $T.listGinMaster as ilG}<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div style="width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count++}</div><div style="width: 21%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;">{$T.ilG.idGinMaster}</div><div style="width: 23.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.ilG.trollyName}</div><div style="width: 17%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.ilG.ginDate}</div><div style="width: 10%; height: 25px;border-right: 1px solid #069; padding-left: 5%; padding-top: 3px;"><input type="button" onclick="updateGIN({$T.ilG.idGinMaster})" id="btnView2" class="edit" value="VIEW" style="font-size: 10px;"></div>{#/for}';

function fetchGIN() {
	var inputs = [];
	inputs.push('action=fetchGIN');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			ajaxResponse = r;
			// alert(ajaxResponse);
			count = 1;
			$("#GINResponce").html(ajaxResponse);
			ginBean = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(GINListTemp);
			$("#container").processTemplate(ginBean);

		}
	});
}

function updateGRN(idGRNMaster) {
	var myObj = "";
	ajaxResponse = $("#GRNResponce").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.listGrnMaster.length; i++) {

		if (myArray.listGrnMaster[i].idGrnMaster == idGRNMaster) {

			myObj = myArray.listGrnMaster[i];
			break;
		}
	}
	/*
	 * var fn = myObj.fn;
	 */

	myObj = JSON.stringify(myObj);
	window.location = "GrnMaster.jsp?" + "myObj=" + encodeURIComponent(myObj)
			+ "&idGRNMaster=" + idGRNMaster;
}
function updateGIN(idGINMaster) {

	ajaxResponse = $("#GINResponce").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.listGinMaster.length; i++) {

		if (myArray.listGinMaster[i].idGinMaster == idGINMaster) {

			myObj = myArray.listGinMaster[i];
			break;
		}
	}
	/*
	 * var fn = myObj.fn;
	 */
	myObj = JSON.stringify(myObj);

	window.location = "GinMaster.jsp?" + "myObj=" + encodeURIComponent(myObj)
			+ "&idGINMaster=" + idGINMaster;
}
function setGRNInfo() {
	myobj = $("#divMyobj").html();
	if ("null" == myobj) {
		$("#queryType").val('insert');
		getNextGRNMasterID();
	} else {
		grnBean = JSON.parse(myobj);
		$("#txtDate").val(grnBean.grnDate);
		$("#txtRemarks").val(grnBean.grnadjDe);
		$("#txtChallanDate").val(grnBean.grnDocDate);
		$("#taxVoucherNo").val(grnBean.idGrnMaster);
		$("#txtChallanNo").val(grnBean.grnDocRef);

		setTimeout(function() {
			$("#vender").val(grnBean.grnAc);
		}, 600);
		var j = 1;
		for ( var i = 0; i < grnBean.listGrnCompo.length; i++) {
			createDivGRN();
			$("#productName" + j).val(grnBean.listGrnCompo[i].prodName);
			$("#packing" + j).val(grnBean.listGrnCompo[i].packing);
			$("#mrp" + j).val(grnBean.listGrnCompo[i].grnMrp);
			$("#qty" + j).val(grnBean.listGrnCompo[i].grnQty);
			$("#rate" + j).val(grnBean.listGrnCompo[i].grnCt);
			$("#GrnComp" + j).val(grnBean.listGrnCompo[i].idGrnCom);
			j++;
		}
		$("#queryType").val('update');
	}

}
function setGINInfo() {
	myobj = $("#divMyobj").html();
	if ("null" == myobj) {
		$("#queryType").val('insert');
		getNextGINMasterID();
	} else {

		ginBean = JSON.parse(myobj);
		$("#txtDate").val(ginBean.ginDate);
		$("#txtRemarks").val(ginBean.ginadjDe);
		$("#taxVoucherNo").val(ginBean.idGinMaster);

		setTimeout(function() {
			$("#trolley").val(ginBean.ginAc);
		}, 600);
		var j = 1;
		for ( var i = 0; i < ginBean.listGinCompo.length; i++) {
			createDivGIN();
			$("#productName" + j).val(ginBean.listGinCompo[i].prodName);
			$("#packing" + j).val(ginBean.listGinCompo[i].packing);
			$("#mrp" + j).val(ginBean.listGinCompo[i].ginMrp);
			$("#qty" + j).val(ginBean.listGinCompo[i].ginQty);
			$("#rate" + j).val(ginBean.listGinCompo[i].ginCt);
			$("#GinComp" + j).val(ginBean.listGinCompo[i].idGinCom);
			j++;
		}
		$("#queryType").val('update');
	}

}
function removeGRNGINComp(callFrom) {
	var r = confirm("You Want to Cancel This");
	if (r == true) {
		// var hiddenRowCount = document.getElementById(RowCount);
		var rowCount = $("#RowCount").val();
		// alert(rowCount);
		/* var allVals = []; */
		var allVals = [];
		for ( var n = 1; n <= rowCount; n++) {
			var $radios = $('input:checkbox[id=checkbox' + n + ']');
			if ($radios.is(':checked') == true) {
				if (callFrom == 'GRN') {
					idGrnComp = $("#GrnComp" + n).val();
					allVals.push(idGrnComp);
				} else if (callFrom == 'GIN') {
					idGinComp = $("#GinComp" + n).val();
					allVals.push(idGinComp);
				}
				$("#div" + n).remove();
			}
		}

		// deleteGRNGINComp(allVals, callFrom);
		// cancelChifComStatus(allVals);
	}
}
function deleteGRNGINComp(allVals, callFrom) {
	for ( var i = 0; i < allVals.length; i++) {
		if (allVals[i] < 1) {
			return false;
		}
	}
	var inputs = [];
	inputs.push('action=deleteGRNGINComp');
	inputs.push('allVals=' + allVals);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
		}
	});

}
var GRNPoComTemp = '{#foreach $T.liGrnComp as ilG}<div id="div{count}" style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div style="width: 5.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count}</div> <div style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%; "> <input type="text" name="" style="width: 89%; border: 0.2px solid; border-color: #069;" onchange="setSplit({count})" class="auto" id="productName{count}" value="{$T.ilG.prodName}" >  </div><div	style="width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="packing{count}" value="{$T.ilG.packing}" /></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="qty{count}" value="{$T.ilG.grnQty}" onfocus="showPopup({count})"   /></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 95%;" type="text"	id="mrp{count}" value="" /></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="rate{count}" value="" /></div> <div style="width: 10%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px;" > {#if $T.ilG.productBatchflag=="1"}<input style=" border: 1px solid #069;" value="Add Batch" class="addBatch" type="button" onClick="batchPopup({count})" id="btnAddBatch{count}" value="" /> {#/if}</div><div style="width:; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"> <input type="checkbox" value="" name="checkbox{count}" id="checkbox{count}"/></div><div id="panel"><div class="dialog" id="myform{count}"><a style="float:right;color:white" id="close{count}" onClick="batchClose({count})">X</a><form><label id="valueFromMyButton{count}"></label><table style="width:130px;color:white"><tr><td>Batch Code <input style="width: 90%; border: 1px solid #069;" type="text" onkeypress="" id="txtBatchCode{count}" value="" /> </td></tr><tr> <td>Expiry Date <input id="date-pick{count}" name="date-pick{count}" value=""	style="width: 90%;" /></td></tr><tr><td><input type="button" value="Save" class="btnOK" id="btnOK{count}" onClick="addToHiddenFields({count})" /></td></tr></table><br /></form></div></div><input type="hidden" id="GrnComp{count}" value="0"/><input type="hidden" id="productId{count}" value="{$T.ilG.idProd}"/></div>  <input type="hidden" id="hiddenBatchCode{count}" ><input type="hidden" id="hiddenExpDate{count++}" ></div>{#/for}';
function getPOComList() {
	var inputs = [];
	inputs.push('action=getPOComList');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('poNo=' + $("#poNo").val());
	var str = inputs.join('&');
	jQuery
			.ajax({
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
					ajaxResponse = r;
					count = 1;
					listPoComp = eval('(' + ajaxResponse + ')');
					if (listPoComp.liGrnComp[0] == undefined) {
						alert("Purchase order number not found..!");
					} else {
						document.getElementById("vender").value = listPoComp.liGrnComp[0].vendor;
						document.getElementById("vender").disabled = true;
						$("#RowCount").val(listPoComp.liGrnComp.length);
						$("#grnDiv").setTemplate(GRNPoComTemp);
						$("#grnDiv").processTemplate(listPoComp);
					}
				}
			});
}
var GINGRNComTemp = '{#foreach $T.liGinComp as ilG}<div  id="div{count}" style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div style="width: 5.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count}</div> <div style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%; "> <input type="text" name="" style="width: 89%; border: 0.2px solid; border-color: #069;" onchange="setSplit({count})" class="auto" id="productName{count}" value="{$T.ilG.prodName}" >  </div><div	style="width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="packing{count}" value="{$T.ilG.packing}" /></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="qty{count}"value="{$T.ilG.ginQty}"/></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 95%;" type="text"	id="mrp{count}" value="" /></div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 89%;" type="text"	id="rate{count}" value="" /></div> <div style="width: 10%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px;" > </div><div style="width:; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"> <input type="checkbox" value="" name="checkbox{count}" id="checkbox{count}"/></div><div id="panel"><div class="dialog" id="myform{count}"><a style="float:right;color:white" id="close{count}" onClick="batchClose({count})">X</a><form><label id="valueFromMyButton{count}"></label><br /></form></div></div><input type="hidden" id="GrnComp{count}" value="0"/><input type="hidden" id="productId{count}" value="{$T.ilG.idProd}"/></div>  <input type="hidden" id="hiddenBatchCode{count}" ><input type="hidden" id="hiddenExpDate{count}" ></div><input id="StockQnt{count++}" type="hidden" value="{$T.ilG.ginCt}"/>{#/for}';

function getGRNComList() {
	var inputs = [];
	inputs.push('action=getGRNComList');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('grnNo=' + $("#grnNo").val());
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
			ajaxResponse = r;
			count = 1;
			listPoComp = eval('(' + ajaxResponse + ')');
			$("#RowCount").val(listPoComp.liGinComp.length);
			$("#ginDiv").setTemplate(GINGRNComTemp);
			$("#ginDiv").processTemplate(listPoComp);
		}
	});

}

function setFinancialYear() {
	var startDate = $('#popup_container3').val();
	var arr = startDate.split('/');
	var startYear = parseInt(arr[2].trim());
	var endYear = startYear + 1;
	$('#txtFincancialYearDetail').val(startYear + "/" + endYear);
	$('#popup_container2').val("31/3/" + endYear);
}


/** ****************End Nitin ************************************************** */

function saveMainInventory(itemId, avilableQuantity) {

	// alert("itemId = "+itemId);
	// alert("avilableQuantity = "+avilableQuantity);
	var id = "#txtARQ" + itemId;
	var ar = "#arq" + itemId;
	var quantity = ($(id).val());

	if (quantity == "" || quantity == null) {
		alert("You Should Insert The Add/Remove Quantity");
		return false;
	}
	var addOrRemove = ($(ar).val());

	if (addOrRemove == "Add") {
		var newAQ = parseFloat(avilableQuantity) + parseFloat(quantity);
	} else {
		if (parseFloat(avilableQuantity) >= parseFloat(quantity)) {
			newAQ = parseFloat(avilableQuantity) - parseFloat(quantity);
		} else {
			alert("Item Quantity is Not much sufficient for Removal.");
			return false;
		}
	}

	// alert(newAQ);

	var inputs = [];
	inputs.push('action=saveMainInventory');
	inputs.push('itemId=' + itemId);
	inputs.push('newAQ=' + newAQ);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			ajaxResponse = r;
			$("#dispMessage").html(ajaxResponse);
			// alert(ajaxResponse);
			// location.reload();
			setInventory();
		}
	});

}

/** ***************End Main-Inventory Functions************************* */
$(document).ready(function() {
	try {
		$("body").css("cursor", 'default');
		$(document).css("cursor", 'default');
	} catch (e) {
	}

	try {
		$.unblockUI();
	} catch (e) {
	}
	if (window.initLogOut)
		initLogOut();
});

function saveUOMMaster() {
	var txtUomCode = $("#txtUomCode").val();
	var txtUomDetail = $("#txtUomDescription").val();

	if (txtUomDetail == "" || txtUomDetail == null) {
		alert("Please enter uom name");
		$("#txtUomDescription").focus();
		return false;
	}
	if (txtUomDetail.length < 1 || txtUomDetail.length > 40) {
		alert("Unit of measurment name should be greater than 1 and less than 40 alphabets");
		$("#txtUomDescription").focus();
		return false;
	}

/*	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtUomDetail)) {
		alert("Uom name should be of alphabets and digits only with a single space allowed..!");
		$("#txtUomDescription").focus();
		return false;
	}*/
	var inputs = [];
	inputs.push('action=saveUOMMaster');
	inputs.push('txtUomCode=' + txtUomCode);
	inputs.push('txtUomDescription=' + txtUomDetail);
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
			ajaxResponse = r;
			//alert(r);
			var SaveUpdate = $("#SaveUpdate").val();
			
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
			$("#txtUomDescription").val("");
			getNextId();
			fetchUOMDetailNew();
			$("#txtUomDescription").focus();
		}
	});
}

function getNextId() {

	var inputs = [];
	inputs.push('action=getUOMNextId');
	inputs.push('tableName=inv_uom_master');

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
			ajaxResponse = r;
			$("#txtUomCode").val(r);
		}
	});
}
function fetchUOMDetailNew() {

	var inputs = [];
	inputs.push('action=fetchUOMDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			// alert(r);
			// alert(pobj1);
			SrNo=1;
			$("#uomContent").setTemplate(inventoryUomTemp);
			$("#uomContent").processTemplate(pobj1);
			//$("#uomcontentAjax").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}
function fetchUOMDetail() {
	
	var uomName = $('#byUomId').val();
	if (uomName == "" || uomName == null) {
		alert("Please enter uom name");
		$("#byUomId").focus();
		return false;
	}

	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(uomName)) {
		alert("Uom name should be of alphabets and digits only with a single space allowed..!");
		$("#byUomId").focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('action=fetchUOMDetail');
	inputs.push('uomid=' + uomName);
	inputs.push('isEdit=yes');

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
			pobj1 = eval('(' + r + ')');
			SrNo=1;
			objUOM = JSON.parse(r);
			if (objUOM.ltUomDTOs.length > 0) {
				$("#uomContent").setTemplate(inventoryUomTemp);
				$("#uomContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchUOMDetailNew();
			}
			$("#byUomId").val("");
			$("#byUomId").focus();
			userAccess();
			
		}
	});
}

function viewUOMDetail(uomId) {
	$("#SaveUpdate").val('Update');
	$("#txtUomCode").val(uomId);
	$("#txtUomDescription").val($("#desc" + uomId).html());
}

function deleteUOMDetail(uomId) {
	var didConfirm = confirm("Are you sure want to delete uom details?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteUOMDetail');
		inputs.push('uomid=' + uomId);
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
				//alert(r);
				alert("Uom details deleted successfully");
				fetchUOMDetailNew();
			}
		});
	}
}

function resetUOMForm()
{
	$("#txtUomDescription").val("");
	getNextId();
	$("#txtUomDescription").focus();
}
/** *********vendor details****** */
function getNextVendorId() {
	var inputs = [];
	inputs.push('action=getVendorNextId');
	inputs.push('tableName=inv_vendor_master');
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
			ajaxResponse = r;
			$("#txtBxVendorCode").val(r);
		}
	});
}

function saveVendorMaster() {

	var txtBxVendorCode = $("#txtBxVendorCode").val();
	var txtBxAddr1 = $("#txtBxAddr1").val();
	var txtBxArea = $("#txtBxArea").val();
	var txtBxState = $("#txtBxState").val();
	var txtBxLandline = $("#txtBxLandline").val();
	var txtBxPIN = $("#txtBxPIN").val();
	var txtBxVendorName = $("#txtBxVendorName").val();
	var txtBxAddr2 = $("#txtBxAddr2").val();
	var txtBxCity = $("#txtBxCity").val();
	var txtBxCountry = $("#txtBxCountry").val();
	var txtBxMobile = $("#txtBxMobile").val();
	var txtBxContactName = $("#txtBxContactName").val();
	var status = 'Y';

	if (txtBxVendorName == "" || txtBxMobile == "") {
		alert("Please fill all mandetory fields..!");
		return false;
	} else if (validateTextFields("#txtBxVendorCode", "VendorCode")) {
		return false;
	} else if (validateTextFields("#txtBxVendorName", "VendorName")) {
		return false;
	} else if (validateTextFields("#txtBxAddr1", "Address1")) {
		return false;
	} else if (validateTextFields("#txtBxAddr2", "Address2")) {
		return false;
	}

	else if (validateTextFields("#txtBxArea", "Area")) {
		return false;
	} else if (validateTextFields("#txtBxState", "State")) {
		return false;
	} else if (validateTextFields("#txtBxLandline", "Landline Number")) {
		return false;
	} else if (validateTextFields("#txtBxPIN", "PIN Number")) {
		return false;
	} else if (validateTextFields("#txtBxCity", "City")) {
		return false;
	} else if (validateTextFields("#txtBxCountry", "Country")) {
		return false;
	} else if (validateTextFields("#txtBxMobile", "Mobile")) {
		return false;
	} else if (validateTextFields("#txtBxContactName", "ContactName")) {
		return false;
	}
	var inputs = [];
	inputs.push('action=saveVendorDetail');
	inputs.push('txtBxVendorCode=' + txtBxVendorCode);
	inputs.push('txtBxVendorName=' + txtBxVendorName);
	inputs.push('txtBxAddr1=' + txtBxAddr1);
	inputs.push('txtBxState=' + txtBxState);
	inputs.push('txtBxLandline=' + txtBxLandline);
	inputs.push('txtBxPIN=' + txtBxPIN);
	inputs.push('txtBxAddr2=' + txtBxAddr2);
	inputs.push('txtBxCity=' + txtBxCity);
	inputs.push('txtBxCountry=' + txtBxCountry);
	inputs.push('txtBxMobile=' + txtBxMobile);
	inputs.push('txtBxContactName=' + txtBxContactName);
	inputs.push('txtBxArea=' + txtBxArea);
	inputs.push('status=' + status);
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
			ajaxResponse = r;
			window.location.replace("Vendor_master.jsp");
		}
	});
}

function fetchVendorDetail(vendorId) {

	var inputs = [];
	inputs.push('action=fetchVendorDetail');
	inputs.push('vendorid=' + vendorId);
	inputs.push('isEdit=yes');

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
			pobj1 = eval('(' + r + ')');

			objVendor = JSON.parse(r);
			if (objVendor.ltVendorDTOs.length > 0) {
				$("#vendorContent").setTemplate(vendorInventoryTemp);
				$("#vendorContent").processTemplate(pobj1);

			} else {
				alert("Record not found..!");
				fetchVendorDetailNew();
			}
			$("#byName").val("");
		}
	});
}

var venderList = "<option value='Select'>Select</option>{#foreach $T.ltVendorDTOs as ltVendorDTOs}<option value='{$T.ltVendorDTOs.vendor_Id}'>{$T.ltVendorDTOs.vendor_name}</option>{#/for}";

function fetchVendorDetailNew(callForm) {
	var inputs = [];
	inputs.push('action=fetchVendorDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			if (callForm == "GRNMaster") {
				$("#vender").setTemplate(venderList);
				$("#vender").processTemplate(pobj1);
			} else {
				$("#vendorContent").setTemplate(vendorInventoryTemp);
				$("#vendorContent").processTemplate(pobj1);
				$("#vendorAjaxRespDiv").html(r);
			}
		}
	});
}

function deleteVendorDetail(vendorId) {
	var didConfirm = confirm("Are you sure?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteVendorDetail');
		inputs.push('vendorid=' + vendorId);
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
				alert(r);
				fetchVendorDetailNew();
			}
		});
	}
}

function viewVendorDetail(vendorId) {
	var obj = $("#vendorAjaxRespDiv").html();

	objVendor = JSON.parse(obj);

	for ( var i = 0; i < objVendor.ltVendorDTOs.length; i++) {
		if (objVendor.ltVendorDTOs[i].vendor_Id == vendorId) {
			$("#txtBxVendorCode").val(objVendor.ltVendorDTOs[i].vendor_Id);
			$("#txtBxAddr1").val(objVendor.ltVendorDTOs[i].vendor_addr_line1);
			$("#txtBxArea").val(objVendor.ltVendorDTOs[i].vendor_area);
			$("#txtBxState").val(objVendor.ltVendorDTOs[i].vendor_state);
			$("#txtBxLandline").val(objVendor.ltVendorDTOs[i].vedor_telephone);
			$("#txtBxPIN").val(objVendor.ltVendorDTOs[i].vendor_pin);
			$("#txtBxVendorName").val(objVendor.ltVendorDTOs[i].vendor_name);
			$("#txtBxAddr2").val(objVendor.ltVendorDTOs[i].vendor_addr_line2);
			$("#txtBxCity").val(objVendor.ltVendorDTOs[i].vendor_city);
			$("#txtBxCountry").val(objVendor.ltVendorDTOs[i].vendor_country);
			$("#txtBxMobile").val(objVendor.ltVendorDTOs[i].vedor_mobile);
			$("#txtBxContactName").val(
					objVendor.ltVendorDTOs[i].vendor_contact_name);
		}
	}

}

/** ****************************** */

/** **************************Sub inventory *************************************** */

function getNextSubInventoryId() {
	var inputs = [];
	inputs.push('action=getNextSubInventoryId');
	inputs.push('tableName=inv_subinventory_master');
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
			ajaxResponse = r;
			$("#txtShelfId").val(r);
		}
	});
}

function refreshsubinventory()
{
	$("#txtName").val("");
	$("#txtcontactNo").val("");
	getNextSubInventoryId();
	$("#txtName").focus();
}
function savesubInventoryMaster() {
	 
	var txtShelfId = $("#txtShelfId").val();
	var txtName = $("#txtName").val();
	/*var txtLocation = $("#txtLocation").val();*/
	var txtcontactNo= $("#txtcontactNo").val();
	var status = 'Y';

	if (txtName == "" || txtName == null) {
		alert("Please enter subinventory name");
		$("#txtName").focus();
		return false;
	}
	if (txtName.length > 45 || txtName.length < 2) {
		alert("Subinventory name should be greater than 2 alphabets and less than 45 alphabets");
		$("#txtName").focus();
		return false;
	}
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtName)) {
		alert("Subinventory name should be of alphabets and digits only with a single space allowed..!");
		$("#txtName").focus();
		return false;
	}
	
	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtcontactNo)) {
		alert("Contact No should be of digits only");
		$("#txtcontactNo").focus();
		return false;
	}
	
	else
	{		
	var inputs = [];
	inputs.push('action=saveSubInventoryDetail');
	inputs.push('txtShelfId=' + txtShelfId);
	inputs.push('txtName=' + txtName);
	/*inputs.push('txtLocation=' + txtLocation);*/
	inputs.push('txtcontactNo=' + txtcontactNo);
	inputs.push('status=' + status);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		success : true,
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error: function() {
			alert("error");
		},
		success: function(result) {
			//alert(result);
			var SaveUpdate = $("#SaveUpdate").val();
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
			$("#txtName").val("");
			/*$("#txtLocation").val("");*/
			$("#txtcontactNo").val("");
			$("#txtName").focus();
			getNextSubInventoryId();
			fetchSubInventoryNew();
			
		}
	 });
	}
}

function fetchShelfDetail() {
	
	var subinventoryname = $('#byName').val();
	if (subinventoryname == "" || subinventoryname == null) {
		alert("Please enter subinventory name");
		$("#byName").focus();
		return false;
	}
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(subinventoryname)) {
		alert("Subinventory name should be of alphabets and digits only with a single space allowed..!");
		$("#byName").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchSubInventoryNew');
	inputs.push('isEdit=yes');

	inputs.push('shelfid=' + subinventoryname);
   
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
			pobj1 = eval('(' + r + ')');
			SrNo=1;
			objVendor = JSON.parse(r);
			if (pobj1.ltSubInventoryDTO.length >0) {
				
				$("#shelfContent").setTemplate(inventoryShelfTemp);
				$("#shelfContent").processTemplate(pobj1);
				 
			} else {
				alert("Record not found..!");
				fetchSubInventoryNew();
			}
			$("#byName").val("");
			$("#byName").focus();
			userAccess();
		}
	});
}

function fetchSubInventoryNew() {
	var inputs = [];
	inputs.push('action=fetchSubInventoryNew');
	inputs.push('isEdit=no');
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
			//alert(r);
			pobj1 = eval('(' + r + ')');
			SrNo=1;
			$("#shelfContent").setTemplate(inventoryShelfTemp);
			$("#shelfContent").processTemplate(pobj1);

			$("#shelfAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function viewSubInventoryDetail(subinventory_Id) {
	$("#SaveUpdate").val('Update');
	var obj = $("#shelfAjaxResp").html();
	objShelf = JSON.parse(obj);
	
	for ( var i = 0; i < objShelf.ltSubInventoryDTO.length; i++) {
		if (objShelf.ltSubInventoryDTO[i].subinventory_Id == subinventory_Id) {
			$("#txtShelfId").val(objShelf.ltSubInventoryDTO[i].subinventory_Id);
			$("#txtName").val(objShelf.ltSubInventoryDTO[i].subinventory_name);
			/*$("#txtLocation").val(objShelf.ltSubInventoryDTO[i].subinventory_location);*/
			$("#txtcontactNo").val(objShelf.ltSubInventoryDTO[i].inv_subInventory_contact_no);
			
		}
	}
}

function deleteSubInventoryDetail(subinventory_Id) {
	var didConfirm = confirm("Are you sure to delete subinventory?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteShelfDetail');
		inputs.push('shelfid=' + subinventory_Id);
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
				//alert(r);
				alert("Subinventory details deleted successfully");
				fetchSubInventoryNew();
			}
		});
	}
}

function resetSubINventoryForm()
{
	$("#txtName").val("");
	$("#txtLocation").val("");
	$("#txtcontactNo").val("");
	getNextSubInventoryId();
}

/** *****************************category************************** */

function getNextCategoryId() {
	var inputs = [];
	inputs.push('action=getCategoryNextId');
	inputs.push('tableName=inv_category_master');
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
			ajaxResponse = r;
			$("#txtcategorycode").val(r);
		}
	});
}
// New Inventory
function getNextDocumentId() {
	var inputs = [];
	inputs.push('action=getCategoryNextId');
	inputs.push('tableName=inv_category_master');
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
			ajaxResponse = r;
			$("#txtcategorycode").val(r);
		}
	});
}

/*** saveCategoryMaster @Author Sudhir jadhav modified @Date 12sep2016  add new field prefix category Name ****/
function saveCategoryMaster() {

	var txtCategoryId = $("#txtcategorycode").val();
	var txtCategoryName = $("#txtcategoryname").val();
	var txtPrefixName = $("#txtPrefixName").val(); 
	// validation 
	if(txtCategoryName == ""){
		alert("please enter category name");
		$("#txtcategoryname").val("");
		$("#txtcategoryname").focus();
		return false;
		
	}
	
	if( $("#txtcategoryname").val().toString().trim() ==0)
	{
		alert("Can not save empty record");
		$("#txtcategoryname").val("");
		$("#txtcategoryname").focus();
		return false;
		
	}
 	
	if(txtPrefixName == ""){
		alert("please enter Prefix");
		$("#txtPrefixName").focus();
		return false;
		
	}

/*	if(txtCategoryName != ""){
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtCategoryName)) {
			alert("Category name should be of alphabets and digits only with a single space allowed..!");
			$("#txtcategoryname").focus();
			return false;
		}
		
	}*/

	// end
	var status = 'Y';
	var inputs = [];
	inputs.push('action=saveCategoryDetail');
	inputs.push('txtCategoryId=' + txtCategoryId);
	
	inputs.push('txtCategoryName=' + txtCategoryName);
	inputs.push('status=' + status);
	inputs.push('txtPrefixName=' + txtPrefixName);
	
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
		    ajaxResponse = r;			
			//alert(r);
		    var SaveUpdate = $("#SaveUpdate").val();
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
			$("#txtcategoryname").val("");
			$("#txtcategoryname").focus();
			fetchCategoryDetailNew();
			getNextCategoryId();
			resetCategoryForm();
			/*getNextDocumentId();
			fetchCategoryDetailNew();*/
		}
	});
}

function fetchCategoryDetailNew() {
	var inputs = [];
	inputs.push('action=fetchCategoryDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			SrNo = 1;
			$("#categoryContent").setTemplate(inventoryCategoryTemp);
			$("#categoryContent").processTemplate(pobj1);

			$("#categoryAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function viewCategoryDetail(categoryId) {

	$("#SaveUpdate").val('Update');
	if (categoryId == null || categoryId == "") {
		alert("Plz enter Category Id");
		$("#byName").focus();
		return false;
	}
	var obj = $("#categoryAjaxResp").html();
	objCategory = JSON.parse(obj);
	for ( var i = 0; i < objCategory.CategoryDTO.length; i++) {
		if (objCategory.CategoryDTO[i].categoryId == categoryId) {
			$("#txtcategorycode").val(objCategory.CategoryDTO[i].categoryId);
			$("#txtcategoryname").val(objCategory.CategoryDTO[i].categoryName);
			$("#txtPrefixName").val(objCategory.CategoryDTO[i].categoryPerifix);
		}
	}
}
function deleteCategoryDetail(categoryId) {
	var didConfirm = confirm("Are you sure to delete category?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteCategoryDetail');
		inputs.push('categoryid=' + categoryId);
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
				//alert(r);
				alert("Category deleted successfully");
				fetchCategoryDetailNew();

			}
		});
	}
}

function fetchCategoryDetail(categoryId) {
	if (categoryId == "") {
		alert("Please enter category name");
		$("#byName").focus();
		return false;
	}
	
	if (categoryId != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(categoryId)) {
			alert("Category name should be of alphabets and digits only with a single space allowed..!");
			$("#byName").focus();
			return false;
		}
	}
	
	var inputs = [];
	inputs.push('action=fetchCategoryDetail');
	inputs.push('isEdit=yes');
	inputs.push('categoryid=' + categoryId);

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
			pobj1 = eval('(' + r + ')');

			objCategory = JSON.parse(r);
			SrNo = 1;
			if (objCategory.CategoryDTO.length > 0) {
				$("#categoryContent").setTemplate(inventoryCategoryTemp);
				$("#categoryContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchCategoryDetailNew();
			}
			$('#byName').val("");
			$('#byName').focus();
			userAccess();
		}
	});
}

function resetCategoryForm()
{
	$("#txtcategoryname").val("");
	$("#txtPrefixName").val("");
	getNextDocumentId();
	$("#txtcategoryname").focus();
}

/** *****************************End Category******************************* */

/**
 * *****************************New Inventory Doc
 * Form*******************************
 */
function getNextDocMasterId() {
	var inputs = [];
	inputs.push('action=txtdocmastercode');
	inputs.push('tableName=inv_document_master');
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
			ajaxResponse = r;
			$("#txtdocmastercode").val(r);
		}
	});
}

function saveDocMaster() {

	var txtDocmastercode = $("#txtdocmastercode").val();
	var txtDocname = $("#txtdocname").val();
	// validation Doc Master
	if (txtDocname == "") {
		alert("Please enter document name");
		$("#txtdocname").focus();
		return false;
	} 
	if (txtDocname != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtDocname)) {
			alert("Document name should be of alphabets and digits with a single space allowed..!");
			$("#txtdocname").focus();
			return false;
		}
	}
	
	// end
	var status = 'Y';
	var inputs = [];
	inputs.push('action=saveDocumentDetail');
	inputs.push('txtDocmastercode=' + txtDocmastercode);
	inputs.push('txtDocname=' + txtDocname);

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
			ajaxResponse = r;
			//alert(r);
			var SaveUpdate = $("#SaveUpdate").val();
			
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
			$("#txtdocname").val("");
			$("#txtdocname").focus();
			getNextDocMasterId();
			fetchInventoryDetailNew();
		}
	});
}

function fetchDocumentList() {
	var inputs = [];
	inputs.push('action=fetchDocumentDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			$("#selDocument").setTemplate(selInventoryDocumentTemplate);
			$("#selDocument").processTemplate(pobj1);

		}
	});
}
function fetchInventoryDetailNew() {
	var inputs = [];
	inputs.push('action=fetchDocumentDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			SrNoDT=1;
			$("#documentContent").setTemplate(inventoryDocumentTemp);
			$("#documentContent").processTemplate(pobj1);

			$("#docuemntAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}


function viewDocumentDetail(documentId) {

	 $("#SaveUpdate").val('Update');
	//$("#iDeleteDoc"+documentId).prop( "disabled", true );
	if (documentId == null || documentId == "") {
		alert("Please enter documentId Id");
		$("#byName").focus();
		return false;
	}
	var obj = $("#docuemntAjaxResp").html();
	objDocument = JSON.parse(obj);
	for ( var i = 0; i < objDocument.DocumentDTO.length; i++) 
	{
		
		if (objDocument.DocumentDTO[i].doc_id == documentId) {
			$("#txtdocmastercode").val(objDocument.DocumentDTO[i].doc_id);
			$("#txtdocname").val(objDocument.DocumentDTO[i].doc_name);
			
			
		  }
	}
}
function deleteDocumentDetail(docId) {
	var didConfirm = confirm("Are you sure to delete document?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteDocumentDetail');
		inputs.push('docid=' + docId);
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
				//alert(r);
				alert("Document deleted succcessfully");
				fetchInventoryDetailNew();
			}
		});
	}
}

function fetchDocumentDetail(docId) {
	if (docId == "") {
		alert("Please enter document name");
		$("#byName").focus();
		return false;
	}
	if (docId != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(docId)) {
			alert("Document name should be of alphabets and digits with a single space allowed..!");
			$("#byName").focus();
			return false;
		}
	}
	var inputs = [];
	inputs.push('action=fetchDocumentDetail');
	inputs.push('isEdit=yes');
	inputs.push('docid=' + docId);

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
			pobj1 = eval('(' + r + ')');
			SrNoDT=1;
			objDocument = JSON.parse(r);
			if (objDocument.DocumentDTO.length > 0) {
				$("#documentContent").setTemplate(inventoryDocumentTemp);
				$("#documentContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				$("#byName").focus();
				//fetchDocumentDetailNew();
				fetchInventoryDetailNew();
			}
			$('#byName').val("");
			userAccess();
		}
	});
}

function resetDocumentForm()
{
	$("#txtdocname").val("");
	//getNextDocMasterId();
	$("#txtdocname").focus();
}

/* Start New Financial Year */
function getNextFinancialYearId() {
	var inputs = [];
	inputs.push('action=txtFinancialYearId');
	inputs.push('tableName=inv_financial_year');
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
			ajaxResponse = r;
			$("#txtFinancialYearId").val(r);
		}
	});
}

function DateCheck()
{
  var StartDate= document.getElementById('popup_container3').value;
  var EndDate= document.getElementById('popup_container2').value;
  var eDate = new Date(EndDate);
  var sDate = new Date(StartDate);
  if(StartDate!= '' && StartDate!= '' && sDate> eDate)
    {
    alert("End Date should be greater than the Start Date.");
    $("#popup_container3").focus();
    return false;
    }
}

function saveFinancialYear() {

	var txtFinancialYearId = $("#txtFinancialYearId").val();
	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();
	var txtFincancialYearDetail = $("#txtFincancialYearDetail").val();
	if(popup_container3 == "" || popup_container3 == null)
		{
		alert("Please Select Year Start Date");
		$("#popup_container3").focus();
		return false;
		}
	
	if(popup_container2 == "" || popup_container2 == null)
	{
	alert("please select end date");
	$("#popup_container2").focus();
	return false;
	}
	
	if(txtFincancialYearDetail == "" || txtFincancialYearDetail == null)
	{
	alert("please enter financial year");
	$("#txtFincancialYearDetail").focus();
	return false;
	}
	
	//var pattern = /^(19[5-9]\d|20[0-4]\d|2050)$/;
	 var patt = /^(\d{4}-(\d{2}|\d{4}))$/;
  	// var pattern = /^([0-9]{4})[./-]+([0-9]{2}))$/;
	/* if(!patt.test(txtFincancialYearDetail))

	    {
		    alert("Financial year format should be like this:Exp-'2015-2016 or 2015-16'");
			$("#txtFincancialYearDetail").focus();
			return false;
	    }*/
	

	 /* var StartDate= document.getElementById('popup_container3').value;
	  var EndDate= document.getElementById('popup_container2').value;
	  var eDate = new Date(EndDate);
	  var sDate = new Date(StartDate);
	  if(StartDate!= '' && StartDate!= '' && sDate> eDate)
	    {
	    alert("End Date is greater than or equal to the Start Date.");
	    $("#popup_container3").focus();
	    return false;
	    }*/
	  
	/*$("#popup_container2").change(function () 
			{
		alert("hi");
	    var startDate = document.getElementById("popup_container3").value;
	    var endDate = document.getElementById("popup_container2").value;
	 
	    if ((Date.parse(startDate) >= Date.parse(endDate))) {
	        alert("End date should be greater than Start date");
	        document.getElementById("popup_container2").value = "";
	        return false;
	    }
	});*/
	//DateCheck();
	/*var startDate = new Date($('#popup_container3').val());
	var endDate = new Date($('#popup_container2').val());

	if (startDate < endDate)
	{
	alert("end date should be greater than start date");
	$('#popup_container2').focus();
	return false;
	}*/
	
	

	// end
	var status = 'Y';
	var inputs = [];
	inputs.push('action=saveFinacncialYearDetail');
	inputs.push('txtFinancialYearId=' + txtFinancialYearId);
	inputs.push('popup_container3=' + popup_container3);
	inputs.push('popup_container2=' + popup_container2);
	inputs.push('txtFincancialYearDetail=' + txtFincancialYearDetail);

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
			  //alert(r);
			  var UpdateAndSave =$("#UpdateAndSave").val();
			  if(UpdateAndSave == 'Update')
				  {
				  alert("Record updated successfully..!");
				  }
			  else
				  {
				  alert("Record saved successfully..!");
				  }
			  $("#UpdateAndSave").val('0');
			  
			// $("#popup_container3").val("");
			 $("#popup_container2").val("");
			 $("#txtFincancialYearDetail").val("");
			 $("#popup_container2").focus();
			 getNextFinancialYearId();
			 fetchFinancialYearDetailNew();
			 resetFinancialYearForm();
		}
	});
}
function fetchFinancialList() {
	var inputs = [];
	inputs.push('action=fetchFinDetail');
	inputs.push('isEdit=no');
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

			pobj1 = eval('(' + r + ')');
			$("#selFinancialYear").setTemplate(selInventoryFinancialYearTemplate);
			$("#selFinancialYear").processTemplate(pobj1);

		}
	});
}
function fetchFinancialYearDetailNew() {
	var inputs = [];
	inputs.push('action=fetchFinDetail');
	inputs.push('isEdit=no');
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

			pobj1 = eval('(' + r + ')');
			SrNoDT=1;
			$("#finContent").setTemplate(inventoryFinTemp);
			$("#finContent").processTemplate(pobj1);
			$("#finAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function viewFinDetail(finId) {

	if (finId == null || finId == "") {
		alert("Plz enter Fin Id");
		$("#byName").focus();
		return false;
	}
	$("#UpdateAndSave").val("Update");
	var obj = $("#finAjaxResp").html();
	objFin = JSON.parse(obj);
	var myFinOBJ = "";
	for ( var i = 0; i < objFin.inventoryFinancialYears.length; i++) 
	{
		if (objFin.inventoryFinancialYears[i].fin_year_id == finId) 
		{
			myFinOBJ = objFin.inventoryFinancialYears[i];
			break;
		}
	}
	$("#txtFinancialYearId").val(myFinOBJ.fin_year_id);
	/*var str = (myFinOBJ.fin_year_start_date).split("-");
	var sdate = str[2] + "/" + str[1] + "/" +str[0];*/	
	$("#popup_container3").val(myFinOBJ.fin_year_start_date);
	
	/*var str = (myFinOBJ.fin_year_end_date).split("-");
	var edate = str[2] + "/" + str[1] + "/" +str[0];*/	
	$("#popup_container2").val(myFinOBJ.fin_year_end_date);
	$("#txtFincancialYearDetail").val(myFinOBJ.fin_year);
	$("#txtFinancialYearId").val(finId);
}

/*function fetchFinDetail(finId) {
	if (taxId == null || taxId == "") {
		alert("Plz enter  tax Id");
		$("#byName").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchFinDetail');
	inputs.push('isEdit=yes');
	inputs.push('fin_year_id=' + finId);

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

			pobj1 = eval('(' + r + ')');

			objTax = JSON.parse(r);
			if (objTax.inventoryTaxSetUps.length > 0) {
				$("#finContent").setTemplate(inventoryFinTemp);
				$("#finContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchTaxDetailNew();
			}
			$('#byName').val("");

		}
	});
}*/
function deleteFinancialDetail(finId) {
	var didConfirm = confirm("Are you sure to delete financial year?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteFinancialDetail');
		inputs.push('finId=' + finId);
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
				//alert(r);
				alert("Financial year deleted successfully");
				fetchFinancialYearDetailNew();
			}
		});
	}
}
/*End*/

function fetchFinancialDetail(finyear) {
	 if (finyear == "") {
		alert("Please enter financial year");
		$("#byName").focus();
		return false;
	}
	 
	/* var reWhiteSpace = new RegExp("/^\s+$/");

	    // Check for white space
	    if (reWhiteSpace.test(finyear)) {
	    	alert("Please enter financial year");
			$("#byName").focus();
			return false;
	    }*/
	/* if (finyear == " ") {
			alert("Please enter financial year");
			$("#byName").focus();
			return false;
		}*/
	/*if(finyear !="")
		{
		var patt = /^[0-9]*$/;
		 if(!patt.test(finyear))
		    {
			    alert("Please enter financial year should be of digits");
				$("#byName").focus();
				return false;
		    }
		
		}*/
	
	var inputs = [];
	inputs.push('action=fetchFinDetail');
	inputs.push('isEdit=yes');
	inputs.push('txtFinancialYearId=' + finyear);

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
			pobj1 = eval('(' + r + ')');
			SrNoDT=1;
			objFinancial = JSON.parse(r);
			if (objFinancial.inventoryFinancialYears.length > 0) {
				$("#finContent").setTemplate(inventoryFinTemp);
				$("#finContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchFinancialYearDetailNew();
			}
			$('#byName').val("");
			$('#byName').focus();
			userAccess();
		}
	});
} 
/*****************************************************************validate financial year ***********************/
function resetFinancialYearForm()
{
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
var today = dd+'/'+mm+'/'+yyyy;

    $("#popup_container3").val(today);
	$("#popup_container2").val("");
	$("#txtFincancialYearDetail").val("");
	getNextFinancialYearId();
	//$("#popup_container2").focus();
}


/**
 * *****************************New Inventory Tax
 * Form*******************************
 */
function getNextTaxMasterId() {
	var inputs = [];
	inputs.push('action=txttaxmastercode');
	inputs.push('tableName=inv_taxsetup_master');
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

			ajaxResponse = r;
			$("#txttaxmastercode").val(r);
		}
	});
}

function saveTaxMaster() {

	var txtTaxmastercode = $("#txttaxmastercode").val();
	var txtTaxCode = $("#txttaxcode").val();
	var txtTaxDescription = $("#txttaxDescription").val();
	var txtTaxRate = $("#txttaxRate").val();
	// validation 
	
	if(txtTaxCode == "")
	{
	alert("please enter tax code");
	$("#txttaxcode").focus();
	return false;
	}
	
	if(txtTaxCode != "")
	{
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtTaxCode)) {
			alert("Tax code should be of alphabets and digits with a single space allowed..!");
			$("#txttaxcode").focus();
			return false;
		}
	}
	
	
	/*if(txtTaxDescription == "" || txtTaxDescription == null)
	{
	alert("Please Enter Tax Description");
	$("#txttaxDescription").focus();
	return false;
	}*/
	if(txtTaxDescription != "")
	{
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtTaxDescription)) {
			alert("Tax description should be of alphabets and digits with a single space allowed..!");
			$("#txttaxDescription").focus();
			return false;
		}
	}
	
	if(txtTaxRate == "" || txtTaxRate == null)
	{
	alert("please enter tax rate");
	$("#txttaxRate").focus();
	return false;
	}
	if(txtTaxRate != "")
	{
		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(txtTaxRate)) {
			alert("Tax rate should be of digits and a decimal point Only!");
			$("#txttaxRate").focus();
			return false;
		}
	}
	// end
	var status = 'Y';
	var inputs = [];
	inputs.push('action=saveTaxDetail');
	inputs.push('txtTaxmastercode=' + txtTaxmastercode);
	inputs.push('txtTaxCode=' + txtTaxCode);
	inputs.push('txtTaxDescription=' + txtTaxDescription);
	inputs.push('txtTaxRate=' + txtTaxRate);

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

			ajaxResponse = r;
			//alert(r);
			var SaveUpdate = $("#SaveUpdate").val();
			
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
			$("#txttaxcode").val("");
			$("#txttaxDescription").val("");
			$("#txttaxRate").val("");
			$("#txttaxcode").focus();
			getNextTaxMasterId();
			fetchTaxDetailNew();
		}
	});
}

function fetchTaxDetailNew() {
	var inputs = [];
	inputs.push('action=fetchTaxDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			SrNoDT=1;
			$("#taxContent").setTemplate(inventoryTaxTemp);
			$("#taxContent").processTemplate(pobj1);
			$("#taxAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function viewTaxDetail(taxId) {
$("#SaveUpdate").val("Update");
	if (taxId == null || taxId == "") {
		alert("Plz enter tax Id");
		$("#byName").focus();
		return false;
	}
	var obj = $("#taxAjaxResp").html();
	objTax = JSON.parse(obj);
	for ( var i = 0; i < objTax.inventoryTaxSetUps.length; i++) {
		if (objTax.inventoryTaxSetUps[i].tax_id == taxId) {
			$("#txttaxmastercode").val(objTax.inventoryTaxSetUps[i].tax_id);
			$("#txttaxcode").val(objTax.inventoryTaxSetUps[i].tax_code);
			$("#txttaxDescription").val(objTax.inventoryTaxSetUps[i].tax_description);
			$("#txttaxRate").val(objTax.inventoryTaxSetUps[i].tax_rate);

		}
	}
}
function deleteTaxDetail(taxId) {
	var didConfirm = confirm("Are you sure to delete tax details?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteTaxDetail');
		inputs.push('taxid=' + taxId);
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
				//alert(r);
				alert("Tax details deleted successfully");
				fetchTaxDetailNew();
			}
		});
	}
}

function fetchTaxDetail(taxId) {
	if (taxId == null || taxId == "") {
		alert("Please enter tax Id");
		$("#byName").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchTaxDetail');
	inputs.push('isEdit=yes');
	inputs.push('taxid=' + taxId);

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

			pobj1 = eval('(' + r + ')');
			SrNoDT=1;
			objTax = JSON.parse(r);
			if (objTax.inventoryTaxSetUps.length > 0) {
				$("#taxContent").setTemplate(inventoryTaxTemp);
				$("#taxContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchTaxDetailNew();
			}
			$('#byName').val("");
			$('#byName').focus();
			userAccess();
		}
	});
}

function resetTaxMasterForm()
{
	$("#txttaxcode").val("");
	$("#txttaxDescription").val("");
	$("#txttaxRate").val("");
	$("#txttaxcode").focus();
	getNextTaxMasterId();
}
/*
 * *****************************New Inventory DocNumber
 * Form*******************************
 */
function getNextDocNumberMasterId() {
	var inputs = [];
	inputs.push('action=txtdocnumbermastercode');
	inputs.push('tableName=inv_document_numbering_master');
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
			ajaxResponse = r;
			$("#txtDocumentNumberId").val(r);
		}
	});
}

function saveDocNumberMaster() {

	var txtDocumentNumberId = $("#txtDocumentNumberId").val();
	//var selDocument = $('#selDocument option:selected');	
	var selDocument = $("#selDocument").val();
	var txtDocSeriesName = $("#txtDocSeriesName").val();
	var txtDocNumber = $("#txtDocNumber").val();
	var txtDocuPrefix = $("#txtDocuPrefix").val();
	var txtDocuSuffix = $("#txtDocuSuffix").val();
	//var selFinancialYear = $('#selFinancialYear option:selected');
	var selFinancialYear = $("#selFinancialYear").val();
	
	var index = $("#selDocument").val();
	
	if(index == 0 || index=='Select')
	{
	alert('please select document name');
	$("#selDocument").focus();
	return false;
	}
	
	
	if(txtDocSeriesName == "" || txtDocSeriesName == null)
	{
	alert("please select document series");
	$("#txtDocSeriesName").focus();
	return false;
	}
	
	if(txtDocSeriesName.length == 0 || txtDocSeriesName.length > 45)
	{
	alert("Document series should be less than 45 alphabets");
	$("#txtDocSeriesName").focus();
	return false;
	}
	
	if(txtDocNumber == "" || txtDocNumber == null)
	{
	alert("please select document number");
	$("#txtDocNumber").focus();
	return false;
	}
	
	if(txtDocNumber.length == 0 || txtDocNumber.length > 8)
	{
	alert("Document number should be less than 8 digits");
	$("#txtDocNumber").focus();
	return false;
	}
	
	/*var patt = /^[0-9]*$/;
	 if(!patt.test(txtDocNumber))

	    {
		    alert("Document number should be of digits");
			$("#txtDocNumber").focus();
			return false;
	    }*/
	
	if(txtDocuPrefix == "" || txtDocuPrefix == null)
	{
	alert("please select doc prefix");
	$("#txtDocuPrefix").focus();
	return false;
	}
	if(txtDocuPrefix.length == 0 || txtDocuPrefix.length > 10)
	{
	alert("Document prefix should be less than 10 alphabets");
	$("#txtDocuPrefix").focus();
	return false;
	}
	
	if(txtDocuSuffix == "" || txtDocuSuffix == null)
	{
	alert("please select doc suffix");
	$("#txtDocuSuffix").focus();
	return false;
	}
	
	if(txtDocuSuffix.length == 0 || txtDocuSuffix.length > 10)
	{
	alert("Document suffix should be less than 10 alphabets");
	$("#txtDocuSuffix").focus();
	return false;
	}
	
     var index2 = $("#selFinancialYear").val();
	
	if(index2 == 0 || index2=='Select')
	{
		alert('please select financial year name');
		$("#selFinancialYear").focus();
	    return false;
	}
	// end
	var status = 'Y';
	var inputs = [];
	inputs.push('action=saveDocumentnumberDetail');
	inputs.push('txtDocumentNumberId=' + txtDocumentNumberId);
	inputs.push('selDocument=' + selDocument);
	inputs.push('txtDocSeriesName=' + txtDocSeriesName);
	inputs.push('txtDocNumber=' + txtDocNumber);
	inputs.push('txtDocuPrefix=' + txtDocuPrefix);
	inputs.push('txtDocuSuffix=' + txtDocuSuffix);
	inputs.push('selFinancialYear=' + selFinancialYear);
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
			ajaxResponse = r;
			//alert(r);
			var SaveUpdate = $("#SaveUpdate").val();
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			$("#SaveUpdate").val('0');
			
			$("#selDocument").val("");
			$("#txtDocSeriesName").val("");
			$("#txtDocNumber").val("");
			$("#txtDocuPrefix").val("");
			$("#txtDocuSuffix").val("");
			$("#selFinancialYear").val("");
			getNextDocNumberMasterId();
			fetchDocNumberDetailNew();
		}
	});
}

function fetchDocNumberDetailNew() {
	var inputs = [];
	inputs.push('action=fetchDocumentNumberDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			//alert(r);
			SrNoDT = 1;
			$("#documentNumberContent").setTemplate(inventoryDocumentNumberTemp);
			$("#documentNumberContent").processTemplate(pobj1);
			$("#docuemntNumberAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function viewDocumentNumberDetail(documentNumberId) {
	$("#SaveUpdate").val('Update');
	if (documentNumberId == null || documentNumberId == "") {
		alert("Plz select document");
		$("#byName").focus();
		return false;
	}
	var obj = $("#docuemntNumberAjaxResp").html();
	objDocumentNumber = JSON.parse(obj);
	var myOBJECT = "";
	for ( var i = 0; i < objDocumentNumber.lstDocumentNUmberDto.length; i++) {
		if (objDocumentNumber.lstDocumentNUmberDto[i].document_numbering_id == documentNumberId)
		{
			
			myOBJECT = objDocumentNumber.lstDocumentNUmberDto[i];
			break;			
		}
	}

	$("#txtDocumentNumberId").val(myOBJECT.document_numbering_id);
	$("#selDocument").val(myOBJECT.doc_id);
	$("#txtDocSeriesName").val(myOBJECT.document_series);
	$("#txtDocNumber").val(myOBJECT.document_number);
	$("#txtDocuPrefix").val(myOBJECT.document_prefix);
	$("#txtDocuSuffix").val(myOBJECT.document_suffix);
	$("#selFinancialYear").val(myOBJECT.doc_financial_year_id);
	$("#txtDocumentNumberId").val(documentNumberId);
}

function deleteDocumentNumberDetail(docNumberId) {
	var didConfirm = confirm("Are you sure to delete document numbering?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteDocumentNumberDetail');
		inputs.push('docNumberId=' + docNumberId);
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
				//alert(r);
				alert("Document numbering deleted successfully");
				fetchDocNumberDetailNew();
			}
		});
	}
}

function fetchDocumentNumberDetail(docNumberId) {
	if (docNumberId == null || docNumberId == "") {
		alert("Please enter  document id");
		$("#byName").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchDocumentNumberDetail');
	inputs.push('isEdit=yes');
	inputs.push('txtDocumentNumberId=' + docNumberId);

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
			pobj1 = eval('(' + r + ')');
			SrNoDT = 1;
			objDocumentNumber = JSON.parse(r);
			if (objDocumentNumber.lstDocumentNUmberDto.length > 0) {
				$("#documentNumberContent").setTemplate(inventoryDocumentNumberTemp);
				$("#documentNumberContent").processTemplate(objDocumentNumber);
				$("#docuemntNumberAjaxResp").html(r);
			} else {
				alert("Record not found..!");
				//fetchDocumentDetailNew();
				fetchDocNumberDetailNew();
			}
			$('#byName').val("");
			$('#byName').focus();
			userAccess();
		}
	});
}


function resetDocumentNumberingForm()
{
	$("#selDocument").val("");
	$("#txtDocSeriesName").val("");
	$("#txtDocNumber").val("");
	$("#txtDocuPrefix").val("");
	$("#txtDocuSuffix").val("");
	$("#selFinancialYear").val("");
	getNextDocNumberMasterId();
}
/** *********************************form****************************************** */

function getNextFormId() {
	var inputs = [];
	inputs.push('action=getFormNextId');
	inputs.push('tableName=inv_form_master');
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
			ajaxResponse = r;
			$("#txtFormCode").val(r);
		}
	});
}

function saveFormMaster() {
	var txtFormCode = $("#txtFormCode").val();
	var txtFormName = $("#txtFormName").val();
	var status = 'Y';
	
	if (txtFormName == "" || txtFormName == null ) {
		
		alert("Please Enter Form Type..!");
		$("#txtFormName").focus();
		return false;
	} else if (txtFormName.length > 40) {
		alert("Form name length should be less than 45 alphabets..!");
		$("#txtFormName").val("");
		$("#txtFormName").focus();
		return false;
	}
	else if (txtFormName.length < 2) {
		alert("Form name length should be greater  than 2 alphabets..!");
		$("#txtFormName").val("");
		$("#txtFormName").focus();
		return false;
	}
	
	if($('#txtFormName').val().toString().trim().length==0 )
	{
		alert("Can not insert empty record");
		$("#txtFormName").val("");
		$("#txtFormName").focus();
		return false;
	}
	
	/*var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(txtFormName)) {
		alert("Form name should be of alphabets with a single space allowed..!");
		$("#txtFormName").focus();
		return false;
	}*/
	var inputs = [];
	inputs.push('action=saveFormDetail');
	inputs.push('txtFormCode=' + txtFormCode);
	inputs.push('txtFormName=' + txtFormName);
	inputs.push('status=' + status);
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
			//alert(r);
var SaveUpdate = $("#SaveUpdate").val();
			
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
			ajaxResponse = r;
			$("#txtFormName").val("");	
			$("#txtFormName").focus();
			getNextFormId();
			fetchFormDetailNew();
		}
	});
}

function fetchFormDetail(formid) {
	
	if (formid == "" || formid == null ) {
		alert("Please enter form id");
		$("#byName").focus();
		return false;
	} 
	var inputs = [];
	inputs.push('action=fetchFormDetail');
	inputs.push('isEdit=yes');

	inputs.push('formid=' + formid);

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
			pobj1 = eval('(' + r + ')');
			SrNo = 1;
			objVendor = JSON.parse(r);
			if (objVendor.ltFormDTOs.length > 0) {
				$("#formContent").setTemplate(inventoryFormTemp);
				$("#formContent").processTemplate(pobj1);
				$("#formAjaxResp").html(r);
			} else {
				alert("Record not found..!");
				fetchFormDetailNew();
			}
			$("#byName").val("");
			userAccess();
			$("#byName").focus();
		}
	});
}
function fetchFormDetailNew() {
	var inputs = [];
	inputs.push('action=fetchFormDetail');
	inputs.push('isEdit=no');
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
			//alert(r);
			SrNo = 1;
			pobj1 = eval('(' + r + ')');
			$("#formContent").setTemplate(inventoryFormTemp);
			$("#formContent").processTemplate(pobj1);
			$("#formAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function viewFormDetail(formId) {
	var obj = $("#formAjaxResp").html();
	$("#SaveUpdate").val('Update');
	objShelf = JSON.parse(obj);
	for ( var i = 0; i < objShelf.ltFormDTOs.length; i++) {
		if (objShelf.ltFormDTOs[i].formId == formId) {
			$("#txtFormCode").val(objShelf.ltFormDTOs[i].formId);
			$("#txtFormName").val(objShelf.ltFormDTOs[i].formType);
		}
	}
}

function deleteFormDetail(formid) {
	var didConfirm = confirm("Are you sure to delete this form type?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteFormDetail');
		inputs.push('formid=' + formid);
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
				//alert(r);
				alert("Form type delete successfully");
				fetchFormDetailNew();
			}
		});
	}
}

function resetFormMaster()
{
	$("#txtFormName").val("");	
	getNextFormId();
	$("#txtFormName").focus();	
}
/******************************************/

function getNextTrolleyId() {
	var inputs = [];
	inputs.push('action=getTrolleyNextId');
	inputs.push('tableName=inv_trolley_master');
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

			$("#txttrolleyid").val(r);

		}
	});
}
/*********************************************/
/** *******************************Manufacturer********************** */

function getNextManufacturerId() {
	var inputs = [];
	inputs.push('action=getManufacturerNextId');
	inputs.push('tableName=inv_manufacturer_master');
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
			ajaxResponse = r;
			// alert(r);
			$("#txtManufacturerId").val(r);
		}
	});
} 

function saveManufacturerMaster() {
	var txtManufacturerId = $("#txtManufacturerId").val();
	var txtManufacturerName = $("#txtManufacturerName").val();
	// txtManufacturerName = txtManufacturerName.replace(ssssss"
	// /!@#$^&%*()+=-[\x5B\x5D]\/{}|:<>?,./im", "");
	//txtManufacturerName = txtManufacturerName.replace(/[^a-zA-Z0-9%]/g, '');
	// txtManufacturerName.replace("/[^a-zA-Z ]/g", "");
	// alert(txtManufacturerName.replace(/[^a-zA-Z ]/g, ""));
	var txtManufacturerDetails = $("#txtManufacturerDetails").val();
	var status = 'Y';

	if (txtManufacturerName == "") {
		alert("Please enter manufacturer name");
		$("#txtManufacturerName").focus();
		return false;
	}
	/*if (txtManufacturerName.length < 4 || txtManufacturerName.length > 45) {
		alert("manufacturer name should be greater than 4 character and less than 45 character");
		$("#txtManufacturerName").focus();
		return false;
	}
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtManufacturerName)) {
		alert("Manufacturer name should be of alphabets and numbers with a single space allowed..!");
		$("#txtManufacturerName").focus();
		return false;
	}*/
	/*if(txtManufacturerDetails !=null || txtManufacturerDetails =="")
		{
		 var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		 if(!pattern.test(txtManufacturerDetails))
			 {
			 alert("Only alphabets and numbers are allowed for details");
			 $("#txtManufacturerDetails").focus();
				return false;
			 }
		
		
		}*/
	
	var inputs = [];
	inputs.push('action=SaveManufacturerDetails');
	inputs.push('txtManufacturerId=' + txtManufacturerId);
	inputs.push('txtManufacturerName=' + txtManufacturerName);
	inputs.push('txtManufacturerDetails=' + txtManufacturerDetails);
	inputs.push('status=' + status);
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
			ajaxResponse = r;
			//alert("Record saved successfully..!");
        var SaveUpdate = $("#SaveUpdate").val();
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
			$("#txtManufacturerName").val("");
			$("#txtManufacturerDetails").val("");
			$("#txtManufacturerName").focus();
			getNextManufacturerId();
			fetchManufacturerDetailNew();
			
		}
	});
}

function fetchManufacturerDetailNew() {
	var inputs = [];
	inputs.push('action=fetchManufacturerDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			// alert(r);
			SrNo = 1;
			$("#manufacturerContent").setTemplate(inventoryManufacturerTemp);
			$("#manufacturerContent").processTemplate(pobj1);
			$("#manufacturerAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}
function fetchManufacturerDetail() {
	
	var mfgName = $('#byName').val();
	if (mfgName == "" || mfgName == null) {
		alert("Please enter manufacturer name");
		$("#byName").focus();
		return false;
	}
	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(mfgName)) {
		alert("manufacturer name should be of alphabets only with a single space allowed..!");
		$("#byName").focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('action=fetchManufacturerDetail');
	inputs.push('isEdit=yes');
	inputs.push('manufacturerid=' + mfgName);
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
			pobj1 = eval('(' + r + ')');
			SrNo = 1;
			objManufacturer = JSON.parse(r);
			if (objManufacturer.ltManufacturerDTOs.length > 0) {
				$("#manufacturerContent")
						.setTemplate(inventoryManufacturerTemp);
				$("#manufacturerContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchManufacturerDetailNew();
			}
			$("#byName").val("");
			$("#byName").focus();
			userAccess();
		}
	});
}

function viewManufacturerDetail(manufacturerid) {
	$("#SaveUpdate").val('Update');
	var obj = $("#manufacturerAjaxResp").html();
	objManufacturer = JSON.parse(obj);
	for ( var i = 0; i < objManufacturer.ltManufacturerDTOs.length; i++) {
		if (objManufacturer.ltManufacturerDTOs[i].manufacturerId == manufacturerid) {
			$("#txtManufacturerId").val(
					objManufacturer.ltManufacturerDTOs[i].manufacturerId);
			$("#txtManufacturerName").val(
					objManufacturer.ltManufacturerDTOs[i].manufacturerName);
			$("#txtManufacturerDetails").val(
					objManufacturer.ltManufacturerDTOs[i].manufacturerDetail);
		}
	}
}
function deleteManufacturerDetail(manufacturerid) {
	var didConfirm = confirm("Are you sure to delete manufacturer details?");
	if (didConfirm) {
		var inputs = [];

		inputs.push('action=deleteManufacturerDetails');
		inputs.push('formid=' + manufacturerid);
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
				//alert(r);
				alert("Manufacturer details deleted successfully");
				fetchManufacturerDetailNew();
			}
		});
	}
}

function resetManufacturerForm()
{
	$("#txtManufacturerName").val("");
	$("#txtManufacturerDetails").val("");
	getNextManufacturerId();
	$("#txtManufacturerName").focus();
}

/*************************warehouse* start*******************************************************/
function getNextWarehouseId() {
	var inputs = [];
	inputs.push('action=getNextWarehouseId');
	inputs.push('tableName=inv_warehouse_master');
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
			ajaxResponse = r;
			// alert(r);
			$("#txtWarehouseId").val(r);
		}
	});
}
/*modified @Date 2Aug2016 @Author Adding two Check boxes for applicable and not Applicable to maintanace*/ 
function saveWarehouseMaster() {
	var txtWarehouseId = $("#txtWarehouseId").val();
	var txtWarehouseName = $("#txtWarehouseName").val();
	//txtWarehouseName = txtWarehouseName.replace(/[^a-zA-Z0-9%]/g, '');
	var txtWarehouseLocation = $("#txtWarehouseLocation").val();
	var txtWarehouseContactNo = $("#txtWarehouseContactNo").val();
	var status = 'Y';

	
	var $radios = $('input:checkbox[name=chkNotApplicable]');
	if ($radios.is(':checked') == true)
	{
		var chkNotApplicable = 1;
	}
	else
		{
		var chkNotApplicable = 0;
		}
	 
	var $radios = $('input:checkbox[name=chkApplicable]');
	if ($radios.is(':checked') == true)
	{
		var chkApplicable = 1;
	}
	else
		{
			var chkApplicable = 0;
		}
		
	if (txtWarehouseName == "" || txtWarehouseName == null) {
		alert("Please enter warehouse name");
		$("#txtWarehouseName").focus();
		return false;
	}
	if (txtWarehouseName.length < 4 || txtWarehouseName.length >45) {
		alert("warehouse name should be greater than 4 character and less than 45 character");
		$("#txtWarehouseName").focus();
		return false;
	}
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtWarehouseName)) {
		alert("Warehouse name should be of alphabets and numbers with a single space allowed..!");
		$("#txtWarehouseName").focus();
		return false;
	}
	
	if(txtWarehouseLocation !=null || txtWarehouseLocation != "")
		{
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		/*if (!pattern.test(txtWarehouseLocation)) {
			alert("Warehouse location should be of alphabets and numbers with a single space allowed..!");
			$("#txtWarehouseLocation").focus();
			return false;
		}*/
		}
	
	
	var inputs = [];
	inputs.push('action=SaveWarehouseDetails');
	inputs.push('txtWarehouseId=' + txtWarehouseId);
	inputs.push('txtWarehouseName=' + txtWarehouseName);
	inputs.push('txtWarehouseLocation=' + txtWarehouseLocation);
	inputs.push('txtWarehouseContactNo=' + txtWarehouseContactNo);
	inputs.push('status=' + status);
	
	inputs.push('chkNotApplicable='+ chkNotApplicable);
	inputs.push('chkApplicable='+ chkApplicable);
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
			ajaxResponse = r;
			//alert("Record saved successfully..!");
var SaveUpdate = $("#SaveUpdate").val();
			
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			$("#SaveUpdate").val('0');
			$("#txtWarehouseName").val("");
			$("#txtWarehouseLocation").val("");
			$("#txtWarehouseName").focus();
			document.getElementById("chkNotApplicable").checked = false;
			document.getElementById("chkApplicable").checked = false;
			
			getNextWarehouseId();
			fetchWarehouseDetailsOnload();
		}
	});
}
/**** End saveWarehouseMaster */ 
function fetchWarehouseDetailsOnload() {
	var inputs = [];
	inputs.push('action=fetchWarehouseDetails');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			//alert(r);
			SrNo = 1;
			$("#warehouseContent").setTemplate(inventoryWarehouseTemp);
			$("#warehouseContent").processTemplate(pobj1);
			$("#warehouseAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function fetchWarehouseDetails() {
	var warehouseName = $('#byName').val();
	if (warehouseName == "" || warehouseName == null) {
		alert("Please enter warehouse name");
		$("#byName").focus();
		return false;
	}
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(warehouseName)) {
		alert("Warehouse name should be of alphabets and digits only with a single space allowed..!");
		$("#byName").focus();
		return false;
	}

	var inputs = [];
	inputs.push('action=fetchWarehouseDetails');
	inputs.push('isEdit=yes');
	inputs.push('warehouseid=' + warehouseName);
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
			pobj1 = eval('(' + r + ')');
			SrNo = 1;
			objWarehouse = JSON.parse(r);
			if (objWarehouse.ltWarehouseDTOs.length > 0) {
				$("#warehouseContent").setTemplate(inventoryWarehouseTemp);
				$("#warehouseContent").processTemplate(pobj1);
				//$("#warehouseAjaxResp").html(r);
			} else {
				alert("Record not found..!");
				fetchWarehouseDetailsOnload();
			}
			$("#byName").val("");
			$("#byName").focus();
			userAccess();
		}
	});
}

function viewWarehouseDetails(WarehouseId) {
	var obj = $("#warehouseAjaxResp").html();
	$("#SaveUpdate").val('Update');
	objWarehouse = JSON.parse(obj);
	for ( var i = 0; i < objWarehouse.ltWarehouseDTOs.length; i++) {
		if (objWarehouse.ltWarehouseDTOs[i].warehouseId == WarehouseId) {
			$("#txtWarehouseId").val(objWarehouse.ltWarehouseDTOs[i].warehouseId);
			$("#txtWarehouseName").val(objWarehouse.ltWarehouseDTOs[i].warehouseName);
			$("#txtWarehouseLocation").val(objWarehouse.ltWarehouseDTOs[i].warehouselocation);
			
			var chkNotApplicable = objWarehouse.ltWarehouseDTOs[i].inv_warehouse_master_not_applicable_for_maintanace;
			var chkApplicable = objWarehouse.ltWarehouseDTOs[i].inv_warehouse_master_applicable_for_maintanace;
			if(parseInt(chkNotApplicable) == 1)
				{
				$("#chkNotApplicable").prop('checked', true);
				}
			else
				{
				$("#chkNotApplicable").prop('checked', false);
				}
			if(parseInt(chkApplicable) == 1)
			{
				$("#chkApplicable").prop('checked', true);
			}
			else
				{
				$("#chkApplicable").prop('checked', false);
				}
			break;
			//$("#txtWarehouseContactNo").val(objWarehouse.ltWarehouseDTOs[i].warehouse_contactno);
		}
	}
}

function deleteWarehouseDetail(warehouseid) {
	var didConfirm = confirm("Are you sure to delete warehouse details?");
	if (didConfirm) {
		var inputs = [];

		inputs.push('action=deleteWarehouseDetails');
		inputs.push('warehouseid=' + warehouseid);
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
				//alert(r);
				alert("Warehouse deatils deleted successfully");
				fetchWarehouseDetailsOnload();
			}
		});
	}
}

function resetWarehouseForm()
{
	$("#txtWarehouseName").val("");
	$("#txtWarehouseLocation").val("");
	
	document.getElementById("chkNotApplicable").checked = false;
	document.getElementById("chkApplicable").checked = false;
	$("#txtWarehouseName").focus();
	getNextWarehouseId();
	
}
/****************************************************end warehouse****************************************************/

/**
 * ***********************************Trolley Master
 * **********************************************
 */
function fetchHallid(trolleytype) {
	var inputs = [];
	inputs.push('action=fetchHallId');
	inputs.push('trolleytype=' + trolleytype);
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

			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			if (trolleytype == 'Nurse') {
				$("#selhallid").setTemplate(selhallid);
				$("#selhallid").processTemplate(pobj1);
			} else if (trolleytype == 'Ot') {
				$("#selhallid").setTemplate(selOtid);
				$("#selhallid").processTemplate(pobj1);
			} else {
				$('#selhallid').empty();
			}

		}
	});
}

function fetchTemplateid() {
	var inputs = [];
	inputs.push('action=fetchTemplateId');

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

			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#seltemplateid").setTemplate(selTemplateid);
			$("#seltemplateid").processTemplate(pobj1);
			$("#templateNameAjaxResp").html(r);

		}
	});
}

function fetchUserid() {
	var inputs = [];
	inputs.push('action=fetchUserId');

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

			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#selusername").setTemplate(selUserid);
			$("#selusername").processTemplate(pobj1);

		}
	});
}

function saveTrolleyMaster() {
	var values = [];
	$('#lstBox2 option').each(function() {
		if ($(this).attr('value') == "-1") {
			alert("Select Template");
			return false;
		}
		values.push($(this).attr('value'));
	});

	var txtTrolleyId = $("#txttrolleyid").val();
	var txtTrolleyName = $("#txttrollleyname").val();
	var selTrolleyType = $("#seltrolleytype").val();
	var selHallId = $("#selhallid").val();
	// alert(selHallId);
	if (validateTextFields(txttrolleyid, "TrolleyCode")) {
		return false;
	} else if (validateTextFields(txttrollleyname, "TrolleyName")) {
		return false;
	} else if (validateSelectBox(selTrolleyType, "TrolleyType")) {
		return false;

	} else if (validateSelectBox(selHallId, "HallId")) {
		return false;

	}/*
		 * else if($("#lstBox2").val()=="-1") {
		 * 
		 * alert("Select Template");
		 * 
		 * return false; }
		 */
	var status = 'Y';
	var inputs = [];
	inputs.push('action=saveTrolleyDetail');
	inputs.push('txtTrolleyId=' + txtTrolleyId);
	inputs.push('txtTrolleyName=' + txtTrolleyName);
	inputs.push('selTrolleyType=' + selTrolleyType);
	inputs.push('selHallId=' + selHallId);
	inputs.push('templateId= ' + values);
	inputs.push('status=' + status);

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
			ajaxResponse = r;
			window.location.replace("Trolley_master.jsp");
		}
	});
}
var trolleyList = "<option value='Select'>Select</option>{#foreach $T.ltTrolleyDTOs as ltTrolleyDTOs}<option value='{$T.ltTrolleyDTOs.trolley_id}'>{$T.ltTrolleyDTOs.trolley_name}</option>{#/for}";
function fetchTrolleyDetailNew(callFrom) {
	var inputs = [];
	inputs.push('action=fetchTrolleyDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');

			if (callFrom == 'GINMaster') {
				$("#trolley").setTemplate(trolleyList);
				$("#trolley").processTemplate(pobj1);
			} else {
				$("#trolleyContent").setTemplate(trolleyInventoryTemp);
				$("#trolleyContent").processTemplate(pobj1);
				$("#trolleyAjaxResp").html(r);
			}
		}
	});
}

function viewTrolleyDetail(trolley_id) {

	var obj = $("#trolleyAjaxResp").html();
	document.getElementById("lstBox2").innerHTML = "";
	var hallId = 0;
	objShelf = JSON.parse(obj);
	fetchTemplateid();
	setTimeout(
			function() {
				for ( var i = 0; i < objShelf.ltTrolleyDTOs.length; i++) {
					if (objShelf.ltTrolleyDTOs[i].trolley_id == trolley_id) {
						$("#txttrolleyid").val(
								objShelf.ltTrolleyDTOs[i].trolley_id);
						$("#txttrollleyname").val(
								objShelf.ltTrolleyDTOs[i].trolley_name);
						$('#seltrolleytype').val(
								objShelf.ltTrolleyDTOs[i].trolley_type);
						fetchHallid(objShelf.ltTrolleyDTOs[i].trolley_type);

						hallId = objShelf.ltTrolleyDTOs[i].trolley_hall_id;
						$("#selhallid").val(hallId);
						for ( var j = 0; j < objShelf.ltTrolleyDTOs[i].ltTemplateMasterDTOs.length; j++) {
							var myOption;
							myOption = document.createElement("Option");
							myOption.text = objShelf.ltTrolleyDTOs[i].ltTemplateMasterDTOs[j].templateName; // Textbox's
							myOption.value = objShelf.ltTrolleyDTOs[i].ltTemplateMasterDTOs[j].templateId;
							document.getElementById("lstBox2").add(myOption);

							// for remove inserted element from first list
							firstList = document
									.getElementById("seltemplateid");

							for ( var k = 0; k < firstList.options.length; k++) {
								if (myOption.text == firstList.options[k].text) {

									// $("#seltemplateid
									// option[value='"+myOption.value+"']").remove();

									var optionToRemove = firstList.options[k].value;

									$(
											"#seltemplateid option[value='"
													+ optionToRemove + "']")
											.remove();

								}
							}

						}

					}

				}// End Of For
			}, 1000);

}

function deleteTrolleyDetail(trolleyid) {
	var didConfirm = confirm("Are you sure?");
	if (didConfirm == true) {
		var inputs = [];
		inputs.push('action=deleteTrolleyDetail');
		inputs.push('trolleyid=' + trolleyid);
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
				// alert(r);
				fetchTrolleyDetailNew();
			}
		});
	} else {
		fetchTrolleyDetailNew();

	}
}

function fetchTrollleyDetail(trolleyId) {
	// alert(trolleyId);
	if (trolleyId == null || trolleyId == "") {
		alert("Enter Trolley Id!!");
		$("#byName").focus();
		return false;

	}
	var inputs = [];
	inputs.push('action=fetchTrolleyDetail');
	inputs.push('isEdit=yes');
	inputs.push('trolleyId=' + trolleyId);

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
			pobj1 = eval('(' + r + ')');
			if (pobj1.ltTrolleyDTOs.length > 0) {
				$("#trolleyContent").setTemplate(trolleyInventoryTemp);
				$("#trolleyContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchTrolleyDetailNew();
			}
			// $("#shelfAjaxResp").html(r);
		}
	});
}

$(document).ready(function() {
	$('#btnRight').click(function(e) {
		var selectedOpts = $('#seltemplateid option:selected');
		if (selectedOpts.length == 0) {
			alert("Nothing to move.");
			e.preventDefault();
		}
		$('#lstBox2').append($(selectedOpts).clone());
		$(selectedOpts).remove();
		e.preventDefault();
	});

	$('#btnLeft').click(function(e) {
		var selectedOpts = $('#lstBox2 option:selected');
		if (selectedOpts.length == 0) {
			alert("Nothing to move.");
			e.preventDefault();
		}

		$('#seltemplateid').append($(selectedOpts).clone());
		$(selectedOpts).remove();
		e.preventDefault();
	});
});
/**
 * *********************************Ingredient
 * Master**********************************************
 */
function getNextIngredientId() {
	var inputs = [];
	inputs.push('action=getManufacturerNextId');
	inputs.push('tableName=inv_ingredient_master');
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
			ajaxResponse = r;
			$("#txtIngredientId").val(r);
		}
	});
}

function saveIngredientMaster() {
	var txtIngredientId = $("#txtIngredientId").val();
	var txtIngredientName = $("#txtIngredientName").val();
	var status = 'Y';
	if (txtIngredientName == "" || txtIngredientName == null) {
		alert("Please Enter Ingredient Content");
		$("#txtIngredientName").focus();
		return false;
	}
	/*if (txtIngredientName.length < 4 ||txtIngredientName.length > 45 ) {
		alert("Ingredient name should be greater than 4 character and less than 45 character");
		$("#txtIngredientName").focus();
		return false;
	}*/

	var inputs = [];
	inputs.push('action=SaveIngredientDetails');
	inputs.push('txtIngredientId=' + txtIngredientId);
	inputs.push('txtIngredientName=' + txtIngredientName);
	inputs.push('status=' + status);
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
			ajaxResponse = r;			
			//alert(r);	
			var SaveUpdate = $("#SaveUpdate").val();
			
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
			$("#txtIngredientName").val("");
			$("#txtIngredientName").focus();
			getNextIngredientId();
			fetchIngredientDetailNew();
		}
	});
}

function fetchIngredientDetailNew() {
	var inputs = [];
	inputs.push('action=fetchIngredientDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			SrNo = 1;
			$("#ingredientContent").setTemplate(inventoryIngredientTemp);
			$("#ingredientContent").processTemplate(pobj1);
			$("#ingredientAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function fetchIngredientDetail() {
	var ingredientname = $('#byName').val();
	if (ingredientname == null || ingredientname == "") {
		alert("Please enter ingredient content");
		$("#byName").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchIngredientDetail');
	inputs.push('isEdit=yes');
	inputs.push('ingredientid=' + ingredientname);
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
			pobj1 = eval('(' + r + ')');
			SrNo = 1;
			objManufacturer = JSON.parse(r);
			if (objManufacturer.ltIngredientDTOs.length > 0) {
				$("#ingredientContent").setTemplate(inventoryIngredientTemp);
				$("#ingredientContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchIngredientDetailNew();
			}
			$("#byName").val("");
			$("#byName").focus();
			userAccess();
		}
	});
}

function viewIngredientDetail(ingredientid) {
	var obj = $("#ingredientAjaxResp").html();
	$("#SaveUpdate").val('Update');
	objIngredient = JSON.parse(obj);
	for ( var i = 0; i < objIngredient.ltIngredientDTOs.length; i++) {
		if (objIngredient.ltIngredientDTOs[i].ingredientId == ingredientid) {
			$("#txtIngredientId").val(
					objIngredient.ltIngredientDTOs[i].ingredientId);
			$("#txtIngredientName").val(
					objIngredient.ltIngredientDTOs[i].ingredientContent);
		}
	}
}
function deleteIngredientDetail(ingredientid) {
	var didConfirm = confirm("Are you sure to delete ingredient details?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteIngredientDetails');
		inputs.push('ingredientid=' + ingredientid);
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
				//alert(r);
				alert("Ingredient details deleted successfully");
				fetchIngredientDetailNew();
			}
		});
	}
}

function resetIngredentForm()
{
	$("#txtIngredientName").val("");
	getNextIngredientId();
	$("#txtIngredientName").focus();
}
/** ************************************************************************************ */

/**
 * *******************************Packing
 * master******************************************
 */

function getNextPackingId() {
	var inputs = [];
	inputs.push('action=getPackingNextId');
	inputs.push('tableName=inv_packing_master');
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
			ajaxResponse = r;
			$("#txtPackingId").val(r);
		}
	});
}

function savePackingMaster() {
	var txtPackingId = $("#txtPackingId").val();
	var txtPackingName = $("#txtPackingName").val();
	var status = 'Y';

	if (txtPackingName == "" || txtPackingName == null) {
		alert("Please enter packing name");
		$("#txtPackingName").focus();
		return false;
	} /*else if (txtPackingName.length > 45 || txtPackingName.length < 4) {
		alert("Packing name length should be greater than 4 alphabets and less than 45 alphabets..!");
		$("#txtPackingName").focus();
		return false;
	}*/
/*
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtPackingName)) {
		alert("Packing name should be of alphabets and numbers with a single space allowed..!");
		$("#txtPackingName").focus();
		return false;
	}*/
	
	var inputs = [];
	inputs.push('action=SavePackingDetails');
	inputs.push('txtPackingId=' + txtPackingId);
	inputs.push('txtPackingName=' + txtPackingName);
	inputs.push('status=' + status);
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
			ajaxResponse = r;
			//alert("Record saved successfully..!");
			
var SaveUpdate = $("#SaveUpdate").val();
			
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
			 $("#txtPackingName").val("");
			 $("#txtPackingName").focus();
			 getNextPackingId();
			 fetchPackingDetailNew();
		}
	});
}

function fetchPackingDetailNew() {
	var inputs = [];
	inputs.push('action=fetchPackingDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			SrNo =1;
			$("#packingContent").setTemplate(inventoryPackingTemp);
			$("#packingContent").processTemplate(pobj1);
			$("#packingAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function fetchPackingDetail() {
	
	var pakingName = $('#byName').val();
	if (pakingName == "" || pakingName == null) {
		alert("Please enter packing name");
		$("#byName").focus();
		return false;
	}
	
	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(pakingName)) {
		alert("packing name should be of alphabets only with a single space allowed..!");
		$("#byName").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchPackingDetail');
	inputs.push('isEdit=yes');
	inputs.push('packingid=' + pakingName);
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
			pobj1 = eval('(' + r + ')');
			SrNo =1;
			objManufacturer = JSON.parse(r);
			if (objManufacturer.ltPackingDTOs.length > 0) {
				$("#packingContent").setTemplate(inventoryPackingTemp);
				$("#packingContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchPackingDetailNew();
			}
			$("#byName").val("");
			$("#byName").focus();
			userAccess();
		}
	});
}

function viewPackingDetail(packingid) {
	var obj = $("#packingAjaxResp").html();
	$("#SaveUpdate").val('Update');
	objIngredient = JSON.parse(obj);
	for ( var i = 0; i < objIngredient.ltPackingDTOs.length; i++) {
		if (objIngredient.ltPackingDTOs[i].packingId == packingid) {
			$("#txtPackingId").val(objIngredient.ltPackingDTOs[i].packingId);
			$("#txtPackingName").val(
					objIngredient.ltPackingDTOs[i].packingName);
		}
	}
}

function deletePackingDetail(packingid) {
	var didConfirm = confirm("Are you sure to delete packing details?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePackingDetails');
		inputs.push('packingid=' + packingid);
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
				//alert(r);
				alert("Packing details deleted successfully");
				fetchPackingDetailNew();
			}
		});
	}
}

function resetPackingForm()
{
	 $("#txtPackingName").val("");
	 getNextPackingId();
	 $("#txtPackingName").focus();
}

/**
 * ******************************Template
 * Master*************************************
 */
var rowCount = 0;
function toCreateChkDivTemplate(RowCount) {

	rowCount = RowCount;
	rowCount++;
	divId = "div" + rowCount;
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');

	document.getElementById("container").appendChild(x);

	document.getElementById(divId).innerHTML = '<div  style="width: 100%; height: 28px; border-bottom: 1px solid #069;"> <div style="width: 9.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ rowCount
			+ '</div> <div style="width: 30%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%; padding-top: 3px;"> <input type="text" name="" style="width:137px; border: 0.2px solid; border-color: #069;margin: 0 0 0 12px;padding:0;" onchange="setSplitIds('
			+ rowCount
			+ ')" class="auto" id="productName'
			+ rowCount
			+ '" value="" >  </div>    <div style="width:30%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; padding-top: 3px;"> <input style="width:137px; border: 0.2px solid; border-color: #069;margin: 0 0 0 12px;padding:0;" type="text" onkeypress="" id="quantity'
			+ rowCount
			+ '" value="" /> </div>  <div style="width:; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"> <input type="checkbox" value="" name="checkbox'
			+ rowCount
			+ '" id="checkbox'
			+ rowCount
			+ '"/></div><input type="hidden" id="productId'
			+ rowCount
			+ '" /> </div>';
	$("#productName" + rowCount).focus();
	$(".auto").autocomplete("AutoSuggetionServlet?auto=productNameTemp");
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(w);
	w++;
}

function setSplitIds(rcount) {

	setTimeout(function() {
		var name = $("#productName" + rcount).val();
		var arr = name.split("_");
		$("#productName" + rcount).val(arr[0]);
		$("#productId" + rcount).val(arr[1]);
	}, 500);
}

function setSplitIdWithAddBatch(rcount) {

	setTimeout(
			function() {
				var name = $("#productName" + rcount).val();

				var arr = name.split("_");
				$("#productName" + rcount).val(arr[0]);
				$("#productId" + rcount).val(arr[1]);
				$("#packing" + rcount).val(arr[2]);
				if (arr[5] == 0) {
					document.getElementById("btnAddBatch" + rcount).style.visibility = "hidden";
				} else {
					document.getElementById("btnAddBatch" + rcount).style.visibility = "visible";
				}

			}, 500);
}

function toRemoveDivTemplate(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	var temp = rowCount;
	var p = 1;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#div" + p + "").remove();
			temp = temp - 1;
			$("#RowCount").val(temp);
		}
		p++;
	}

}

function getNextTemplateId() {
	var inputs = [];
	inputs.push('action=getTemplateNextId');
	inputs.push('tableName=inv_med_template_master');
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
			ajaxResponse = r;

			$("#txtmedicinetmpid").val(r);
		}
	});
}

function saveTemplateMaster() {

	var rows = $("#RowCount").val();

	var productIds = new Array();
	var quantity = new Array();

	for ( var t = 1; t <= rows; t++) {

		temp = $("#productId" + t).val();
		qnt = $("#quantity" + t).val();
		if (temp != undefined && qnt != "" && temp != null && qnt != null
				&& temp != "") {
			productIds.push(temp);
			quantity.push(qnt);
		} else {
			/*
			 * alert("Please Select Product From List / Enter Quantity !");
			 * return false;
			 */
		}
	}
	if (validateTextFields(txtmedicinetmpid, "TemplateCode")) {
		return false;
	} else if (validateTextFields(txtmedicinename, "TemplateName")) {
		return false;

	}
	if (rows == "0") {
		alert("Enter Medicine First");
		return false;

	}
	var inputs = [];
	inputs.push('action=saveTemplateMaster');
	inputs.push('txtmedicinetmpid='
			+ encodeURIComponent($('#txtmedicinetmpid').val()));
	inputs.push('txtmedicinetmpid='
			+ encodeURIComponent($('#txtmedicinetmpid').val()));
	inputs.push('txtmedicinename='
			+ encodeURIComponent($('#txtmedicinename').val()));
	inputs.push('productId=' + encodeURIComponent(productIds));
	inputs.push('quantity=' + encodeURIComponent(quantity));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			window.location.replace("Template_master.jsp");

		}
	});
}

function newTemplateMaster() {
	location.reload();
	$("#txtmedicinename").val('');
}

function fetchTemplateDetailNew() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchTemplateDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');

			$("#templateContent").setTemplate(templateInventoryTemp);
			$("#templateContent").processTemplate(pobj1);
			$("#templateAjaxResp").html(r);
		}
	});
}

function fetchTemplateDetail(templateid) {

	var inputs = [];
	inputs.push('action=fetchTemplateDetail');
	inputs.push('isEdit=Yes');
	inputs.push('templateid=' + templateid);
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
			pobj1 = eval('(' + r + ')');

			if (pobj1.ltTemplateDTOs.length > 0) {
				$("#templateContent").setTemplate(templateInventoryTemp);
				$("#templateContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchTemplateDetailNew();
			}
			$("#byName").val("");

			// $("#templateAjaxResp").html(r);
		}
	});
}
function viewTemplateDetail(templateid) {
	$('#container').html('');
	var count = 1;
	var obj = $("#templateAjaxResp").html();
	objTemplate = JSON.parse(obj);

	for ( var i = 0; i < objTemplate.ltTemplateDTOs.length; i++) {

		if (objTemplate.ltTemplateDTOs[i].templateId == templateid) {
			$("#txtmedicinetmpid")
					.val(objTemplate.ltTemplateDTOs[i].templateId);
			$("#txtmedicinename").val(
					objTemplate.ltTemplateDTOs[i].templateName);
			for ( var j = 0; j < objTemplate.ltTemplateDTOs[i].ltTemplateRelationDTOs.length; j++) {
				if (objTemplate.ltTemplateDTOs[i].ltTemplateRelationDTOs[j].templateId == objTemplate.ltTemplateDTOs[i].templateId) {
					var rowCount = j;
					rowCount++;
					divId = "div" + rowCount;
					var x = document.createElement('div');
					x.setAttribute('id', divId);
					x
							.setAttribute('style',
									'width: 100%; height: 28px; border-bottom: 1px solid #069;');
					document.getElementById("container").appendChild(x);

					document.getElementById(divId).innerHTML = '<div  style="width: 100%; height: 28px; border-bottom: 1px solid #069;"> <div style="width: 5.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
							+ count++
							+ '</div> <div style="width: 30%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%; padding-top: 3px;"> <input type="text" name="" style="width:137px; border: 0.2px solid; border-color: #069;margin: 0 0 0 12px;padding:0;" onchange="setSplitIds('
							+ rowCount
							+ ')" class="auto" id="productName'
							+ rowCount
							+ '" value="'
							+ objTemplate.ltTemplateDTOs[i].ltTemplateRelationDTOs[j].productName
							+ '" >  </div>    <div style="width:30%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; padding-top: 3px;"> <input style="width:137px; border: 0.2px solid; border-color: #069;margin: 0 0 0 12px;padding:0;" type="text" onkeypress="" id="quantity'
							+ rowCount
							+ '" value="'
							+ objTemplate.ltTemplateDTOs[i].ltTemplateRelationDTOs[j].minQnt
							+ '"/> </div> <div style="width:; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"> <input type="checkbox" value="" name="checkbox'
							+ rowCount
							+ '" id="checkbox'
							+ rowCount
							+ '" /></div><input type="hidden" id="productId'
							+ rowCount
							+ '" value="'
							+ objTemplate.ltTemplateDTOs[i].ltTemplateRelationDTOs[j].productId
							+ '"/><div style="width: 11%; height: 17px; padding-left: 1%; padding-top: 3px; text-align: center;"><input type="button" onclick="deleteMed('
							+ objTemplate.ltTemplateDTOs[i].ltTemplateRelationDTOs[j].productId
							+ ')" value="Delete" class="edit"/></div> </div>';

					$(".auto").autocomplete(
							"AutoSuggetionServlet?auto=productName");
					$("#RowCount").val(rowCount);
					$("#addRowCount").val(w);
					w++;
				}
			}
		}

	}
}

function deleteTemplateDetail(templateid) {
	var didConfirm = confirm("Are you sure?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteTemplateDetail');
		inputs.push('templateid=' + templateid);
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
				alert(r);
				fetchTemplateDetailNew();
			}
		});
	}
}

function deleteMed(medineid) {
	var didConfirm = confirm("Are you sure?");
	if (didConfirm == true) {
		var inputs = [];
		inputs.push('action=deleteMedicineDetail');
		inputs.push('medineid=' + medineid);
		inputs.push('tempid=' + $('#txtmedicinetmpid').val());

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
				alert(r);
				window.location.replace("Template_master.jsp");
			}
		});
	} else {
		fetchTemplateDetailNew();
	}

}

/**
 * **********************************Product
 * Master***************************************
 */

function getNextProductId() {
	var inputs = [];
	inputs.push('action=getProductNextId');
	inputs.push('tableName=inv_product_master');
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
			ajaxResponse = r;
			$("#txtProductId").val(r);
		}
	});
}

function fetchCategoryList() {
	var inputs = [];
	inputs.push('action=fetchCategoryDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			$("#selCategory").setTemplate(selCategoryTemplate);
			$("#selCategory").processTemplate(pobj1);

		}
	});
}
function fetchManufacturerList() {
	var inputs = [];
	inputs.push('action=fetchManufacturerDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			$("#selManufacturer").setTemplate(selManufacturerTemplate);
			$("#selManufacturer").processTemplate(pobj1);
		}
	});
}

function fetchSupplierList() {
	var inputs = [];
	inputs.push('action=fetchVendorDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			$("#selSupplier").setTemplate(selSupplierTemplate);
			$("#selSupplier").processTemplate(pobj1);
		}
	});
}
function fetchUOMList() {
	var inputs = [];
	inputs.push('action=fetchUOMDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			$("#selUOM").setTemplate(selUOMTemplate);
			$("#selUOM").processTemplate(pobj1);
		}
	});
}

function fetchFormList() {
	var inputs = [];
	inputs.push('action=fetchFormDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			$("#selForm").setTemplate(selFormTemplate);
			$("#selForm").processTemplate(pobj1);
		}
	});
}

function fetchPackingList() {
	var inputs = [];
	inputs.push('action=fetchPackingDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			$("#selPacking").setTemplate(selPackingTemplate);
			$("#selPacking").processTemplate(pobj1);
		}
	});
}

function fetchShelfList() {
	var inputs = [];
	inputs.push('action=fetchShelfDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			$("#selShelf").setTemplate(selShelfTemplate);
			$("#selShelf").processTemplate(pobj1);
		}
	});
}

function fetchIngredientList() {
	var inputs = [];
	inputs.push('action=fetchIngredientDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			$("#selIngredient").setTemplate(selIngredientTemplate);
			$("#selIngredient").processTemplate(pobj1);
		}
	});
}

function saveProductMaster() {
	var batchFlag = "0";
	$('input:checkbox[name=rbaddbatch]:checked').each(function() {
		batchFlag = $(this).val();
	});
	var txtProductId = $("#txtProductId").val();
	var txtProductName = $("#txtProductName").val();
	var selCategory = $("#selCategory").val();
	var selManufacturer = $("#selManufacturer").val();
	var selSupplier = $("#selSupplier").val();
	var selUOM = $("#selUOM").val();
	var selForm = $("#selForm").val();
	var selPacking = $("#selPacking").val();
	var selShelf = $("#selShelf").val();
	var selIngredient = $("#selIngredient").val();
	var txtCost = $("#txtCost").val();
	var txtMRP = $("#txtMRP").val();
	var txtStockInHand = $("#txtStockInHand").val();
	var txtReOrderLevel = $("#txtReOrderLevel").val();
	var txtOrderUpto = $("#txtOrderUpto").val();
	var uom_id = $("#uom_id").val();
	var qty = $("#qty").val();
	var sub_qty = $("#sub_qty").val();
	// /var rbaddbatch = $("#rbaddbatch").val();
	var status = 'Y';

	if (txtProductName == "" || txtProductName.length < 1) {
		alert("Fill all fields are compulsory..!");
		return false;
	} else if (validateSelectBox(selCategory, "Category")) {
		return false;
	} else if (validateSelectBox(selManufacturer, "Manufacturer")) {
		return;
	} else if (validateSelectBox(selSupplier, "Supplier")) {
		return;
	} else if (validateSelectBox(selUOM, "UOM")) {
		return;
	} else if (validateSelectBox(selForm, "Form")) {
		return;
	} else if (validateSelectBox(selPacking, "Packing")) {
		return;
	} else if (validateSelectBox(selShelf, "Shelf")) {
		return;
	} else if (validateSelectBox(selIngredient, "Ingredient")) {
		return;
	} else if (parseFloat(txtCost) > parseFloat(txtMRP)) {
		alert("Cost should be less than or equal to mrp..!");
		return;
	}

	var inputs = [];
	inputs.push('action=SaveProductDetails');
	inputs.push('txtProductId=' + txtProductId);
	inputs.push('txtProductName=' + txtProductName);
	inputs.push('selCategory=' + selCategory);
	inputs.push('selManufacturer=' + selManufacturer);
	inputs.push('selSupplier=' + selSupplier);
	inputs.push('selUOM=' + selUOM);
	inputs.push('selForm=' + selForm);
	inputs.push('status=' + status);
	inputs.push('selPacking=' + selPacking);
	inputs.push('selShelf=' + selShelf);
	inputs.push('selIngredient=' + selIngredient);
	inputs.push('txtCost=' + txtCost);
	inputs.push('txtMRP=' + txtMRP);
	inputs.push('txtStockInHand=' + txtStockInHand);
	inputs.push('txtReOrderLevel=' + txtReOrderLevel);
	inputs.push('txtOrderUpto=' + txtOrderUpto);
	inputs.push('uom_id=' + uom_id);
	inputs.push('qty=' + qty);
	inputs.push('sub_qty=' + sub_qty);
	inputs.push('rbaddbatch=' + batchFlag);
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
			ajaxResponse = r;
			alert("Record saved successfully..!");
			window.location.replace("Product_master.jsp");
		}
	});
}

function fetchProductDetailNew() {
	var inputs = [];
	inputs.push('action=fetchProductDetail');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			count = 1;
			$("#productContent").setTemplate(productInventoryTemp);
			$("#productContent").processTemplate(pobj1);
			$("#productAjaxResp").html(r);
		}
	});
}
function fetchProductDetail(productid) {
	var inputs = [];
	inputs.push('action=fetchProductDetail');
	inputs.push('isEdit=Yes');
	inputs.push('productid=' + productid);
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
			// alert(r);
			pobj1 = eval('(' + r + ')');
			if (pobj1.ltProductDTOs.length > 0) {
				$("#productContent").setTemplate(productInventoryTemp);
				$("#productContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchProductDetailNew();
			}
			$("#byName").val("");
		}
	});
}

function viewProductDetail(productid) {
	var obj = $("#productAjaxResp").html();
	objProduct = JSON.parse(obj);
	for ( var i = 0; i < objProduct.ltProductDTOs.length; i++) {
		if (objProduct.ltProductDTOs[i].productId == productid) {
			$("#txtProductId").val(objProduct.ltProductDTOs[i].productId);
			$("#txtProductName").val(objProduct.ltProductDTOs[i].productName);
			$("#txtCost").val(objProduct.ltProductDTOs[i].productCost);
			$("#txtMRP").val(objProduct.ltProductDTOs[i].productMRP);
			$("#txtStockInHand").val(
					objProduct.ltProductDTOs[i].stockDTO.stockQntOnHand);
			$("#txtReOrderLevel").val(
					objProduct.ltProductDTOs[i].stockDTO.stockQntReorderLevel);
			$("#txtOrderUpto").val(
					objProduct.ltProductDTOs[i].stockDTO.stockQntUptoLevel);
			$("#selManufacturer").val(
					objProduct.ltProductDTOs[i].productManufacturer);
			$("#selForm").val(objProduct.ltProductDTOs[i].productForm);
			$("#selPacking").val(objProduct.ltProductDTOs[i].productPacking);
			$("#selUOM").val(objProduct.ltProductDTOs[i].productUOM);
			$("#selShelf").val(objProduct.ltProductDTOs[i].productShelf);
			$("#selSupplier").val(objProduct.ltProductDTOs[i].productVendor);
			$("#selIngredient").val(
					objProduct.ltProductDTOs[i].productIngredient);
			$("#selCategory").val(objProduct.ltProductDTOs[i].productCategory);
			$("#txtQty").val(objProduct.ltProductDTOs[i].uomDTO.qty);
			$("#txtSubQty").val(objProduct.ltProductDTOs[i].uomDTO.sub_qty);
			var uom_id = $("#uom_id").val(
					objProduct.ltProductDTOs[i].uomDTO.uom_id);
			var qty = $("#qty").val(objProduct.ltProductDTOs[i].uomDTO.qty);
			var sub_qty = $("#sub_qty").val(
					objProduct.ltProductDTOs[i].uomDTO.sub_qty);
			if (objProduct.ltProductDTOs[i].addbatch == "1") {
				$('input:checkbox[name=rbaddbatch]').attr("checked", "checked");

			} else {
				$('input:checkbox[name=rbaddbatch]').removeAttr('checked');

			}
		}
	}
}

function deleteProductDetail(productid) {
	var didConfirm = confirm("Are you sure?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteProductDetails');
		inputs.push('productid=' + productid);
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
				alert(r);
				fetchProductDetailNew();
			}
		});
	}
}

/**
 * ************************************Trolley Master
 * List****************************************************
 */
function fetchTrolleyList() {
	var inputs = [];
	inputs.push('action=fetchTrolleyReqList');
	inputs.push('isEdit=no');
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
			pobj1 = eval('(' + r + ')');
			count = 1;
			$("#trolleyContent").setTemplate(trolleyListReqInventoryTemp);
			$("#trolleyContent").processTemplate(pobj1);
			$("#trolleyAjaxResp").html(r);
		}
	});
}
function fetchTrolleyListById(trolleyid) {
	var inputs = [];
	inputs.push('action=fetchTrolleyReqList');
	inputs.push('isEdit=yes');
	inputs.push('trolleyid=' + trolleyid);
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
			pobj1 = eval('(' + r + ')');
			if (pobj1.ltTrolleyDTOs.length > 0) {
				$("#trolleyContent").setTemplate(trolleyListReqInventoryTemp);
				$("#trolleyContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchTrolleyList();
			}
			$("#byName").val("");
		}
	});
}

function fetchAllTrolleyListById(trolleyid) {
	var inputs = [];
	inputs.push('action=fetchTrolleyReqList');
	inputs.push('isEdit=yes');
	inputs.push('trolleyid=' + trolleyid);
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
			pobj1 = eval('(' + r + ')');
			count = 1;
			if (pobj1.ltTrolleyDTOs.length > 0) {
				$("#trolleyContent")
						.setTemplate(trolleyAllListReqInventoryTemp);
				$("#trolleyContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchAllTrolley();
			}
			$("#byName").val("");
		}
	});
}

function showTrolleyById(trolleyid) {
	var inputs = [];
	inputs.push('action=fetchTrolleyReqList');
	inputs.push('isEdit=yes');
	inputs.push('trolleyid=' + trolleyid);
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
			pobj1 = eval('(' + r + ')');
			$("#trolleyInfo").setTemplate(trolleyInfo);
			$("#trolleyInfo").processTemplate(pobj1);
		}
	});
}
function showTrolleyByIdnew(trolleyid) {
	var inputs = [];
	inputs.push('action=fetchTrolleyReqList');
	inputs.push('isEdit=no');
	inputs.push('trolleyid=' + trolleyid);
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

			pobj1 = eval('(' + r + ')');
			$("#trolleyInfo").setTemplate(trolleyInfo);
			$("#trolleyInfo").processTemplate(pobj1);
		}
	});
}

function saveUomService() {

	if ($("#txtQty") == "") {
		alert("Quantity field cannot be blank..!");
		return false;
	} else if ($("#txtQty") == "") {
		alert("Quantity field cannot be blank..!(leave it 1)");
		return false;
	}
	var selUOM = $("#selUOM").val();
	var txtQty = $("#txtQty").val();
	var txtSubQty = $("#txtSubQty").val();

	var uom_id = $("#uom_id").val(selUOM);
	var qty = $("#qty").val(txtQty);
	var sub_qty = $("#sub_qty").val(txtSubQty);

	$("#myform").hide(400);
}

function toCreateChkDivRequirement(RowCount) {

	rowCount = RowCount;
	rowCount++;
	divId = "div" + rowCount;
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');

	document.getElementById("container").appendChild(x);

	document.getElementById(divId).innerHTML = '<div  style="width: 100%; height: 28px; border-bottom: 1px solid #069;"> <div style="width: 6.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ rowCount
			+ '</div>  <div style="width:12.5%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input readonly="readonly" style="width:90%; border: 0.2px solid; border-color: #069; padding:0;" type="text" onkeypress="" id="txtProductCode'
			+ rowCount
			+ '" value="" /> </div><div style="width: 15%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%;"> <input type="text" name="" style="width:90%; border: 0.2px solid; border-color: #069; padding:0;" onchange="setSplitDataReq('
			+ rowCount
			+ ')" class="auto" id="productName'
			+ rowCount
			+ '" value="" >  </div>    <div style="width:11%; text-align: right; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input style="width:90%; text-align: right; border: 0.2px solid; border-color: #069; padding-right:2%;" type="text" onkeypress="" id="txtRequiredQnt'
			+ rowCount
			+ '" value="" /> </div>  <div style="width:11%; text-align: right; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input readonly="readonly" style="width:90%; text-align: right; border: 0.2px solid; border-color: #069; padding-right:2%;" type="text" onkeypress="" id="minQnt'
			+ rowCount
			+ '" value="" /> </div>   <div style="width:13%; text-align: right; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input readonly="readonly" style="width:90%; text-align: right; border: 0.2px solid; border-color: #069; padding-right:2%;" type="text" onkeypress="" id="inHandQnt'
			+ rowCount
			+ '" value="" /></div> <div style="width:13%; text-align: left; height: 25px; border-right: 1px solid #069; padding-left: %;">  <input type="checkbox"  style="width:90%; border: 0.2px solid; border-color: #069; padding:0;" value="" name="checkbox'
			+ rowCount
			+ '" id="checkbox'
			+ rowCount
			+ '"/></div><input type="hidden" id="productId'
			+ rowCount
			+ '" /> </div>';

	$(".auto").autocomplete(
			"AutoSuggetionServlet?auto=productNameForTrolley&trolleyid="
					+ $('#divTrolleyId').html());
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(w);
	w++;
}

function setSplitDataReq(rowCount) {

	setTimeout(function() {
		var name = $("#productName" + rowCount).val();
		var arr = name.split("_");
		$("#productName" + rowCount).val(arr[0]);
		$("#txtProductCode" + rowCount).val(arr[1]);
		$("#minQnt" + rowCount).val(arr[2]);
		$("#inHandQnt" + rowCount).val(arr[3]);

	}, 500);
}

function setAutoGeneratedRequirement(trolleyid) {
	// alert(trolleyid);
	var inputs = [];
	inputs.push('action=generateRequirementByTrolleyId');
	inputs.push('isEdit=yes');

	inputs.push('trolleyid=' + trolleyid);

	var str = inputs.join('&');
	jQuery
			.ajax({
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
					pobj1 = eval('(' + r + ')');
					for ( var i = 0; i < pobj1.ltRequirementDTOs.length; i++) {
						rowCount = i;
						rowCount++;
						divId = "div" + rowCount;
						var x = document.createElement('div');
						x.setAttribute('id', divId);
						x
								.setAttribute('style',
										'width: 100%; height: 28px; border-bottom: 1px solid #069;');

						document.getElementById("container").appendChild(x);

						document.getElementById(divId).innerHTML = '<div  style="width: 100%; height: 28px; border-bottom: 1px solid #069;"> <div style="width: 6.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
								+ rowCount
								+ '</div>  <div style="width:12.5%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input readonly="readonly" style="width:90%; border: 0.2px solid; border-color: #069; padding:0;" type="text" onkeypress="" id="txtProductCode'
								+ rowCount
								+ '" value="'
								+ pobj1.ltRequirementDTOs[i].reqProductId
								+ '" /> </div><div style="width: 15%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%; "> <input readonly="readonly" type="text" name="" style="width:90%; border: 0.2px solid; border-color: #069; padding:0;" onchange="" class="auto" id="productName'
								+ rowCount
								+ '" value="'
								+ pobj1.ltRequirementDTOs[i].reqProductName
								+ '" >  </div>    <div style="width:11%; text-align: right; height: 25px; border-right: 1px solid #069; padding-left: %;"> <input style="width:90%; text-align: right; border: 0.2px solid; border-color: #069; padding-right:2%;" type="text" onkeypress="" id="txtRequiredQnt'
								+ rowCount
								+ '" value="'
								+ (pobj1.ltRequirementDTOs[i].reqMinQnt > pobj1.ltRequirementDTOs[i].reqQntInHand ? pobj1.ltRequirementDTOs[i].reqMinQnt
										- pobj1.ltRequirementDTOs[i].reqQntInHand
										: 0)
								+ '" /> </div>  <div style="width:11%; text-align: right; height: 25px; border-right: 1px solid #069; padding-left: %;"> <input readonly="readonly" style="width:90%; text-align: right; border: 0.2px solid; border-color: #069; padding-right:2%;" type="text" onkeypress="" id="minQnt'
								+ rowCount
								+ '" value="'
								+ pobj1.ltRequirementDTOs[i].reqMinQnt
								+ '" /> </div>   <div style="width:13%; text-align: right; height: 25px; border-right: 1px solid #069; padding-left: %;"> <input readonly="readonly" style="width:90%; text-align: right; border: 0.2px solid; border-color: #069; padding-right:2%;" type="text" onkeypress="" id="inHandQnt'
								+ rowCount
								+ '" value="'
								+ (pobj1.ltRequirementDTOs[i].reqQntInHand)
								+ '" /></div> <div style="width:13%; text-align: left; height: 25px; border-right: 1px solid #069; padding-left: %;">  <input type="checkbox"  style="width:95%; border: 0.2px solid; border-color: #069; padding:0;" value="" name="checkbox'
								+ rowCount
								+ '" id="checkbox'
								+ rowCount
								+ '"/></div><input type="hidden" id="productId'
								+ rowCount + '" /> </div>';
						$(".auto").autocomplete(
								"AutoSuggetionServlet?auto=productName");
						$("#RowCount").val(rowCount);
						$("#addRowCount").val(w);
						w++;
					}

				}
			});
}

function setAutoGeneratedRequirementnew(trolleyid) {
	// alert(trolleyid);
	var inputs = [];
	inputs.push('action=generateRequirementByTrolleyId');
	inputs.push('isEdit=no');

	inputs.push('trolleyid=' + trolleyid);

	var str = inputs.join('&');
	jQuery
			.ajax({
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
					pobj1 = eval('(' + r + ')');
					for ( var i = 0; i < pobj1.ltRequirementDTOs.length; i++) {
						rowCount = i;
						rowCount++;
						divId = "div" + rowCount;
						var x = document.createElement('div');
						x.setAttribute('id', divId);
						x
								.setAttribute('style',
										'width: 100%; height: 28px; border-bottom: 1px solid #069;');

						document.getElementById("container").appendChild(x);

						document.getElementById(divId).innerHTML = '<div  style="width: 100%; height: 28px; border-bottom: 1px solid #069;"> <div style="width: 6.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
								+ rowCount
								+ '</div>  <div style="width:12.5%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; "> '
								+ pobj1.ltRequirementDTOs[i].reqProductId
								+ ' </div><div style="width: 15%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%; "> '
								+ pobj1.ltRequirementDTOs[i].reqProductName
								+ '  </div> <div style="width:11%; text-align: right; height: 25px; border-right: 1px solid #069; padding-left: %;"> '
								+ pobj1.ltRequirementDTOs[i].reqMinQnt
								+ ' </div>   <div style="width:13%; text-align: right; height: 25px; border-right: 1px solid #069; padding-left: %;">'
								+ (pobj1.ltRequirementDTOs[i].reqQntInHand)
								+ '</div>  <input type="hidden" id="productId'
								+ rowCount + '" /> </div>';

						$("#RowCount").val(rowCount);
						$("#addRowCount").val(w);
						w++;
					}

				}
			});
}

/**
 * ***************************Stock
 * Card**********************************************
 */

function getNextRequirementId() {
	var inputs = [];
	inputs.push('action=getRequirementNextId');
	inputs.push('tableName=inv_requirement');
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
			ajaxResponse = r;
			$("#txtRequirementId").val(r);
		}
	});
}

/**
 * * *************************Stock
 * Card**********************************************
 */

function fetchStockCard() {
	var searchBy = null;
	var value = null;

	var inputs = [];
	inputs.push('action=fetchStockCard');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + value);

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
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');

			if (pobj.ltStockCardDTOs.length > 0) {
				$("#cathTrolley").setTemplate(defaultStockCardTemp);
				$("#cathTrolley").processTemplate(pobj);
				highlightRow(pobj);
			} else {
				alert("Item Not Found");
			}
		}
	});
}

function fetchStockCardByIdOrName() {
	var byName = $("#byName").val();
	var byId = $("#byId").val();

	var searchBy = null;
	var value = null;
	if (byName != "" && byId != "") {
		alert("Please Search Either By Item Id OR Item Name!");
		SetFocus("byName");
		return false;
	} else if (byName == "" && byId == "") {
		alert("please insert something for search");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=fetchStockCard');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + value);

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
				ajaxResponse = r;
				// alert(ajaxResponse);
				pobj = eval('(' + ajaxResponse + ')');

				if (pobj.ltStockCardDTOs.length > 0) {
					$("#cathTrolley").setTemplate(defaultStockCardTemp);
					$("#cathTrolley").processTemplate(pobj);
					highlightRow(pobj);
				} else {
					alert("Item Not Found");
				}

				$('#byName').val("");
				$('#byId').val("");
			}
		});
	}
}

function highlightRow(pobj) {
	for ( var i = 0; i < pobj.ltStockCardDTOs.length; i++) {
		var qntInhand = parseInt($(
				'#divQntInHand' + pobj.ltStockCardDTOs[i].stockProductId)
				.html());
		var qntMinQnt = parseInt($(
				'#divMinQnt' + pobj.ltStockCardDTOs[i].stockProductId).html());
		if (qntInhand < qntMinQnt) {
			document.getElementById("divSrl"
					+ pobj.ltStockCardDTOs[i].stockProductId).style.background = "#CCFF33";
			document.getElementById("divProdId"
					+ pobj.ltStockCardDTOs[i].stockProductId).style.background = "#CCFF33";
			document.getElementById("divProdName"
					+ pobj.ltStockCardDTOs[i].stockProductId).style.background = "#CCFF33";
			document.getElementById("divQntInHand"
					+ pobj.ltStockCardDTOs[i].stockProductId).style.background = "#CCFF33";
			document.getElementById("divMinQnt"
					+ pobj.ltStockCardDTOs[i].stockProductId).style.background = "#CCFF33";
			document.getElementById("divQntOnOrder"
					+ pobj.ltStockCardDTOs[i].stockProductId).style.background = "#CCFF33";
			document.getElementById("divQntOrderLevel"
					+ pobj.ltStockCardDTOs[i].stockProductId).style.background = "#CCFF33";
			// document.getElementById("divIndQnt"
			// + pobj.ltStockCardDTOs[i].stockProductId).style.background =
			// "#CCFF33";
		}
	}
}

function saveRequirementDetail(RowCount) {
	var inputs = [];
	var txtProductCode = new Array();

	var txtRequiredQnt = new Array();

	for ( var i = 0; i < RowCount; i++) {
		var temp = $('#txtProductCode' + (i + 1)).val();
		var temp1 = $('#txtRequiredQnt' + (i + 1)).val();

		txtProductCode.push(temp);
		txtRequiredQnt.push(temp1);
	}

	var txtRequirementId = $('#txtRequirementId').val();
	var txtRequirementRemark = $('#txtRequirementRemark').val();
	var txtTrolleyId = $('#divTrolleyId').html();

	var txtDatePick = $('#date-pick').val();

	inputs.push('action=saveReqMaster');
	inputs.push('txtProductCode=' + txtProductCode);
	inputs.push('txtRequiredQnt=' + txtRequiredQnt);
	inputs.push('txtRequirementId=' + txtRequirementId);
	inputs.push('txtRequirementRemark=' + txtRequirementRemark);
	inputs.push('txtTrolleyId=' + txtTrolleyId);
	inputs.push('txtDatePick=' + txtDatePick);

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
			ajaxResponse = r;
			alert(r);
			window.location.replace("TrolleyRequirementMaster.jsp");
		}
	});
}
// container
/** ******************************************************************************** */

function fetchAllTrolley() {
	var inputs = [];
	inputs.push('action=fetchTrolleyReqList');
	inputs.push('isEdit=no');
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

			pobj1 = eval('(' + r + ')');
			count = 1;
			$("#trolleyContent").setTemplate(trolleyAllListReqInventoryTemp);
			$("#trolleyContent").processTemplate(pobj1);
			$("#trolleyAjaxResp").html(r);
		}
	});
}

function getRequirement() {

	var inputs = [];
	inputs.push('action=getReqComList');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('trolleyId=' + $("#trolley").val());
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
			ajaxResponse = r;
			count = 1;
			listPoComp = eval('(' + ajaxResponse + ')');
			$("#RowCount").val(listPoComp.liGinComp.length);
			$("#ginDiv").setTemplate(GINGRNComTemp);
			$("#ginDiv").processTemplate(listPoComp);
		}
	});

}

/**********************************on cancel reset form fileds to all administraion pages****************************************/


















