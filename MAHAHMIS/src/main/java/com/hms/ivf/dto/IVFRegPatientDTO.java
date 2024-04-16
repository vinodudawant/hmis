package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ivf_patient_records_details")
public class IVFRegPatientDTO {
	@Id
	@Column(name = "patient_id")
	private Integer patientId;
	
	
	  @Column(name = "patient_id",insertable=false,updatable=false) 
	  private String  patientIdd;
	 
	
	
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	/*@Column(name = "department_id")
	private Integer departmentId;
	*/
	/*@Column(name = "ref_doc_id")
	private Integer refDocId;
	*/
	/*@Column(name = "doctor_id")
	private String doctorId;
	*/
	@Column(name = "address")
	private String address;
	
	/*@Column(name = "token")
	private int token;
	
	@Column(name = "invoice_count")
	private int invoiceCount;
	
	@Column(name = "invoice_flag")
	private String invoiceFlag;
	*/
	@Column(name = "patient_name")
	private String patientName;
	
/*	@Column(name = "image_name")
	private String imageName;	
	*/
	@Column(name = "mobile")
	private String mobile;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "patient_age")
	private String age;
	
	/*@Column(name = "source_type_id")
	private int sourceTypeId;
	
	@Column(name = "charges_master_slave_id",columnDefinition="int default 0")
	private int chargesMasterSlaveId;
		*/
	/*@Column(name = "t_flag",columnDefinition="varchar(2) default 'N'")
	private String tFlag;
	*/
	
	/*@Column(name = "admission_date_time")
	private String admissionDateTime;
	*/
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	
	@Column(name = "dob")
	private String dob;
	
	@Column(name = "mrnno")
	private String mrnno;
	
	@Column(name = "weight",columnDefinition="varchar(255) default '0'")
	private String weight;
	
	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	@Column(name = "height",columnDefinition="varchar(255) default '0'")
	private String height;
 	
	/*@Column(name = "trcount")
	private String trcount;
	
	@Column(name = "opdipdno")
	private String opdipdno;
	
	@Column(name = "tokenno")
	private String tokenno;*/
	
	/*@Column(name = "mrnno")
	private String mrnno;
	
	@Column(name = "state_id")
	private int stateId;
	
	@Column(name = "town_id")
	private int townId;
	
	@Column(name = "district_id")
	private int districtId;
	
	@Column(name = "taluka_id")
	private int talukaId;*/
	
	
	/*@Column(name = "referred_source")
	 private int refSrcId;
	   
	 @Column(name = "referred_source_docId")
	 private int refSrcDocId;
	
	
	@Column(name = "emergency")
	private String emergency;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "isPpn")
	private String isPpn;
	
	@Column(name = "numbr")
	private Double numbr;
	
	@Column(name = "docNameChan")
	private String docNameChan;
	
	
	
	@Column(name = "discharge_date")
	private String dischargeDate;
	
	@Column(name = "discharge_time")
	private String dischargeTime;
	
	@Column(name = "sum_assured_amt")
	private String sumAssueredAmt;
	
	@Column(name = "self_sponser_pay_alert_flag",columnDefinition="varchar(2) default 'N'")
	private String selfSponserPayAlertFlag="N";*/
	
	@Column(name = "ivf_treat_flag")
	private String ivf_treat_flag;
	
	@Column(name = "ivf_treat_id")
	private Integer ivf_treat_id;
	
	@Column(name = "ivf_status")
	private String ivf_status;
	
	
	@Column(name = "ivf_pay_flag",columnDefinition="varchar(2) default 'N'")
	private String ivfPayFlag="N";

	
	/*@Column(name = "per_address")
	private String perAddress;
	
	@Column(name = "per_taluka_id")
	private int pertalukaId;
	
	@Column(name = "per_town_id")
	private int pertownId;
	
	@Column(name = "per_district_id")
	private int perdistrictId;
	
	@Column(name = "per_state_id")
	private int perstateId;
	
	@Column(name = "per_country_id")
	private int percountryId;
	
	@Column(name = "per_area_code")
	private int perareaCode;
	
	@Column(name = "relative_name")
	private String relativeName;
	
	@Column(name = "relation_id")
	private int relationId;
		
	@Column(name = "old_patient_id",columnDefinition="int default 0")
	private String oldPatientId;
	
	@Column(name = "department_name")
	private String departmentNameDoc;
	
	@Transient
	private double totDisc=0;
	
	@Transient
	private int visitNo;*/
	
	
	
	  @Column(name = "center_patient_id") 
	  private String center_patient_id;
	 
	 
	
	@Transient
	String createdate;
	
	@Transient
	private List<IVFRegPatientDTO> getListIVFRegPatientDTO;

	

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	/*
	 * public String getPatientIdd() { return patientIdd; }
	 * 
	 * public void setPatientIdd(String patientIdd) { this.patientIdd = patientIdd;
	 * }
	 */

	

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	

	


	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	
	


	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}


	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	

	

	public String getIvf_treat_flag() {
		return ivf_treat_flag;
	}

	public void setIvf_treat_flag(String ivf_treat_flag) {
		this.ivf_treat_flag = ivf_treat_flag;
	}

	public Integer getIvf_treat_id() {
		return ivf_treat_id;
	}

	public void setIvf_treat_id(Integer ivf_treat_id) {
		this.ivf_treat_id = ivf_treat_id;
	}

	public String getIvf_status() {
		return ivf_status;
	}

	public void setIvf_status(String ivf_status) {
		this.ivf_status = ivf_status;
	}

	

	public List<IVFRegPatientDTO> getGetListIVFRegPatientDTO() {
		return getListIVFRegPatientDTO;
	}

	public void setGetListIVFRegPatientDTO(
			List<IVFRegPatientDTO> getListIVFRegPatientDTO) {
		this.getListIVFRegPatientDTO = getListIVFRegPatientDTO;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}
	

	

	
	
	
	  public String getCenter_patient_id()
	  {
		  return center_patient_id; 
	 }
	  
	  public void setCenter_patient_id(String center_patient_id)
	  {
	  this.center_patient_id = center_patient_id; 
	  }
	 
	 

	public String getCreatedate() {
		return createdate;
	}

	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}

	public String getPatientIdd() {
		return patientIdd;
	}

	public void setPatientIdd(String patientIdd) {
		this.patientIdd = patientIdd;
	}

	public String getIvfPayFlag() {
		return ivfPayFlag;
	}

	public void setIvfPayFlag(String ivfPayFlag) {
		this.ivfPayFlag = ivfPayFlag;
	}

	/*
	 * @Override public String toString() { return "IVFRegPatientDTO [patientId=" +
	 * patientId + ", patientIdd=" + patientIdd + ", unitId=" + unitId +
	 * ", treatmentId=" + treatmentId + ", address=" + address + ", patientName=" +
	 * patientName + ", mobile=" + mobile + ", gender=" + gender + ", age=" + age +
	 * ", createdDateTime=" + createdDateTime + ", dob=" + dob + ", mrnno=" + mrnno
	 * + ", ivf_treat_flag=" + ivf_treat_flag + ", ivf_treat_id=" + ivf_treat_id +
	 * ", ivf_status=" + ivf_status + ", center_patient_id=" + center_patient_id +
	 * ", createdate=" + createdate + ", getListIVFRegPatientDTO=" +
	 * getListIVFRegPatientDTO + "]"; }
	 */


	
	
}
