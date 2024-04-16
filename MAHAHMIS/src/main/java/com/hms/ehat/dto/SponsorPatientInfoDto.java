package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.Immutable;

import com.hms.dto.Assessment;
import com.hms.dto.IPDHistoryMaster;
import com.hms.dto.Order_master;
import com.hms.ehat.controller.CpoeIPDdetails;
//import com.hms.operation.util.OTOperationNotes;
@XmlRootElement
@Entity 
@Immutable
@Table(name = "ehat_sponsor_pat_info")
public class SponsorPatientInfoDto implements Serializable{
	
	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;

	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "charges_slave_id")
	private Integer chargesSlaveId;
	
	@Column(name = "adminssion_date")
	private String adminssionDateTime;
	
	@Column(name = "cin_no")
	private String cinNo;
	
	@Column(name = "doc_name")
	private String treatingDoc;
	
	@Column(name = "qualification")
	private String qualification;
	
	@Column(name = "doc_reg_no")
	private String regNoWithStateCode;
	
	@Column(name = "doc_dept_name")
	private String docDeptName;
	
	@Column(name = "doc_spec_name")
	private String docSpecName;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "mobile")
	private String patientContactNo;
	
	@Column(name = "gender")
	private String gender;

	@Column(name = "sponsor_name")
	private String sponsorName;
	
	@Column(name = "tpa_id")
	private String tpaId;
	
	@Column(name = "policy_id")
	private String policyId;	
	
	@Column(name = "emp_id")
	private String empId;
	
	@Column(name = "invoice_count")
	private Integer invoiceCount;
	
	@Column(name = "t_flag")
	private String tFlag;
	
	@Column(name = "patient_age")
	private String patientAge;
	
	@Column(name = "discharge_type")
	private String dischargeType;
	
	@Column(name = "discharge_time")
	private String dischargeTime;
	
	@Column(name = "discharge_date")
	private String dischargeDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "chan_doc_name")
	private String chanDocName;
	
	@Column(name = "dep_name")
	private String departmentNameDoc;

	@Column(name = "date_of_admission")
	private String dateOfAdmission;
	
	@Column(name = "time_of_admission")
	private String timeOfAdmission;
	
	@Column(name = "id_number")
	private String idCardNo;
	
	@Column(name = "identity_proof")
	private String idCardName;
	
	@Column(name = "height")
	private String height;

	@Column(name = "weight")
	private String weight;
	
	@Column(name = "bed_name")
	private String roomType;
	
	@Column(name = "ward_name")
	private String wardName;

	@Column(name = "ip_reg")
	private String ipReg;
	
	@Column(name = "injury_date")
	private String injuryDate;
	
	@Column(name = "reported_to_police")
	private String reportedToPolice;
	
	@Column(name = "fir_no")
	private String firNo;
	
	@Column(name = "admission_notes")
	private String admissionNotes;
	
	@Column(name = "past_history")
	private String pastHistryOfPrsntAilment;
	
	@Column(name = "date_of_consultation")
	private String dateOfFirstConsultation;
	
	@Transient
	private String physicianName;
	
	@Transient
	private String physicianNo;
	
	@Transient
	private String relevantClinicalFinding;
	
	@Transient
	private String maternityG;

	@Transient
	private String maternityP;
	
	@Transient
	private String maternityL;
	
	@Transient
	private String maternityA;
	
	@Transient
	private String dateOfDelivery;
	
	@Transient
	private String emrgncyOrPlanned;
	
	@Transient
	private String expectedStayinDays;
	
	@Transient
	private String docContactNo;
	
	@Transient
	private String injuryBySubstanceAbuse;
	
	@Transient
	private String testConducted;
	
	@Transient
	private List<SponsorPatientInfoDto> listSponsorPatientInfo;

	@Transient
	private List<Assessment> listDignosis;

	@Transient
	private List<IPDHistoryMaster> listPatientHistory;
	
	@Transient
	private List<CpoeIPDdetails> listCpoeIPDdetails;
	
	@Transient
	private List<Order_master> listTreatmentMedicine;
	
	@Transient
	private List<Order_master> listTreatmentAtDischarge;
	
	//@Transient
	//private List<OTOperationNotes> listOtNotes;
	
	@Transient
	List<IPDHistoryMaster> listIpdHistory;
		
	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}	

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public String getAdminssionDateTime() {
		return adminssionDateTime;
	}

	public void setAdminssionDateTime(String adminssionDateTime) {
		this.adminssionDateTime = adminssionDateTime;
	}	

	public String getCinNo() {
		return cinNo;
	}

	public void setCinNo(String cinNo) {
		this.cinNo = cinNo;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getDocDeptName() {
		return docDeptName;
	}

	public void setDocDeptName(String docDeptName) {
		this.docDeptName = docDeptName;
	}

	public String getDocSpecName() {
		return docSpecName;
	}

	public void setDocSpecName(String docSpecName) {
		this.docSpecName = docSpecName;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getSponsorName() {
		return sponsorName;
	}

	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}

	public String getTpaId() {
		return tpaId;
	}

	public void setTpaId(String tpaId) {
		this.tpaId = tpaId;
	}	

	public String getPolicyId() {
		return policyId;
	}

	public void setPolicyId(String policyId) {
		this.policyId = policyId;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

/*	public Integer getBillId() {
		return billId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}
*/
	public Integer getInvoiceCount() {
		return invoiceCount;
	}

	public void setInvoiceCount(Integer invoiceCount) {
		this.invoiceCount = invoiceCount;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public String getPatientAge() {
		return patientAge;
	}

	public void setPatientAge(String patientAge) {
		this.patientAge = patientAge;
	}

	public String getDischargeType() {
		return dischargeType;
	}

	public void setDischargeType(String dischargeType) {
		this.dischargeType = dischargeType;
	}

	public String getAdmissionNotes() {
		return admissionNotes;
	}

	public void setAdmissionNotes(String admissionNotes) {
		this.admissionNotes = admissionNotes;
	}

	public String getDischargeDate() {
		return dischargeDate;
	}

	public void setDischargeDate(String dischargeDate) {
		this.dischargeDate = dischargeDate;
	}

	public String getDischargeTime() {
		return dischargeTime;
	}

	public void setDischargeTime(String dischargeTime) {
		this.dischargeTime = dischargeTime;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getChanDocName() {
		return chanDocName;
	}

	public void setChanDocName(String chanDocName) {
		this.chanDocName = chanDocName;
	}

	public String getDepartmentNameDoc() {
		return departmentNameDoc;
	}

	public void setDepartmentNameDoc(String departmentNameDoc) {
		this.departmentNameDoc = departmentNameDoc;
	}
	
	public String getDateOfAdmission() {
		return dateOfAdmission;
	}

	public void setDateOfAdmission(String dateOfAdmission) {
		this.dateOfAdmission = dateOfAdmission;
	}

	public String getTimeOfAdmission() {
		return timeOfAdmission;
	}

	public void setTimeOfAdmission(String timeOfAdmission) {
		this.timeOfAdmission = timeOfAdmission;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getWardName() {
		return wardName;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
	}

	public String getIpReg() {
		return ipReg;
	}

	public void setIpReg(String ipReg) {
		this.ipReg = ipReg;
	}

	public String getInjuryDate() {
		return injuryDate;
	}

	public void setInjuryDate(String injuryDate) {
		this.injuryDate = injuryDate;
	}

	public String getReportedToPolice() {
		return reportedToPolice;
	}

	public void setReportedToPolice(String reportedToPolice) {
		this.reportedToPolice = reportedToPolice;
	}

	public String getFirNo() {
		return firNo;
	}

	public void setFirNo(String firNo) {
		this.firNo = firNo;
	}

	public String getTreatingDoc() {
		return treatingDoc;
	}

	public void setTreatingDoc(String treatingDoc) {
		this.treatingDoc = treatingDoc;
	}

	public String getRegNoWithStateCode() {
		return regNoWithStateCode;
	}

	public void setRegNoWithStateCode(String regNoWithStateCode) {
		this.regNoWithStateCode = regNoWithStateCode;
	}

	public String getPatientContactNo() {
		return patientContactNo;
	}

	public void setPatientContactNo(String patientContactNo) {
		this.patientContactNo = patientContactNo;
	}

	public String getIdCardNo() {
		return idCardNo;
	}

	public void setIdCardNo(String idCardNo) {
		this.idCardNo = idCardNo;
	}

	public String getIdCardName() {
		return idCardName;
	}

	public void setIdCardName(String idCardName) {
		this.idCardName = idCardName;
	}

	public String getPhysicianName() {
		return physicianName;
	}

	public void setPhysicianName(String physicianName) {
		this.physicianName = physicianName;
	}

	public String getPhysicianNo() {
		return physicianNo;
	}

	public void setPhysicianNo(String physicianNo) {
		this.physicianNo = physicianNo;
	}

	public String getRelevantClinicalFinding() {
		return relevantClinicalFinding;
	}

	public void setRelevantClinicalFinding(String relevantClinicalFinding) {
		this.relevantClinicalFinding = relevantClinicalFinding;
	}

	public String getMaternityG() {
		return maternityG;
	}

	public void setMaternityG(String maternityG) {
		this.maternityG = maternityG;
	}

	public String getMaternityP() {
		return maternityP;
	}

	public void setMaternityP(String maternityP) {
		this.maternityP = maternityP;
	}

	public String getMaternityL() {
		return maternityL;
	}

	public void setMaternityL(String maternityL) {
		this.maternityL = maternityL;
	}

	public String getMaternityA() {
		return maternityA;
	}

	public void setMaternityA(String maternityA) {
		this.maternityA = maternityA;
	}

	public String getDateOfDelivery() {
		return dateOfDelivery;
	}

	public void setDateOfDelivery(String dateOfDelivery) {
		this.dateOfDelivery = dateOfDelivery;
	}

	public String getEmrgncyOrPlanned() {
		return emrgncyOrPlanned;
	}

	public void setEmrgncyOrPlanned(String emrgncyOrPlanned) {
		this.emrgncyOrPlanned = emrgncyOrPlanned;
	}

	public String getExpectedStayinDays() {
		return expectedStayinDays;
	}

	public void setExpectedStayinDays(String expectedStayinDays) {
		this.expectedStayinDays = expectedStayinDays;
	}

	public String getDocContactNo() {
		return docContactNo;
	}

	public void setDocContactNo(String docContactNo) {
		this.docContactNo = docContactNo;
	}

	public String getInjuryBySubstanceAbuse() {
		return injuryBySubstanceAbuse;
	}

	public void setInjuryBySubstanceAbuse(String injuryBySubstanceAbuse) {
		this.injuryBySubstanceAbuse = injuryBySubstanceAbuse;
	}

	public String getTestConducted() {
		return testConducted;
	}

	public void setTestConducted(String testConducted) {
		this.testConducted = testConducted;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public String getPastHistryOfPrsntAilment() {
		return pastHistryOfPrsntAilment;
	}

	public void setPastHistryOfPrsntAilment(String pastHistryOfPrsntAilment) {
		this.pastHistryOfPrsntAilment = pastHistryOfPrsntAilment;
	}

	public List<SponsorPatientInfoDto> getListSponsorPatientInfo() {
		return listSponsorPatientInfo;
	}

	public void setListSponsorPatientInfo(
			List<SponsorPatientInfoDto> listSponsorPatientInfo) {
		this.listSponsorPatientInfo = listSponsorPatientInfo;
	}

	public List<Assessment> getListDignosis() {
		return listDignosis;
	}

	public void setListDignosis(List<Assessment> listDignosis) {
		this.listDignosis = listDignosis;
	}

	public List<IPDHistoryMaster> getListPatientHistory() {
		return listPatientHistory;
	}

	public void setListPatientHistory(List<IPDHistoryMaster> listPatientHistory) {
		this.listPatientHistory = listPatientHistory;
	}
	
	public List<CpoeIPDdetails> getListCpoeIPDdetails() {
		return listCpoeIPDdetails;
	}

	public void setListCpoeIPDdetails(List<CpoeIPDdetails> listCpoeIPDdetails) {
		this.listCpoeIPDdetails = listCpoeIPDdetails;
	}	
	
	public List<Order_master> getListTreatmentMedicine() {
		return listTreatmentMedicine;
	}

	public void setListTreatmentMedicine(List<Order_master> listTreatmentMedicine) {
		this.listTreatmentMedicine = listTreatmentMedicine;
	}

	public List<Order_master> getListTreatmentAtDischarge() {
		return listTreatmentAtDischarge;
	}

	public void setListTreatmentAtDischarge(
			List<Order_master> listTreatmentAtDischarge) {
		this.listTreatmentAtDischarge = listTreatmentAtDischarge;
	}

	/*
	 * public List<OTOperationNotes> getListOtNotes() { return listOtNotes; }
	 * 
	 * public void setListOtNotes(List<OTOperationNotes> listOtNotes) {
	 * this.listOtNotes = listOtNotes; }
	 */

	public List<IPDHistoryMaster> getListIpdHistory() {
		return listIpdHistory;
	}

	public void setListIpdHistory(List<IPDHistoryMaster> listIpdHistory) {
		this.listIpdHistory = listIpdHistory;
	}

	public String getDateOfFirstConsultation() {
		return dateOfFirstConsultation;
	}

	public void setDateOfFirstConsultation(String dateOfFirstConsultation) {
		this.dateOfFirstConsultation = dateOfFirstConsultation;
	}
}
