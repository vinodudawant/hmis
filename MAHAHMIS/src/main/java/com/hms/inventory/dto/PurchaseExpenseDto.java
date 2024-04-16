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
import org.springframework.stereotype.Component;



@Entity
@Component
@Table(name="inv_purchase_expense_new")
public class PurchaseExpenseDto implements Serializable{
	
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
	private int orderPlaceFlag;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name="unit_id")
	private Integer unitId;

	@Column(name="supplier_name")
	private String supplierName;
	
	@Column(name="supplier_mobile_no")
	private String supplierMobileNo;
	
	@Column(name="reference_no")
	private String referenceNo;
	
	@Column(name="supplier_address")
	private String supplierAddress;
	
	@Column(name="supplier_state")
	private String supplierState;
	
	@Column(name="expense_date")
	private String expenseDate;
	
	@Column(name="bill_date")
	private String billDate;
	
	@Column(name="challan_no")
	private String challanNo;
	
	@Column(name="total_item_quantity")
	private Integer totalItemQuantity;
	
	@Column(name="total_item_discount")
	private double totalItemDiscount;
	
	@Column(name="purchase_quotation_number")
	private String purchaseQuotationNumber;
	
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
	
	@Column(name="purchase_expense_remark")
	private String purchaseExpenseRemark;
	
	@Column(name = "party_master_id")
	private Integer partyMasterId;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="purchase_expense_master_id")
	private List<PurchaseExpenseItemSlaveDto> purchaseExpenseItemSlaveDto;
	
//	@OneToOne(cascade=CascadeType.ALL)
//	@LazyCollection(value=LazyCollectionOption.FALSE)
//	@JoinColumn(name="party_master_id")
//	private PartyMasterDto partyMasterDtos;
	
	@Transient
	private List<PurchaseExpenseDto> purchaseExpenseDtos;

	public Integer getPartyMasterId() {
		return partyMasterId;
	}

	public void setPartyMasterId(Integer partyMasterId) {
		this.partyMasterId = partyMasterId;
	}

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

	public int getOrderPlaceFlag() {
		return orderPlaceFlag;
	}

	public void setOrderPlaceFlag(int orderPlaceFlag) {
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

	public String getSupplierAddress() {
		return supplierAddress;
	}

	public void setSupplierAddress(String supplierAddress) {
		this.supplierAddress = supplierAddress;
	}

	public String getSupplierState() {
		return supplierState;
	}

	public void setSupplierState(String supplierState) {
		this.supplierState = supplierState;
	}

	public String getExpenseDate() {
		return expenseDate;
	}

	public void setExpenseDate(String expenseDate) {
		this.expenseDate = expenseDate;
	}

	public String getBillDate() {
		return billDate;
	}

	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}

	public String getChallanNo() {
		return challanNo;
	}

	public void setChallanNo(String challanNo) {
		this.challanNo = challanNo;
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

	public String getPurchaseExpenseRemark() {
		return purchaseExpenseRemark;
	}

	public void setPurchaseExpenseRemark(String purchaseExpenseRemark) {
		this.purchaseExpenseRemark = purchaseExpenseRemark;
	}

	public List<PurchaseExpenseItemSlaveDto> getPurchaseExpenseItemSlaveDto() {
		return purchaseExpenseItemSlaveDto;
	}

	public void setPurchaseExpenseItemSlaveDto(
			List<PurchaseExpenseItemSlaveDto> purchaseExpenseItemSlaveDto) {
		this.purchaseExpenseItemSlaveDto = purchaseExpenseItemSlaveDto;
	}

//	public PartyMasterDto getPartyMasterDtos() {
//		return partyMasterDtos;
//	}
//
//	public void setPartyMasterDtos(PartyMasterDto partyMasterDtos) {
//		this.partyMasterDtos = partyMasterDtos;
//	}

	public List<PurchaseExpenseDto> getPurchaseExpenseDtos() {
		return purchaseExpenseDtos;
	}

	public void setPurchaseExpenseDtos(List<PurchaseExpenseDto> purchaseExpenseDtos) {
		this.purchaseExpenseDtos = purchaseExpenseDtos;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	

}
