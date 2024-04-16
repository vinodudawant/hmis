package com.hms.ipdbill.dto;

import java.math.BigInteger;

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

import com.hms.ehat.dto.DoctorDto;

@Entity
@Table(name = "ehat_ipdbed_view")
public class IpdBillPatientsBedsDTO {

	@Column(name = "patient_id")
	private Integer pId;
	
	@Column(name = "ht_id")
	private Integer halltypeId;
	
	@Column(name = "treatment_id")
	private BigInteger treatId;
	
	@Column(name = "patient_id",insertable=false , updatable=false)
	private String pIdd;
	
	@Column(name = "patient_name")
	private String patientName;	
	
	@Column(name = "department_id")
	private BigInteger deptId;

	@Column(name = "unit_id")
	private Integer unitId;
		
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

	@Column(name = "ht_name")
	private String hallTypeName;
	
	@Column(name = "h_name")
	private String hname;
	
	@Column(name = "h_id")
	private Integer hallID;

	@Column(name = "h_ehat_h_id")
	private Integer ehathallid;

	@Column(name = "ht_ehat_ht_id")
	private Integer ehathalltypeid;
	
	
	@Column(name = "doctor_id")
	private String doctorId;
    
	@Column(name = "addmit_days")
	private Integer addmittedDays;
	
	@Id
	@Column(name = "bid")
	private Integer bedId;
	
	@Column(name = "bed_hall_id")
	private Integer bedHallId;
	
	@Column(name = "bname")
	private String bedName;
	
	@Column(name = "bstate")
	private int bedState;
	
	@Column(name = "t_flag")
	private String treatmentFlag;
	
	@Column(name = "source_type_id")
	private int sourceTypeId;
	
	@Column(name = "invoice_count")
	private int invoiceCount;
	
	@Column(name = "category_name")
	private String sponsorName;
	
	@Column(name = "charges_master_slave_id")
	private int chargesMasterSlaveId;
	
	@Transient
	private List<DoctorDto> lstDoctorDto;
    
	@Transient
	private List<IpdBillPatientsBedsDTO> lstIpdbillPatientsBeds;

	public Integer getpId() {
		return pId;
	}

	public void setpId(Integer pId) {
		this.pId = pId;
	}

	public BigInteger getTreatId() {
		return treatId;
	}

	public void setTreatId(BigInteger treatId) {
		this.treatId = treatId;
	}

	public String getpIdd() {
		return pIdd;
	}

	public void setpIdd(String pIdd) {
		this.pIdd = pIdd;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public BigInteger getDeptId() {
		return deptId;
	}

	public void setDeptId(BigInteger deptId) {
		this.deptId = deptId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public Integer getEhathalltypeid() {
		return ehathalltypeid;
	}

	public void setEhathalltypeid(Integer ehathalltypeid) {
		this.ehathalltypeid = ehathalltypeid;
	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public Integer getAddmittedDays() {
		return addmittedDays;
	}

	public void setAddmittedDays(Integer addmittedDays) {
		this.addmittedDays = addmittedDays;
	}

	public Integer getBedId() {
		return bedId;
	}

	public void setBedId(Integer bedId) {
		this.bedId = bedId;
	}

	public Integer getBedHallId() {
		return bedHallId;
	}

	public void setBedHallId(Integer bedHallId) {
		this.bedHallId = bedHallId;
	}

	public String getBedName() {
		return bedName;
	}

	public void setBedName(String bedName) {
		this.bedName = bedName;
	}

	public int getBedState() {
		return bedState;
	}

	public void setBedState(int bedState) {
		this.bedState = bedState;
	}

	public String getTreatmentFlag() {
		return treatmentFlag;
	}

	public void setTreatmentFlag(String treatmentFlag) {
		this.treatmentFlag = treatmentFlag;
	}

	public List<DoctorDto> getLstDoctorDto() {
		return lstDoctorDto;
	}

	public void setLstDoctorDto(List<DoctorDto> lstDoctorDto) {
		this.lstDoctorDto = lstDoctorDto;
	}

	public List<IpdBillPatientsBedsDTO> getLstIpdbillPatientsBeds() {
		return lstIpdbillPatientsBeds;
	}

	public void setLstIpdbillPatientsBeds(
			List<IpdBillPatientsBedsDTO> lstIpdbillPatientsBeds) {
		this.lstIpdbillPatientsBeds = lstIpdbillPatientsBeds;
	}

	public Integer getHalltypeId() {
		return halltypeId;
	}

	public void setHalltypeId(Integer halltypeId) {
		this.halltypeId = halltypeId;
	}

	public int getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public int getChargesMasterSlaveId() {
		return chargesMasterSlaveId;
	}

	public void setChargesMasterSlaveId(int chargesMasterSlaveId) {
		this.chargesMasterSlaveId = chargesMasterSlaveId;
	}

	public String getSponsorName() {
		return sponsorName;
	}

	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}

	public int getInvoiceCount() {
		return invoiceCount;
	}

	public void setInvoiceCount(int invoiceCount) {
		this.invoiceCount = invoiceCount;
	}	
	
	@Column(name = "specialityId")
	private int specialityId;

	public int getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(int specialityId) {
		this.specialityId = specialityId;
	}
	@Transient
	private BigInteger patientID;

	public BigInteger getPatientID() {
		return patientID;
	}

	public void setPatientID(BigInteger patientID) {
		this.patientID = patientID;
	}
	
	@Transient
	private String patientAge;

	public String getPatientAge() {
		return patientAge;
	}

	public void setPatientAge(String patientAge) {
		this.patientAge = patientAge;
	}
	@Transient
	private String weight1;

	public String getWeight1() {
		return weight1;
	}

	public void setWeight1(String weight1) {
		this.weight1 = weight1;
	}
	@Transient
	private BigInteger bedname;

	public BigInteger getBedname() {
		return bedname;
	}

	public void setBedname(BigInteger bedname) {
		this.bedname = bedname;
	}
	@Transient
	private BigInteger specID;

	public BigInteger getSpecID() {
		return specID;
	}

	public void setSpecID(BigInteger specID) {
		this.specID = specID;
	}
	@Transient
	private BigInteger treatID;

	public BigInteger getTreatID() {
		return treatID;
	}

	public void setTreatID(BigInteger treatID) {
		this.treatID = treatID;
	}
	
}
