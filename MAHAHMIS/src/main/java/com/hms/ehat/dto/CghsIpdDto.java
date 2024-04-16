package com.hms.ehat.dto;

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

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ehat_ipd_cghs_details")
public class CghsIpdDto {
	

	@Id
	@GeneratedValue
	@Column(name = "cghs_id")
	private Integer cghsId;
		
	@Column(name = "treatment_id")
	private Integer treatmentId=0;
	
	@Column(name = "patient_id")
	private Integer patientId=0;
	
	@Column(name = "department_id")
	private Integer departmentId=0;
	
	@Column(name = "bill_id")
	private Integer billId=0;
	
	@Column(name = "rate")
	private double rate=0;
	
	@Column(name = "quantity")
	private double quantity=1;
	
	@Column(name = "concession")
	private double concession=0;
	
	@Column(name = "amount")
	private double amount=0;
	
	@Column(name = "service_name")
	private String serviceName;
	
	@Column(name = "pack_code")
	private String packService;
	
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy=0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id")
	private int unitId=0;	
	
	
	@Column(name = "co_pay")
	private double coPay=0;
	
	@Column(name = "pay")
	private double pay=0;
	
	@Column(name = "cghs_flag")
	private String cghsFlag="N";	
	
	@Transient
	private String queryType;
	
	@Transient
	private List<CghsIpdDto> listCghsRemain;
	
	@Transient
	private List<CghsIpdDto> listCghs;

	public Integer getCghsId() {
		return cghsId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public Integer getBillId() {
		return billId;
	}

	public double getRate() {
		return rate;
	}

	public double getQuantity() {
		return quantity;
	}

	public double getConcession() {
		return concession;
	}

	public double getAmount() {
		return amount;
	}

	public String getDeleted() {
		return deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public double getCoPay() {
		return coPay;
	}

	public double getPay() {
		return pay;
	}

	public String getCghsFlag() {
		return cghsFlag;
	}

	public void setCghsId(Integer cghsId) {
		this.cghsId = cghsId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public void setConcession(double concession) {
		this.concession = concession;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public void setCoPay(double coPay) {
		this.coPay = coPay;
	}

	public void setPay(double pay) {
		this.pay = pay;
	}

	public void setCghsFlag(String cghsFlag) {
		this.cghsFlag = cghsFlag;
	}

	public List<CghsIpdDto> getListCghsRemain() {
		return listCghsRemain;
	}

	public List<CghsIpdDto> getListCghs() {
		return listCghs;
	}

	public void setListCghsRemain(List<CghsIpdDto> listCghsRemain) {
		this.listCghsRemain = listCghsRemain;
	}

	public void setListCghs(List<CghsIpdDto> listCghs) {
		this.listCghs = listCghs;
	}

	public String getQueryType() {
		return queryType;
	}

	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getPackService() {
		return packService;
	}

	public void setPackService(String packService) {
		this.packService = packService;
	}



}
