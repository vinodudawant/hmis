package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity
@Table(name = "ehat_service_subserv_master")
@Immutable
public class EhatSubServiceview {

	@Id
	@Column(name = "id")
	private int id;

	@Column(name = "service_name")
	private String service_name;

	@Column(name = "category_name")
	private String subservName;

	@Column(name = "code_name")
	private String codename;

	@Column(name = "cgscode")
	private String cgscode;

	@Column(name = "charges")
	private double charges;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted")
	private String deleted;

	@Column(name = "created_user_name")
	private String createdusername;

	@Column(name = "updated_user_name")
	private String updatedusername;

	@Column(name = "underSubSer")
	private String underSubSer;

	@Column(name = "isCategory")
	private String isCategory;
	
	@Transient
	private List<EhatSubServiceview> lstsubser;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getService_name() {
		return service_name;
	}

	public void setService_name(String service_name) {
		this.service_name = service_name;
	}

	public String getSubservName() {
		return subservName;
	}

	public void setSubservName(String subservName) {
		this.subservName = subservName;
	}

	public String getCodename() {
		return codename;
	}

	public void setCodename(String codename) {
		this.codename = codename;
	}

	public String getCgscode() {
		return cgscode;
	}

	public void setCgscode(String cgscode) {
		this.cgscode = cgscode;
	}

	public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
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

	public String getCreatedusername() {
		return createdusername;
	}

	public void setCreatedusername(String createdusername) {
		this.createdusername = createdusername;
	}

	public String getUpdatedusername() {
		return updatedusername;
	}

	public void setUpdatedusername(String updatedusername) {
		this.updatedusername = updatedusername;
	}

	public String getUnderSubSer() {
		return underSubSer;
	}

	public void setUnderSubSer(String underSubSer) {
		this.underSubSer = underSubSer;
	}

	public List<EhatSubServiceview> getLstsubser() {
		return lstsubser;
	}

	public void setLstsubser(List<EhatSubServiceview> lstsubser) {
		this.lstsubser = lstsubser;
	}

	public String getIsCategory() {
		return isCategory;
	}

	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
	}
	
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "selfId")
	private int selfId;
	
	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public int getSelfId() {
		return selfId;
	}

	public void setSelfId(int selfId) {
		this.selfId = selfId;
	}

	
}
