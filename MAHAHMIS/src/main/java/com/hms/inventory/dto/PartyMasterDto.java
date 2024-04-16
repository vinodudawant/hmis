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
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.stereotype.Component;


@Entity
@Component
@Table(name = "inv_party_master_new")
public class PartyMasterDto implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "party_master_name")
	private String name;
	
	@Column(name = "party_master_group")
	private String group;
	
	@Column(name = "party_master_type")
	private String type;
	
	@Column(name = "party_master_parent_company")
	private String parentCompany;
	
	@Column(name = "party_master_status")
	private String status;
	
	@Column(name = "party_master_priority")
	private String priority;
	
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
	
	@Column(name = "party_master_note")
	private String note;
	
	@Column(name = "vendor_code")
	private String venderCode;
	
	@Column(name = "invoice_code")
	private String invoiceCode;
	
	@Column(name = "deactivation_date")
	private String deActivationDate;
	
	@Transient
	private Integer noOfPages;

	@Transient
	private List<PartyMasterDto> partyMasterDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "party_master_id", nullable = false)
	private List<PartyMasterGeneralInfoDto> partyMasterGeneralInfoDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "party_master_id", nullable = false)
	private List<PartyMasterContactInfoDto> partyMasterContactInfoDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "party_master_id", nullable = false)
	private List<PartyMasterAddressInfoDto> partyMasterAddressInfoDto;

	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "party_master_id", nullable = false)
	private List<PartyMasterPaymentInfoDto> partyMasterPaymentInfoDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "party_master_id", nullable = false)
	private List<TermsAndConditionInfoDto> termsAndConditionInfoDto;

	public List<TermsAndConditionInfoDto> getTermsAndConditionInfoDto() {
		return termsAndConditionInfoDto;
	}
	
	public void setTermsAndConditionInfoDto(
			List<TermsAndConditionInfoDto> termsAndConditionInfoDto) {
		this.termsAndConditionInfoDto = termsAndConditionInfoDto;
	}
	
	public Integer getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}

	public String getNote() {
		return note;
	}

	public String getDeActivationDate() {
		return deActivationDate;
	}

	public void setDeActivationDate(String deActivationDate) {
		this.deActivationDate = deActivationDate;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getVenderCode() {
		return venderCode;
	}

	public void setVenderCode(String venderCode) {
		this.venderCode = venderCode;
	}

	public String getInvoiceCode() {
		return invoiceCode;
	}

	public void setInvoiceCode(String invoiceCode) {
		this.invoiceCode = invoiceCode;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getParentCompany() {
		return parentCompany;
	}

	public void setParentCompany(String parentCompany) {
		this.parentCompany = parentCompany;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
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

	public List<PartyMasterDto> getPartyMasterDto() {
		return partyMasterDto;
	}

	public void setPartyMasterDto(List<PartyMasterDto> partyMasterDto) {
		this.partyMasterDto = partyMasterDto;
	}

	public List<PartyMasterGeneralInfoDto> getPartyMasterGeneralInfoDto() {
		return partyMasterGeneralInfoDto;
	}

	public void setPartyMasterGeneralInfoDto(
			List<PartyMasterGeneralInfoDto> partyMasterGeneralInfoDto) {
		this.partyMasterGeneralInfoDto = partyMasterGeneralInfoDto;
	}

	public List<PartyMasterContactInfoDto> getPartyMasterContactInfoDto() {
		return partyMasterContactInfoDto;
	}

	public void setPartyMasterContactInfoDto(
			List<PartyMasterContactInfoDto> partyMasterContactInfoDto) {
		this.partyMasterContactInfoDto = partyMasterContactInfoDto;
	}

	public List<PartyMasterAddressInfoDto> getPartyMasterAddressInfoDto() {
		return partyMasterAddressInfoDto;
	}

	public void setPartyMasterAddressInfoDto(
			List<PartyMasterAddressInfoDto> partyMasterAddressInfoDto) {
		this.partyMasterAddressInfoDto = partyMasterAddressInfoDto;
	}

	
	public List<PartyMasterPaymentInfoDto> getPartyMasterPaymentInfoDto() {
		return partyMasterPaymentInfoDto;
	}

	
	public void setPartyMasterPaymentInfoDto(
			List<PartyMasterPaymentInfoDto> partyMasterPaymentInfoDto) {
		this.partyMasterPaymentInfoDto = partyMasterPaymentInfoDto;
	}

	@Override
	public String toString() {
		return "PartyMasterDto [id=" + id + ", name=" + name + ", group="
				+ group + ", type=" + type + ", parentCompany=" + parentCompany
				+ ", status=" + status + ", priority=" + priority
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", note=" + note + ", venderCode=" + venderCode
				+ ", invoiceCode=" + invoiceCode + ", deActivationDate="
				+ deActivationDate + ", noOfPages=" + noOfPages
				+ ", partyMasterDto=" + partyMasterDto
				+ ", partyMasterGeneralInfoDto=" + partyMasterGeneralInfoDto
				+ ", partyMasterContactInfoDto=" + partyMasterContactInfoDto
				+ ", partyMasterAddressInfoDto=" + partyMasterAddressInfoDto
				+ ", partyMasterPaymentInfoDto=" + partyMasterPaymentInfoDto
				+ ", termsAndConditionInfoDto=" + termsAndConditionInfoDto
				+ "]";
	}

	
}
