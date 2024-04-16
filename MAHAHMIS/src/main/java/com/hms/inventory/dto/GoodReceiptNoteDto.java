package com.hms.inventory.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;


@Entity
@Component
@Table(name = "inv_good_receipt_note")
public class GoodReceiptNoteDto implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@Column(name ="grn_date")
	private String grnDate;
	
	@Column(name = "purchase_order")
	private String purchaseOrder;
	
	@Column(name = "grn_supplier_name")
	private String grnSupplierName;
	
	@Column(name = "grn_supplier_state")
	private String grnSupplierState;
	
	@Column(name = "grn_supplier_state_id")
	private Integer grnSupplierStateId;
	
	@Column(name = "grn_supplier_mobile")
	private String grnSupplierMobile;
	
	@Column(name = "grn_series")
	private String grnSeries;
	
	@Column(name = "grn_series_val")
	private String grnSeriesVal;
	
	@Column(name ="grn_reference_no")
	private String grnReferenceNo;
	
	@Column(name ="grn_purchase_inv_no")
	private String grnPurchaseInvoiceNo;
	
	@Column(name ="grn_purchase_inv_no_one")
	private String grnPurchaseInvoiceNoOne;
	
	@Column(name ="grn_delivery_date")
	private String grnDeliveryDate;
	
	@Column(name = "grn_supplier_address")
	private String grnSupplierAddress;

	@Column(name = "grn_status")
	private String grnStatus;
	
	@Column(name = "grn_delivery_challan_number")
	private String grnDeliveryChallanNumber;
	
	@Column(name = "grn_delivery_challan_number_one")
	private String grnDeliveryChallanNumberOne;
	
	@Column(name="purchase_order_number")
	private String purchaseOrderNumber;
	 
	@Column(name="is_without_po_grn", columnDefinition="varchar(2) default 'N'")
	private String isWithoutPoGrn;
	
	@Column(name="total_item_quantity")
	private Integer totalItemQuantity;
	
	@Column(name="total_item_discount")
	private double totalItemDiscount;
	
	@Column(name="total_item_pending_qty")
	private double totalItemPendingQty;
	
	// this is added for tax calculation
	@Column(name="less_special_discount")
	private Double lessSpecialDiscount;
	
	@Column(name="less_debit_amount")
	private Double lessDebitAmount;
	
	@Column(name="less_cd_percent_1")
	private Double lessCDPercent1;
	
	@Column(name="less_cd_percent_2")
	private Double lessCDPercent2;
	
	@Column(name="add_octroi")
	private Double addOctroi;
	
	@Column(name="add_surcharge")
	private Double addSurcharge;	
	
	@Column(name="add_credit_amount")
	private Double addCreditAmount;
	
	@Column(name="add_freight")
	private Double addFreight;
	
	@Column(name="tax_vat")
	private Double taxVat;
	
	@Column(name="tax_lbt")
	private Double taxLBT;
	
	@Column(name="tax_cst")
	private Double taxCST;
	
	@Column(name="tax_ex_vat")
	private Double taxExVat;
	
	@Column(name="tax_total_taxes")
	private Double taxTotalTaxes;
	
	@Column(name="sum_of_charges")
	private Double sumofCharges;
	
	@Column(name="rermark")
	private String rermark;
	
	@Column(name="gross_amount")
	private Double grossAmount;
	
	@Column(name="gross_less_amount")
	private Double grossLessAmount;
	
	@Column(name="gross_add_Amount")
	private Double grossAddAmount;
	
	@Column(name="gross_taxes")
	private Double grossTaxes;
	
	@Column(name="gross_net_amount")
	private Double grossNetAmount;
		
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "party_gst_no",columnDefinition="int(11) default 0")
	private Integer partyGstNo=0;//added by dayanand for party gst no.
	
	@Column(name="item_total_amt")
	private Double itemTotalAmt;// 27-2-2020 added by dayanand to save total base amount + total tax amount	
	
	@Column(name="item_igst_total_amt")
	private Double totalIgstAmount;// 28-2-2020 added by dayanand to save total igst tax amount	
	
	@Column(name="item_gst_total_amt")
	private Double totalgstAmount;// 28-2-2020 added by dayanand to save total gst tax amount	
	
	@Column(name = "is_draft",columnDefinition="varchar(255) default 'NODRAFT'")
	private String isDraft="NODRAFT";//6-4-2020 added by dayanand for determine is grn is saving in draft or not
	
	@Column(name = "is_pending")
	private String isPending="N";//20-4-2020 added by Vishnu for determine is grn is pending or not
	
	@Transient
	private Integer noOfPages;
	
	@Transient
	private List<GoodReceiptNoteDto> lstGoodReceiptNoteDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "grn_master_id",  nullable = false)
	private List<GoodReceiptNoteItemDto> lstGoodReceiptNoteItemDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "party_master_id", nullable = false)
	private PartyMasterDto partyMasterDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "grn_master_id",  nullable = false)
	private List<ItemAssetMaintenanceDto> lstItemAssetMaintenanceDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "grn_master_id",  nullable = true)
	private List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMasterDto;

	@Transient
	private List<PartyMasterContactInfoDto> partyMasterContactInfoDto;
	
	@Transient
	private List<PartyMasterGeneralInfoDto> partyMasterGeneralInfoDto;
	
	@Transient
	private List<PartyMasterAddressInfoDto> partyMasterAddressInfoDto;
	
	@Transient
	private List<TermsAndConditionInfoDto> termsAndConditionInfoDto;

	public Integer getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}

	public String getIsDraft() {
		return isDraft;
	}

	public void setIsDraft(String isDraft) {
		this.isDraft = isDraft;
	}

	public String getIsPending() {
		return isPending;
	}

	public void setIsPending(String isPending) {
		this.isPending = isPending;
	}

	public Double getTotalgstAmount() {
		return totalgstAmount;
	}

	public void setTotalgstAmount(Double totalgstAmount) {
		this.totalgstAmount = totalgstAmount;
	}

	public Integer getPartyGstNo() {
		return partyGstNo;
	}

	public void setPartyGstNo(Integer partyGstNo) {
		this.partyGstNo = partyGstNo;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getId() {
		return id;
	}

	public String getGrnDate() {
		return grnDate;
	}

	public String getPurchaseOrder() {
		return purchaseOrder;
	}

	public String getGrnSupplierName() {
		return grnSupplierName;
	}

	public String getGrnSupplierState() {
		return grnSupplierState;
	}

	public Integer getGrnSupplierStateId() {
		return grnSupplierStateId;
	}

	public void setGrnSupplierStateId(Integer grnSupplierStateId) {
		this.grnSupplierStateId = grnSupplierStateId;
	}

	public String getGrnSupplierMobile() {
		return grnSupplierMobile;
	}

	public String getGrnSeries() {
		return grnSeries;
	}

	public String getGrnSeriesVal() {
		return grnSeriesVal;
	}

	public String getGrnReferenceNo() {
		return grnReferenceNo;
	}

	public String getGrnPurchaseInvoiceNo() {
		return grnPurchaseInvoiceNo;
	}

	public String getGrnPurchaseInvoiceNoOne() {
		return grnPurchaseInvoiceNoOne;
	}

	public String getGrnDeliveryDate() {
		return grnDeliveryDate;
	}

	public String getGrnSupplierAddress() {
		return grnSupplierAddress;
	}

	public String getGrnStatus() {
		return grnStatus;
	}

	public String getGrnDeliveryChallanNumber() {
		return grnDeliveryChallanNumber;
	}

	public String getGrnDeliveryChallanNumberOne() {
		return grnDeliveryChallanNumberOne;
	}

	public String getPurchaseOrderNumber() {
		return purchaseOrderNumber;
	}

	public String getIsWithoutPoGrn() {
		return isWithoutPoGrn;
	}

	public Integer getTotalItemQuantity() {
		return totalItemQuantity;
	}

	public double getTotalItemDiscount() {
		return totalItemDiscount;
	}

	public double getTotalItemPendingQty() {
		return totalItemPendingQty;
	}

	public Double getLessSpecialDiscount() {
		return lessSpecialDiscount;
	}

	public Double getLessDebitAmount() {
		return lessDebitAmount;
	}

	public Double getLessCDPercent1() {
		return lessCDPercent1;
	}

	public Double getLessCDPercent2() {
		return lessCDPercent2;
	}

	public Double getAddOctroi() {
		return addOctroi;
	}

	public Double getAddSurcharge() {
		return addSurcharge;
	}

	public Double getAddCreditAmount() {
		return addCreditAmount;
	}

	public Double getAddFreight() {
		return addFreight;
	}

	public Double getTaxVat() {
		return taxVat;
	}

	public Double getTaxLBT() {
		return taxLBT;
	}

	public Double getTaxCST() {
		return taxCST;
	}

	public Double getTaxExVat() {
		return taxExVat;
	}

	public Double getTaxTotalTaxes() {
		return taxTotalTaxes;
	}

	public Double getSumofCharges() {
		return sumofCharges;
	}

	public String getRermark() {
		return rermark;
	}

	public Double getGrossAmount() {
		return grossAmount;
	}

	public Double getGrossLessAmount() {
		return grossLessAmount;
	}

	public Double getGrossAddAmount() {
		return grossAddAmount;
	}

	public Double getGrossTaxes() {
		return grossTaxes;
	}

	public Double getGrossNetAmount() {
		return grossNetAmount;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public List<GoodReceiptNoteDto> getLstGoodReceiptNoteDto() {
		return lstGoodReceiptNoteDto;
	}

	public List<GoodReceiptNoteItemDto> getLstGoodReceiptNoteItemDto() {
		return lstGoodReceiptNoteItemDto;
	}

	public PartyMasterDto getPartyMasterDto() {
		return partyMasterDto;
	}

	public List<PartyMasterContactInfoDto> getPartyMasterContactInfoDto() {
		return partyMasterContactInfoDto;
	}

	public List<PartyMasterAddressInfoDto> getPartyMasterAddressInfoDto() {
		return partyMasterAddressInfoDto;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setGrnDate(String grnDate) {
		this.grnDate = grnDate;
	}

	public void setPurchaseOrder(String purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	public void setGrnSupplierName(String grnSupplierName) {
		this.grnSupplierName = grnSupplierName;
	}

	public void setGrnSupplierState(String grnSupplierState) {
		this.grnSupplierState = grnSupplierState;
	}

	public void setGrnSupplierMobile(String grnSupplierMobile) {
		this.grnSupplierMobile = grnSupplierMobile;
	}

	public void setGrnSeries(String grnSeries) {
		this.grnSeries = grnSeries;
	}

	public void setGrnSeriesVal(String grnSeriesVal) {
		this.grnSeriesVal = grnSeriesVal;
	}

	public void setGrnReferenceNo(String grnReferenceNo) {
		this.grnReferenceNo = grnReferenceNo;
	}

	public void setGrnPurchaseInvoiceNo(String grnPurchaseInvoiceNo) {
		this.grnPurchaseInvoiceNo = grnPurchaseInvoiceNo;
	}

	public void setGrnPurchaseInvoiceNoOne(String grnPurchaseInvoiceNoOne) {
		this.grnPurchaseInvoiceNoOne = grnPurchaseInvoiceNoOne;
	}

	public void setGrnDeliveryDate(String grnDeliveryDate) {
		this.grnDeliveryDate = grnDeliveryDate;
	}

	public void setGrnSupplierAddress(String grnSupplierAddress) {
		this.grnSupplierAddress = grnSupplierAddress;
	}

	public void setGrnStatus(String grnStatus) {
		this.grnStatus = grnStatus;
	}

	public void setGrnDeliveryChallanNumber(String grnDeliveryChallanNumber) {
		this.grnDeliveryChallanNumber = grnDeliveryChallanNumber;
	}

	public void setGrnDeliveryChallanNumberOne(String grnDeliveryChallanNumberOne) {
		this.grnDeliveryChallanNumberOne = grnDeliveryChallanNumberOne;
	}

	public void setPurchaseOrderNumber(String purchaseOrderNumber) {
		this.purchaseOrderNumber = purchaseOrderNumber;
	}

	public void setIsWithoutPoGrn(String isWithoutPoGrn) {
		this.isWithoutPoGrn = isWithoutPoGrn;
	}

	public void setTotalItemQuantity(Integer totalItemQuantity) {
		this.totalItemQuantity = totalItemQuantity;
	}

	public void setTotalItemDiscount(double totalItemDiscount) {
		this.totalItemDiscount = totalItemDiscount;
	}

	public void setTotalItemPendingQty(double totalItemPendingQty) {
		this.totalItemPendingQty = totalItemPendingQty;
	}

	public void setLessSpecialDiscount(Double lessSpecialDiscount) {
		this.lessSpecialDiscount = lessSpecialDiscount;
	}

	public void setLessDebitAmount(Double lessDebitAmount) {
		this.lessDebitAmount = lessDebitAmount;
	}

	public void setLessCDPercent1(Double lessCDPercent1) {
		this.lessCDPercent1 = lessCDPercent1;
	}

	public void setLessCDPercent2(Double lessCDPercent2) {
		this.lessCDPercent2 = lessCDPercent2;
	}

	public void setAddOctroi(Double addOctroi) {
		this.addOctroi = addOctroi;
	}

	public void setAddSurcharge(Double addSurcharge) {
		this.addSurcharge = addSurcharge;
	}

	public void setAddCreditAmount(Double addCreditAmount) {
		this.addCreditAmount = addCreditAmount;
	}

	public void setAddFreight(Double addFreight) {
		this.addFreight = addFreight;
	}

	public void setTaxVat(Double taxVat) {
		this.taxVat = taxVat;
	}

	public void setTaxLBT(Double taxLBT) {
		this.taxLBT = taxLBT;
	}

	public void setTaxCST(Double taxCST) {
		this.taxCST = taxCST;
	}

	public void setTaxExVat(Double taxExVat) {
		this.taxExVat = taxExVat;
	}

	public void setTaxTotalTaxes(Double taxTotalTaxes) {
		this.taxTotalTaxes = taxTotalTaxes;
	}

	public void setSumofCharges(Double sumofCharges) {
		this.sumofCharges = sumofCharges;
	}

	public void setRermark(String rermark) {
		this.rermark = rermark;
	}

	public void setGrossAmount(Double grossAmount) {
		this.grossAmount = grossAmount;
	}

	public void setGrossLessAmount(Double grossLessAmount) {
		this.grossLessAmount = grossLessAmount;
	}

	public void setGrossAddAmount(Double grossAddAmount) {
		this.grossAddAmount = grossAddAmount;
	}

	public void setGrossTaxes(Double grossTaxes) {
		this.grossTaxes = grossTaxes;
	}

	public void setGrossNetAmount(Double grossNetAmount) {
		this.grossNetAmount = grossNetAmount;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public void setLstGoodReceiptNoteDto(
			List<GoodReceiptNoteDto> lstGoodReceiptNoteDto) {
		this.lstGoodReceiptNoteDto = lstGoodReceiptNoteDto;
	}

	public void setLstGoodReceiptNoteItemDto(
			List<GoodReceiptNoteItemDto> lstGoodReceiptNoteItemDto) {
		this.lstGoodReceiptNoteItemDto = lstGoodReceiptNoteItemDto;
	}

	public void setPartyMasterDto(PartyMasterDto partyMasterDto) {
		this.partyMasterDto = partyMasterDto;
	}

	public List<PartyMasterGeneralInfoDto> getPartyMasterGeneralInfoDto() {
		return partyMasterGeneralInfoDto;
	}

	public void setPartyMasterGeneralInfoDto(
			List<PartyMasterGeneralInfoDto> partyMasterGeneralInfoDto) {
		this.partyMasterGeneralInfoDto = partyMasterGeneralInfoDto;
	}

	public void setPartyMasterContactInfoDto(
			List<PartyMasterContactInfoDto> partyMasterContactInfoDto) {
		this.partyMasterContactInfoDto = partyMasterContactInfoDto;
	}

	public void setPartyMasterAddressInfoDto(
			List<PartyMasterAddressInfoDto> partyMasterAddressInfoDto) {
		this.partyMasterAddressInfoDto = partyMasterAddressInfoDto;
	}

	public List<TermsAndConditionInfoDto> getTermsAndConditionInfoDto() {
		return termsAndConditionInfoDto;
	}

	public void setTermsAndConditionInfoDto(
			List<TermsAndConditionInfoDto> termsAndConditionInfoDto) {
		this.termsAndConditionInfoDto = termsAndConditionInfoDto;
	}

	public Double getItemTotalAmt() {
		return itemTotalAmt;
	}

	public Double getTotalIgstAmount() {
		return totalIgstAmount;
	}

	public void setTotalIgstAmount(Double totalIgstAmount) {
		this.totalIgstAmount = totalIgstAmount;
	}

	public void setItemTotalAmt(Double itemTotalAmt) {
		this.itemTotalAmt = itemTotalAmt;
	}
	
	public List<ItemAssetMaintenanceDto> getLstItemAssetMaintenanceDto() {
		return lstItemAssetMaintenanceDto;
	}

	public void setLstItemAssetMaintenanceDto(
			List<ItemAssetMaintenanceDto> lstItemAssetMaintenanceDto) {
		this.lstItemAssetMaintenanceDto = lstItemAssetMaintenanceDto;
	}
	
	public List<ItemAssetMaintenanceMasterDto> getLstItemAssetMaintenanceMasterDto() {
		return lstItemAssetMaintenanceMasterDto;
	}

	public void setLstItemAssetMaintenanceMasterDto(
			List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMasterDto) {
		this.lstItemAssetMaintenanceMasterDto = lstItemAssetMaintenanceMasterDto;
	}

	@Override
	public String toString() {
		return "GoodReceiptNoteDto [id=" + id + ", grnDate=" + grnDate
				+ ", purchaseOrder=" + purchaseOrder + ", grnSupplierName="
				+ grnSupplierName + ", grnSupplierState=" + grnSupplierState
				+ ", grnSupplierStateId=" + grnSupplierStateId
				+ ", grnSupplierMobile=" + grnSupplierMobile + ", grnSeries="
				+ grnSeries + ", grnSeriesVal=" + grnSeriesVal
				+ ", grnReferenceNo=" + grnReferenceNo
				+ ", grnPurchaseInvoiceNo=" + grnPurchaseInvoiceNo
				+ ", grnPurchaseInvoiceNoOne=" + grnPurchaseInvoiceNoOne
				+ ", grnDeliveryDate=" + grnDeliveryDate
				+ ", grnSupplierAddress=" + grnSupplierAddress + ", grnStatus="
				+ grnStatus + ", grnDeliveryChallanNumber="
				+ grnDeliveryChallanNumber + ", grnDeliveryChallanNumberOne="
				+ grnDeliveryChallanNumberOne + ", purchaseOrderNumber="
				+ purchaseOrderNumber + ", isWithoutPoGrn=" + isWithoutPoGrn
				+ ", totalItemQuantity=" + totalItemQuantity
				+ ", totalItemDiscount=" + totalItemDiscount
				+ ", totalItemPendingQty=" + totalItemPendingQty
				+ ", lessSpecialDiscount=" + lessSpecialDiscount
				+ ", lessDebitAmount=" + lessDebitAmount + ", lessCDPercent1="
				+ lessCDPercent1 + ", lessCDPercent2=" + lessCDPercent2
				+ ", addOctroi=" + addOctroi + ", addSurcharge=" + addSurcharge
				+ ", addCreditAmount=" + addCreditAmount + ", addFreight="
				+ addFreight + ", taxVat=" + taxVat + ", taxLBT=" + taxLBT
				+ ", taxCST=" + taxCST + ", taxExVat=" + taxExVat
				+ ", taxTotalTaxes=" + taxTotalTaxes + ", sumofCharges="
				+ sumofCharges + ", rermark=" + rermark + ", grossAmount="
				+ grossAmount + ", grossLessAmount=" + grossLessAmount
				+ ", grossAddAmount=" + grossAddAmount + ", grossTaxes="
				+ grossTaxes + ", grossNetAmount=" + grossNetAmount
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", partyGstNo=" + partyGstNo + ", itemTotalAmt="
				+ itemTotalAmt + ", totalIgstAmount=" + totalIgstAmount
				+ ", totalgstAmount=" + totalgstAmount + ", isDraft=" + isDraft
				+ ", isPending=" + isPending + ", noOfPages=" + noOfPages
				+ ", lstGoodReceiptNoteDto=" + lstGoodReceiptNoteDto
				+ ", lstGoodReceiptNoteItemDto=" + lstGoodReceiptNoteItemDto
				+ ", partyMasterDto="
				+ partyMasterDto + ", partyMasterContactInfoDto="
				+ partyMasterContactInfoDto + ", partyMasterGeneralInfoDto="
				+ partyMasterGeneralInfoDto + ", partyMasterAddressInfoDto="
				+ partyMasterAddressInfoDto + ", termsAndConditionInfoDto="
				+ termsAndConditionInfoDto + "]";
	}

}
