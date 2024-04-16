package com.hms.administrator.dto;

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
@Table(name="lab_charges_configuration_services_view")
@Immutable
public class LabConfigureServicesViewDto {

	@Id
	@Column(name = "id_configurations")
	private int idConfigurations;
	
	@Column(name = "charges_id")
	private int chargesId;
	
	@Column(name = "category_name")
	private String categoryName; 
	
	@Column(name = "customer_type_id")
	private int customerType;
	
	@Column(name = "customer_name_id")
	private int customerName;
	
	@Column(name = "id_charges_slave")
	private int chargesSlaveId;

	@Column(name = "charges")
	private double charges;
	
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "copay")
	private double copay;
	
	@Column(name = "number")
	private double number;	
	
	@Column(name = "operator")
	private String operator; 
	
	@Column(name = "distribute")
	private double distribute;	
	
	@Column(name = "increaseordecrease")
	private String increaseordecrease; 
	
	@Temporal(TemporalType.DATE)
	@Column(name = "fromDate")
	private Date fromDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "toDate")
	private Date toDate;
	
	@Column(name = " hall_charges",columnDefinition="int default 0")
	private double hallCharges;
	
	@Column(name = " medical_team_charges",columnDefinition="int default 0")
	private double medicalCharges;
	
	@Column(name = " department_id",columnDefinition="int default 0")
	private Integer departMentID;	
	
	@Column(name = "hall_id" ,columnDefinition="int default 0")
	private int hallId;
	
	@Column(name = "hallSlave_id" ,columnDefinition="int default 0")
	private int hallSlaveId;
	
	@Column(name = " is_com_servId" ,columnDefinition="int default 0")
	private Integer isComServId;

	@Column(name = " is_com_servlastId",columnDefinition="int default 0")
	private Integer isComServlastId;
	
	@Column(name = "deleted")
	private String deleted;
	
	@Column(name = "iscat_hall")
	private String iscatHall;
	
	@Column(name = "selfid")
	private Integer selfId;
	
	@Column(name = "codenamech")
	private String codenamech;
	
	@Column(name = "packageName")
	private String packageName;
	
	@Column(name = "cgscode")
	private String cgscode;

	@Column(name = "created_user_name")
	private String createdusername;
	
	@Column(name = "updated_user_name")
	private String updatedusername;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = " unitId")
	private Integer unitId;
	
	@Column(name = " unitName")
	private String unitName;
	
	@Transient
	private Integer altsubserviceid;
	
	public Integer getAltsubserviceid() {
		return altsubserviceid;
	}

	public void setAltsubserviceid(Integer altsubserviceid) {
		this.altsubserviceid = altsubserviceid;
	}

	@Transient
    private List<LabConfigureServicesViewDto> lstServiceConfigurations;
	
	public Integer getDepartMentID() {
		return departMentID;
	}

	public void setDepartMentID(Integer departMentID) {
		this.departMentID = departMentID;
	}

	public double getHallCharges() {
		return hallCharges;
	}

	public void setHallCharges(double hallCharges) {
		this.hallCharges = hallCharges;
	}

	public double getMedicalCharges() {
		return medicalCharges;
	}

	public void setMedicalCharges(double medicalCharges) {
		this.medicalCharges = medicalCharges;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}	

	public int getIdConfigurations() {
		return idConfigurations;
	}

	public void setIdConfigurations(int idConfigurations) {
		this.idConfigurations = idConfigurations;
	}

	public int getChargesId() {
		return chargesId;
	}

	public void setChargesId(int chargesId) {
		this.chargesId = chargesId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public int getCustomerType() {
		return customerType;
	}

	public void setCustomerType(int customerType) {
		this.customerType = customerType;
	}

	public int getCustomerName() {
		return customerName;
	}

	public void setCustomerName(int customerName) {
		this.customerName = customerName;
	}

	public int getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}	

	public List<LabConfigureServicesViewDto> getLstServiceConfigurations() {
		return lstServiceConfigurations;
	}

	public void setLstServiceConfigurations(List<LabConfigureServicesViewDto> lstServiceConfigurations) {
		this.lstServiceConfigurations = lstServiceConfigurations;
	}

	public double getCopay() {
		return copay;
	}

	public void setCopay(double copay) {
		this.copay = copay;
	}

	public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
	}

	public double getNumber() {
		return number;
	}

	public void setNumber(double number) {
		this.number = number;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public double getDistribute() {
		return distribute;
	}

	public void setDistribute(double distribute) {
		this.distribute = distribute;
	}

	public String getIncreaseordecrease() {
		return increaseordecrease;
	}

	public void setIncreaseordecrease(String increaseordecrease) {
		this.increaseordecrease = increaseordecrease;
	}

	public Date getFromDate() {
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

	public int getHallId() {
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
	}

	public Integer getIsComServId() {
		return isComServId;
	}

	public void setIsComServId(Integer isComServId) {
		this.isComServId = isComServId;
	}

	public Integer getIsComServlastId() {
		return isComServlastId;
	}

	public void setIsComServlastId(Integer isComServlastId) {
		this.isComServlastId = isComServlastId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getIscatHall() {
		return iscatHall;
	}

	public void setIscatHall(String iscatHall) {
		this.iscatHall = iscatHall;
	}

	public Integer getSelfId() {
		return selfId;
	}

	public void setSelfId(Integer selfId) {
		this.selfId = selfId;
	}	

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}
	
	public String getCgscode() {
		return cgscode;
	}

	public void setCgscode(String cgscode) {
		this.cgscode = cgscode;
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

	public String getCodenamech() {
		return codenamech;
	}

	public void setCodenamech(String codenamech) {
		this.codenamech = codenamech;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	
	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
}
