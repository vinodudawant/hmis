package com.hms.administrator.dto;

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
@Table(name = "business_master_payment_info_slave")
public class BusinessCustMasterPaymentInfoDto {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	@Column(name = "micr_code")
	private String micrCode;
	
	@Column(name ="upi_id")
	private String upiId;
	
	@Column(name ="branch_name")
	private String branchName;


	public String getMicrCode() {
		return micrCode;
	}

	public void setMicrCode(String micrCode) {
		this.micrCode = micrCode;
	}

	@Transient
	private List<BusinessCustMasterPaymentInfoDto> businessMasterPaymentInfoDto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAccountHolderName() {
		return accountHolderName;
	}

	public void setAccountHolderName(String accountHolderName) {
		this.accountHolderName = accountHolderName;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBankIFSC() {
		return bankIFSC;
	}

	public void setBankIFSC(String bankIFSC) {
		this.bankIFSC = bankIFSC;
	}

	public String getPaymentTerms() {
		return paymentTerms;
	}

	public void setPaymentTerms(String paymentTerms) {
		this.paymentTerms = paymentTerms;
	}

	public String getCreditTerms() {
		return creditTerms;
	}

	public void setCreditTerms(String creditTerms) {
		this.creditTerms = creditTerms;
	}

	public String getAccountCity() {
		return accountCity;
	}

	public void setAccountCity(String accountCity) {
		this.accountCity = accountCity;
	}

	public String getAccountAddress() {
		return accountAddress;
	}

	public void setAccountAddress(String accountAddress) {
		this.accountAddress = accountAddress;
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

	public List<BusinessCustMasterPaymentInfoDto> getBusinessMasterPaymentInfoDto() {
		return businessMasterPaymentInfoDto;
	}

	public void setBusinessMasterPaymentInfoDto(List<BusinessCustMasterPaymentInfoDto> businessMasterPaymentInfoDto) {
		this.businessMasterPaymentInfoDto = businessMasterPaymentInfoDto;
	}
	
	public String getUpiId() {
		return upiId;
	}

	public void setUpiId(String upiId) {
		this.upiId = upiId;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	@Override
	public String toString() {
		return "BusinessCustMasterPaymentInfoDto [id=" + id + ", accountHolderName="
				+ accountHolderName + ", accountNumber=" + accountNumber
				+ ", bankName=" + bankName + ", bankIFSC=" + bankIFSC
				+ ", paymentTerms=" + paymentTerms + ", creditTerms="
				+ creditTerms + ", accountCity=" + accountCity
				+ ", accountAddress=" + accountAddress + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", deleted="
				+ deleted + ", deletedBy=" + deletedBy + ", deletedDate="
				+ deletedDate + ", unitId=" + unitId
				+ ", businessMasterPaymentInfoDto=" + businessMasterPaymentInfoDto
				+ "]";
	}

}
