package com.hms.pathology.dto;

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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "pathology_out_lab_master")
public class OutLabMasterDto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "out_lab_id")
	private Integer id;
	
	@Column(name = "out_lab_name")
	private String name;	
	
	@Column(name = "out_lab_status")
	private String status;
	
	@Column(name = "out_lab_priority")
	private String priority;
	
	@Column(name = "lab_type")
	private String labType;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
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
	
	@Transient
	private List<OutLabMasterDto> outLabMasterDtoList;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "out_lab_id", nullable = false)
	private List<OutLabGeneralInfoDto> outlabrGeneralInfoDtoList;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "out_lab_id", nullable = false)
	private List<OutLabContactInfoDto> outlabContactInfoDtoList;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "out_lab_id", nullable = false)
	private List<OutLabAddressInfoDto> outlabAddressInfoDtoList;

	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "out_lab_id", nullable = false)
	private List<OutLabPaymentInfoDto> outlabPaymentInfoDtoList;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "out_lab_id", nullable = false)
	private List<OutLabTermsAndConditionInfoDto> outlabTermsAndConditionInfoDtoList;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "out_lab_id", nullable = false)
	private List<OutLabTestmasterDto> outlabTestInfoDetailsList;

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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
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

	public List<OutLabMasterDto> getOutLabMasterDtoList() {
		return outLabMasterDtoList;
	}

	public void setOutLabMasterDtoList(List<OutLabMasterDto> outLabMasterDtoList) {
		this.outLabMasterDtoList = outLabMasterDtoList;
	}

	@JsonGetter("outlabrGeneralInfoDtoList")
	public List<OutLabGeneralInfoDto> getOutlabrGeneralInfoDtoList() {
		return outlabrGeneralInfoDtoList;
	}
	@JsonSetter("outlabrGeneralInfoDtoList")
	public void setOutlabrGeneralInfoDtoList(
			List<OutLabGeneralInfoDto> outlabrGeneralInfoDtoList) {
		this.outlabrGeneralInfoDtoList = outlabrGeneralInfoDtoList;
	}

	@JsonGetter("outlabContactInfoDtoList")
	public List<OutLabContactInfoDto> getOutlabContactInfoDtoList() {
		return outlabContactInfoDtoList;
	}
	@JsonSetter("outlabContactInfoDtoList")
	public void setOutlabContactInfoDtoList(
			List<OutLabContactInfoDto> outlabContactInfoDtoList) {
		this.outlabContactInfoDtoList = outlabContactInfoDtoList;
	}
	
	@JsonGetter("outlabAddressInfoDtoList")
	public List<OutLabAddressInfoDto> getOutlabAddressInfoDtoList() {
		return outlabAddressInfoDtoList;
	}
	@JsonSetter("outlabAddressInfoDtoList")
	public void setOutlabAddressInfoDtoList(
			List<OutLabAddressInfoDto> outlabAddressInfoDtoList) {
		this.outlabAddressInfoDtoList = outlabAddressInfoDtoList;
	}
	@JsonGetter("outlabPaymentInfoDtoList")
	public List<OutLabPaymentInfoDto> getOutlabPaymentInfoDtoList() {
		return outlabPaymentInfoDtoList;
	}
	@JsonSetter("outlabPaymentInfoDtoList")
	public void setOutlabPaymentInfoDtoList(
			List<OutLabPaymentInfoDto> outlabPaymentInfoDtoList) {
		this.outlabPaymentInfoDtoList = outlabPaymentInfoDtoList;
	}
	@JsonGetter("outlabTermsAndConditionInfoDtoList")
	public List<OutLabTermsAndConditionInfoDto> getOutlabTermsAndConditionInfoDtoList() {
		return outlabTermsAndConditionInfoDtoList;
	}
	@JsonSetter("outlabTermsAndConditionInfoDtoList")
	public void setOutlabTermsAndConditionInfoDtoList(
			List<OutLabTermsAndConditionInfoDto> outlabTermsAndConditionInfoDtoList) {
		this.outlabTermsAndConditionInfoDtoList = outlabTermsAndConditionInfoDtoList;
	}
	@JsonGetter("outlabTestInfoDetailsList")
	public List<OutLabTestmasterDto> getOutlabTestInfoDetailsList() {
		return outlabTestInfoDetailsList;
	}
	@JsonSetter("outlabTestInfoDetailsList")
	public void setOutlabTestInfoDetailsList(
			List<OutLabTestmasterDto> outlabTestInfoDetailsList) {
		this.outlabTestInfoDetailsList = outlabTestInfoDetailsList;
	}

	public String getLabType() {
		return labType;
	}

	public void setLabType(String labType) {
		this.labType = labType;
	}
}