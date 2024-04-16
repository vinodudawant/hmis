package com.hms.ipdbill.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

import com.hms.ehat.dto.DoctorDto;

public class IpdPatientsDto {

	@Transient
	private Integer ht_id;
	
	@Transient
	private String ht_name;
	
	@Transient
	private Integer ht_ehat_ht_id;
	
	@Transient
	private Integer h_id;
	
	@Transient
	private String h_name;
	
	@Transient
	private Integer h_ehat_h_id;
	
	@Transient
	private Integer bid;
	
	@Transient
	private Integer bed_hall_id;
	
	@Transient
	private String bname;
	
	@Transient
	private String bstate;
	
	@Transient
	private BigInteger patient_id;
	
	@Transient
	private BigInteger treatment_id;
	
	@Transient
	private String patient_name;
	
	@Transient
	private String mrnno;
	
	@Transient
	private String mobile;
	
	@Transient
	private Integer age;
	
	@Transient
	private Date created_date_time;
	
	//@Transient
	//private Integer addmit_days;
	
	@Transient
	private Number addmit_days;
	
	
	@Transient
	private String doctor_id;
	
	@Transient
	private BigInteger department_id;
	
	@Transient
	private String t_flag;
	
	@Transient
	private Double weight;
	
	@Transient
	private String opdipdno;
	
	@Transient
	private BigInteger unit_id;
	
	@Transient
	private BigInteger source_type_id;
	
	@Transient
	private BigInteger charges_master_slave_id;
	
	@Transient
	private String category_name;
	
	@Transient
	private BigInteger invoice_count;
	
	@Transient
	private BigInteger specialityId;
	
	@Transient
	private String doctorName;
	
	@Transient
	private String phyDisFlag;
	
	@Transient
	private Integer activePatCount;
	
	@Transient
	private Integer phyDisPatCount;
	
	@Transient
	private List<DoctorDto> lstDoctorDto;
	
	@Transient
	private List<IpdPatientsDto> lstIpdbillPatientsBeds;
	
	@Transient
	private Integer totalBedCount;
	

	public Integer getTotalBedCount() {
		return totalBedCount;
	}

	public void setTotalBedCount(Integer totalBedCount) {
		this.totalBedCount = totalBedCount;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public Integer getHt_id() {
		return ht_id;
	}

	public void setHt_id(Integer ht_id) {
		this.ht_id = ht_id;
	}

	public String getHt_name() {
		return ht_name;
	}

	public void setHt_name(String ht_name) {
		this.ht_name = ht_name;
	}

	public Integer getHt_ehat_ht_id() {
		return ht_ehat_ht_id;
	}

	public void setHt_ehat_ht_id(Integer ht_ehat_ht_id) {
		this.ht_ehat_ht_id = ht_ehat_ht_id;
	}

	public Integer getH_id() {
		return h_id;
	}

	public void setH_id(Integer h_id) {
		this.h_id = h_id;
	}

	public String getH_name() {
		return h_name;
	}

	public void setH_name(String h_name) {
		this.h_name = h_name;
	}

	public Integer getH_ehat_h_id() {
		return h_ehat_h_id;
	}

	public void setH_ehat_h_id(Integer h_ehat_h_id) {
		this.h_ehat_h_id = h_ehat_h_id;
	}

	public Integer getBid() {
		return bid;
	}

	public void setBid(Integer bid) {
		this.bid = bid;
	}

	public Integer getBed_hall_id() {
		return bed_hall_id;
	}

	public void setBed_hall_id(Integer bed_hall_id) {
		this.bed_hall_id = bed_hall_id;
	}

	public String getBname() {
		return bname;
	}

	public void setBname(String bname) {
		this.bname = bname;
	}

	public String getBstate() {
		return bstate;
	}

	public void setBstate(String bstate) {
		this.bstate = bstate;
	}

	public BigInteger getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(BigInteger patient_id) {
		this.patient_id = patient_id;
	}

	public BigInteger getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(BigInteger treatment_id) {
		this.treatment_id = treatment_id;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
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

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Date getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
	}	

	public Number getAddmit_days() {
		return addmit_days;
	}

	public void setAddmit_days(Number addmit_days) {
		this.addmit_days = addmit_days;
	}

	public String getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(String doctor_id) {
		this.doctor_id = doctor_id;
	}

	public BigInteger getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(BigInteger department_id) {
		this.department_id = department_id;
	}

	public String getT_flag() {
		return t_flag;
	}

	public void setT_flag(String t_flag) {
		this.t_flag = t_flag;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public BigInteger getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(BigInteger unit_id) {
		this.unit_id = unit_id;
	}

	public BigInteger getSource_type_id() {
		return source_type_id;
	}

	public void setSource_type_id(BigInteger source_type_id) {
		this.source_type_id = source_type_id;
	}

	public BigInteger getCharges_master_slave_id() {
		return charges_master_slave_id;
	}

	public void setCharges_master_slave_id(BigInteger charges_master_slave_id) {
		this.charges_master_slave_id = charges_master_slave_id;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public BigInteger getInvoice_count() {
		return invoice_count;
	}

	public void setInvoice_count(BigInteger invoice_count) {
		this.invoice_count = invoice_count;
	}

	public BigInteger getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(BigInteger specialityId) {
		this.specialityId = specialityId;
	}

	public List<DoctorDto> getLstDoctorDto() {
		return lstDoctorDto;
	}

	public void setLstDoctorDto(List<DoctorDto> lstDoctorDto) {
		this.lstDoctorDto = lstDoctorDto;
	}

	public List<IpdPatientsDto> getLstIpdbillPatientsBeds() {
		return lstIpdbillPatientsBeds;
	}

	public void setLstIpdbillPatientsBeds(List<IpdPatientsDto> lstIpdbillPatientsBeds) {
		this.lstIpdbillPatientsBeds = lstIpdbillPatientsBeds;
	}

	public String getPhyDisFlag() {
		return phyDisFlag;
	}

	public void setPhyDisFlag(String phyDisFlag) {
		this.phyDisFlag = phyDisFlag;
	}

	public Integer getActivePatCount() {
		return activePatCount;
	}

	public void setActivePatCount(Integer activePatCount) {
		this.activePatCount = activePatCount;
	}

	public Integer getPhyDisPatCount() {
		return phyDisPatCount;
	}

	public void setPhyDisPatCount(Integer phyDisPatCount) {
		this.phyDisPatCount = phyDisPatCount;
	}

	@Override
	public String toString() {
		return "IpdPatientsDto [ht_id=" + ht_id + ", ht_name=" + ht_name + ", ht_ehat_ht_id=" + ht_ehat_ht_id
				+ ", h_id=" + h_id + ", h_name=" + h_name + ", h_ehat_h_id=" + h_ehat_h_id + ", bid=" + bid
				+ ", bed_hall_id=" + bed_hall_id + ", bname=" + bname + ", bstate=" + bstate + ", patient_id="
				+ patient_id + ", treatment_id=" + treatment_id + ", patient_name=" + patient_name + ", mrnno=" + mrnno
				+ ", mobile=" + mobile + ", age=" + age + ", created_date_time=" + created_date_time + ", addmit_days="
				+ addmit_days + ", doctor_id=" + doctor_id + ", department_id=" + department_id + ", t_flag=" + t_flag
				+ ", weight=" + weight + ", opdipdno=" + opdipdno + ", unit_id=" + unit_id + ", source_type_id="
				+ source_type_id + ", charges_master_slave_id=" + charges_master_slave_id + ", category_name="
				+ category_name + ", invoice_count=" + invoice_count + ", specialityId=" + specialityId
				+ ", doctorName=" + doctorName + ", phyDisFlag=" + phyDisFlag + ", activePatCount=" + activePatCount
				+ ", phyDisPatCount=" + phyDisPatCount + ", lstDoctorDto=" + lstDoctorDto + ", lstIpdbillPatientsBeds="
				+ lstIpdbillPatientsBeds + ", totalBedCount=" + totalBedCount + "]";
	}

	
	
	
	
}
