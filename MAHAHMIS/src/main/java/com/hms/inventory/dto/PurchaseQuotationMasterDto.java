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
@Table(name = "inv_purchase_quotation_master")
public class PurchaseQuotationMasterDto {
	@Id
	@GeneratedValue
	@Column(name = "purchase_quotation_id")
	private Integer purchaseQutationId;

	@Column(name = "mobile_number")
	private String mobileNumber;

	@Column(name = "reference_number")
	private Integer referenceNumber = 0;

	@Column(name = "quotation_date")
	private String quotationDate;

	@Column(name = "delivery_date")
	private String deleviryDate;

	@Column(name = "supplier_address")
	private String supplierAddress;

	@Column(name = "supplier_name")
	private String supplierName;

	@Column(name = "quotation_series")
	private Integer quotationSeries = 0;

	@Column(name = "quotation_status")
	private Integer quotationStatus = 0;

	@Column(name = "supplier_state")
	private Integer supplierState = 0;

	@Column(name = "supplier_state_name")
	private String supplierStateName;

	@Column(name = "quotation_expiry_date")
	private String quotationExDate;

	@Column(name = "quotation_number")
	private Integer quotationNo = 0;

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

	@Column(name = "term_and_condition")
	private String termandCondition;

	@Column(name = "igst_total_amount")
	private Double igstTotalAmount = 0.0;

	@Column(name = "gross_amount")
	private Double grossAmount = 0.0;

	@Column(name = "gross_total_amount")
	private Double grossTotalAmount = 0.0;

	@Column(name = "special_discount")
	private Double specialDiscount = 0.0;

	@Column(name = "debit_amount")
	private Double debitAmount = 0.0;

	@Column(name = "cd_percentage")
	private Double cdPercentage = 0.0;

	@Column(name = "cd_amount")
	private Double cdAmount = 0.0;

	@Column(name = "octroi")
	private Double octroi = 0.0;

	@Column(name = "surcharge")
	private Double surcharge;

	@Column(name = "creditAmount")
	private Double creditAmount = 0.0;

	@Column(name = "freight")
	private Double freight = 0.0;

	@Column(name = "vat")
	private Double vat = 0.0;

	@Column(name = "lbt")
	private Double lbt = 0.0;

	@Column(name = "cst")
	private Double cst = 0.0;

	@Column(name = "exVat")
	private Double exVat = 0.0;

	@Column(name = "totalTax")
	private Double totalTax = 0.0;

	@Column(name = "less")
	private Double less = 0.0;

	@Column(name = "add_amount")
	private Double addAmount = 0.0;

	@Column(name = "total_item")
	private Double totalItem = 0.0;

	@Column(name = "total_item_discount")
	private Double totalItemDiscount = 0.0;

	@Column(name = "item_total_amt", columnDefinition = " double default 0")
	private Double itemTotalAmt = 0.0;// 27-2-2020 added by dayanand to save
										// total base amount + total tax amount

	@Column(name = "item_igst_total_amt", columnDefinition = " double default 0")
	private Double totalIgstAmount = 0.0;// 28-2-2020 added by dayanand to save
											// total igst tax amount

	@Column(name = "item_gst_total_amt", columnDefinition = " double default 0")
	private Double totalgstAmount = 0.0;// 28-2-2020 added by dayanand to save
										// total gst tax amount
	
	@Column(name = "part_gst_no")
	private String partyGstNo;
	
	// this is added for isApproved by Vishnu on date 11-01-2020
	
	@Column(name = "is_approved", columnDefinition = "varchar(2) default 'N'")
	private String isApproved = "N";
	
	@Column(name = "approved_by_id")
	private Integer approvedById;
	
	@Column(name = "approved_by_name",columnDefinition="varchar(255) default 'N'")
	private String approvedByName;
	
	@Column(name="is_pq_used",columnDefinition="varchar(2) default 'N'")
	private String isPqUsed="N";
	
	@Transient
	private Integer count;

	@Transient
	private List<PurchaseQuotationMasterDto> lstpurchasequotationmasterDto;

	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "quotation_master_id", nullable = false)
	private List<PurchaseQuotationIntemInfoDto> lstpurchaseitemInfoDto;

	
	@OneToOne(cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "party_master_id")
	private PartyMasterDto partymasterdto;

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

	public String getPartyGstNo() {
		return partyGstNo;
	}

	public void setPartyGstNo(String partyGstNo) {
		this.partyGstNo = partyGstNo;
	}

	public Integer getPurchaseQutationId() {
		return purchaseQutationId;
	}

	public void setPurchaseQutationId(Integer purchaseQutationId) {
		this.purchaseQutationId = purchaseQutationId;
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

	public String getQuotationDate() {
		return quotationDate;
	}

	public void setQuotationDate(String quotationDate) {
		this.quotationDate = quotationDate;
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

	public Integer getQuotationSeries() {
		return quotationSeries;
	}

	public void setQuotationSeries(Integer quotationSeries) {
		this.quotationSeries = quotationSeries;
	}

	public Integer getQuotationStatus() {
		return quotationStatus;
	}

	public void setQuotationStatus(Integer quotationStatus) {
		this.quotationStatus = quotationStatus;
	}

	public Integer getSupplierState() {
		return supplierState;
	}

	public void setSupplierState(Integer supplierState) {
		this.supplierState = supplierState;
	}

	public String getSupplierStateName() {
		return supplierStateName;
	}

	public void setSupplierStateName(String supplierStateName) {
		this.supplierStateName = supplierStateName;
	}

	public String getQuotationExDate() {
		return quotationExDate;
	}

	public void setQuotationExDate(String quotationExDate) {
		this.quotationExDate = quotationExDate;
	}

	public Integer getQuotationNo() {
		return quotationNo;
	}

	public void setQuotationNo(Integer quotationNo) {
		this.quotationNo = quotationNo;
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

	public String getTermandCondition() {
		return termandCondition;
	}

	public void setTermandCondition(String termandCondition) {
		this.termandCondition = termandCondition;
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

	public String getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(String isApproved) {
		this.isApproved = isApproved;
	}
	
	public Integer getApprovedById() {
		return approvedById;
	}

	public void setApprovedById(Integer approvedById) {
		this.approvedById = approvedById;
	}

	public String getApprovedByName() {
		return approvedByName;
	}

	public void setApprovedByName(String approvedByName) {
		this.approvedByName = approvedByName;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public List<PurchaseQuotationMasterDto> getLstpurchasequotationmasterDto() {
		return lstpurchasequotationmasterDto;
	}

	public void setLstpurchasequotationmasterDto(
			List<PurchaseQuotationMasterDto> lstpurchasequotationmasterDto) {
		this.lstpurchasequotationmasterDto = lstpurchasequotationmasterDto;
	}

	public List<PurchaseQuotationIntemInfoDto> getLstpurchaseitemInfoDto() {
		return lstpurchaseitemInfoDto;
	}

	public void setLstpurchaseitemInfoDto(
			List<PurchaseQuotationIntemInfoDto> lstpurchaseitemInfoDto) {
		this.lstpurchaseitemInfoDto = lstpurchaseitemInfoDto;
	}

	public PartyMasterDto getPartymasterdto() {
		return partymasterdto;
	}

	public void setPartymasterdto(PartyMasterDto partymasterdto) {
		this.partymasterdto = partymasterdto;
	}
	
	public String getIsPqUsed() {
		return isPqUsed;
	}

	public void setIsPqUsed(String isPqUsed) {
		this.isPqUsed = isPqUsed;
	}

	@Override
	public String toString() {
		return "PurchaseQuotationMasterDto [purchaseQutationId="
				+ purchaseQutationId + ", mobileNumber=" + mobileNumber
				+ ", referenceNumber=" + referenceNumber + ", quotationDate="
				+ quotationDate + ", deleviryDate=" + deleviryDate
				+ ", supplierAddress=" + supplierAddress + ", supplierName="
				+ supplierName + ", quotationSeries=" + quotationSeries
				+ ", quotationStatus=" + quotationStatus + ", supplierState="
				+ supplierState + ", supplierStateName=" + supplierStateName
				+ ", quotationExDate=" + quotationExDate + ", quotationNo="
				+ quotationNo + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", termandCondition=" + termandCondition
				+ ", igstTotalAmount=" + igstTotalAmount + ", grossAmount="
				+ grossAmount + ", grossTotalAmount=" + grossTotalAmount
				+ ", specialDiscount=" + specialDiscount + ", debitAmount="
				+ debitAmount + ", cdPercentage=" + cdPercentage
				+ ", cdAmount=" + cdAmount + ", octroi=" + octroi
				+ ", surcharge=" + surcharge + ", creditAmount=" + creditAmount
				+ ", freight=" + freight + ", vat=" + vat + ", lbt=" + lbt
				+ ", cst=" + cst + ", exVat=" + exVat + ", totalTax="
				+ totalTax + ", less=" + less + ", addAmount=" + addAmount
				+ ", totalItem=" + totalItem + ", totalItemDiscount="
				+ totalItemDiscount + ", itemTotalAmt=" + itemTotalAmt
				+ ", totalIgstAmount=" + totalIgstAmount + ", totalgstAmount="
				+ totalgstAmount + ", partyGstNo=" + partyGstNo
				+ ", isApproved=" + isApproved + ", approvedById="
				+ approvedById + ", approvedByName=" + approvedByName
				+ ", isPqUsed=" + isPqUsed + ", count=" + count
				+ ", lstpurchasequotationmasterDto="
				+ lstpurchasequotationmasterDto + ", lstpurchaseitemInfoDto="
				+ lstpurchaseitemInfoDto + ", partymasterdto=" + partymasterdto
				+ "]";
	}

}
