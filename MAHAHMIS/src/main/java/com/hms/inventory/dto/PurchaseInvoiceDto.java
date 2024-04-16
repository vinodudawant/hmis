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
@Table(name = "inv_purchase_invoice")
public class PurchaseInvoiceDto implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "purchase_invoice_date")
	private String  purchaseInvoiceDate;
	
	@Column(name = "goods_receipt_note_no")
	private String goodsReceiptNoteNo;
	
	@Column(name = "goods_receipt_note_id",columnDefinition="int(11) default 0")
	private Integer goodsReceiptNoteId;
	
	@Column(name = "pur_inv_supplier_name")
	private String purInvSupplierName;
	
	@Column(name = "pur_inv_supplier_state")
	private String purInvSupplierState;
	
	@Column(name = "pur_inv_supplier_state_id")
	private String purInvSupplierStateId;
	
	@Column(name = "pur_inv_supplier_mobile")
	private String purInvSupplierMobile;
	
	@Column(name = "pur_inv_series")
	private String purInvSeries;
	
	@Column(name = "pur_inv_series_val")
	private String purInvSeriesVal;
	
	@Column(name ="pur_inv_reference_no")
	private String purInvReferenceNo;
	
	@Column(name ="pur_inv_delivery_date")
	private String purInvDeliveryDate;
	
	@Column(name = "pur_inv_supplier_address")
	private String purInvSupplierAddress;
	
	@Column(name = "pur_inv_status")
	private String purInvStatus;
	
	@Column(name="is_without_grn_pur_inv", columnDefinition="varchar(2) default 'N'")
	private String isWithoutGrnPurInv;
	
	@Column(name="total_item_quantity")
	private Integer totalItemQuantity;
	
	@Column(name="total_item_discount")
	private double totalItemDiscount;
	
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
	
	@Transient
	private List<PurchaseInvoiceDto> lstPurchaseInvoiceDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "pur_inv_master_id", nullable = false)
	private List<PurchaseInvoiceItemDto> lstPurchaseInvoiceItemDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "party_master_id", nullable = false)
	private PartyMasterDto partyMasterDto;
	
	@Transient
	private List<PartyMasterContactInfoDto> partyMasterContactInfoDto;
	
	@Transient
	private List<PartyMasterAddressInfoDto> partyMasterAddressInfoDto;
	
	@Transient
	private List<PartyMasterGeneralInfoDto> partyMasterGeneralInfoDto;

	@Transient
	private List<TermsAndConditionInfoDto> termsAndConditionInfoDto;
	

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getId() {
		return id;
	}

	public String getPurchaseInvoiceDate() {
		return purchaseInvoiceDate;
	}

	public String getGoodsReceiptNoteNo() {
		return goodsReceiptNoteNo;
	}

	public Integer getGoodsReceiptNoteId() {
		return goodsReceiptNoteId;
	}

	public String getPurInvSupplierName() {
		return purInvSupplierName;
	}

	public String getPurInvSupplierState() {
		return purInvSupplierState;
	}

	public String getPurInvSupplierStateId() {
		return purInvSupplierStateId;
	}

	public String getPurInvSupplierMobile() {
		return purInvSupplierMobile;
	}

	public String getPurInvSeries() {
		return purInvSeries;
	}

	public String getPurInvSeriesVal() {
		return purInvSeriesVal;
	}

	public String getPurInvReferenceNo() {
		return purInvReferenceNo;
	}

	public String getPurInvDeliveryDate() {
		return purInvDeliveryDate;
	}

	public String getPurInvSupplierAddress() {
		return purInvSupplierAddress;
	}

	public String getPurInvStatus() {
		return purInvStatus;
	}

	public String getIsWithoutGrnPurInv() {
		return isWithoutGrnPurInv;
	}

	public Integer getTotalItemQuantity() {
		return totalItemQuantity;
	}

	public double getTotalItemDiscount() {
		return totalItemDiscount;
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

	public List<PurchaseInvoiceDto> getLstPurchaseInvoiceDto() {
		return lstPurchaseInvoiceDto;
	}

	public List<PurchaseInvoiceItemDto> getLstPurchaseInvoiceItemDto() {
		return lstPurchaseInvoiceItemDto;
	}

	public PartyMasterDto getPartyMasterDto() {
		return partyMasterDto;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setPurchaseInvoiceDate(String purchaseInvoiceDate) {
		this.purchaseInvoiceDate = purchaseInvoiceDate;
	}

	public void setGoodsReceiptNoteNo(String goodsReceiptNoteNo) {
		this.goodsReceiptNoteNo = goodsReceiptNoteNo;
	}

	public void setGoodsReceiptNoteId(Integer goodsReceiptNoteId) {
		this.goodsReceiptNoteId = goodsReceiptNoteId;
	}

	public void setPurInvSupplierName(String purInvSupplierName) {
		this.purInvSupplierName = purInvSupplierName;
	}

	public void setPurInvSupplierState(String purInvSupplierState) {
		this.purInvSupplierState = purInvSupplierState;
	}

	public void setPurInvSupplierStateId(String purInvSupplierStateId) {
		this.purInvSupplierStateId = purInvSupplierStateId;
	}

	public void setPurInvSupplierMobile(String purInvSupplierMobile) {
		this.purInvSupplierMobile = purInvSupplierMobile;
	}

	public void setPurInvSeries(String purInvSeries) {
		this.purInvSeries = purInvSeries;
	}

	public void setPurInvSeriesVal(String purInvSeriesVal) {
		this.purInvSeriesVal = purInvSeriesVal;
	}

	public void setPurInvReferenceNo(String purInvReferenceNo) {
		this.purInvReferenceNo = purInvReferenceNo;
	}

	public void setPurInvDeliveryDate(String purInvDeliveryDate) {
		this.purInvDeliveryDate = purInvDeliveryDate;
	}

	public void setPurInvSupplierAddress(String purInvSupplierAddress) {
		this.purInvSupplierAddress = purInvSupplierAddress;
	}

	public void setPurInvStatus(String purInvStatus) {
		this.purInvStatus = purInvStatus;
	}

	public void setIsWithoutGrnPurInv(String isWithoutGrnPurInv) {
		this.isWithoutGrnPurInv = isWithoutGrnPurInv;
	}

	public void setTotalItemQuantity(Integer totalItemQuantity) {
		this.totalItemQuantity = totalItemQuantity;
	}

	public void setTotalItemDiscount(double totalItemDiscount) {
		this.totalItemDiscount = totalItemDiscount;
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

	public void setLstPurchaseInvoiceDto(
			List<PurchaseInvoiceDto> lstPurchaseInvoiceDto) {
		this.lstPurchaseInvoiceDto = lstPurchaseInvoiceDto;
	}

	public void setLstPurchaseInvoiceItemDto(
			List<PurchaseInvoiceItemDto> lstPurchaseInvoiceItemDto) {
		this.lstPurchaseInvoiceItemDto = lstPurchaseInvoiceItemDto;
	}

	public void setPartyMasterDto(PartyMasterDto partyMasterDto) {
		this.partyMasterDto = partyMasterDto;
	}

	public List<PartyMasterContactInfoDto> getPartyMasterContactInfoDto() {
		return partyMasterContactInfoDto;
	}

	public List<PartyMasterAddressInfoDto> getPartyMasterAddressInfoDto() {
		return partyMasterAddressInfoDto;
	}

	public void setPartyMasterContactInfoDto(
			List<PartyMasterContactInfoDto> partyMasterContactInfoDto) {
		this.partyMasterContactInfoDto = partyMasterContactInfoDto;
	}

	public void setPartyMasterAddressInfoDto(
			List<PartyMasterAddressInfoDto> partyMasterAddressInfoDto) {
		this.partyMasterAddressInfoDto = partyMasterAddressInfoDto;
	}

	public List<PartyMasterGeneralInfoDto> getPartyMasterGeneralInfoDto() {
		return partyMasterGeneralInfoDto;
	}

	public void setPartyMasterGeneralInfoDto(
			List<PartyMasterGeneralInfoDto> partyMasterGeneralInfoDto) {
		this.partyMasterGeneralInfoDto = partyMasterGeneralInfoDto;
	}

	public List<TermsAndConditionInfoDto> getTermsAndConditionInfoDto() {
		return termsAndConditionInfoDto;
	}

	public void setTermsAndConditionInfoDto(
			List<TermsAndConditionInfoDto> termsAndConditionInfoDto) {
		this.termsAndConditionInfoDto = termsAndConditionInfoDto;
	}

	@Override
	public String toString() {
		return "PurchaseInvoiceDto [id=" + id + ", purchaseInvoiceDate="
				+ purchaseInvoiceDate + ", goodsReceiptNoteNo="
				+ goodsReceiptNoteNo + ", goodsReceiptNoteId="
				+ goodsReceiptNoteId + ", purInvSupplierName="
				+ purInvSupplierName + ", purInvSupplierState="
				+ purInvSupplierState + ", purInvSupplierStateId="
				+ purInvSupplierStateId + ", purInvSupplierMobile="
				+ purInvSupplierMobile + ", purInvSeries=" + purInvSeries
				+ ", purInvSeriesVal=" + purInvSeriesVal
				+ ", purInvReferenceNo=" + purInvReferenceNo
				+ ", purInvDeliveryDate=" + purInvDeliveryDate
				+ ", purInvSupplierAddress=" + purInvSupplierAddress
				+ ", purInvStatus=" + purInvStatus + ", isWithoutGrnPurInv="
				+ isWithoutGrnPurInv + ", totalItemQuantity="
				+ totalItemQuantity + ", totalItemDiscount="
				+ totalItemDiscount + ", lessSpecialDiscount="
				+ lessSpecialDiscount + ", lessDebitAmount=" + lessDebitAmount
				+ ", lessCDPercent1=" + lessCDPercent1 + ", lessCDPercent2="
				+ lessCDPercent2 + ", addOctroi=" + addOctroi
				+ ", addSurcharge=" + addSurcharge + ", addCreditAmount="
				+ addCreditAmount + ", addFreight=" + addFreight + ", taxVat="
				+ taxVat + ", taxLBT=" + taxLBT + ", taxCST=" + taxCST
				+ ", taxExVat=" + taxExVat + ", taxTotalTaxes=" + taxTotalTaxes
				+ ", sumofCharges=" + sumofCharges + ", rermark=" + rermark
				+ ", grossAmount=" + grossAmount + ", grossLessAmount="
				+ grossLessAmount + ", grossAddAmount=" + grossAddAmount
				+ ", grossTaxes=" + grossTaxes + ", grossNetAmount="
				+ grossNetAmount + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", lstPurchaseInvoiceDto=" + lstPurchaseInvoiceDto
				+ ", lstPurchaseInvoiceItemDto=" + lstPurchaseInvoiceItemDto
				+ ", partyMasterDto=" + partyMasterDto
				+ ", partyMasterContactInfoDto=" + partyMasterContactInfoDto
				+ ", partyMasterAddressInfoDto=" + partyMasterAddressInfoDto
				+ ", partyMasterGeneralInfoDto=" + partyMasterGeneralInfoDto
				+ ", termsAndConditionInfoDto=" + termsAndConditionInfoDto
				+ ", getId()=" + getId() + ", getPurchaseInvoiceDate()="
				+ getPurchaseInvoiceDate() + ", getGoodsReceiptNoteNo()="
				+ getGoodsReceiptNoteNo() + ", getGoodsReceiptNoteId()="
				+ getGoodsReceiptNoteId() + ", getPurInvSupplierName()="
				+ getPurInvSupplierName() + ", getPurInvSupplierState()="
				+ getPurInvSupplierState() + ", getPurInvSupplierStateId()="
				+ getPurInvSupplierStateId() + ", getPurInvSupplierMobile()="
				+ getPurInvSupplierMobile() + ", getPurInvSeries()="
				+ getPurInvSeries() + ", getPurInvSeriesVal()="
				+ getPurInvSeriesVal() + ", getPurInvReferenceNo()="
				+ getPurInvReferenceNo() + ", getPurInvDeliveryDate()="
				+ getPurInvDeliveryDate() + ", getPurInvSupplierAddress()="
				+ getPurInvSupplierAddress() + ", getPurInvStatus()="
				+ getPurInvStatus() + ", getIsWithoutGrnPurInv()="
				+ getIsWithoutGrnPurInv() + ", getTotalItemQuantity()="
				+ getTotalItemQuantity() + ", getTotalItemDiscount()="
				+ getTotalItemDiscount() + ", getLessSpecialDiscount()="
				+ getLessSpecialDiscount() + ", getLessDebitAmount()="
				+ getLessDebitAmount() + ", getLessCDPercent1()="
				+ getLessCDPercent1() + ", getLessCDPercent2()="
				+ getLessCDPercent2() + ", getAddOctroi()=" + getAddOctroi()
				+ ", getAddSurcharge()=" + getAddSurcharge()
				+ ", getAddCreditAmount()=" + getAddCreditAmount()
				+ ", getAddFreight()=" + getAddFreight() + ", getTaxVat()="
				+ getTaxVat() + ", getTaxLBT()=" + getTaxLBT()
				+ ", getTaxCST()=" + getTaxCST() + ", getTaxExVat()="
				+ getTaxExVat() + ", getTaxTotalTaxes()=" + getTaxTotalTaxes()
				+ ", getSumofCharges()=" + getSumofCharges()
				+ ", getRermark()=" + getRermark() + ", getGrossAmount()="
				+ getGrossAmount() + ", getGrossLessAmount()="
				+ getGrossLessAmount() + ", getGrossAddAmount()="
				+ getGrossAddAmount() + ", getGrossTaxes()=" + getGrossTaxes()
				+ ", getGrossNetAmount()=" + getGrossNetAmount()
				+ ", getCreatedBy()=" + getCreatedBy() + ", getUpdatedBy()="
				+ getUpdatedBy() + ", getCreatedDate()=" + getCreatedDate()
				+ ", getUpdatedDate()=" + getUpdatedDate() + ", getDeleted()="
				+ getDeleted() + ", getDeletedBy()=" + getDeletedBy()
				+ ", getDeletedDate()=" + getDeletedDate() + ", getUnitId()="
				+ getUnitId() + ", getLstPurchaseInvoiceDto()="
				+ getLstPurchaseInvoiceDto()
				+ ", getLstPurchaseInvoiceItemDto()="
				+ getLstPurchaseInvoiceItemDto() + ", getPartyMasterDto()="
				+ getPartyMasterDto() + ", getPartyMasterContactInfoDto()="
				+ getPartyMasterContactInfoDto()
				+ ", getPartyMasterAddressInfoDto()="
				+ getPartyMasterAddressInfoDto()
				+ ", getPartyMasterGeneralInfoDto()="
				+ getPartyMasterGeneralInfoDto() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	
}
