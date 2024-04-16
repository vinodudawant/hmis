package com.hms.ipdbill.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

public class IpdGenFinalBillDTO {

	@Transient
	private Integer bill_id;

	@Transient
	private String doctor_id;

	@Transient
	private Integer treatment_id;

	@Transient
	private Integer department_id;

	@Transient
	private String t_flag;

	@Transient
	private Integer unit_id;

	@Transient
	private Integer patient_id;

	@Transient
	private String center_patient_id;

	@Transient
	private Date created_date_time;

	@Transient
	private String invoice_flag;
	
	@Transient
	private String opdipdno;
	
	@Transient
	private Integer invoice_count;

	@Transient
	private Integer charges_master_slave_id;

	@Transient
	private String category_name;

	@Transient
	private Date inv_created_date_time;

	@Transient
	private String patient_name;

	@Transient
	private String BedHall;

	@Transient
	private String hall_type_name;

	@Transient
	private BigInteger Hall_ID;

	@Transient
	private BigInteger ehat_hallid;

	@Transient
	private BigInteger idhall_type;

	@Transient
	private BigInteger ehat_halltype_id;

	@Transient
	private BigInteger bed_name;

	@Transient
	private Integer addmit_days;

	@Transient
	private Integer bed_id;

	@Transient
	private Double weight;
	
	@Transient
	private Integer age;
	
	@Transient
	private String mrnno;
	
	@Transient
	private String deleted;
	
	@Transient
	private String mobile;
	
	@Transient
	private String hname;
	
	@Transient
	private String phyDisFlag;
	
	@Transient
	private Integer genBillCount;
	
	@Transient
	private Integer finalBillCount;
	
	@Transient
	private Integer genBillPhyDisCount;
	
	@Transient
	private Integer finBillPhyDisCount;
	
	@Transient
	private List<IpdGenFinalBillDTO> lstIpdbillPatients;
	

	public Integer getBill_id() {
		return bill_id;
	}

	public void setBill_id(Integer bill_id) {
		this.bill_id = bill_id;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public String getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(String doctor_id) {
		this.doctor_id = doctor_id;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public Integer getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Integer department_id) {
		this.department_id = department_id;
	}

	public String getT_flag() {
		return t_flag;
	}

	public void setT_flag(String t_flag) {
		this.t_flag = t_flag;
	}

	public Integer getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}

	public Integer getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}

	public String getCenter_patient_id() {
		return center_patient_id;
	}

	public void setCenter_patient_id(String center_patient_id) {
		this.center_patient_id = center_patient_id;
	}

	public Date getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
	}

	public String getInvoice_flag() {
		return invoice_flag;
	}

	public void setInvoice_flag(String invoice_flag) {
		this.invoice_flag = invoice_flag;
	}

	public Integer getInvoice_count() {
		return invoice_count;
	}

	public void setInvoice_count(Integer invoice_count) {
		this.invoice_count = invoice_count;
	}

	public Integer getCharges_master_slave_id() {
		return charges_master_slave_id;
	}

	public void setCharges_master_slave_id(Integer charges_master_slave_id) {
		this.charges_master_slave_id = charges_master_slave_id;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public Date getInv_created_date_time() {
		return inv_created_date_time;
	}

	public void setInv_created_date_time(Date inv_created_date_time) {
		this.inv_created_date_time = inv_created_date_time;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}

	public String getBedHall() {
		return BedHall;
	}

	public void setBedHall(String bedHall) {
		BedHall = bedHall;
	}

	public String getHall_type_name() {
		return hall_type_name;
	}

	public void setHall_type_name(String hall_type_name) {
		this.hall_type_name = hall_type_name;
	}

	public BigInteger getHall_ID() {
		return Hall_ID;
	}

	public void setHall_ID(BigInteger hall_ID) {
		Hall_ID = hall_ID;
	}

	public BigInteger getEhat_hallid() {
		return ehat_hallid;
	}

	public void setEhat_hallid(BigInteger ehat_hallid) {
		this.ehat_hallid = ehat_hallid;
	}

	public BigInteger getIdhall_type() {
		return idhall_type;
	}

	public void setIdhall_type(BigInteger idhall_type) {
		this.idhall_type = idhall_type;
	}

	public BigInteger getEhat_halltype_id() {
		return ehat_halltype_id;
	}

	public void setEhat_halltype_id(BigInteger ehat_halltype_id) {
		this.ehat_halltype_id = ehat_halltype_id;
	}

	public BigInteger getBed_name() {
		return bed_name;
	}

	public void setBed_name(BigInteger bed_name) {
		this.bed_name = bed_name;
	}

	public Integer getAddmit_days() {
		return addmit_days;
	}

	public void setAddmit_days(Integer addmit_days) {
		this.addmit_days = addmit_days;
	}

	public Integer getBed_id() {
		return bed_id;
	}

	public void setBed_id(Integer bed_id) {
		this.bed_id = bed_id;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	
	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getHname() {
		return hname;
	}

	public void setHname(String hname) {
		this.hname = hname;
	}

	public String getPhyDisFlag() {
		return phyDisFlag;
	}

	public void setPhyDisFlag(String phyDisFlag) {
		this.phyDisFlag = phyDisFlag;
	}

	public List<IpdGenFinalBillDTO> getLstIpdbillPatients() {
		return lstIpdbillPatients;
	}

	public void setLstIpdbillPatients(List<IpdGenFinalBillDTO> lstIpdbillPatients) {
		this.lstIpdbillPatients = lstIpdbillPatients;
	}

	public Integer getGenBillCount() {
		return genBillCount;
	}

	public void setGenBillCount(Integer genBillCount) {
		this.genBillCount = genBillCount;
	}

	public Integer getFinalBillCount() {
		return finalBillCount;
	}

	public void setFinalBillCount(Integer finalBillCount) {
		this.finalBillCount = finalBillCount;
	}

	public Integer getGenBillPhyDisCount() {
		return genBillPhyDisCount;
	}

	public void setGenBillPhyDisCount(Integer genBillPhyDisCount) {
		this.genBillPhyDisCount = genBillPhyDisCount;
	}

	public Integer getFinBillPhyDisCount() {
		return finBillPhyDisCount;
	}

	public void setFinBillPhyDisCount(Integer finBillPhyDisCount) {
		this.finBillPhyDisCount = finBillPhyDisCount;
	}
	
	
	
}
