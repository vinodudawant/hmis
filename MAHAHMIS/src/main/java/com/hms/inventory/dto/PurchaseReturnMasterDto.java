package com.hms.inventory.dto;

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

@Entity
@Table(name = "inv_purchase_return_master_new")
public class PurchaseReturnMasterDto {
	@Id
	@GeneratedValue
	@Column(name = "purchase_return_id")
	private Integer purchaseReturnMasterId;

	@Column(name = "mobile_number")
	private String mobileNumber;

	@Column(name = "reference_number")
	private Integer referenceNumber;

	@Column(name = "return_date")
	private String returnDate;

	@Column(name = "delivery_date")
	private String deleviryDate;

	@Column(name = "supplier_address")
	private String supplierAddress;

	@Column(name = "supplier_name")
	private String supplierName;

	@Column(name = "return_series")
	private String returnSeries;

	@Column(name = "return_status")
	private Integer returnStatus;

	@Column(name = "return_status_name")
	private String returnStatusName;

	@Column(name = "supplier_state")
	private String supplierState;

	@Column(name = "quotation_expiry_date")
	private String quotationExDate;

	@Column(name = "return_number")
	private Integer returnNo;

	@Column(name = "purchase_invoice_id")
	private Integer purchaseInvoiceId;

	@Column(name = "out_ward_no")
	private Integer outWardNo;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "igst_total_amount")
	private Double igstTotalAmount;

	@Column(name = "gross_amount")
	private Double grossAmount;

	@Column(name = "gross_total_amount")
	private Double grossTotalAmount;

	@Column(name = "special_discount")
	private Double specialDiscount;

	@Column(name = "debit_amount")
	private Double debitAmount;

	@Column(name = "cd_percentage")
	private Double cdPercentage;

	@Column(name = "cd_amount")
	private Double cdAmount;

	@Column(name = "octroi")
	private Double octroi;

	@Column(name = "surcharge")
	private Double surcharge;

	@Column(name = "creditAmount")
	private Double creditAmount;

	@Column(name = "freight")
	private Double freight;

	@Column(name = "vat")
	private Double vat;

	@Column(name = "lbt")
	private Double lbt;

	@Column(name = "cst")
	private Double cst;

	@Column(name = "exVat")
	private Double exVat;

	@Column(name = "totalTax")
	private Double totalTax;

	@Column(name = "less")
	private Double less;

	@Column(name = "add_amount")
	private Double addAmount;

	@Column(name = "total_item_quantity")
	private Double totalItem;

	@Column(name = "total_item_discount")
	private Double totalItemDiscount;

	@Column(name = "partyid")
	private Integer partyId;

	@Column(name = "purchase_return_series")
	private String purchaseReturnSeries;

	@Column(name = "inv_grn_id")
	private Integer invGRNId;

	public Integer getInvGRNId() {
		return invGRNId;
	}

	public void setInvGRNId(Integer invGRNId) {
		this.invGRNId = invGRNId;
	}

	public Double getTotalItem() {
		return totalItem;
	}

	public void setTotalItem(Double totalItem) {
		this.totalItem = totalItem;
	}

	public Double getTotalItemDiscount() {
		return totalItemDiscount;
	}

	public void setTotalItemDiscount(Double totalItemDiscount) {
		this.totalItemDiscount = totalItemDiscount;
	}

	public Integer getPartyId() {
		return partyId;
	}

	public void setPartyId(Integer partyId) {
		this.partyId = partyId;
	}

	public String getPurchaseReturnSeries() {
		return purchaseReturnSeries;
	}

	public void setPurchaseReturnSeries(String purchaseReturnSeries) {
		this.purchaseReturnSeries = purchaseReturnSeries;
	}

	@Transient
	private List<PurchaseReturnMasterDto> lstpurchasereturnmasterDto;

	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "quotation_master_id", nullable = false)
	private List<PurchaseReturnItemInfoDto> lstpurchasereturnitemInfoDto;

	@OneToOne(cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "party_master_id")
	private PartyMasterDto partymasterdto;

	public Integer getOutWardNo() {
		return outWardNo;
	}

	public void setOutWardNo(Integer outWardNo) {
		this.outWardNo = outWardNo;
	}

	public Integer getPurchaseReturnMasterId() {
		return purchaseReturnMasterId;
	}

	public void setPurchaseReturnMasterId(Integer purchaseReturnMasterId) {
		this.purchaseReturnMasterId = purchaseReturnMasterId;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public Integer getReferenceNumber() {
		return referenceNumber;
	}

	public void setReferenceNumber(Integer referenceNumber) {
		this.referenceNumber = referenceNumber;
	}

	public String getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}

	public String getDeleviryDate() {
		return deleviryDate;
	}

	public void setDeleviryDate(String deleviryDate) {
		this.deleviryDate = deleviryDate;
	}

	public String getSupplierAddress() {
		return supplierAddress;
	}

	public void setSupplierAddress(String supplierAddress) {
		this.supplierAddress = supplierAddress;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getReturnSeries() {
		return returnSeries;
	}

	public void setReturnSeries(String returnSeries) {
		this.returnSeries = returnSeries;
	}

	public Integer getReturnStatus() {
		return returnStatus;
	}

	public void setReturnStatus(Integer returnStatus) {
		this.returnStatus = returnStatus;
	}

	public String getSupplierState() {
		return supplierState;
	}

	public void setSupplierState(String supplierState) {
		this.supplierState = supplierState;
	}

	public String getQuotationExDate() {
		return quotationExDate;
	}

	public void setQuotationExDate(String quotationExDate) {
		this.quotationExDate = quotationExDate;
	}

	public Integer getReturnNo() {
		return returnNo;
	}

	public void setReturnNo(Integer returnNo) {
		this.returnNo = returnNo;
	}

	public Integer getPurchaseInvoiceId() {
		return purchaseInvoiceId;
	}

	public void setPurchaseInvoiceId(Integer purchaseInvoiceId) {
		this.purchaseInvoiceId = purchaseInvoiceId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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

	public Double getIgstTotalAmount() {
		return igstTotalAmount;
	}

	public void setIgstTotalAmount(Double igstTotalAmount) {
		this.igstTotalAmount = igstTotalAmount;
	}

	public Double getGrossAmount() {
		return grossAmount;
	}

	public void setGrossAmount(Double grossAmount) {
		this.grossAmount = grossAmount;
	}

	public Double getGrossTotalAmount() {
		return grossTotalAmount;
	}

	public void setGrossTotalAmount(Double grossTotalAmount) {
		this.grossTotalAmount = grossTotalAmount;
	}

	public Double getSpecialDiscount() {
		return specialDiscount;
	}

	public void setSpecialDiscount(Double specialDiscount) {
		this.specialDiscount = specialDiscount;
	}

	public Double getDebitAmount() {
		return debitAmount;
	}

	public void setDebitAmount(Double debitAmount) {
		this.debitAmount = debitAmount;
	}

	public Double getCdPercentage() {
		return cdPercentage;
	}

	public void setCdPercentage(Double cdPercentage) {
		this.cdPercentage = cdPercentage;
	}

	public Double getCdAmount() {
		return cdAmount;
	}

	public void setCdAmount(Double cdAmount) {
		this.cdAmount = cdAmount;
	}

	public Double getOctroi() {
		return octroi;
	}

	public void setOctroi(Double octroi) {
		this.octroi = octroi;
	}

	public Double getSurcharge() {
		return surcharge;
	}

	public void setSurcharge(Double surcharge) {
		this.surcharge = surcharge;
	}

	public Double getCreditAmount() {
		return creditAmount;
	}

	public void setCreditAmount(Double creditAmount) {
		this.creditAmount = creditAmount;
	}

	public Double getFreight() {
		return freight;
	}

	public void setFreight(Double freight) {
		this.freight = freight;
	}

	public Double getVat() {
		return vat;
	}

	public void setVat(Double vat) {
		this.vat = vat;
	}

	public Double getLbt() {
		return lbt;
	}

	public void setLbt(Double lbt) {
		this.lbt = lbt;
	}

	public Double getCst() {
		return cst;
	}

	public void setCst(Double cst) {
		this.cst = cst;
	}

	public Double getExVat() {
		return exVat;
	}

	public void setExVat(Double exVat) {
		this.exVat = exVat;
	}

	public Double getTotalTax() {
		return totalTax;
	}

	public void setTotalTax(Double totalTax) {
		this.totalTax = totalTax;
	}

	public Double getLess() {
		return less;
	}

	public void setLess(Double less) {
		this.less = less;
	}

	public Double getAddAmount() {
		return addAmount;
	}

	public void setAddAmount(Double addAmount) {
		this.addAmount = addAmount;
	}

	public List<PurchaseReturnMasterDto> getLstpurchasereturnmasterDto() {
		return lstpurchasereturnmasterDto;
	}

	public void setLstpurchasereturnmasterDto(List<PurchaseReturnMasterDto> lstpurchasereturnmasterDto) {
		this.lstpurchasereturnmasterDto = lstpurchasereturnmasterDto;
	}

	public List<PurchaseReturnItemInfoDto> getLstpurchasereturnitemInfoDto() {
		return lstpurchasereturnitemInfoDto;
	}

	public void setLstpurchasereturnitemInfoDto(List<PurchaseReturnItemInfoDto> lstpurchasereturnitemInfoDto) {
		this.lstpurchasereturnitemInfoDto = lstpurchasereturnitemInfoDto;
	}

	public PartyMasterDto getPartymasterdto() {
		return partymasterdto;
	}

	public void setPartymasterdto(PartyMasterDto partymasterdto) {
		this.partymasterdto = partymasterdto;
	}

	public String getReturnStatusName() {
		return returnStatusName;
	}

	public void setReturnStatusName(String returnStatusName) {
		this.returnStatusName = returnStatusName;
	}

}
