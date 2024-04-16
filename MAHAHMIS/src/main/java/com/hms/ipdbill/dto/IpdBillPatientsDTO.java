package com.hms.ipdbill.dto;

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

@Entity
@Table(name = "ehat_ipdbill_patients")
public class IpdBillPatientsDTO {

	@Id
	@GeneratedValue
	@Column(name = "patient_id")
	private Integer pId;
	
	@Column(name = "bill_id")
	private Integer billId;
	
	@Column(name = "treatment_id")
	private Integer treatId;
	
	@Column(name = "patient_id",insertable=false , updatable=false)
	private String pIdd;
	
	@Column(name = "invoice_count",insertable=false , updatable=false)
	private String inCount;
	
	@Column(name = "patient_name")
	private String patientName;	
	
	@Column(name = "department_id")
	private String deptId;
	
	@Column(name = "invoice_flag")
	private String invoiceFlag;
	
	@Column(name = "invoice_count")
	private Integer invoiceCount;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;
	
	@Column(name = "weight")
	private Integer weight;
	
	@Column(name = "age")
	private Integer age;
    
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
    
	@Column(name = "mrnno")
	private String mrnno;
	
	@Column(name = "mobile")
	private String mobile;	
	
	@Column(name = "opdipdno")
	private String opdipdno;
    
	@Column(name = "inv_created_date_time")
	private String invoiceDate;
     	
	/*@Column(name = "t_flag")
	private String treatFlag;*/
	
	@Column(name = "BedHall")
	private String bedHall;
	
	@Column(name = "hall_type_name")
	private String hallTypeName;
	
	@Column(name = "hname")
	private String hname;
	
	@Column(name = "Hall_ID")
	private Integer hallID;
	
	@Column(name = "ehat_hallid")
	private Integer ehathallid;
	
	@Column(name = "idhall_type")
	private Integer idhallType;
	
	@Column(name = "ehat_halltype_id")
	private Integer ehathalltypeid;
	
	@Column(name = "bed_name")
	private Integer bedName;
	
	// For Sponsor Name start
	@Column(name = "charges_master_slave_id")
	private Integer chargesSlaveId;
	
	@Column(name = "category_name")
	private String categoryName;
	// For Sponsor Name end
	@Column(name = "center_patient_id")
	private String centerPatientId;
	
	@Transient
	private List<IpdBillPatientsDTO> lstIpdbillPatients;

	public Integer getpId() {
		return pId;
	}

	public void setpId(Integer pId) {
		this.pId = pId;
	}

	public Integer getBillId() {
		return billId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public Integer getTreatId() {
		return treatId;
	}

	public void setTreatId(Integer treatId) {
		this.treatId = treatId;
	}

	public String getpIdd() {
		return pIdd;
	}

	public void setpIdd(String pIdd) {
		this.pIdd = pIdd;
	}

	public String getInCount() {
		return inCount;
	}

	public void setInCount(String inCount) {
		this.inCount = inCount;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getInvoiceFlag() {
		return invoiceFlag;
	}

	public void setInvoiceFlag(String invoiceFlag) {
		this.invoiceFlag = invoiceFlag;
	}

	public Integer getInvoiceCount() {
		return invoiceCount;
	}

	public void setInvoiceCount(Integer invoiceCount) {
		this.invoiceCount = invoiceCount;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getWeight() {
		return weight;
	}

	public void setWeight(Integer weight) {
		this.weight = weight;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public String getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public String getBedHall() {
		return bedHall;
	}

	public void setBedHall(String bedHall) {
		this.bedHall = bedHall;
	}

	public String getHallTypeName() {
		return hallTypeName;
	}

	public void setHallTypeName(String hallTypeName) {
		this.hallTypeName = hallTypeName;
	}

	public String getHname() {
		return hname;
	}

	public void setHname(String hname) {
		this.hname = hname;
	}

	public Integer getHallID() {
		return hallID;
	}

	public void setHallID(Integer hallID) {
		this.hallID = hallID;
	}

	public Integer getEhathallid() {
		return ehathallid;
	}

	public void setEhathallid(Integer ehathallid) {
		this.ehathallid = ehathallid;
	}

	public Integer getIdhallType() {
		return idhallType;
	}

	public void setIdhallType(Integer idhallType) {
		this.idhallType = idhallType;
	}

	public Integer getEhathalltypeid() {
		return ehathalltypeid;
	}

	public void setEhathalltypeid(Integer ehathalltypeid) {
		this.ehathalltypeid = ehathalltypeid;
	}

	public Integer getBedName() {
		return bedName;
	}

	public void setBedName(Integer bedName) {
		this.bedName = bedName;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public List<IpdBillPatientsDTO> getLstIpdbillPatients() {
		return lstIpdbillPatients;
	}

	public void setLstIpdbillPatients(List<IpdBillPatientsDTO> lstIpdbillPatients) {
		this.lstIpdbillPatients = lstIpdbillPatients;
	}
	
	
}
