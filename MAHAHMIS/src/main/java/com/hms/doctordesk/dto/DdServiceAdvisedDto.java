package com.hms.doctordesk.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="dd_service_advised")
public class DdServiceAdvisedDto {
	
	@Id
	@GeneratedValue
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "service_name")
	private String serviceName;
	
	@Column(name = "type")
	private String type;

	@Column(name = "charges")
	private String charges;
	
	@Column(name = "instruction")
	private String instruction;
	
	@Column(name = "clinical_notes")
	private String clinicalNotes;
	
	@Column(name = "urgentflag")
	private String urgentflag;
	
	@Column(name = "radiationFlag")
	private String radiationFlag;
	
	@Column(name = "sendToRisFlag")
	private String sendToRisFlag;
	
	@Column(name = "sndToLabFlag")
	private String sndToLabFlag;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@CreationTimestamp
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<DdServiceAdvisedDto> lstddServiceList;

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCharges() {
		return charges;
	}

	public void setCharges(String charges) {
		this.charges = charges;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	public String getClinicalNotes() {
		return clinicalNotes;
	}

	public void setClinicalNotes(String clinicalNotes) {
		this.clinicalNotes = clinicalNotes;
	}

	public String getUrgentflag() {
		return urgentflag;
	}

	public void setUrgentflag(String urgentflag) {
		this.urgentflag = urgentflag;
	}

	public String getRadiationFlag() {
		return radiationFlag;
	}

	public void setRadiationFlag(String radiationFlag) {
		this.radiationFlag = radiationFlag;
	}

	public String getSendToRisFlag() {
		return sendToRisFlag;
	}

	public void setSendToRisFlag(String sendToRisFlag) {
		this.sendToRisFlag = sendToRisFlag;
	}

	public String getSndToLabFlag() {
		return sndToLabFlag;
	}

	public void setSndToLabFlag(String sndToLabFlag) {
		this.sndToLabFlag = sndToLabFlag;
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

	public List<DdServiceAdvisedDto> getLstddServiceList() {
		return lstddServiceList;
	}

	public void setLstddServiceList(List<DdServiceAdvisedDto> lstddServiceList) {
		this.lstddServiceList = lstddServiceList;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
}
