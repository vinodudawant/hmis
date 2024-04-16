package com.hms.administrator.dto;

import java.io.Serializable;
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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "business_master_marketing_info_slave")
@Component
public class BusinessCustMasterMarketingInfoDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "marketing_person_name")
	private String marketingPerson;
	
	@Column(name = "marketing_person_type")
	private String marketingPersonType;

	@Column(name = "marketing_remark")
	private String marketingRemark;
	
	@Column(name = "from_date")
	private String fromDate;
	
	@Column(name = "to_date")
	private String toDate;
	
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
	
	@Transient
	private List<BusinessCustMasterMarketingInfoDto> businessMasterMarketingInfoDto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMarketingPerson() {
		return marketingPerson;
	}

	public void setMarketingPerson(String marketingPerson) {
		this.marketingPerson = marketingPerson;
	}

	public String getMarketingRemark() {
		return marketingRemark;
	}

	public void setMarketingRemark(String marketingRemark) {
		this.marketingRemark = marketingRemark;
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

	public List<BusinessCustMasterMarketingInfoDto> getBusinessMasterMarketingInfoDto() {
		return businessMasterMarketingInfoDto;
	}

	public void setBusinessMasterMarketingInfoDto(
			List<BusinessCustMasterMarketingInfoDto> businessMasterMarketingInfoDto) {
		this.businessMasterMarketingInfoDto = businessMasterMarketingInfoDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

	public String getMarketingPersonType() {
		return marketingPersonType;
	}

	public void setMarketingPersonType(String marketingPersonType) {
		this.marketingPersonType = marketingPersonType;
	}

	@Override
	public String toString() {
		return "BusinessCustMasterMarketingInfoDto [id=" + id
				+ ", marketingPerson=" + marketingPerson +  ", marketingPersonType=" + marketingPersonType + ", marketingRemark="
				+ marketingRemark + ", fromDate=" + fromDate + ", toDate="
				+ toDate + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", BusinessCustMasterMarketingInfoDto="
				+ businessMasterMarketingInfoDto + "]";
	}
	
}
