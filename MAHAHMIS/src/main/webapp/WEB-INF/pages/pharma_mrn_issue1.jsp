<%java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					"dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());%>

<div class="container">
					<form:form commandName="mrnIssue" id="mrnIssue"
						method="post">
						<div class="row">
							<div id="content" class="col-lg-12">
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date :<%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a
													href="../../Dashboard.jsp">Home</a></li>
												<li><a
													href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>MRN Issue Entry</li>
												<!-- <li><i class="fa fa"></i></li>
												<li><a href="IPD_OPD_Database.jsp">Document SetUp</a></li> -->
												<div class="li pull-right" style="margin-left: 9px;">
													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="saveMRN()">Save and
														Print(Ctrl+S)</button>

												</div>
												<div class="li pull-right">
													<a class="btn btn-xs btn-info"
														href="../../pharmacy/indentSale/view">Back to
														List</a>
												</div>


											</ul>
										</div>
									</div>
								</div>
								<%-- 	<c:if test="${not empty success}">
									<div class="alert alert-success" id="msgDiv">${success}</div>
								</c:if>
								<c:if test="${not empty error}">
									<div class="alert alter-danger" id="msgDiv">${error}</div>
								</c:if> --%>
								<div class="col-md-12-1">
									<!-- <h5>
										<font color="tomato">Purchase Entry</font>
									</h5> -->

									<div class="col-md-12-1">
										<div class="col-md-2-1">
											<font color="tomato" style="font-size: 19px">Mrn Issue
												Entry</font>
										</div>
										<div class="col-md-6-1" id="indentNumber">
											<div class="">
												<button class="btn btn-xs btn-info"
													data-target="#mrn_pending_data" data-toggle="modal"
													type="button">GET MRN</button>
											</div>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-12-1 panel-body">
										<div class="panel-body">

											<div id="vendorMaster" class="col-md-12-1"
												style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>MRN No.</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="" type="text" id="txtMrnNo"
																name="txtMrnNo" class="form-control input-SmallText"
																readonly="true" placeholder="MRN No" required="true"
																onblur="isNumber('txtMrnNo');" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 203px; color: red;'>
																<b> *</b>
															</div>
															<form:hidden path="" id="hiddenIndentSalelId" />

															<input type="hidden" id="products"> <input
																type="hidden" id="productsQuantity">

														</div>

													</div>
													<%-- <div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Patient Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input type="text" path="" id="txtPatient"
																class="form-control input-SmallText"
																placeholder="Patient Name" required="true"
																readonly="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 203px; color: red;'>
																<b> *</b>
															</div>
															<form:input type="hidden" path="" id="hiddenPatientId" />
														</div>
													</div> --%>

													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Received From </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<input type="text" id="txtRecFrom" name="txtRecFrom"
																class="form-control input-SmallText" readonly
																placeholder="Received From" required />
														</div>
														<form:hidden path="storeId" id="hiddenStoreId" />

													</div>
												</div>
												<div class="col-md-4-1" style="margin-top: 9px;">

													<%-- <div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1 center" style="margin-top: 0px;">
															<b>Phone Number</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="" type="text" id="txtMobileNumber"
																class="form-control input-SmallText" readonly="true"
																placeholder="Phone Number" required="true" />
														</div>
													</div> --%>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1 center" style="margin-top: 0px;">
															<b>MRN Generated Date</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="" id="mrnGenerateDate"
																name="mrnGenerateDate"
																placeholder="Indent Generated Date" required="true"
																class="form-control input-SmallText" readonly="true"
																onkeydown="closeCalendar();" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 203px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1 center" style="margin-top: 0px;">
															<b>MRN Received Date</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="" id="popup_container2"
																name="popup_container2"
																onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)"
																placeholder="Date" required="true"
																value="<%=todays_date%>"
																class="form-control input-SmallText" readonly="true"
																onkeydown="closeCalendar();" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 203px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
												</div>

												<div class="col-md-4" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Vou No</b>
														</div>
														<div class="col-md-8-1"
															style="margin-top: -15px; margin-left: 49px;">
															<form:input path="" type="text" id="txtBillNo"
																class="form-control input-SmallText" name="txtBillNo"
																placeholder="Bill No" required="true" readonly="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 213px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>

													<div class="col-md-12-1 center" style="margin-top: 9px;">
														<form:radiobutton path="" id="radioCash" value='0'
															name="radioCashCredit" checked="true"
															onclick='setAmountBalance()' />
														Cash
														<form:radiobutton path="" id="radioCredit" value='1'
															name="radioCashCredit" onclick='setAmountBalance()' />
														Credit
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div id=""
									style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
									<div class="col-md-12-1">
										<input type="button" value="-" class="btn btn-xs btn-success"
											style="margin: 7px; float: right" onclick="deleteRow();">
									</div>
									<table id="purchaseTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th class="col-md- center">Sr.</th>
												<th style="height: 21.5px;" class="col-md-1-1 center"><div
														class="TextFont">Product</div></th>
												<th style="height: 21.5px;" class="col-md-1-1 center"><div
														class="TextFont">Unit</div></th>

												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Pack</div></th>
												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Com</div></th>

												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Qty</div></th>

												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Schm</div></th>

												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Batch</div></th>
												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Expiry</div></th>
												<th style="height: 21.5px;" class=" col-md-1-0 center"><div
														class="TextFont">Disc</div></th>
												<th style="height: 21.5px;" class=" col-md-1-0 center"><div
														class="TextFont">Vat%</div></th>
												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Prft%</div></th>
												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Mrp</div></th>
												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Rate</div></th>
												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Pur Rate</div></th>
												<th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Amount</div></th>

												<!-- <th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Select</div></th>		 -->
											</tr>
										</thead>
										<tbody id="HSTDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
											<%-- <tr>
												<td><label class='input-SmallText'>1</label></td>
												<td><input type='hidden' id='hiddenCurrentRow'
													value='1' /> <form:hidden id="hospitalSlaveId0"
														path="hospitalSaleBillSlaves[0].hospitalSlaveId" /> <form:hidden
														id="hiddenProductId1"
														path="hospitalSaleBillSlaves[0].productMaster.productId" />
													<form:input
														path="hospitalSaleBillSlaves[0].productMaster.productName"
														type="text" id="textProductName1" name="textProductName1"
														class='form-control input-SmallText' data-toggle="modal"
														data-target="#Hospital_Sales_Form" onclick="load(1,1)" /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].productMaster.productUnit"
														type="text" id="textUnit1" name="textUnit1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].productMaster.packingMaster.packType"
														type="text" id="textPack1" name="textPack1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].productMaster.companyMaster.compShortName"
														type="text" id="textComp1" name="textComp1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td style="display: none;">
													<form:hidden path="debitNoteSlaves[0].productMaster.batchMaster[0].batchCode" id="" />
													<form:input
														path="hospitalSaleBillSlaves[0].productMaster.batchMaster[0].batchId"
														type="text" id="textBatchId1" name="textBatchId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="hospitalSaleBillSlaves[0].productMaster.batchMaster[0].stockMaster.stockId"
														type="text" id="textStockId1" name="textStockId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="hospitalSaleBillSlaves[0].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
														type="text" id="textStockQtyInHand1"
														name="textStockQtyInHand1"
														class='form-control input-SmallText' readonly="true" /> <input
													type="text" id="textClStk1" value=""><input
													type="text" id="textTotalStk1" value=""> <input
													type="text" id="textPurchaseRate1" value="">
												</td>

												<td><form:input path="" type="text" id="txtVat"
														readonly='true' name="txtVat"
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveBatchCode"
														type="text" id="txtBatchNo" name="txtBatchNo"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveBatchExpiry"
														type="text" id="txtExpiry" readonly='true'
														name="txtExpiry" class='form-control input-SmallText' /></td>

												<td><form:input path="" type="text" id="txtShelfNo"
														readonly='true' name="txtShelfNo"
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveMrp"
														type="text" id="textMRP1" readonly='true' name="textMRP1"
														class='form-control input-SmallText' /></td>

												<td><form:input path="" type="text" id="txtDisc"
														readonly='true' name="txtDisc"
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveQty"
														type="text" id="textQty1" name="textQty1" readonly='true'
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveRate"
														type="text" id="textRate1" name="textRate1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input path="" type="text" id="textAmount1"
														readonly='true' name="textAmount1"
														class='form-control input-SmallText' /></td>
											</tr> --%>

										</tbody>
									</table>
								</div>
								<div class="divide-20"></div>

								<!-- Start Calculation -->
								<div class="col-md-12-1 " style="margin-top: 0px;">
									<div class="col-md-12-1" style="margin-top: 9px;">
										<div class="form-group  col-md-10-1"
											style="margin-right: 0%; margin-left: 0%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-1-1" style="margin-top: 9px;">
													<b>Naration</b>
												</div>
												<div class="col-md-7-1"
													style="margin-top: 5px; margin-right: 0%;">
													<form:input path="mrnIssueNarration" type="text"
														id="txtNaration" name="txtNaration"
														class="form-control input-SmallText"
														placeholder="Naration" />
													<!--  onblur="isAlphaWithDigitSpace('txtNaration',0,500)" -->
												</div>

											</div>
										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 1%; margin-left: 1%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>C.N.</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="mrnIssueCN"
														class="form-control input-SmallText" type="text"
														id="txtCN" name="txtCN" placeholder="C.N."
														onblur="isFloatingPoint('txtCN');" />
												</div>
											</div>
											<div class="form-group col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b> C.D.%</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input class="form-control input-SmallText"
														path="mrnIssueCD" type="text" id="txtCD" name="txtCD"
														placeholder="C.D.%"
														onblur="isFloatingPoint('txtCD'),calculatecdAmt(),CheckDis();" />
												</div>
											</div>

										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 1%; margin-left: 1%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>Special Disc</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="mrnIssueSpecialDisc" type="text"
														id="txtSpecialDisc" class="form-control input-SmallText"
														name="txtSpecialDisc" placeholder="Special Disc"
														onchange="calculateDiscount();"
														onblur="isFloatingPoint('txtSpecialDisc'),validateSpeDiscount();" />
												</div>

											</div>
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>C.N.Amt</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="mrnIssueCnAmt" type="text" id="txtCNAmt"
														class="form-control input-SmallText" name="txtCNAmt"
														placeholder="C.N.Amt"
														onblur="isFloatingPoint('txtCNAmt');" />
												</div>

											</div>
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>C.D.Amt</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="mrnIssueCdAmt" type="text"
														readonly="true" id="txtCDAmt"
														class="form-control input-SmallText" name="txtCDAmt"
														placeholder="C.D.Amt" />
												</div>

											</div>

										</div>
										<%-- <div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%;">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="form-group  col-md-12-1"
														style="margin-right: 2%; margin-left: 2%;">
														<div class="col-md-5-1"
															style="margin-top: 5px; margin-right: 2%;">
															<b>Surcharge</b>
														</div>
														<div class="col-md-5-1"
															style="margin-top: 5px; margin-right: 2%;">
															<form:input path="mrnIssueSurcharges" type="text"
																id="txtSurcharge" name="txtSurcharge"
																class="form-control input-SmallText"
																placeholder="Surcharge" 
																onblur="isFloatingPoint('txtSurcharge'),calculateSurchargeHos();" />
														</div>
													</div>
												</div>
											</div>
											--%>
										<div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%;">
											<div class="box border blue">
												<div class="box-title">
													<h4>
														<i class="fa fa-edit"></i><b>Surcharges</b>
													</h4>
													<!-- <div class="tools">
														<a class="config" data-toggle="modal" href="#box-config">
															<i class="fa fa-cog"></i> </a> <a class="reload" href="javascript:;"> <i
														class="fa fa-refresh"></i>
														</a> <a class="collapse" href="javascript:;"> <i
															class="fa fa-chevron-up"></i>
														</a> <a class="remove" href="javascript:;"> <i
															class="fa fa-times"></i>
														</a>
													</div> -->
												</div>
												<div class="box-body">
													<div class="box-body">
														<div class="col-md-5-1"
															style="margin-top: 0px; margin-right: 2%;">
															<b>Surcharge</b>
														</div>
														<div class="col-md-6-1"
															style="margin-top: 0px; margin-right: 2%;">
															<form:input path="mrnIssueSurcharges" type="text"
																id="txtSurcharge" name="txtSurcharge"
																class="form-control input-SmallText"
																placeholder="Surcharge"
																onblur="isFloatingPoint('txtSurcharge'),calculateSurchargeHos();" />
														</div>
													</div>
												</div>
											</div>
										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%; margin-top: -5%;">


											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-bottom: 2%;">

												<label class="TextFont"></label>

											</div>
											<div class="form-group  col-md-7-1"
												style="margin-right: 2%; margin-left: 2%;">

												<label class="TextFont"><b>Amount Received</b></label>


												<form:input path="mrnIssueAmountReceive" type="text"
													id="txtAmtRec" class="form-control input-SmallText"
													name="txtAmtRec" placeholder="Amount Received"
													onblur="isFloatingPoint('txtAmtRec');calculatePending()" />

											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">

												<label class="TextFont"><b>Amount Balance</b></label>

												<form:input path="mrnIssueAmountBalance" type="text"
													id="txtAmtBal" class="form-control input-SmallText"
													name="txtAmtBal" placeholder="Amount Balance"
													readonly="true" />


												<form:hidden path="mrnIssuePreviousBalance"
													id='indentSalePreviousBalance' />

											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%; background: yellow">

												<label class="TextFont"><b>Previous Balance</b></label> <span
													id='mainPendingBalance'></span>

											</div>
										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%; float: right; margin-top: -4%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Gross Amt</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="mrnIssueGrossAmt" type="text" value='0'
														id="txtGrossAmt" class="form-control input-SmallText"
														name="txtGrossAmt" placeholder="Gross Amt" readonly="true" />
												</div>

											</div>
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Less</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="mrnIssueLess" type="text" id="txtLess"
														name="txtLess" value='0' readonly="true"
														class="form-control input-SmallText" placeholder="Less"
														onblur="calculateNetAmount('less');" />
												</div>

											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Add</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="mrnIssueAdd" type="text" id="txtAdd"
														name="txtAdd" class="form-control input-SmallText"
														value='0' readonly="true" placeholder="Add"
														onblur="calculateNetAmount('add')" />
												</div>

											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Round</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="mrnIssueRound" type="text" value='0'
														id="txtRount" class="form-control input-SmallText"
														name="txtRount" placeholder="Round" />
												</div>

											</div>
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Net Amt.</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="mrnIssueNetAmt" type="text"
														readonly="true" id="txtNetAmt" value="0"
														class="form-control input-SmallText" name="txtNetAmt"
														placeholder="Net Amt." />
												</div>
											</div>
										</div>
									</div>
								</div>


								<!-- End Calculation -->
							</div>
						</div>
					</form:form>
				</div>