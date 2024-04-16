package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_hospital_bill_master")
public class HospitalSaleBillMaster implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "hospital_bill_id")
	private Integer hospitalBillId;

	@Column(name = "hospital_bill_doc_no")
	private String hospitalBillDocNo;

	@Column(name = "hospital_bill_inward_no")
	private String hospitalBillInwardNo;

	@Column(name = "hospital_bill_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date hospitalBillDate;

	@Column(name = "hospital_bill_doctor_id")
	private Integer doctorMaster;

	@Column(name = "hospital_bill_patient_id")
	private Integer patientMaster;
	
	@Column(name = "hospital_bill_patient_name")
	private String patientName;
	
	@Column(name = "hospital_bill_patient_mobile")
	private String patientMobile;
	
	@Column(name = "hospital_bill_doctor_name")
	private String doctorName;

	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "hospital_slave_master_id", referencedColumnName = "hospital_bill_id")
	private List<HospitalSaleBillSlave> hospitalSaleBillSlaves = new ArrayList<HospitalSaleBillSlave>();
	
	@Column(name = "hospital_bill_ward")
	private String hospitalBillWard;

	@Column(name = "hospital_bill_total_balance")
	private Double hospitalBillTotalBalance;

	@Column(name = "hospital_bill_narration")
	private String hospitalBillNarration;

	@Column(name = "hospital_bill_gross_amt")
	private Double hospitalBillGrossAmt;

	@Column(name = "hospital_bill_add")
	private Double hospitalBillAdd;

	@Column(name = "hospital_bill_less")
	private Double hospitalBillLess;

	@Column(name = "hospital_bill_net_amt")
	private Double hospitalBillNetAmt;

	@Column(name = "hospital_bill_special_disc")
	private Double hospitalBillSpecialDisc;

	@Column(name = "hospital_bill_surcharges")
	private Double hospitalBillSurcharges;

	@Column(name = "hospital_bill_round")
	private Double hospitalBillRound;

	@Column(name = "hospital_bill_amount_received")
	private Double hospitalBillAmountReceived;

	@Column(name = "hospital_bill_cn")
	private Double hospitalBillCN;

	@Column(name = "hospital_bill_cd")
	private Double hospitalBillCD;

	@Column(name = "hospital_bill_cn_amt")
	private Double hospitalBillCnAmt;

	@Column(name = "hospital_bill_cd_amt")
	private Double hospitalBillCdAmt;

	@Column(name = "hospital_bill_delete_flag")
	private Integer hospitalBillDeleteFlag;

	@Column(name = "hospital_bill_update_date")
	private Date hospitalBillUpdateDate;
	
	@Column(name = "hospital_bill_user_id")
	private Integer hospitalBillUserId=0;
	
	@Column(name = "hospital_bill_sale_ip")
	private String hospitalBillSaleIp=null;

	public Integer getDoctorMaster() {
		return doctorMaster;
	}

	public void setDoctorMaster(Integer doctorMaster) {
		this.doctorMaster = doctorMaster;
	}

	public Integer getPatientMaster() {
		return patientMaster;
	}

	public void setPatientMaster(Integer patientMaster) {
		this.patientMaster = patientMaster;
	}

	public List<HospitalSaleBillSlave> getHospitalSaleBillSlaves() {
		return hospitalSaleBillSlaves;
	}

	public void setHospitalSaleBillSlaves(
			List<HospitalSaleBillSlave> hospitalSaleBillSlaves) {
		this.hospitalSaleBillSlaves = hospitalSaleBillSlaves;
	}

	

	public Integer getHospitalBillId() {
		return hospitalBillId;
	}

	public void setHospitalBillId(Integer hospitalBillId) {
		this.hospitalBillId = hospitalBillId;
	}

	public String getHospitalBillDocNo() {
		return hospitalBillDocNo;
	}

	public void setHospitalBillDocNo(String hospitalBillDocNo) {
		this.hospitalBillDocNo = hospitalBillDocNo;
	}

	public String getHospitalBillInwardNo() {
		return hospitalBillInwardNo;
	}

	public void setHospitalBillInwardNo(String hospitalBillInwardNo) {
		this.hospitalBillInwardNo = hospitalBillInwardNo;
	}

	public Date getHospitalBillDate() {
		return hospitalBillDate;
	}

	public void setHospitalBillDate(Date hospitalBillDate) {
		this.hospitalBillDate = hospitalBillDate;
	}

	public String getHospitalBillWard() {
		return hospitalBillWard;
	}

	public void setHospitalBillWard(String hospitalBillWard) {
		this.hospitalBillWard = hospitalBillWard;
	}

	public Double getHospitalBillTotalBalance() {
		return hospitalBillTotalBalance;
	}

	public void setHospitalBillTotalBalance(Double hospitalBillTotalBalance) {
		this.hospitalBillTotalBalance = hospitalBillTotalBalance;
	}

	public String getHospitalBillNarration() {
		return hospitalBillNarration;
	}

	public void setHospitalBillNarration(String hospitalBillNarration) {
		this.hospitalBillNarration = hospitalBillNarration;
	}

	public Double getHospitalBillGrossAmt() {
		return hospitalBillGrossAmt;
	}

	public void setHospitalBillGrossAmt(Double hospitalBillGrossAmt) {
		this.hospitalBillGrossAmt = hospitalBillGrossAmt;
	}

	public Double getHospitalBillAdd() {
		return hospitalBillAdd;
	}

	public void setHospitalBillAdd(Double hospitalBillAdd) {
		this.hospitalBillAdd = hospitalBillAdd;
	}

	public Double getHospitalBillLess() {
		return hospitalBillLess;
	}

	public void setHospitalBillLess(Double hospitalBillLess) {
		this.hospitalBillLess = hospitalBillLess;
	}

	

	public Double getHospitalBillRound() {
		return hospitalBillRound;
	}

	public void setHospitalBillRound(Double hospitalBillRound) {
		this.hospitalBillRound = hospitalBillRound;
	}

	public Double getHospitalBillAmountReceived() {
		return hospitalBillAmountReceived;
	}

	public void setHospitalBillAmountReceived(Double hospitalBillAmountReceived) {
		this.hospitalBillAmountReceived = hospitalBillAmountReceived;
	}

	

	public Double getHospitalBillNetAmt() {
		return hospitalBillNetAmt;
	}

	public void setHospitalBillNetAmt(Double hospitalBillNetAmt) {
		this.hospitalBillNetAmt = hospitalBillNetAmt;
	}

	public Double getHospitalBillSpecialDisc() {
		return hospitalBillSpecialDisc;
	}

	public void setHospitalBillSpecialDisc(Double hospitalBillSpecialDisc) {
		this.hospitalBillSpecialDisc = hospitalBillSpecialDisc;
	}

	public Double getHospitalBillSurcharges() {
		return hospitalBillSurcharges;
	}

	public void setHospitalBillSurcharges(Double hospitalBillSurcharges) {
		this.hospitalBillSurcharges = hospitalBillSurcharges;
	}

	public Double getHospitalBillCN() {
		return hospitalBillCN;
	}

	public void setHospitalBillCN(Double hospitalBillCN) {
		this.hospitalBillCN = hospitalBillCN;
	}

	public Double getHospitalBillCD() {
		return hospitalBillCD;
	}

	public void setHospitalBillCD(Double hospitalBillCD) {
		this.hospitalBillCD = hospitalBillCD;
	}

	public Double getHospitalBillCnAmt() {
		return hospitalBillCnAmt;
	}

	public void setHospitalBillCnAmt(Double hospitalBillCnAmt) {
		this.hospitalBillCnAmt = hospitalBillCnAmt;
	}

	public Double getHospitalBillCdAmt() {
		return hospitalBillCdAmt;
	}

	public void setHospitalBillCdAmt(Double hospitalBillCdAmt) {
		this.hospitalBillCdAmt = hospitalBillCdAmt;
	}

	public Integer getHospitalBillDeleteFlag() {
		return hospitalBillDeleteFlag;
	}

	public void setHospitalBillDeleteFlag(Integer hospitalBillDeleteFlag) {
		this.hospitalBillDeleteFlag = hospitalBillDeleteFlag;
	}

	public Date getHospitalBillUpdateDate() {
		return hospitalBillUpdateDate;
	}

	public void setHospitalBillUpdateDate(Date hospitalBillUpdateDate) {
		this.hospitalBillUpdateDate = hospitalBillUpdateDate;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPatientMobile() {
		return patientMobile;
	}

	public void setPatientMobile(String patientMobile) {
		this.patientMobile = patientMobile;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public Integer getHospitalBillUserId() {
		return hospitalBillUserId;
	}

	public void setHospitalBillUserId(Integer hospitalBillUserId) {
		this.hospitalBillUserId = hospitalBillUserId;
	}

	public String getHospitalBillSaleIp() {
		return hospitalBillSaleIp;
	}

	public void setHospitalBillSaleIp(String hospitalBillSaleIp) {
		this.hospitalBillSaleIp = hospitalBillSaleIp;
	}
}