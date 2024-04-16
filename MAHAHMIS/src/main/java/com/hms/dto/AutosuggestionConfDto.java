package com.hms.dto;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;



@Entity
@Immutable
@Table(name = "ehat_view_service_details2")
public class AutosuggestionConfDto {


	@Column(name = "master_config_id")
	private int masterconfigid;

	@Column(name = "unit_id")
	private int unitid;

	@Column(name = "dept_id")
	private int dept_id;

	@Id
	@Column(name = "id")
	private int categoryid;

	@Column(name = "category_name")
	private String categoryName;

	@Column(name = "iscategory")
	private String isCategory;

	@Column(name = "category_charges")
	private Double categorycharges;

	
	@Column(name = "category_deleted")
	private String categorydeleted;

	@Column(name = "service_id")
	private int serviceid;
	
	// Added by kishor on 3-march-18
		@Column(name = "isModify")
		private String isModify;

	/*@Column(name = "sponsorId")
	private int sponsorId;
	
	@Column(name = "chargesSlaveId")
	private int chargesSlaveId;*/
	
	@Column(name = "service_name")
	private String serviceName;

	@Column(name = "service_deleted")
	private String servicdeleted;
	
	/*@Column(name = "hall_id")
	private int hallId;
	
	@Column(name = "hallSlave_id")
	private int hallSlaveId;*/

	@Column(name = "iscombination")
	private String iscombination;
	
	/*@Temporal(TemporalType.DATE)
	@Column(name = "fromDate")
	private Date fromDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "toDate")
	private Date toDate;
	
	@Column(name = "charges")
	private double charges;*/
	
	/*@Column(name = "is_com_servId")
	private int isComServId;
	
	@Column(name = "is_com_servlastId")
	private int isComServlastId;*/
	
	/*@Column(name = "department_id")
	private int departmentid;*/
	
	/*
	 * @Transient private List<SubServiceDto> lstSubService;
	 */
	@Transient
	private List<AutosuggestionConfDto> lstService;

	@Transient
	private double configcharges;
	/*public int getHallId() {
		return hallId;
	}

	public void setHallId(int hallId) {
		this.hallId = hallId;
	}

	public int getHallSlaveId() {
		return hallSlaveId;
	}

	public void setHallSlaveId(int hallSlaveId) {
		this.hallSlaveId = hallSlaveId;
	}*/

	
	public List<AutosuggestionConfDto> getLstService() {
		return lstService;
	}

	public void setLstService(List<AutosuggestionConfDto> lstService) {
		this.lstService = lstService;
	}
	
	

	public int getUnitid() {
		return unitid;
	}

	public void setUnitid(int unitid) {
		this.unitid = unitid;
	}

	public Double getCategorycharges() {
		return categorycharges;
	}

	public void setCategorycharges(Double categorycharges) {
		this.categorycharges = categorycharges;
	}

	public int getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getIsCategory() {
		return isCategory;
	}

	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
	}

	public String getCategorydeleted() {
		return categorydeleted;
	}

	public void setCategorydeleted(String categorydeleted) {
		this.categorydeleted = categorydeleted;
	}

	public int getServiceid() {
		return serviceid;
	}

	public void setServiceid(int serviceid) {
		this.serviceid = serviceid;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getServicdeleted() {
		return servicdeleted;
	}

	public void setServicdeleted(String servicdeleted) {
		this.servicdeleted = servicdeleted;
	}

	public int getMasterconfigid() {
		return masterconfigid;
	}

	public void setMasterconfigid(int masterconfigid) {
		this.masterconfigid = masterconfigid;
	}

	/*public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
	}*/

	/*public int getSponsorId() {
		return sponsorId;
	}

	public void setSponsorId(int sponsorId) {
		this.sponsorId = sponsorId;
	}

	public int getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}*/

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public int getDept_id() {
		return dept_id;
	}

	public void setDept_id(int dept_id) {
		this.dept_id = dept_id;
	}

	public double getConfigcharges() {
		return configcharges;
	}

	public void setConfigcharges(double configcharges) {
		this.configcharges = configcharges;
	}

	public String getIsModify() {
		return isModify;
	}

	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}

	/*public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public int getIsComServId() {
		return isComServId;
	}

	public void setIsComServId(int isComServId) {
		this.isComServId = isComServId;
	}

	public int getIsComServlastId() {
		return isComServlastId;
	}

	public void setIsComServlastId(int isComServlastId) {
		this.isComServlastId = isComServlastId;
	}*/

	/*public int getDepartmentid() {
		return departmentid;
	}

	public void setDepartmentid(int departmentid) {
		this.departmentid = departmentid;
	}*/
	@Column(name = "template_wise")
	private String templateWise;

	public String getTemplateWise() {
		return templateWise;
	}

	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}
}
