package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name = "ehat_OperationDescription")
public class OTDescription implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idehat_OperationDescription")
	private int idOTOpDesc;
	
	@Column(name = "treatmentOperationsManageID")
	private int treatmentOperationsManageID;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "createdTime")
	private String createdTime;
	
	@Column(name = "updatedTime")
	private String updatedTime;
	
	@Column(name = "createdBy")
	private Integer createdBy;
	
	@Column(name = "updatedBy")
	private Integer updatedBy;
	
	@Column(name = "deletedBy")
	private Integer deletedBy;
	
	@Column(name = "deletedTime")
	private String deletedTime;
	
	@Transient
	@JsonIgnore
	private List<OTDescription> listOTDesc;
	
	@JsonGetter("idOTDesc")
	public int getIdOTOpDesc() {
		return idOTOpDesc;
	}
	@JsonSetter("idOTDesc")
	public void setIdOTOpDesc(int idOTOpDesc) {
		this.idOTOpDesc = idOTOpDesc;
	}
	@JsonGetter("idtomID")
	public int getTreatmentOperationsManageID() {
		return treatmentOperationsManageID;
	}
	@JsonSetter("idtomID")
	public void setTreatmentOperationsManageID(int treatmentOperationsManageID) {
		this.treatmentOperationsManageID = treatmentOperationsManageID;
	}
	@JsonGetter("OTDesc")
	public String getDescription() {
		return description;
	}
	@JsonSetter("OTDesc")
	public void setDescription(String description) {
		this.description = description;
	}
	@JsonGetter("OTStatus")
	public String getStatus() {
		return status;
	}
	@JsonSetter("OTStatus")
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("OTCreaBy")
	public String getCreatedTime() {
		return createdTime;
	}
	@JsonSetter("OTCreaBy")
	public void setCreatedTime(String createdTime) {
		this.createdTime = createdTime;
	}
	@JsonGetter("OTUpdtBy")
	public String getUpdatedTime() {
		return updatedTime;
	}
	@JsonSetter("OTUpdtBy")
	public void setUpdatedTime(String updatedTime) {
		this.updatedTime = updatedTime;
	}
	@JsonGetter("OTDelBy")
	public String getDeletedTime() {
		return deletedTime;
	}
	@JsonSetter("OTDelBy")
	public void setDeletedTime(String deletedTime) {
		this.deletedTime = deletedTime;
	}
	
	@JsonGetter("OTDescList")
	public List<OTDescription> getListOTDesc() {
		return listOTDesc;
	}
	@JsonSetter("OTDescList")
	public void setListOTDesc(List<OTDescription> listOTDesc) {
		this.listOTDesc = listOTDesc;
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
	public Integer getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}
	

}
