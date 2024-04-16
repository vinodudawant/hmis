package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="inv_item_contract_slave")
public class ItemContractSlaveDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	@CreationTimestamp
	@Column(name="created_date_time")
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
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	@Column(name="unit_id")
	private Integer unitId;
	@Column(name = "party_master_id")
	private Integer partyMasterIdContact;
	@Column(name = "rate_value")
	private Double rateValue;
	@Column(name = "priority")
	private String priorityContract;
	@Column(name = "mrp_value")
	private Double mrpValue;
	@Column(name = "reference_no")
	private String referenceNo;
	@Column(name = "profit_value")
	private Double profitValue;
	@Column(name = "from_date")
	private String fromDate;
	@Column(name = "to_date")
	private String toDate;
	@Column(name = "with_contract")
	private String withContract;
	@Column(name = "party_name_contract")
	private String partyNameContract;
	@Column(name = "upload_document_name")
	private String uploadDocumentName;
	
	@Transient
	private List<ItemContractSlaveDto> lstItemContractSlave;
	

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

	public Integer getPartyMasterIdContact() {
		return partyMasterIdContact;
	}

	public void setPartyMasterIdContact(Integer partyMasterIdContact) {
		this.partyMasterIdContact = partyMasterIdContact;
	}

	public Double getRateValue() {
		return rateValue;
	}

	public void setRateValue(Double rateValue) {
		this.rateValue = rateValue;
	}

	public String getPriorityContract() {
		return priorityContract;
	}

	public void setPriorityContract(String priorityContract) {
		this.priorityContract = priorityContract;
	}

	public Double getMrpValue() {
		return mrpValue;
	}

	public void setMrpValue(Double mrpValue) {
		this.mrpValue = mrpValue;
	}

	public String getReferenceNo() {
		return referenceNo;
	}

	public void setReferenceNo(String referenceNo) {
		this.referenceNo = referenceNo;
	}

	public Double getProfitValue() {
		return profitValue;
	}

	public void setProfitValue(Double profitValue) {
		this.profitValue = profitValue;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getWithContract() {
		return withContract;
	}

	public void setWithContract(String withContract) {
		this.withContract = withContract;
	}

	public String getPartyNameContract() {
		return partyNameContract;
	}

	public void setPartyNameContract(String partyNameContract) {
		this.partyNameContract = partyNameContract;
	}

	public List<ItemContractSlaveDto> getLstItemContractSlave() {
		return lstItemContractSlave;
	}

	public void setLstItemContractSlave(
			List<ItemContractSlaveDto> lstItemContractSlave) {
		this.lstItemContractSlave = lstItemContractSlave;
	}

	public String getUploadDocumentName() {
		return uploadDocumentName;
	}

	public void setUploadDocumentName(String uploadDocumentName) {
		this.uploadDocumentName = uploadDocumentName;
	}
	
	
	
	
}
