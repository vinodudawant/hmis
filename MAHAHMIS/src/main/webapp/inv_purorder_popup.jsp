<!-- <script type="text/javascript">
	onload = function() {
		/*********************new date picker added*********************************************/
		new JsDatePick({
			useMode:2,
			target:"txtPurOrderDate",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange:[1920,2099],
			limitToToday:false,
			/* cellColorScheme:"beige", */
			dateFormat:"%d/%m/%Y",
			imgPath:"../img/",
			weekStartDay:1,
		});
		
		new JsDatePick({
			useMode:2,
			target:"txtMulPODeliDate",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange:[1920,2099],
			limitToToday:false,
			/* cellColorScheme:"beige", */
			dateFormat:"%d/%m/%Y",
			imgPath:"../img/",
			weekStartDay:1,
		});
		
		
	}
</script> -->
<script type="text/javascript">
/********************** multipletaxCalculation Author sudhir Date:11/1/2016 for Purchase Order *****************/
function multaxCalMulPO(id ,rowCount)
{
	var txtPurchaseQuotationTaxCode_ = "";
	$('#txtPurchaseQuotationTaxCodePO_'+ rowCount).find('option').each(function() {
		txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
	});
	//alert(txtPurchaseQuotationTaxCode_);
	$("#hiddenCount").val(rowCount);
	$("#lstBoxforTaxMUlPO").html(" ");
	
	var Finalrateandtax = txtPurchaseQuotationTaxCode_.split(",");
	var finalrat;
	for(var i=0;i<Finalrateandtax.length;i++)
		{ 
		finalrat = Finalrateandtax[i];
		//var fk = Finalrateandtax.split(",");
		var option = "";
		option = option
			+ "<option value="
			+ finalrat
			+ ">"
			+ finalrat
			+ "</option>";
	$("#lstBoxforTaxMUlPO").append(option);
		}
	$("#ApplyTaxforItemMUlPO").show('show');
	
}
</script>
 
<!--  <div class="box border"  id="purchaseOrdrDiv"
	style="margin-top: -59%; margin-bottom: -3px; width: 100%; display: none;">
	<div class="box-title"
		style="background-color: #a696ce; z-index: 60009 !important; padding: 7px 1px 1px;">
		<h4>
			<i class="fa fa-bitbucket"></i>Purchase Order
		</h4>
		<div class="tools">
			<a href="javascript:;" style="color: black;" class="col-md-12-1"
				onclick="hidePoDiv()"> <i class="fa fa-times"></i>
			</a>
		</div>
		<div class="box-body border" id='well' style="height: 207px;">

			<div class="col-md-12-1" style="margin-top: -31px;">
				<div class="col-md-7-1" style="margin-top: 9px;">

					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-2" style="margin-top: 9px;">
							<b>Po No</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px;">
							<input type="text" id="txtOrderNo1" name="txtOrderNo1" readonly
								class="form-control input-SmallText" placeholder="Po Number"
								tabindex="1">
						</div>
					</div>

					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2" style="margin-top: 9px;">
							<b>Item Name</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px;"id="divtxtPoProductName">
							<input type="text" id="txtPoProductName" name="txtPoProductName"
								class="form-control input-SmallText typeaheadPoProduct"
								placeholder="Product Name" onblur=""
								onkeypress="autoforPo(this.id,onchange)">
							<input type="hidden" id="hiddenProductID" value="0" />
							<div class='col-md-1-1 center'
								style='margin-top: -25px; margin-left: 128px; color: red;'>
								<b> *</b>
							</div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2" style="margin-top: 9px;">
							<b>Unit</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px;">
							<input type="text" id="textUnit" name="textUnit" 
								tabindex="1" class="form-control input-SmallText"
								placeholder="unit">
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2-1" style="margin-top: 9px;">
							<b>Company</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px;">
							<input type="text" id="textCompany" name="textCompany" readonly
								tabindex="1" class="form-control input-SmallText"
								placeholder="Company">
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2" style="margin-top: 9px;">
							<b>Vendor Name</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px; margin-left: 0%;">
							<input type="text" id="textPartyName" name="textPartyName"
								tabindex="1"
								class="form-control input-SmallText typeaheadPoVendor"
								placeholder="Vendor Name" onblur=" "
								onkeypress=" "> <input
								type="hidden" id="hiddenVendorID" value="0" />
							<div class='col-md-1-1 center'
								style='margin-top: -25px; margin-left: 128px; color: red;'>
								<b> *</b>
							</div>

						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2" style="margin-top: 9px;">
							<b>Address</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px; margin-left: 0%;">
							<input type="text" id="textAddress" name="textAddress"
								tabindex="1" readonly class="form-control input-SmallText"
								placeholder="Address">
						</div>
					</div>

				</div>

				<div class="col-md-3-1" style="margin-top: 4px;">
					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-5" style="margin-top: 9px;">
							<b>Order Qty</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px; margin-left: 0%;">
							<input type="text" id="textOrderNo" name="textOrderNo"
								tabindex="1" class="form-control input-SmallText"
								onblur="isNumber('textOrderNo',0,20) ;"
								placeholder="Order Qty">
							<div class='col-md-1-1 center'
								style='margin-top: -25px; margin-left: 111px; color: red;'>
								<b> *</b>
							</div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-4-1" style="margin-top: 9px;">
							<b>Stock Qty</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px;">
							<input type="text" id="textStockQty" name="textStockQty"
								tabindex="1" class="form-control input-SmallText"
								placeholder="Stock Qty">
							<div id="textStockQty"></div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-4-1" style="margin-top: 9px;">
							<b>Min Level</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px;">
							<input type="text" id="textMin" name="textMin"
								class="form-control input-SmallText" placeholder="Min Level">
							<div id="textMin"></div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-4-1" style="margin-top: 9px;">
							<b>Vat</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px;">
							<input type="text" id="textVat" name="textVat"
								class="form-control input-SmallText" placeholder="Vat">
							<div id="textVat"></div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-5" style="margin-top: 9px;">
							<b>Phone No</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px;">
							<input type="text" id="textPhoneNo" name="textPhoneNo"
								tabindex="1" class="form-control input-SmallText"
								placeholder="Phone No">
							<div id="textPhoneNo"></div>
						</div>
					</div>

				</div>
				<div class="col-md-1-1"
					style="margin-top: 187px; margin-left: -80px">
					<button class="btn btn-xs btn-danger" onclick=""
						type="button" id="clearBtn">Clear</button>
				</div>
				<div class="col-md-1-1"
					style="margin-top: 187px; margin-left: -154px">
					<button class="btn btn-xs btn-success"
						onblur=" " onclick=""
						type="button" id="saveButton">Save</button>
				</div>
			</div>
		</div>
	</div>
</div> -->





					
					<!-- **** 
					@Code   : Genrate Purchase Order When Stock goes below Re-Order Level
					@Author : @Sudhir jadhav 
					@Date   : 16Feb2016  
					******  -->

	<div id="MulPOForm" class="modal fade in" tabindex="-1">
		<div class="modal-dialog" style="width: 100%;">
			<div class="modal-content" class="col-md-12">
				<div class="modal-header">
					<div class="box-title">
						<!-- <h4> -->
							<i class="fa fa-calendar"></i><font size="3" color="red"> Multiple Purchase Order</font>
							<a href=""  style="margin-left: 950px;color: gray;" style="visibility: hidden;" id="closeMulPO" title="Close" onclick="hidePoDiv()" ><font size="3" color="red"> X</font></a>
							<div class="form-group pull-right" id="iHideMulPO" style="display:none;">
							<button type="button" class="btn btn-primary"
								onclick="saveMulPO()">Save</button>
							<button type="button" class="btn btn-default"
								data-dismiss="modal" onclick="refresh()">Close</button>
					<!-- onclick="javascript:window.location.reload()"  data-dismiss="modal" -->
						</div>
							<!-- <a href="" data-dismiss="modal" style="margin-left: 1000px;color: gray;" title="Close" onclick="javascript:window.location.reload()">X</a> -->
						<!-- </h4> -->
					</div>
				</div>
				<div class="modal-body">

					<div class="row">

						<form class="form-horizontal col-md-4" role="form">
							<!-- <div class="form-group">
								<label for="firstname" class="col-sm-3">Order Id</label>
								<div class="col-sm-7">
									<input type="text" class="form-control input-SmallText"
										required="true" name="txtPurchaseOrderDocNoPRl"
										id="txtPurchaseOrderDocNoPRl" placeholder="Doc No"
										style="margin-left: 4px;" readonly />
								</div>
							</div> -->
							
							 <div class="form-group">
								<label for="lastname TextFont" class="col-sm-3"> Order 
									Date<b style="color: red;">*</b></label>
								<div class="col-sm-7">
									 
									<input id='txtPurOrderDate' name='dob' type='date'
										placeholder="Date" class='form-control input-SmallText'
										style="margin-left: 4px;" readonly    />
								</div>
							</div>
							
							  <!-- <div class="form-group" id ="divtxtPurchaseQuotationList">
												<label for="lastname" class="col-sm-4">Get Quotation</label>
										<div class="col-sm-7">
										<select class="form-control input-SmallText" style="margin-left: -31px;"
												id="txtPurchaseQuotationList" onchange="viewPurchaseMasterDetails(this.value)">
												<option value="0">Select Quotation</option>
											</select> 
											 	</div>
									</div> -->
							 
							<!-- <div class="form-group">
								<label for="lastname" class="col-sm-3 ">Supplier Name<b style="color: red;">*</b></label>
								<div class="col-sm-7" id="divtxtPurchaseOrderSupplierName">
								<input type="hidden" value="" id="txtVendorCode" /> <input
									type="text" required="true" style="margin-left: 4px;"
									onkeypress="setVendorNamesPO(this.id, 'onchange');"
									id="txtPurchaseOrderSupplierName"
									class="typeahead form-control input-SmallText"
									name="txtPurchaseOrderSupplierName"
									onkeypress="return validateOnlyName(event);" placeholder="Supplier Name " />

							</div>
					</div> -->
					</form>
					
					<form class="form-horizontal col-md-4" role="form">
					<!-- <div class="form-group">
								<label for="firstname" class="col-sm-4 ">Mobile No<b style="color: red;">*</b></label>
								<div class="col-sm-7">
									<input type="text" class="form-control input-SmallText" maxlength="10"
										required="true" name="firstName" id="txtPurchaseOrderMobileNo"
										onkeypress="return validateNumbers(event);" placeholder="Mobile No" style="margin-left:-18px;" />
								</div>
							</div> -->
					
					
						<!-- <div class="form-group">
						 	<label for="firstname" class="col-sm-4 ">Order Series<b style="color: red;">*</b></label>
							<div class="col-sm-7">
								<select class="form-control input-SmallText" id="selDocNamePO"
									style="width: 60px; margin-left: -19px;"
									onchange="getSeriesPO(this.value)">
									<option value="0">Select</option>
								</select> <input type="text" class="form-control input-SmallText"
									name="	" id="txtPurchaseOrderDocSeries"
									placeholder="Order Series "
									style="margin-left: -18px; margin-left: 46px; margin-top: -20px; width: 140px;"
									 />
							</div>
						</div> -->
						<!-- <div class="form-group">
							<label for="firstname" class="col-sm-4 ">Reference No<b style="color: red;">*</b></label>
							<div class="col-sm-5">
								<input type="text" class="form-control input-SmallText"
									required="true" name="txtPurchaseOrderReferenceNo"
									id="txtPurchaseOrderReferenceNo"
									placeholder="Purchase Order ReferenceNo" style="margin-left: -18px;" />
							</div>
						</div> -->


					                          <!-- <div class="form-group" id ="divtxtPurchaseQuotationList">
												<label for="lastname" class="col-sm-4">Get Quotation<b style="color: red;">*</b></label>
												<div class="col-sm-7">
												<select class="form-control input-SmallText"
														id="txtPurchaseQuotationList" onchange="viewPurchaseMasterDetails(this.value)" style="width: 160px; margin-left: -19px;">
														<option value="0">Select Quotation</option>
													</select> 
													<input type="text" class="form-control input-SmallText"
														name="txtPurchaseQuotationReferenceNo"
														id="txtPurchaseQuotationReferenceNo"
														placeholder="Reference No" Style="margin-left: -18px;"></input>
												</div>
											</div> -->

						<!-- <div class="form-group">
							<label for="lastname" class="col-sm-4">Get Quotation</label>
							<div class="col-sm-7">
								<select class="form-control input-SmallText"
									id="selPurchaseQuotationList"
									onchange="viewPurchaseMasterDetails(this.value)"
									style="width: 160px; margin-left: -19px;">
									<option value="-1">Select Quotation</option>
								</select>
								<input type="text" class="form-control input-SmallText"
														name="txtPurchaseQuotationReferenceNo"
														id="txtPurchaseQuotationReferenceNo"
														placeholder="Reference No" Style="margin-left: -18px;"></input>
											
							</div>
						</div> -->

						<!-- <div class="form-group">
							<label for="firstname" class="col-sm-4"> Narration <b style="color: red;">*</b></label>
							<div class="col-sm-7">
								<textarea type="text" class="form-control" required="true"
									style="width: 205px; height: 30px; margin-left: -18px;"
									  id="txtNarration" placeholder="Narration"></textarea>
							</div>
						</div> -->
				</form>
				
				<form class="form-horizontal col-md-4" role="form">
						<!-- <div class="form-group">
							<label class="col-sm-4">Order status<b style="color: red;">*</b></label>
							<div class="col-sm-4">
								<select class="form-control input-SmallText TextFont"
									id="sclPurchaseOrderDocstatus" Style="margin-left: -18px;">
									<option value="0">Select</option>
									<option value="Open">Open</option>
									<option value="Closed">Closed</option>
									<option value="Hold">Hold</option>
									<option value="Cancelled">Cancelled</option>
								</select>
							</div>
						</div> -->
						
						<div class="form-group">
								<label for="lastname TextFont" class="col-sm-4"> Delivery Date 
								 <b style="color: red;"></b></label>
								<div class="col-sm-5">
									 
									<input id='txtMulPODeliDate' name='txtMulPODeliDate' type='date'
										placeholder="Date" class='form-group'
										style="margin-left: -18px;" readonly />
								</div>
							</div>

					</form>
				</div>

				<div class="col-md-12">
					<form class="form-horizontal  col-md-12-1" method="get">

						<div class="divide-100" style="height: 0px;"></div>

						<div style="margin-top: -5px; margin-left: 2px;"
							class="col-md-12-1">
							<!-- BOX -->

							<div class="box border col-md-12-1" style="margin-top:12px;">

								<div class="tabbable col-md-12-1">
									<ul class="nav nav-tabs">

										<li class="active"><a data-toggle="tab" href="#ItemInfoPO"><i
												class="fa fa-user"></i> <span class="hidden-inline-mobile">Item
													Info(F2)</span></a></li>
									<!-- 	<li><a data-toggle="tab" href="#ContactInfoPO"><i
												class="fa fa-home"></i> <span class="hidden-inline-mobile">Contact
													Info(F4)</span></a></li>
										<li><a	data-toggle="tab" href="#AddressInfoPO"><i
												class="fa fa-home"></i> <span class="hidden-inline-mobile">Address
													Info(F5)</span></a></li>
										<li><a	data-toggle="tab" href="#OtherInfoPO"><i class="fa fa-user"></i>
									                <span class="hidden-inline-mobile">Other
										Info(F11)</span></a></li> -->

										<!-- <li><a data-toggle="tab" href="#TermsandConditionsPO"><i
												class="fa fa-user"></i> <span class="hidden-inline-mobile"> Payment Terms
													& Condition(F6)</span></a></li> -->
								  <div class="li pull-right">
								<!-- <button onclick="toCreateDivMulPO()" class="btn btn-xs btn-success" type='button' id="btnAddNew" value="+">+</button> -->
																<button type="button" onclick="toRemoveDivStockPO('RowCount')"style="margin: 7px;" class="btn btn-xs btn-danger"
																value="_"  data-toggle="tooltip" data-placement="left" title="" data-original-title="Remove Row" id="removeBtn">-</button>
																</div>	
								
									</ul>
									<div class="divide-10"></div>
									<div class="divide-10"></div>
									<div class="divide-10"></div>
									<form>
										<div class="tab-content col-md-12-1">
											<div id="ItemInfoPO" class="tab-pane fade in active "
												style="overflow-x: auto;">

												<div class="panel-body col-md-12-1">
													<div style="padding-left: 0px;" class="col-sm-12-1">
														<div style="height: auto; margin-left: 1%;">

															<!-- <div class="form-group  col-md-2-1"
																style="margin-right: 1%; margin-left: 1%; text-align: left;" >

																<label class="TextFont">Total item Quantity</label> <input
																	type="text" id="txtPurchaseOrderTotalDocQty"
																	name="txtPurchaseOrderTotalDocQty"
																	placeholder="Total item Quantity "
																	readonly="readonly" class="form-control input-SmallText" />

															</div> -->

															<!-- <div class="form-group  col-md-2-1"
																style="margin-right: 1%; margin-left: 1%; text-align: left;">

																<label class="TextFont">Total item Discount</label> <input
																	type="text" id="txtPurchaseOrderTotalDocDiscount"
																	name="txtPurchaseOrderTotalDocDiscount"
																	placeholder="Total item Discount "
																	readonly="readonly" class="form-control input-SmallText" />

															</div> -->

															<!-- <div class="form-group  col-md-2-1"
																style="margin-right: 1%; margin-left: 1%; text-align: left;">

																<label class="TextFont">Amount in local currency</label>
																<input type="text"
																	id="txtPurchaseOrderAmountinlocalcurrency"
																	name="txtPurchaseOrderAmountinlocalcurrency"
																	placeholder="Amount in local currency "
																	readonly="readonly" class="form-control input-SmallText" readonly />

															</div> -->
															
															
														<!-- 	<div class="form-group  col-md-2-1" id="divtxtPurchaseOrderRequestNo"
																				style="margin-right: 1%; margin-left: 1%;text-align: left;">

																					<label for="lastname" class="TextFont">Purchase
																		 request No  </label><input type="text"
																		id="txtPurchaseOrderRequestNo"
																		name="txtPurchaseOrderRequestNo"  
																		placeholder="Request No "
																		class ="form-control input-SmallText" readonly   />

																				</div> -->
																				
																				
																	<!-- <div class="form-group  col-md-2-1" id="divtxtPurchaseOrderQuatationNo"
																				style="margin-right: 1%; margin-left: 1%;text-align: left;">

																					<label for="lastname" class="TextFont">Purchase
																		 Quotation No  </label><input type="text"
																		id="txtPurchaseOrderQuatationNo"
																		name="txtPurchaseOrderQuatationNo"  
																		placeholder="Purchase Quotation No"
																		class ="form-control input-SmallText"  readonly />

																				</div>	 -->		

															<div
																style='width: 100%;; font-weight: bold; height: 200Px;'>
																<!-- <div
																					style='width: 101%;; font-weight: bold; height: 200Px; border: 1px solid #436a9d;'> -->

																<!-- <button onclick="toCreateDivPO()"
																	class="btn btn-xs btn-success" type='button'
																	id="btnAddNew" value="+">+</button>
																<button type="button"
																	onclick="toRemoveDivStockPO('RowCount')"
																	style="margin: 7px;" class="btn btn-xs btn-success"
																	value="_" >-</button> -->

																<!-- <input type="button"
																						onclick="toCreateDivPO()"
																						class="btn btn-xs btn-success" value="+"
																						style="margin: 7px;" /> <input type="button"
																						onclick="toRemoveDivStockPO('RowCount')"
																						style="margin: 7px;"
																						class="btn btn-xs btn-success" value="-" /> -->


																<table id="ItemInfoTableMulPO" cellpadding="0"	cellspacing="0" border="1" class="table table-bordered table-striped table-condensed" >
																	<thead>
																		<tr>
																			<th class="col-md-2-2 center">Select</th>
																			<th class="col-md-2-2 center">Sr No.</th>
																			<th class="col-md-2-1 center">Item Name</th>
																			<th class="col-md-2-1 center">Supplier Name</th>

																			<th class="col-md-2-2 center">Item Quantity</th>
																			<th class="col-md-2-2 center">Unit Price</th>
																			<th class="col-md-2-2 center">Disc(%)</th>
																			<th class="col-md-2-2 center">Disc(Rs)</th>
																			<th class="col-md-2-2 center">Disc(Amt)</th>
																			<th class="col-md-2-2 center">Base Amount</th>
																			<th class="col-md-2 center">Tax Code</th>
																			<th class="col-md-2-2 center">Tax Amount(%)</th>
																			<th class="col-md-2-2 center">Tax Amount(Rs)</th>
																			<th class="col-md-2-2 center">Total Amount</th>
																			<th class="col-md-2-2 center">Factor 1</th>
																			<th class="col-md-2-2 center">Factor 2</th>
																			<th class="col-md-2-2 center">Factor 3</th>
																			<th class="col-md-2-2 center">Factor 4</th>

																			<th class="col-md-2-2 center">Ordered Quantity</th>
																			<th class="col-md-2-2 center">Pending Quantity</th>
																			<th class="col-md-4-2 center">Batch No</th>

																			<!-- <th class="col-md-4-2 center">Batch No</th> -->

																			<!-- <th class="col-md-4-2 center">WH COde</th>
																								<th class="col-md-4-2 center">Base Doc No</th> -->

																		</tr>
																	</thead>
																	<tbody id="ItemInfoTableMulPO"
																		style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																		
																	</tbody>
																</table>															
															</div>

															<!-- <div class="form-group  col-md-2-1"
																					style="margin-right: 1%; margin-left: 1%;">

																					<label class="TextFont">Total Doc Qty</label> <input
																						type="text" id="txtPurchaseQuotationTotalDocQty"
																						name="txtPurchaseQuotationTotalDocQty"
																						placeholder="Total Doc Qty "
																						class="form-control input-SmallText" />
-
																				</div>

																				<div class="form-group  col-md-2-1"
																					style="margin-right: 1%; margin-left: 1%;">

																					<label class="TextFont">Total Doc Discount</label>
																					<input type="text"
																						id="txtPurchaseQuotationTotalDocDiscount"
																						name="txtPurchaseQuotationTotalDocDiscount"
																						placeholder="Total Doc Discount "
																						class="form-control input-SmallText" />

																				</div>

																				<div class="form-group  col-md-2-1"
																					style="margin-right: 1%; margin-left: 1%;">

																					<label class="TextFont">Amount in local
																						currency</label> <input type="text"
																						id="txtPurchaseQuotationAmountinlocalcurrency"
																						name="txtPurchaseQuotationAmountinlocalcurrency"
																						placeholder="Amount in local currency "
																						class="form-control input-SmallText" readonly />

																				</div>
 -->


														</div>
													</div>


												</div>
											</div>
											
											<!-- /***** ***modalfor Applying Tax to particular Item Author :sudhir Date:11 jan 2016 *** modified date:24feb2016 **/ -->
						<div id="ApplyTaxforItemMUlPO" class="modal fade in" tabindex="-1">
							<div class="modal-dialog">
								<div class="modal-content col-md-7-1" style="margin-top: 50px;margin-left: 140px;">
									<div class="modal-header">
										<div class="box-title" style="margin-right:0%; margin-left:0%; margin-top:0px; text-align:left;">
											<h4>
												<i class="fa fa-calendar"></i>Apply Tax 
											</h4>
										</div>
									</div>
									<div class="modal-body">
											<table id="" cellpadding="0" cellspacing="0" border="1"
													class="table table-bordered table-striped table-condensed">
													<thead>
														<tr>
															<th><label class="TextFont">Add Tax<b style="color: red;"></b></label></th>
															<th><label class="TextFont">Select Tax<b style="color: red;">*</b></label></th>  
														</tr>
													</thead>
													<tbody id="">
														<tr>
														
															<td> 
															<div class="form-group  col-md-8-1" id=""
																						style="margin-right: 0%;margin-left: 0%;margin-top:0px;text-align: left;"> 
																<input type="text" id="txtNewTaxMulPO" name="txtNewTaxMulPO" placeholder="Tax Name" class="typeahead col-md-8-1 form-control input-SmallText" autocomplete="off"
																onkeypress="autotaxMulPo(this.id, 'onload');" style="margin-top:2px;" />
																 <!-- <input type="text" class ="form-control input-SmallText" /> -->
																 </div>
																</td>	
																
															<td> <div class="form-group  col-md-4-1"	style="margin-right: 1%; margin-left: 5%; margin-top:0px;">
															<img width="18" height="18" src="images/plus.jpg"
															onclick="addItemTaxNameMulPo()" style="margin-top:0px;"> <img width="18" height="18"
															src="images/minus.jpg" onclick="removeItemTaxMulPo()" style="margin-top:0px;" >
															</div>
															<select style='height: 160px; margin-top:2px;' class="col-md-12-1" name="selectboxMulPO"
															multiple="multiple" id='lstBoxforTaxMUlPO'>
															</select>  <input type="hidden" id="hiddenCountMulPO" value="0"/></td>									
		                                                  </tr>		
		                                               </tbody>
		                                                 
												</table>
									<div class="modal-footer" style="margin-left: -150px;">
								    	<div class="form-group col-md-9-1">
											 																
												<button type="button" class="btn btn-primary" onclick = "applyTaxMulPO()">Apply</button>
											<button type="button" class="btn btn-default"  onclick="hideTaxPoupMulPO()" id="closeBtn"  >Cancel</button>
											

										</div>
									</div>
							</div>
						</div>
					</div>
				</div>
	<!-- /***** End modal for Applying Tax to particular Item Author :sudhir Date:11 jan 2016 * modified date:24feb2016 *******/ -->
	
	
	
	<!-- /**** ** modal for Charges Tax on all items Author :sudhir Date:12jully2016 *******/ -->
						<!-- <div id="ApplyChargesforItemMul" class="modal fade in" tabindex="-1">
							<div class="modal-dialog">
								<div class="modal-content col-md-7" style="margin-top: 50px;margin-left: 140px;">
									<div class="modal-header">
										<div class="box-title" style="margin-right:0%; margin-left:0%; margin-top:0px; text-align:left;">
											<h4>
												<i class="fa fa-calendar"></i>Apply Charges 
											</h4>
										</div>
									</div>
									<div class="modal-body" >
											<table id="" cellpadding="0" cellspacing="0" border="1"
													class="table table-bordered table-striped table-condensed">
													<thead>
														<tr>
															<th><label class="TextFont">Select Charges <b style="color: red;"></b></label></th>
															<th><label class="TextFont">Add Charges<b style="color: red;">*</b></label></th>  
														</tr>
													</thead>
													<tbody id="">
														<tr>
														 
															<td style="width:20px;"> 
															<div class="form-group  col-md-7-1" id="" style="margin-right: 0%;margin-left: 0%;margin-top:0px;text-align: left;"> 
															
 
																 <input type="text" class ="form-control input-SmallText" />
																 <select class="form-control input-SmallText"	id="txtChargesList"
																				style="width: 160px; margin-left: 0px;">
																	<option value="0">Select</option>
														</select>
														</div>
														 
														 <input type="text" id="txtChargesAmt" name="txtChargesAmt" placeholder="Charges Amt" class="typeahead col-md-8-1 form-control input-SmallText" autocomplete="off"  style="margin-top:2px;" /> 
																</td>	
																
															<td> <div class="form-group  col-md-4-1"	style="margin-right: 1%; margin-left: 5%; margin-top:0px;">
															<img width="18" height="18" src="images/plus.jpg"
															onclick="addItemChargesName()" style="margin-top:0px;"> <img width="18" height="18"
															src="images/minus.jpg" onclick="removeItemCharges()" style="margin-top:0px;" >
															</div>
															<select style='height: 160px; margin-top:2px;' class="col-md-12-1" name="selectChargesbox"
															multiple="multiple" id='lstBoxforCharges'>
															</select>  <input type="hidden" id="hiddenCount" value="0"/> </td>									
		                                                  </tr>		
		                                               </tbody>
		                                                <input type="text" id="txtNewTax" name="txtNewTax" placeholder="Tax Name" class="typeahead form-control input-SmallText" autocomplete="off"
																onkeypress="autotaxCodeforItem(this.id, 'onchange');" style='margin-top:2px;' />
												</table>
									<div class="modal-footer" style="margin-left: -150px;">
								    	<div class="form-group col-md-9-1">
											<button type="" class="btn btn-primary"
												onclick="updateBatchStockQty()">Save</button>
												<input type="text" id="txtNewTax" name="txtNewTax" placeholder="Tax Name" class="typeahead form-control input-SmallText" autocomplete="off"
																onkeypress="autotaxCodeforItem(this.id, 'onchange');" style='margin-top:2px;' /> 
																
												<button type="button" class="btn btn-primary" onclick = "applyChargesforItem()">Apply</button>
											<button type="button" class="btn btn-default"  onclick="hideApplyChargespopaup()"  id="closeBtn"  >Cancel</button>
											

										</div>
									</div>
							</div>
						</div>
					</div>
				</div> -->
	<!-- /**** ** modal for Charges Tax on all items Author :sudhir Date:12jully2016 *******/ -->
	
	
	
	

                    <!-- NEW CODE ADDDED FOR ORDER FORM -->
<!-- 	               <div id="ContactInfoPO" class="tab-pane fade col-md-12-1">
						<div class="panel-body col-md-12-1">

							<div class="col-md-12-1">
								<div class="form-group  col-md-2-1"
									style="margin-right: 1%; margin-left: 1%;">
								 
									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">

										<label class="TextFont">Contact Person</label> <input
											type="text" placeholder="Contact Person"
											id="txtcontactpersonPO"
											maxlength="40" class="form-control input-SmallText"></input>

									</div>
									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">

										<label class="TextFont">Designation</label> <input
											type="text" id="txtdesignationPO"
											name="txtdesignationPO" placeholder="Designation"
											maxlength="40" class="form-control input-SmallText" />

									</div>
									<div class="form-group col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">
										<label for="exampleInputEmail1" class="TextFont">Address
										</label> <input type="text" id="txtcontaddressPO"
											name="txtcontaddressPO" placeholder="Address"
											maxlength="60" class="form-control input-SmallText" />
									</div>
									<div class="form-group col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">
										<label for="exampleInputEmail1" class="TextFont">Gender
										</label> <select id="txtgenderPO" name="txtgenderPO"
											placeholder="Gender"
											class="form-control input-SmallText">
											<option value="">select</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
										</select>
									</div>									
									<div class="form-group col-md-12-1"
										style="margin-right: 2%; margin-left: 2;">
										 <button class="btn btn-xs btn-primary "
										type='button' style="float: none;margin-right: 30px;"
										onclick="SavePartyMasterContactInfoDetailsPO()">Save</button>
									</div>
								</div>

								<div class="form-group  col-md-3-1"
									style="margin-right: 1%; margin-left: 1%;">
									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;margin-top:18px; text-align: left;">
										<label class="TextFont">Date
											Of Birth </label> <input type="text" id="txtdatePO" readonly="readonly"
											name="txtdatePO" placeholder="DOB"/>																				</div>
									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">

										<label class="TextFont">Phone 1</label> <input
											type="text" id="txtphone1PO" name="txtphone1PO" maxlength="10"
											placeholder="Phone 1"
											maxlength="12"  class="form-control input-SmallText" />

									</div>

									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">

										<label class="TextFont">Phone 2</label> <input
											type="text" id="txtphone2PO" name="txtphone2PO"
											placeholder="Phone 2"
											maxlength="12"   class="form-control input-SmallText" />

									</div>
									 

									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">

										<label class="TextFont">Email ID</label> <input
											type="text" id="txtemailPO" name="txtemailPO"
											placeholder="Email"
											maxlength="60"  class="form-control input-SmallText" />

									</div>
									<div class="form-group col-md-12-1"
										style="margin-right: 2%; margin-left: 2;">
										 <button class="btn btn-xs btn-default "
										type='button' style="float:left;margin-left: 30px"
										onclick="resetContactInfoFieldsPO()">Cancel</button>
									</div>
								</div>							
								<div class="col-md-6" style="height: 150px;margin-bottom:0px;margin-top: 20px;">
								<div style="height: 150px; margin-left: 2%;">
									<div style='width: 120%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
										<div id="ContactInfoTablePO"></div>
						
									</div>
								</div>
							<div id="PartyContactTableInfoListPO" style="visibility: hidden;"></div>
						</div> 
						
						
					</div>
						<input type="hidden" id="txtcontactcodePO" value= 0/>
					</div>					
				</div>
 -->
			<!-- End Code for Contact Info Details-->
				<!-- ====Start Code for Basic Inf============= -->
				<!-- <form id="theForm" name="feedback">
					<div id="AddressInfoPO" class="tab-pane fade col-md-12-1">
						<div class="panel-body col-md-12-1">
				
							<div class="col-md-12-1">
								<div class="form-group  col-md-2-1"
									style="margin-right: 1%; margin-left: 1%;">
									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">
										 <input type="radio" checked="checked"
											name="getValue" id="iBillingAddressPO" value="BillingAddress"/> <label
											class="TextFont">Billing Address</label>
									</div>
									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">
				
				
										<label class="TextFont">Company</label> <input
											type="text" id="txtaddresscompanyPO"
											name="txtaddresscompanyPO"
											placeholder="Company Name"
										    maxlength="40" class="form-control input-SmallText" />
				
									</div>
									<div class="form-group col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">
										<label for="exampleInputEmail1" class="TextFont">Address
										</label> <input type="text" id="txtadraddressPO"
											name="txtadraddressPO" placeholder="Address"
											maxlength="40" class="form-control input-SmallText" />
									</div>
									<div class="form-group col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">
										<label for="exampleInputEmail1" class="TextFont">Street
										</label> <input type="text" id="txtstreetPO"
											name="txtstreetPO" placeholder="Street"
											maxlength="40" class="form-control input-SmallText" />
									</div>
								<div class="form-group  col-md-12-1"
									style="margin-right: 2%; margin-left: 2%;text-align: left;">
									<label for="exampleInputEmail1" class="TextFont">Area
									</label> <input type="text" id="txtareaPO" name="txtareaPO"
										placeholder="Area"
										maxlength="40" class="form-control input-SmallText" />
								</div>
								<div class="form-group col-md-12-1"
										style="margin-right: 2%; margin-left: 2;">
										 <button class="btn btn-xs btn-primary "
										type='button' style="margin-right: 40px;"
										onclick="SavePartyMasterAddressInfoDetailsPO()">Save</button>
								</div>
								<input type="hidden" id="txtaddressinfocodePO" value = 0/>
			
							</div>
			
							<div class="form-group  col-md-3-1"
								style="margin-right: 1%; margin-left: 1%;">
								<div class="form-group  col-md-12-1"
									style="margin-right: 2%; margin-left: 2%;text-align: left;">
									<input type="radio" name="getValue" id="iShippingAddressPO"
										value="ShippingAddress" /> <label
										class="TextFont">Shipping Address</label>
								</div>
								<div class="form-group  col-md-12-1"
									style="margin-right: 2%; margin-left: 2%;text-align: left;">
			
									<label class="TextFont">City</label> <input
										type="text" id="txtaddrcityPO" name="txtaddrcityPO"
										placeholder="City"
										maxlength="40" class="form-control input-SmallText" />
			
								</div>
			
								<div class="form-group  col-md-12-1"
									style="margin-right: 2%; margin-left: 2%;text-align: left;">
			
									<label class="TextFont">Pin</label> <input
										type="text" id="txtaddrpinPO" name="txtaddrpinPO"
										placeholder="Pin"
										maxlength="6" class="form-control input-SmallText" />
			
								</div>
								<div class="form-group  col-md-12-1"
									style="margin-right: 2%; margin-left: 2%;text-align: left;">
			
									<label class="TextFont">State</label> <input
										type="text" id="txtaddrstatePO" name="txtaddrstatePO"
										placeholder="State"
										maxlength="40" class="form-control input-SmallText" />
			
								</div>
			
								<div class="form-group  col-md-12-1"
									style="margin-right: 2%; margin-left: 2%;text-align: left;">
			
									<label class="TextFont">Country </label> <input
										type="text" id="txtaddrcountryPO"
										name="txtaddrcountryPO" placeholder="Country"
										maxlength="40" class="form-control input-SmallText" />
			
								</div>
								<div class="form-group col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;">
										 <button class="btn btn-xs btn-default "
										type='button' style="margin-right: 70px;"
										onclick="resetAddressInfoFieldsPO()">Cancel</button>
									</div>			
			
							</div>
							<div class="col-md-6" style="height: 150px;margin-bottom:0px;margin-top: 20px;">
								<div style="height: 150px; margin-left: 2%;">
									<div style='width: 120%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
										<div id="AddressInfoTablePO"></div>
						
									</div>
								</div>
							<div id="PartyAddressTableInfoListPO" style="visibility: hidden;"></div>
						</div>						
						</div>
			
					</div>
				</div>
			</form> -->
			
			<!-- ====Start Code for Other Other INfo============= -->
<!-- 						<div id="OtherInfoPO" class="tab-pane col-md-12-1">
							<div class="panel-body col-md-12-1">
								<div class="form-group  col-md-2-1"
									style="margin-right: 1%; margin-left: 1%;">
									<label class="TextFont" style="font-size: 13px;">Attachments</label>

									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left; display: none;">

										<label class="TextFont">Id</label> <input
											type="text" id="txtotheridPO" name="txtotheridPO"
											placeholder="ID"
											class="form-control input-SmallText" readonly="readonly" />

									</div>
									<div class="form-group  col-md-12-1" style="margin-right: 2%; margin-left: 2%;text-align: left;">

										<label class="TextFont">Topic</label> <input
											type="text" id="txttopicPO" name="txttopicPO"
											placeholder="Topic"
											class="form-control input-SmallText" />

									</div>

									<div class="form-group  col-md-12-1"
										style="margin-right: 2%; margin-left: 2%;text-align: left;">

										
									</div>
									 
								</div>
								 
							</div>
							<div class="col-md-9-1"
								style="margin-right: 2%; margin-left: 2%; margin-bottom: 3%;text-align: left;">

								<label class="TextFont"> Topic Description</label>
								<textarea id="txtdescriptionPO" name="txtdescriptionPO"
									placeholder="Description" class="form-control"></textarea>

							</div>
						</div> -->


						<!-- ====End Code for Other Info============= -->

							<!-- <div id="TermsandConditionsPO" class="tab-pane col-md-12-1">
								<div class="panel-body col-md-12-1">
									<div style="padding-left: 12px;" class="col-sm-4-1">
										<div class="form-group Remove-Padding col-md-12-1">
											<div class="divide-10"></div>
											<div class="divide-10"></div>
											<lable class="TextFont">Payment Terms And Condition:</lable>
											<div class="divide-10"></div>

											<textarea placeholder="Notes" rows="7" cols="250"
												id="txtPurchaseQuotationNotes2"
												style="width: 100%; margin-top: 4px; margin-bottom: 2px;"
												class="field span12 "></textarea>
												<textarea placeholder="Notes" 
												id="txtPurchaseQuotationNotes2"
												style="width: 100%; margin-top: 4px; margin-bottom: 2px;"
												 ></textarea>
										</div>
									</div>
									start divs for setting Terms and Condition @Date 9/8/2016 @Author Sudhir jadhav
								<div id="termsandConditionformmaster" class="col-md-12-1" style='width:50%; padding: 1%; margin-left: 150px; font-weight: normal; max-height: 180Px;  overflow-y: scroll;'></div>
								<div id="termsandConditionsDetailsAjaxResp" style="visibility: hidden;"></div>
									ENds divs for setting Terms and Condition @Date 9/8/2016 @Author Sudhir jadhav 
								</div>
							</div>	 -->
							
										</div>
									</form>
									<!--/nikhil/sudhir  -->
								</div>


							</div>
							<!-- /BOX -->
								<!-- new  div for charges for purchase Order @Author sudhirjadhav  @Date 7june2016  -->
	<div class="col-md-12-1 " style="margin-top:-12px;">
									<!-- <div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px;">

										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Less</b>
										</div>
										 

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Spl.Disc.</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: -15px;margin-left:65px">


												<input type="text" id="txtSplDisc"
													name="txtSplDisc" class="form-control input-SmallText"
												   maxlength="10" value="0" placeholder="Spl.Disc"	onblur="isFloatingPoint('txtSplDisc'),calculatSpeDisct();"  style="text-align: right;"  />
											</div>


										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Debit Amt</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: -15px;margin-left:65px">
												<input path="purDebitAmt" type="text" id="txtdebitAmt1"
													name="txtdebitAmt1" class="form-control input-SmallText"
													placeholder="Debit Amt" maxlength="10" value="0"
													onblur="isFloatingPoint('txtdebitAmt1'),calculateTotalLess();" style="text-align: right;"/>
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>C.D%</b>
											</div>
											<div class="col-md-3-1 marginBottomClass"
												style="margin-top: 1px;margin-left:-12px">

												 
														<input path="CD" type="text" id="txtCD1"
															class="form-control input-SmallText" placeholder="C.D%"
															required="true" value="0"
															onblur="isFloatingPoint('txtCD1'),calculateCDAmt();" style="text-align: right;" />

													 


											</div>
                                             <div class="col-md-4-1 marginBottomClass"
												 style="margin-top: 1px;margin-left:1px">
												
														<input path="" type="text" id="txtCDAmt"
															name="txtCDAmt" class="form-control input-SmallText"
															placeholder="C.DAmount" maxlength="10" readonly="true"
															onclick="calculateTotalLess(this.value);" value="0" style="text-align: right;"/>



											</div>
										</div>

									</div> -->
									
									
									<!--****************  DIV FOR Add Surcharges @Author Sudhir @Date 1june2016  ***********-->

									<!-- <div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">

										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Add</b>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Octroi</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<input path="purOctroi" type="text" id="txtOctroi"
													name="txtOctroi" class="form-control input-SmallText"
													placeholder="Octroi" maxlength="10"
													onblur="isFloatingPoint('txtOctroi'),calculateTotalAdd();" style="text-align: right;"  value="0"/>

											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Surcharge</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<input path="purSurcharge" type="text"
													id="txtSurcharge" name="txtSurcharge"
													class="form-control input-SmallText"
													placeholder="Surcharge" maxlength="10"
													onblur="isFloatingPoint('txtSurcharge'),calculateTotalAdd();" style="text-align: right;" value="0"/>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Credit Amt</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<input path="purCreditAmt" type="text"
													id="txtCreditAmt" name="txtCreditAmt"
													class="form-control input-SmallText"
													placeholder="Credit Amt" maxlength="10"
													onblur="isFloatingPoint('txtCreditAmt'),calculateTotalAdd();"  style="text-align: right;" value="0" />
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Freight</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<input path="purFreight" type="text" id="txtFreight"
													name="txtFreight" class="form-control input-SmallText"
													placeholder="Freight" maxlength="10"
													onblur="isFloatingPoint('txtFreight'),calculateTotalAdd();" style="text-align: right;" value="0"/>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;"></div>
									</div> -->

<!--**************** End  DIV FOR Add Surcharges @Author Sudhir @Date 1june2016  ***********-->


<!--**************** DIV FOR  TAx Info @Author Sudhir @Date 1june2016  ***********-->

									<!-- <div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">
										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Tax Info.</b>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Vat</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<input path="purTaxVat5" type="text" id="txtVat"
													name="txtVat" class="form-control input-SmallText"
													placeholder="vat" maxlength="10" 
													onblur="calculateTotalTax(this.value);"  style="text-align: right;" value="0"/>
											</div>
										</div>

										

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>LBT</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<input path="purTaxLbt" type="text" id="txtlbt"
													name="txtlbt" class="form-control input-SmallText"
													placeholder="LBT" maxlength="10"
													onblur="isFloatingPoint('txtlbt'),calculateTotalTax(this.value);" style="text-align: right;" value="0"/>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>CST</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<input path="purTaxCst" type="text" id="txtcst"
													name="txtcst" class="form-control input-SmallText"
													placeholder="CST" maxlength="10"
													onblur="isFloatingPoint('txtcst'),calculateTotalTax(this.value);"  style="text-align: right;" value="0"/>
											</div>
										</div>
										
										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b> Ex Vat </b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<input path="purTaxVat12" type="text" id="txtExVat"
													name="txtVat12" class="form-control input-SmallText"
													placeholder="Ex Vat" maxlength="10" 
													onblur="calculateTotalTax(this.value);" style="text-align: right;" value="0"/>
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Total Taxes</b>
											</div>

											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												 
														<input path="purTotalVat" type="text"
															id="txtTotalVat" class="form-control input-SmallText"
															placeholder="Total Vat" required="true"
															value="0" readonly="true" style="text-align: right;" value="0"/>


												<br>
											</div>
										</div>
									</div> -->
									
									
									<!--****************  End DIV FOR  TAx Info @Author Sudhir @Date 1june2016  ***********-->
									


				<!--**************** DIV FOR  Other Info @Author Sudhir @Date 1june2016  ***********-->
									<!-- <div class="col-md-1-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">

										 

										<div class="col-md-12-1" style="margin-top: 0px;">
											 
											<div class="col-md-12-1" style="margin-top: 0px;">
												 
													<button type="button"  onclick="setRoundNetAmount();" class="btn btn-info">Round</button>
											</div>
										</div>
										
										
																				<br> <br>
										 

										<div class="col-md-12-1" style="margin-top: 0px;">
											 
											<div class="col-md-12-1" style="margin-top: 0px;">
												 <button type="button"  onclick="showChargesdiv();" class="btn btn-success">Charges</button>
												 <select class="form-control input-SmallText"	id="selboxChargeswithAmtList"
																				style="width: 100px; margin-left: 0px;" readOnly>
																	<option value="0">-Select-</option>
														</select>
														<br>
												 <input type="text" id="sumofCharges" class="form-control input-SmallText col-md-5" readOnly  value='0'/>
											</div>
										</div>
										
										

									 
									</div> -->
									
									<!--**************** DIV FOR  Other Info @Author Sudhir @Date 1june2016  ***********-->
									
									<!--**************** DIV Debit Notes @Author Sudhir @Date 1june2016  ***********-->
<!-- 									<div class="col-md-1-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">
										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Debit Notes</b>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-12-1" style="margin-top: 0px;">
												<b>Count</b>
											</div>
											<div class="col-md-12-1 center" style="margin-top: 0px;">
												<form:input path="" type="text" id="txtCount"
													name="txtCount" class="form-control input-SmallText"
													placeholder="Count" maxlength="10"
													onblur="isFloatingPoint('txtCount');" />

											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-12-1" style="margin-top: 0px;">
												<b>Amount</b>
											</div>
											<div class="col-md-12-1 center" style="margin-top: 0px;">
												<form:input path="" type="text" id="textAmount"
													name="textAmount" class="form-control input-SmallText"
													placeholder="Amount" maxlength="10"
													onblur="isFloatingPoint('textAmount');" />

											</div>
										</div>


									</div> -->


	<!--**************** DIV End Debit Notes @Author Sudhir @Date 1june2016  ***********-->
	
	<!--**************** DIV Gross Amount @Author Sudhir @Date 1june2016  ***********-->
									<!-- <div class="col-md-2-1 center"
										style="margin-top: 9px; margin-left: 6%;">

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 5px;">
												<b>Gross Amount</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												 
														<input path="purGrossAmt" type="text" id="txtGross"
															name="txtGross" class="form-control input-SmallText" value="0"
															placeholder="Gross Amount" maxlength="10" required="true"
															readonly="true"  style="text-align: right;" />

													 
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Less</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												 
														<input type="text" id="txtLess" name="txtLess" class="form-control input-SmallText" value ="0" maxlength="10" placeholder="less" required="true" readonly="true" style="text-align: right;" />

												 

											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Add</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												 
														<input path="purAdd" id="txtAdd" name="txtAdd"
															class="form-control input-SmallText" placeholder="Add"
															maxlength="10" readonly="true" value="0" style="text-align: right;" />

													 
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Taxes</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												 
														<input path="purVat" type="text" id="textVat"
															class="form-control input-SmallText" placeholder="Vat"
															maxlength="10" required="true" value="0"
															readonly="true" style="text-align: right;" />

													 
											</div>

										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Net Amount</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												 
														<input path="purNetAmt" type="text" id="txtNetAmt"
															name="txtNetAmt" class="form-control input-SmallText"
															placeholder="Net Amount" maxlength="10" required="true"
															readonly="true" value="0" style="text-align: right;"/>

												 
											</div>

										</div>
									</div> -->
						<!--****************  End DIV Gross Amount @Author Sudhir @Date 1june2016  ***********-->

								</div>
	
	
	
	<!--End new  div for charges for purchase Quoatayion @Author sudhirjadhav  @Date 1june2016  -->
								
								
								 
								<!-- End main Div BOx -->
							
							 
						</div>


						<!-- <div class="form-group col-md-9-1" id="iHidePurOrderBtn" style="margin-left: 1050px;display: none">


							<button type="button" class="btn btn-primary"
								onclick="savePurchaseOrder()">Save</button>
							<button type="button" class="btn btn-default"
								data-dismiss="modal" onclick="refresh()">Close</button>


						</div> -->


					</form>
				</div>
				<!-- /BOX-->
			</div>
			<!-- /BODY-->
			<div class="modal-footer"></div>
		</div>
	</div>					
			 			
					</div>
					
					
		<!-- **** End 
					@Code   : Genrate Purchase Order When Stock goes below Re-Order Level
					@Author : @Sudhir jadhav 
					@Date   : 16Feb2016  
					******  -->		
		
		
		
		
		
		<!-- ****  	@Code   : this popup is used for seting last purchase details
					@Author : @Sudhir jadhav 
					@Date   : 28Feb2017  
					******  -->	
		
		
		
		
		
		<div id="poProcPopUp" class="modal fade in">
	<div class="modal-dialog" style="width: 90%">
		<form action="">
			<div class="modal-content" class="col-md-12">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							<i class="fa fa-calendar"></i><!-- Last Purchase -->Vendor Contract Details
						</h4>
					</div>
				</div>
				<div class="modal-body">
					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-2-1" style="margin-top: 0px;"></div>
					</div>

					 


					<div class="col-md-12-1"
						style="height: 100%; width: 100%; padding-left: 0px;">

						<div id='jqxWidget1'>
							<div id="jqxgrid1" style="width:100%;"></div>
						</div>

						 
							
					</div>


					<!-- //BOX -->
				</div>
				<!-- /BODY -->
				<div class="modal-footer">
					<div class="form-group col-md-7-1" style="margin-top: 15px;">
						<button type="button" class="btn btn-primary" id="" name=""
							onclick="getSectRow()" data-dismiss="modal">Ok</button>
						<button type="button" onclick="hidePOProcss();" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
		
	
		<!-- **** End 	@Code   : this popup is used for seting last purchase details
					@Author : @Sudhir jadhav 
					@Date   : 28Feb2017  
					******  -->	
		
<script type="text/javascript">
var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;
var minLen;
var maxLen; 
</script>
<script type="text/javascript">
/**
 * @Date   :16Feb2017
 * @author : sudhir jadhav
 * @Code   : Create Daynamic rows for genrate purchase Order
 */ 
function toCreateDivMulPO() {
	 //this if used create Dynamic rows When  Edit the the Po 
	if (test > 0 && isNew > 0) {
		if (rowCount == 1) {

			rowCount = test;

		}

		rowCount++;

		$("#ItemInfoTableMulPO > tbody")
				.append(
						"<tr id='deleterow"
								+ rowCount
								+ "'> <td> <input type='checkbox' checked='checked' name='checkbox"
								+ rowCount
								+ "' id='checkbox"
								+ rowCount
								+ "'/></td><td>"
								+ rowCount
								+ "  <input type='hidden' id='rowcountid"
								+ rowCount
								+ "' value ="
								+ rowCount
								+ "> </td>"
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='autoforMulPo(this.id,'onchange')' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "'  onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'  style='width:60px;' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly=''  style='width:60px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'readonly='' style='width:100px;' ></td>" +
								"<td><select style='width:160px;' class='form-control input-SmallText'  multiple='multiple' onclick='multipletaxCalculation(this.id," + rowCount + ")' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCodePO_"
								+ rowCount
								+ "'></select></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' readonly='' style='width:100px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
								+ rowCount
								+ "'   readonly='' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:100px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' style='width:60px;' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' style='width:60px;'></label></td> "
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  readonly=''  id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ rowCount
								+ "' style='width:60px;' ></td>"
								+ " </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		autoforPo("txtPurchaseQuotationItemName_" + rowCount, "onload");
		//autoforPo("txtPurchaseQuotationItemName_" + rowCount, "onload");
		//autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCount, "onload");

	} 
	 //this else used create new Dynamic rows starting from 1  
	else {
		$("#ItemInfoTableMulPO > tbody")
				.append(
						"<tr id='deleterow"
								+ rowCount
								+ "'> <td> <input type='checkbox'  checked='checked' name='checkbox"
								+ rowCount
								+ "' id='checkbox"
								+ rowCount
								+ "'/></td><td>"
								+ rowCount
								+ "  <input type='hidden' id='rowcountid"
								+ rowCount
								+ "' value ="
								+ rowCount
								+ "> </td>"
								+ " <td><div id ='divtxtPurchaseQuotationItemName_'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  onkeyup = autoforMulPo(this.id,'onload')  id='txtPurchaseQuotationItemName_"+rowCount+ "'   />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> <td><div id ='divtxtPurOrderSuplrName'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurOrderSuplrName_"
								+ rowCount
								+ "' onkeyup = 'autoSugPartyName(this.id,onchange)' />"
								+ "<input type='hidden'  id='txtPurOrderSuppId"
								+ rowCount
								+ "'value='0' /></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"'  ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'   ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly=''></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'readonly='' style='width:100px;'></td>" +
								"<td><select style='width:160px;' class='form-control input-SmallText' onclick='multaxCalMulPO(this.id," + rowCount + ")'  multiple='multiple' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCodePO_"
								+ rowCount
								+ "'></select></td>"
								+ " <td><input  style='width:80px;' type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly='' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
								+ rowCount
								+ "'   readonly='' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:100px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;'> <label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td> "
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ rowCount
								+ "' style='width:60px;'></td>"
								+ " </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		autoforMulPo("txtPurchaseQuotationItemName_" +rowCount, "onload");
		autoSugPartyName("txtPurOrderSuplrName_" + rowCount, "onload");
		autotaxMulPo("txtNewTaxMulPO", "onload");
		rowCount++;
	}

}
		
</script>
		
<script type="text/javascript">
//this function is used to remove the check box Checked  Dynamic rows 
function toRemovePoRow(RowCount) {
	var hiddenRowCount = document.getElementById("RowCount").value;
	var temp = hiddenRowCount;

	var totaltblsize = $("#totaltblsize").val();
	var p = 1;
	for ( var i = 0; i < totaltblsize; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#deleterow" + p + "").remove();
			temp = temp - 1;
			$("#RowCount").val(temp);
		}
		p++;
	}
	isNew = 1;
	/* totalDocDiscountPQ();
	totalDocQtyPQ();
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount); */
} 
</script>

<script>

function setLastPurDetails(content) {
//	setFocusBatchPopUp();
//alert(content);

 	var data = content;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
                     
            { name: 'partyName', type: 'string'  },
            { name: 'partyId', type: 'string' },
            { name: 'partyRate', type: 'string'},
            { name: 'partyFomDate', type: 'string'},
            { name: 'partyToDate', type: 'string'}
            
           /*commit for hiding showing party contracting   { name: 'inv_purchase_common_item_Name', type: 'string'  },
            { name: 'inv_purchase_common_item_doc_series', type: 'string' },
            { name: 'inv_purchase_common_item_doc_number_fk', type: 'string' },
            { name: 'inv_purchase_common_item_unit_price', type: 'string'},
            { name: 'inv_purchase_common_item_create_date', type: 'string'} */
            
            
            //{ name: 'inv_purchase_common_item_unit_price', type: 'string' },
           
            /* { name: 'inv_purchase_common_item_trade_discount_per',type: 'string' },
            { name: 'inv_purchase_order_item_trade_discount_rupess', type: 'string'  },
            { name: 'inv_purchase_order_item_trade_discount_amount',type: 'string' },
            { name: 'inv_purchase_order_item_trade_base_amount', type: 'string' },
            
            { name: 'inv_purchase_order_item_tax_code', type: 'string'  },
            { name: 'inv_purchase_order_item_tax_amount_in_rupess',type: 'string' },
            { name: 'inv_purchase_order_item_tax_amount',type: 'string'  },
          
            { name: 'inv_purchase_order_item_row_amount',type: 'string'}, 
           
            { name: 'inv_purchase_order_item_factor1',type: 'string' },
            { name: 'inv_purchase_order_item_factor2',type: 'string' },
            { name: 'inv_purchase_order_item_factor3',type: 'string' },
            { name: 'inv_purchase_order_item_factor4',type: 'string' },
            
            { name: 'inv_purchase_order_item_actural_qty',type: 'string' },
            { name: 'inv_purchase_order_item_pending_qty',type: 'string' }, */
          
            
           // { name: 'inv_purchase_order_item_batch_No',type: 'string' }
        ],
        localdata: data
    };
   /*  var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
    	
        if (value ==0) {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">Cash/Credit</span>';
        }
        else {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">Cash</span>';
        }
    }; */
    
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    $("#jqxgrid1").jqxGrid(
    {
        width: 1150,
        source: dataAdapter,
        columnsresize: true,
        pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        columns: [
            { text: 'Supplyer Name', datafield: 'partyName', width: 550 },
            { text: 'Supplyer Id', datafield: 'partyId', width: 200 },
            { text: 'Rate', datafield: 'partyRate',width: 200},
            { text: 'Form Date', datafield: 'partyFomDate', width: 200 },
            { text: 'To date', datafield: 'partyToDate', width: 200 }
      
           /*  { text: 'Item Name', datafield: 'inv_purchase_common_item_Name', width: 305 },
            { text: 'Supplyer Name', datafield: 'inv_purchase_common_item_doc_series', width: 250 },
            { text: 'Supplyer Id', datafield: 'inv_purchase_common_item_doc_number_fk',width: 200},
            { text: 'Rate', datafield: 'inv_purchase_common_item_unit_price', width: 200 },
            { text: 'Purchase Date', datafield: 'inv_purchase_common_item_create_date', width: 200 }
             */
            
            /* { text: 'Item price', datafield: 'inv_purchase_common_item_unit_price', width: 180 },
            { text: 'Disc%', datafield: 'inv_purchase_common_item_trade_discount_per', width: 180 },
            
            { text: 'Disc Rs', datafield: 'inv_purchase_order_item_trade_discount_rupess', width: 180 },
            { text: 'Disc Amt',  datafield: 'inv_purchase_order_item_trade_discount_amount', width: 180 },
            { text: 'Base Amt', datafield: 'inv_purchase_order_item_trade_base_amount', width: 180 },
            
            { text: 'Tax', datafield: 'inv_purchase_order_item_tax_code', width: 120 },
            
            { text: 'Tax %', datafield: 'inv_purchase_order_item_tax_amount'},
            
            { text: 'Tax Rs', datafield: 'inv_purchase_order_item_tax_amount_in_rupess'},
            
            { text: 'Tax Amt', datafield: 'inv_purchase_order_item_tax_amount_in_rupess'},
            
            { text: 'Total Amt', datafield: 'inv_purchase_order_item_row_amount'}, 
            
            { text: 'fact1', datafield: 'inv_purchase_order_item_factor1'},
            { text: 'fact2', datafield: 'inv_purchase_order_item_factor2'},
            
            { text: 'fact3', datafield: 'inv_purchase_order_item_factor3'},
            { text: 'fact4', datafield: 'inv_purchase_order_item_factor4'},
            
            { text: 'Order Qty', datafield: 'inv_purchase_order_item_actural_qty'},
            { text: 'Pending Qty', datafield: 'inv_purchase_order_item_pending_qty'},
            
            { text: 'Batch No', datafield: 'inv_purchase_order_item_batch_No'} */
            
        ]
    });
  /*  
   $("#excelExport1").jqxButton();
   
    $("#csvExport1").jqxButton();
   
    $("#pdfExport1").jqxButton();
    $("#excelExport1").click(function () {
        $("#jqxgrid1").jqxGrid('exportdata', 'xls', 'jqxGrid');           
    });
  
    $("#csvExport1").click(function () {
        $("#jqxgrid1").jqxGrid('exportdata', 'csv', 'jqxGrid');
    });
    
    $("#pdfExport1").click(function () {
        $("#jqxgrid1").jqxGrid('exportdata', 'pdf', 'jqxGrid');
    }); */
    
    

}

</script>
<script type="text/javascript">
 function getSectRow(){
	  
	 var selectedrowindex = $("#jqxgrid1").jqxGrid('getselectedrowindex');
	 var datarow = $("#jqxgrid1").jqxGrid('getrowdata', selectedrowindex);
		
	  
	/*  var partyName = datarow['inv_purchase_common_item_doc_series'];
	 var partyId = datarow['inv_purchase_common_item_doc_number_fk'];
	 
	 var partyMrp = datarow['inv_purchase_common_item_unit_price'];
	 var partyRate = datarow['inv_purchase_common_item_unit_price']; */
	 
	 var partyName = datarow['partyName'];
	 var partyId = datarow['partyId'];
	 
	 
	 var partyRate = datarow['partyRate'];
	 var partyFormDate = datarow['partyFomDate'];
	 var partytodate = datarow['partyToDate'];
	 
	var  count = $("#txtPOprRowCont").val();
	  
	 $("#txtPurOrderSuppId"+ count).val(partyId);
	 $("#txtPurOrderSuplrName_"+ count).val(partyName);
	 $("#txtPurchaseQuotationUnitPrice" + count).val(partyRate);
	  
	 $("#poProcPopUp").hide();
	 
	  
 }
</script>

	
<script type="text/javascript">
function todaysDate()
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

var today1 = dd+'/'+mm+'/'+yyyy;
$("#txtPurOrderDate").val(today1);
$("#txtMulPODeliDate").val(today1);
}
</script>

<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.base.css"/>">
<link rel="stylesheet" type="text/css"
	href="js/ExtraJs/jqx-widgets/jqx_customTheme.css" />


<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxmenu.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.filter.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxwindow.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/demos.js"/>"></script>


<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>



<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>

 