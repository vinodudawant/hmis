package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name = "inv_party_master_payment_info_slave")
public class PartyMasterPaymentInfoDto {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "account_holder_name")
	private String accountHolderName;
	
	@Column(name = "account_number")
	private String accountNumber;
	
	@Column(name = "bank_name")
	private String bankName;
	
	@Column(name = "bank_ifsc")
	private String bankIFSC;
	
	@Column(name = "payment_terms")
	private String paymentTerms;
	
	@Column(name = "credit_terms")
	private String creditTerms;

	@Column(name = "account_city")
	private String accountCity;

	@Column(name = "account_address")
	private String accountAddress;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

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
	private List<PartyMasterPaymentInfoDto> partyMasterPaymentInfoDto;

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @return the accountHolderName
	 */
	public String getAccountHolderName() {
		return accountHolderName;
	}

	/**
	 * @return the accountNumber
	 */
	public String getAccountNumber() {
		return accountNumber;
	}

	/**
	 * @return the bankName
	 */
	public String getBankName() {
		return bankName;
	}

	/**
	 * @return the bankIFSC
	 */
	public String getBankIFSC() {
		return bankIFSC;
	}

	/**
	 * @return the paymentTerms
	 */
	public String getPaymentTerms() {
		return paymentTerms;
	}

	/**
	 * @return the creditTerms
	 */
	public String getCreditTerms() {
		return creditTerms;
	}

	/**
	 * @return the accountCity
	 */
	public String getAccountCity() {
		return accountCity;
	}

	/**
	 * @return the accountAddress
	 */
	public String getAccountAddress() {
		return accountAddress;
	}

	/**
	 * @return the createdBy
	 */
	public Integer getCreatedBy() {
		return createdBy;
	}

	/**
	 * @return the updatedBy
	 */
	public Integer getUpdatedBy() {
		return updatedBy;
	}

	/**
	 * @return the createdDate
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * @return the updatedDate
	 */
	public Date getUpdatedDate() {
		return updatedDate;
	}

	/**
	 * @return the deleted
	 */
	public String getDeleted() {
		return deleted;
	}

	/**
	 * @return the deletedBy
	 */
	public Integer getDeletedBy() {
		return deletedBy;
	}

	/**
	 * @return the deletedDate
	 */
	public Date getDeletedDate() {
		return deletedDate;
	}

	/**
	 * @return the unitId
	 */
	public Integer getUnitId() {
		return unitId;
	}

	/**
	 * @return the partyMasterPaymentInfoDto
	 */
	public List<PartyMasterPaymentInfoDto> getPartyMasterPaymentInfoDto() {
		return partyMasterPaymentInfoDto;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @param accountHolderName the accountHolderName to set
	 */
	public void setAccountHolderName(String accountHolderName) {
		this.accountHolderName = accountHolderName;
	}

	/**
	 * @param accountNumber the accountNumber to set
	 */
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	/**
	 * @param bankName the bankName to set
	 */
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	/**
	 * @param bankIFSC the bankIFSC to set
	 */
	public void setBankIFSC(String bankIFSC) {
		this.bankIFSC = bankIFSC;
	}

	/**
	 * @param paymentTerms the paymentTerms to set
	 */
	public void setPaymentTerms(String paymentTerms) {
		this.paymentTerms = paymentTerms;
	}

	/**
	 * @param creditTerms the creditTerms to set
	 */
	public void setCreditTerms(String creditTerms) {
		this.creditTerms = creditTerms;
	}

	/**
	 * @param accountCity the accountCity to set
	 */
	public void setAccountCity(String accountCity) {
		this.accountCity = accountCity;
	}

	/**
	 * @param accountAddress the accountAddress to set
	 */
	public void setAccountAddress(String accountAddress) {
		this.accountAddress = accountAddress;
	}

	/**
	 * @param createdBy the createdBy to set
	 */
	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	/**
	 * @param updatedBy the updatedBy to set
	 */
	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	/**
	 * @param createdDate the createdDate to set
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * @param updatedDate the updatedDate to set
	 */
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	/**
	 * @param deleted the deleted to set
	 */
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	/**
	 * @param deletedBy the deletedBy to set
	 */
	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	/**
	 * @param deletedDate the deletedDate to set
	 */
	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	/**
	 * @param unitId the unitId to set
	 */
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	/**
	 * @param partyMasterPaymentInfoDto the partyMasterPaymentInfoDto to set
	 */
	public void setPartyMasterPaymentInfoDto(
			List<PartyMasterPaymentInfoDto> partyMasterPaymentInfoDto) {
		this.partyMasterPaymentInfoDto = partyMasterPaymentInfoDto;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "PartyMasterPaymentInfoDto [id=" + id + ", accountHolderName="
				+ accountHolderName + ", accountNumber=" + accountNumber
				+ ", bankName=" + bankName + ", bankIFSC=" + bankIFSC
				+ ", paymentTerms=" + paymentTerms + ", creditTerms="
				+ creditTerms + ", accountCity=" + accountCity
				+ ", accountAddress=" + accountAddress + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", deleted="
				+ deleted + ", deletedBy=" + deletedBy + ", deletedDate="
				+ deletedDate + ", unitId=" + unitId
				+ ", partyMasterPaymentInfoDto=" + partyMasterPaymentInfoDto
				+ "]";
	}

}
