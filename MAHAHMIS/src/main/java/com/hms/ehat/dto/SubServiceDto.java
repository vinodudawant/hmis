package com.hms.ehat.dto;

import java.io.Serializable;
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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

/**
 * @author Bilal
 * @date 26_May_2017 For sub service master pojo
 **/
@Entity
@Table(name = "ehat_subservice")
public class SubServiceDto  implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue()
	@Column(name = "id")
	private Integer subId;
	
	@Column(name = "status")
	private Integer status=0;

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "category_name")
	private String categoryName;

	@Column(name = "code_name")
	private String codeName;

	@Column(name = "service_id")
	private Integer serviceId;

	@Column(name = "isCategory")
	private String isCategory;

	@Column(name = "selfId")
	private Integer selfId;

	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Column(name = "iscombination")
	private String iscombination="N";
	
	@Column(name = "unit_id")
	private Integer hospitalUnitId=0;
	
	@Column(name = "b2bCharges", columnDefinition="double default 0")
	private double b2bCharges=0;

	public Integer getHospitalUnitId() {
		return hospitalUnitId;
	}

	public void setHospitalUnitId(Integer hospitalUnitId) {
		this.hospitalUnitId = hospitalUnitId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	@Transient
	private String unitName;

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	} 

	@Transient
	private List<SubServiceDto> lstSubService;

	@Transient
	private List<ServiceMasterDto> lstService;
	
	@Transient
	private List<ChargesMasterSlave> lstsubcharges;
	
	@Transient
	private List<DeptMasterDto> lstDepts;
	
	@Transient
	private List<UnitMasterDto> lstUnits;
	
	

	public List<UnitMasterDto> getLstUnits() {
		return lstUnits;
	}

	public void setLstUnits(List<UnitMasterDto> lstUnits) {
		this.lstUnits = lstUnits;
	}

	@Column(name = "charges")
	private double charges;

	@Override
	public String toString() {
		return "SubServiceDto [charges=" + charges + "]";
	}

	@Column(name = "isModify")
	private String isModify;

	@Column(name = "cgscode")
	private String cgscode;

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
	}

	public String getIsModify() {
		return isModify;
	}

	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}

	public Integer getSubId() {
		return subId;
	}

	public void setSubId(Integer subId) {
		this.subId = subId;
	}


	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public Integer getServiceId() {
		return serviceId;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public String getIsCategory() {
		return isCategory;
	}

	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
	}

	public Integer getSelfId() {
		return selfId;
	}

	public void setSelfId(Integer selfId) {
		this.selfId = selfId;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<SubServiceDto> getLstSubService() {
		return lstSubService;
	}

	public void setLstSubService(List<SubServiceDto> lstSubService) {
		this.lstSubService = lstSubService;
	}

	public List<ServiceMasterDto> getLstService() {
		return lstService;
	}

	public void setLstService(List<ServiceMasterDto> lstService) {
		this.lstService = lstService;
	}

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public List<ChargesMasterSlave> getLstsubcharges() {
		return lstsubcharges;
	}

	public void setLstsubcharges(List<ChargesMasterSlave> lstsubcharges) {
		this.lstsubcharges = lstsubcharges;
	}

	public String getCgscode() {
		return cgscode;
	}

	public void setCgscode(String cgscode) {
		this.cgscode = cgscode;
	}

	public List<DeptMasterDto> getLstDepts() {
		return lstDepts;
	}

	public void setLstDepts(List<DeptMasterDto> lstDepts) {
		this.lstDepts = lstDepts;
	}
	
	public double getB2bCharges() {
		return b2bCharges;
	}

	public void setB2bCharges(double b2bCharges) {
		this.b2bCharges = b2bCharges;
	}

		//added by ajay khandare 27-may-2019 
		@Transient
		private int testId;
		@Transient
		private String categoryname;
		@Transient
		private double testRate;
		@JsonGetter("testid")
		public int getTestId() {
			return testId;
		}
		@JsonSetter("testid")
		public void setTestId(int testId) {
			this.testId = testId;
		}
		@JsonGetter("rate")
		public double getTestRate() {
			return testRate;
		}
		@JsonSetter("rate")
		public void setTestRate(double testRate) {
			this.testRate = testRate;
		}
		@JsonGetter("cn")
		public String getCategoryname() {
			return categoryname;
		}
		@JsonSetter("cn")
		public void setCategoryname(String categoryname) {
			this.categoryname = categoryname;
		}
	
}

