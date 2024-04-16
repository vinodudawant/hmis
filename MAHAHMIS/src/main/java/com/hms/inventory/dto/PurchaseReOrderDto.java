package com.hms.inventory.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
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
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;


@Entity
@Component
@Table(name="inv_purchase_reorder_new")
public class PurchaseReOrderDto implements Serializable{
	
	@Transient
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	@CreationTimestamp
	@Column(name="created_date_time" ,updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="created_by",updatable = false)
	private int createdBy;
	
	@Column(name="updated_by")
	private int updatedBy;
	
	@Column(name="deleted_by")
	private int deleted_by;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "plain_po_status",columnDefinition="varchar(2) default 'N'")
	private String plainPOStatus="N";
	
	@Column(name="order_place_flag")
	private Integer orderPlaceFlag;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name="unit_id")
	private Integer unitId;

	@Column(name="supplier_name")
	private String supplierName;
	
	//added by Rohit
	@Column(name="supplier_id")
	private Integer supplierId;
	
	@Column(name="order_no")
	private String orderNo;
	
	@Column(name="supplier_mobile_no")
	private String supplierMobileNo;
	
	@Column(name="reference_no")
	private String referenceNo;
	
	
	@Column(name="order_date")
	private String orderDate;
	
	
	@Column(name="delivery_date")
	private String deliveryDate;
	
	@Column(name="supplier_address")
	private String supplierAddress;
	
	@Column(name="order_series")
	private String orderSeries;
	
	@Column(name="supplier_state")
	private String supplierState;
	
	// this is added by vishnu  for select state of vender 
	@Column(name = "supplier_state_id")
	private Integer supplierStateId;

	@Column(name="get_quotation")
	private String getQuotation;
	
	@Column(name="total_item_quantity")
	private Integer totalItemQuantity;
	
	@Column(name="total_item_discount")
	private double totalItemDiscount;
	
	@Column(name="purchase_quotation_number")
	private String purchaseQuotationNumber;
	
	@Column(name="order_status")
	private String orderStatus;
	
	/*@Column(name="purchase_order_terms_and_conditions")
	private String termsAndConditions;*/
	
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
	
	@Column(name="purchase_order_remark")
	private String purchaseOrderRemark;
	
	@Column(name="item_total_amt")
	private Double itemTotalAmt;// 27-2-2020 added by dayanand to save total base amount + total tax amount	
	
	@Column(name="item_igst_total_amt")
	private Double totalIgstAmount;// 28-2-2020 added by dayanand to save total igst tax amount	
	
	@Column(name="item_gst_total_amt")
	private Double totalgstAmount;// 28-2-2020 added by dayanand to save total gst tax amount	
	
	
	@Column(name="igst_total_value")
	private Double igstTotalValue;
	
	@Column(name="part_gst_no")
	private String partGstNo;
	
	@Column(name="is_po_used",columnDefinition="varchar(2) default 'N'")
	private String isPoUsed="N";
	
	public Double getItemTotalAmt() {
		return itemTotalAmt;
	}
	public void setItemTotalAmt(Double itemTotalAmt) {
		this.itemTotalAmt = itemTotalAmt;
	}
	public Double getTotalIgstAmount() {
		return totalIgstAmount;
	}
	public void setTotalIgstAmount(Double totalIgstAmount) {
		this.totalIgstAmount = totalIgstAmount;
	}
	public Double getTotalgstAmount() {
		return totalgstAmount;
	}
	public void setTotalgstAmount(Double totalgstAmount) {
		this.totalgstAmount = totalgstAmount;
	}
	public String getPartGstNo() {
		return partGstNo;
	}
	public void setPartGstNo(String partGstNo) {
		this.partGstNo = partGstNo;
	}
	
	public String getIsPoUsed() {
		return isPoUsed;
	}
	public void setIsPoUsed(String isPoUsed) {
		this.isPoUsed = isPoUsed;
	}

	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="purchase_reorder_master_id")
	private List<PurchaseReOrderItemSlaveDto> purchaseReOrderItemSlaveDto;

	@OneToOne(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="party_master_id")
	private PartyMasterDto partyMasterDtos;
	
	@Transient
	private List<PurchaseReOrderDto> purchaseReOrderDtos;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}
	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	public int getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}
	public int getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public String getPlainPOStatus() {
		return plainPOStatus;
	}
	public void setPlainPOStatus(String plainPOStatus) {
		this.plainPOStatus = plainPOStatus;
	}
	public Integer getOrderPlaceFlag() {
		return orderPlaceFlag;
	}
	public void setOrderPlaceFlag(Integer orderPlaceFlag) {
		this.orderPlaceFlag = orderPlaceFlag;
	}
	public Date getDeletedDate() {
		return deletedDate;
	}
	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public Integer getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(Integer supplierId) {
		this.supplierId = supplierId;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getSupplierMobileNo() {
		return supplierMobileNo;
	}
	public void setSupplierMobileNo(String supplierMobileNo) {
		this.supplierMobileNo = supplierMobileNo;
	}
	public String getReferenceNo() {
		return referenceNo;
	}
	public void setReferenceNo(String referenceNo) {
		this.referenceNo = referenceNo;
	}
	public String getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}
	public String getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public String getSupplierAddress() {
		return supplierAddress;
	}
	public void setSupplierAddress(String supplierAddress) {
		this.supplierAddress = supplierAddress;
	}
	public String getOrderSeries() {
		return orderSeries;
	}
	public void setOrderSeries(String orderSeries) {
		this.orderSeries = orderSeries;
	}
	public String getSupplierState() {
		return supplierState;
	}
	public void setSupplierState(String supplierState) {
		this.supplierState = supplierState;
	}
	public Integer getSupplierStateId() {
		return supplierStateId;
	}
	public void setSupplierStateId(Integer supplierStateId) {
		this.supplierStateId = supplierStateId;
	}
	public String getGetQuotation() {
		return getQuotation;
	}
	public void setGetQuotation(String getQuotation) {
		this.getQuotation = getQuotation;
	}
	public Integer getTotalItemQuantity() {
		return totalItemQuantity;
	}
	public void setTotalItemQuantity(Integer totalItemQuantity) {
		this.totalItemQuantity = totalItemQuantity;
	}
	public double getTotalItemDiscount() {
		return totalItemDiscount;
	}
	public void setTotalItemDiscount(double totalItemDiscount) {
		this.totalItemDiscount = totalItemDiscount;
	}
	public String getPurchaseQuotationNumber() {
		return purchaseQuotationNumber;
	}
	public void setPurchaseQuotationNumber(String purchaseQuotationNumber) {
		this.purchaseQuotationNumber = purchaseQuotationNumber;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public Double getLessSpecialDiscount() {
		return lessSpecialDiscount;
	}
	public void setLessSpecialDiscount(Double lessSpecialDiscount) {
		this.lessSpecialDiscount = lessSpecialDiscount;
	}
	public Double getLessDebitAmount() {
		return lessDebitAmount;
	}
	public void setLessDebitAmount(Double lessDebitAmount) {
		this.lessDebitAmount = lessDebitAmount;
	}
	public Double getLessCDPercent1() {
		return lessCDPercent1;
	}
	public void setLessCDPercent1(Double lessCDPercent1) {
		this.lessCDPercent1 = lessCDPercent1;
	}
	public Double getLessCDPercent2() {
		return lessCDPercent2;
	}
	public void setLessCDPercent2(Double lessCDPercent2) {
		this.lessCDPercent2 = lessCDPercent2;
	}
	public Double getAddOctroi() {
		return addOctroi;
	}
	public void setAddOctroi(Double addOctroi) {
		this.addOctroi = addOctroi;
	}
	public Double getAddSurcharge() {
		return addSurcharge;
	}
	public void setAddSurcharge(Double addSurcharge) {
		this.addSurcharge = addSurcharge;
	}
	public Double getAddCreditAmount() {
		return addCreditAmount;
	}
	public void setAddCreditAmount(Double addCreditAmount) {
		this.addCreditAmount = addCreditAmount;
	}
	public Double getAddFreight() {
		return addFreight;
	}
	public void setAddFreight(Double addFreight) {
		this.addFreight = addFreight;
	}
	public Double getTaxVat() {
		return taxVat;
	}
	public void setTaxVat(Double taxVat) {
		this.taxVat = taxVat;
	}
	public Double getTaxLBT() {
		return taxLBT;
	}
	public void setTaxLBT(Double taxLBT) {
		this.taxLBT = taxLBT;
	}
	public Double getTaxCST() {
		return taxCST;
	}
	public void setTaxCST(Double taxCST) {
		this.taxCST = taxCST;
	}
	public Double getTaxExVat() {
		return taxExVat;
	}
	public void setTaxExVat(Double taxExVat) {
		this.taxExVat = taxExVat;
	}
	public Double getTaxTotalTaxes() {
		return taxTotalTaxes;
	}
	public void setTaxTotalTaxes(Double taxTotalTaxes) {
		this.taxTotalTaxes = taxTotalTaxes;
	}
	public Double getGrossAmount() {
		return grossAmount;
	}
	public void setGrossAmount(Double grossAmount) {
		this.grossAmount = grossAmount;
	}
	public Double getGrossLessAmount() {
		return grossLessAmount;
	}
	public void setGrossLessAmount(Double grossLessAmount) {
		this.grossLessAmount = grossLessAmount;
	}
	public Double getGrossAddAmount() {
		return grossAddAmount;
	}
	public void setGrossAddAmount(Double grossAddAmount) {
		this.grossAddAmount = grossAddAmount;
	}
	public Double getGrossTaxes() {
		return grossTaxes;
	}
	public void setGrossTaxes(Double grossTaxes) {
		this.grossTaxes = grossTaxes;
	}
	public Double getGrossNetAmount() {
		return grossNetAmount;
	}
	public void setGrossNetAmount(Double grossNetAmount) {
		this.grossNetAmount = grossNetAmount;
	}
	public String getPurchaseOrderRemark() {
		return purchaseOrderRemark;
	}
	public void setPurchaseOrderRemark(String purchaseOrderRemark) {
		this.purchaseOrderRemark = purchaseOrderRemark;
	}
	public Double getIgstTotalValue() {
		return igstTotalValue;
	}
	public void setIgstTotalValue(Double igstTotalValue) {
		this.igstTotalValue = igstTotalValue;
	}
	public List<PurchaseReOrderItemSlaveDto> getPurchaseReOrderItemSlaveDto() {
		return purchaseReOrderItemSlaveDto;
	}
	public void setPurchaseReOrderItemSlaveDto(
			List<PurchaseReOrderItemSlaveDto> purchaseReOrderItemSlaveDto) {
		this.purchaseReOrderItemSlaveDto = purchaseReOrderItemSlaveDto;
	}
	public PartyMasterDto getPartyMasterDtos() {
		return partyMasterDtos;
	}
	public void setPartyMasterDtos(PartyMasterDto partyMasterDtos) {
		this.partyMasterDtos = partyMasterDtos;
	}
	public List<PurchaseReOrderDto> getPurchaseReOrderDtos() {
		return purchaseReOrderDtos;
	}
	public void setPurchaseReOrderDtos(List<PurchaseReOrderDto> purchaseReOrderDtos) {
		this.purchaseReOrderDtos = purchaseReOrderDtos;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Override
	public String toString() {
		return "PurchaseReOrderDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by
				+ ", deleted=" + deleted + ", plainPOStatus=" + plainPOStatus
				+ ", orderPlaceFlag=" + orderPlaceFlag + ", deletedDate="
				+ deletedDate + ", unitId=" + unitId + ", supplierName="
				+ supplierName + ", supplierId=" + supplierId + ", orderNo="
				+ orderNo + ", supplierMobileNo=" + supplierMobileNo
				+ ", referenceNo=" + referenceNo + ", orderDate=" + orderDate
				+ ", deliveryDate=" + deliveryDate + ", supplierAddress="
				+ supplierAddress + ", orderSeries=" + orderSeries
				+ ", supplierState=" + supplierState + ", supplierStateId="
				+ supplierStateId + ", getQuotation=" + getQuotation
				+ ", totalItemQuantity=" + totalItemQuantity
				+ ", totalItemDiscount=" + totalItemDiscount
				+ ", purchaseQuotationNumber=" + purchaseQuotationNumber
				+ ", orderStatus=" + orderStatus + ", lessSpecialDiscount="
				+ lessSpecialDiscount + ", lessDebitAmount=" + lessDebitAmount
				+ ", lessCDPercent1=" + lessCDPercent1 + ", lessCDPercent2="
				+ lessCDPercent2 + ", addOctroi=" + addOctroi
				+ ", addSurcharge=" + addSurcharge + ", addCreditAmount="
				+ addCreditAmount + ", addFreight=" + addFreight + ", taxVat="
				+ taxVat + ", taxLBT=" + taxLBT + ", taxCST=" + taxCST
				+ ", taxExVat=" + taxExVat + ", taxTotalTaxes=" + taxTotalTaxes
				+ ", grossAmount=" + grossAmount + ", grossLessAmount="
				+ grossLessAmount + ", grossAddAmount=" + grossAddAmount
				+ ", grossTaxes=" + grossTaxes + ", grossNetAmount="
				+ grossNetAmount + ", purchaseOrderRemark="
				+ purchaseOrderRemark + ", itemTotalAmt=" + itemTotalAmt
				+ ", totalIgstAmount=" + totalIgstAmount + ", totalgstAmount="
				+ totalgstAmount + ", igstTotalValue=" + igstTotalValue
				+ ", partGstNo=" + partGstNo + ", isPoUsed=" + isPoUsed
				+ ", purchaseReOrderItemSlaveDto="
				+ purchaseReOrderItemSlaveDto + ", partyMasterDtos="
				+ partyMasterDtos + ", purchaseReOrderDtos="
				+ purchaseReOrderDtos + "]";
	}
	
}
