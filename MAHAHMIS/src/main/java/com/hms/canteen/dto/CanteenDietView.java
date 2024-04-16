package com.hms.canteen.dto;

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

@Entity
@Table(name = "ehat_cateen_view")
public class CanteenDietView implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="diet_id")
	private int dietId;
	
	@Column(name = "patient_id",columnDefinition="int default 0")
	private int patientId;
	
	@Column(name = "treatment_id",columnDefinition="int default 0")
	private int treatmentId;
	
	@Column(name = "bill_id",columnDefinition="int default 0")
	private int billId;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "count",columnDefinition="int default 0")
	private int count;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(22) default 'N'")
	private String deleted;

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "dierdata",columnDefinition="varchar(300) default '-'")
	private String dierdata;

	@Column(name = "deptid",columnDefinition="int default 0")
	private int deptid;
	
	@Column(name = "selDoc",columnDefinition="int default 0")
	private int selDocid;
	
	@Column(name = "customizeTempid",columnDefinition="int default 0")
	private int customizeTempid;
	
	@Column(name = "tempName",columnDefinition="varchar(45) default '-'")
	private String tempName;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "fromDate")
	private Date fromDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "toDate")
	private Date toDate;
	
	@Column(name = "bed_name")
	private String bedName;
	
	@Column(name = "Hname")
	private String HName;
	
	
	
	@Transient
	private List<CanteenDietView> lstDietMaster;
	
	@Transient
	private String from_date;
	
	@Transient
	private String to_date;
	
	public int getDietId() {
		return dietId;
	}

	public void setDietId(int dietId) {
		this.dietId = dietId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getBillId() {
		return billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public String getDierdata() {
		return dierdata;
	}

	public void setDierdata(String dierdata) {
		this.dierdata = dierdata;
	}

	public List<CanteenDietView> getLstDietMaster() {
		return lstDietMaster;
	}

	public void setLstDietMaster(List<CanteenDietView> lstDietMaster) {
		this.lstDietMaster = lstDietMaster;
	}

	public int getDeptid() {
		return deptid;
	}

	public void setDeptid(int deptid) {
		this.deptid = deptid;
	}

	
	public int getSelDocid() {
		return selDocid;
	}

	public void setSelDocid(int selDocid) {
		this.selDocid = selDocid;
	}

	public int getCustomizeTempid() {
		return customizeTempid;
	}

	public void setCustomizeTempid(int customizeTempid) {
		this.customizeTempid = customizeTempid;
	}

	public String getTempName() {
		return tempName;
	}

	public void setTempName(String tempName) {
		this.tempName = tempName;
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
	
	public String getBedName() {
		return bedName;
	}

	public void setBedName(String bedName) {
		this.bedName = bedName;
	}	
	
	public String getHName() {
		return HName;
	}

	public void setHName(String HName) {
		this.HName = HName;
	}

	public String getFrom_date() {
		return from_date;
	}

	public void setFrom_date(String from_date) {
		this.from_date = from_date;
	}

	public String getTo_date() {
		return to_date;
	}

	public void setTo_date(String to_date) {
		this.to_date = to_date;
	}	
	
}
