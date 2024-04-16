package com.hms.ehat.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class OtFinanceReportDTO {

	private	int patId,treatment_id,service_id, sub_service_id,count_ot; //,
	private BigInteger chargesslaveid;
	String	ot_procedure,op_grade,sponsor_name;	//billNo,
	String patientName,service_name,doc_name,operation_specialisation,ot_nname,monthnm,theatername,consultantdoc; //,company,regNo,month,DOD,type,billType,consultant,refBy,payMethod,otName,anaesthesiaName;
	private double totalAmt,tot_amount,other_amount, tot_other_amount; //totBill,servAmt,patientPaid,sposorPaid,refund,totReceive,anaesthesiaCharges;
	@Temporal(TemporalType.TIMESTAMP)
	private	Date date;// DOA;
	private String theaterName,docsubserid,opgradeid;
	private int doctor_id,childsubservice_id;
	private Number theaterid;
	
	
	private Date crdate;
	
	List<ServiceMasterDto> lstOtHeader;
	List<ServiceMasterDto> lstOtDetails;
	List<ServiceMasterDto> lstDrRound;
	List<ServiceMasterDto> lstServMaster;
	List<OtFinanceReportDTO> lstIpdBreakup;
	public int getPatId() {
		return patId;
	}
	public Date getCrdate() {
		return crdate;
	}
	public void setCrdate(Date crdate) {
		this.crdate = crdate;
	}
	public void setPatId(int patId) {
		this.patId = patId;
	}
	public int getTreatment_id() {
		return treatment_id;
	}
	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}
	public int getService_id() {
		return service_id;
	}
	public void setService_id(int service_id) {
		this.service_id = service_id;
	}
	public int getSub_service_id() {
		return sub_service_id;
	}
	public void setSub_service_id(int sub_service_id) {
		this.sub_service_id = sub_service_id;
	}

	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getService_name() {
		return service_name;
	}
	public void setService_name(String service_name) {
		this.service_name = service_name;
	}
	public String getDoc_name() {
		return doc_name;
	}
	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}
	public double getTotalAmt() {
		return totalAmt;
	}
	public void setTotalAmt(double totalAmt) {
		this.totalAmt = totalAmt;
	}
	public double getTot_amount() {
		return tot_amount;
	}
	public void setTot_amount(double tot_amount) {
		this.tot_amount = tot_amount;
	}
	public double getOther_amount() {
		return other_amount;
	}
	public void setOther_amount(double other_amount) {
		this.other_amount = other_amount;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getTheaterName() {
		return theaterName;
	}
	public void setTheaterName(String theaterName) {
		this.theaterName = theaterName;
	}
	public List<ServiceMasterDto> getLstOtHeader() {
		return lstOtHeader;
	}
	public void setLstOtHeader(List<ServiceMasterDto> lstOtHeader) {
		this.lstOtHeader = lstOtHeader;
	}
	public List<ServiceMasterDto> getLstOtDetails() {
		return lstOtDetails;
	}
	public void setLstOtDetails(List<ServiceMasterDto> lstOtDetails) {
		this.lstOtDetails = lstOtDetails;
	}
	public List<ServiceMasterDto> getLstDrRound() {
		return lstDrRound;
	}
	public void setLstDrRound(List<ServiceMasterDto> lstDrRound) {
		this.lstDrRound = lstDrRound;
	}
	public List<ServiceMasterDto> getLstServMaster() {
		return lstServMaster;
	}
	public void setLstServMaster(List<ServiceMasterDto> lstServMaster) {
		this.lstServMaster = lstServMaster;
	}
	public List<OtFinanceReportDTO> getLstIpdBreakup() {
		return lstIpdBreakup;
	}
	public void setLstIpdBreakup(List<OtFinanceReportDTO> lstIpdBreakup) {
		this.lstIpdBreakup = lstIpdBreakup;
	}
	
	
	public String getOperation_specialisation() {
		return operation_specialisation;
	}
	public void setOperation_specialisation(String operation_specialisation) {
		this.operation_specialisation = operation_specialisation;
	}
	
	public double getTot_other_amount() {
		return tot_other_amount;
	}
	public void setTot_other_amount(double tot_other_amount) {
		this.tot_other_amount = tot_other_amount;
	}
	
	
	public String getOt_nname() {
		return ot_nname;
	}
	public void setOt_nname(String ot_nname) {
		this.ot_nname = ot_nname;
	}
	
	public int getDoctor_id() {
		return doctor_id;
	}
	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}
	public String getOt_procedure() {
		return ot_procedure;
	}
	public void setOt_procedure(String ot_procedure) {
		this.ot_procedure = ot_procedure;
	}
	public String getOp_grade() {
		return op_grade;
	}
	public void setOp_grade(String op_grade) {
		this.op_grade = op_grade;
	}


	
	public BigInteger getChargesslaveid() {
		return chargesslaveid;
	}
	public void setChargesslaveid(BigInteger chargesslaveid) {
		this.chargesslaveid = chargesslaveid;
	}
	public String getSponsor_name() {
		return sponsor_name;
	}
	public void setSponsor_name(String sponsor_name) {
		this.sponsor_name = sponsor_name;
	}
	public String getMonthnm() {
		return monthnm;
	}
	public void setMonthnm(String monthnm) {
		this.monthnm = monthnm;
	}
	public String getTheatername() {
		return theatername;
	}
	public void setTheatername(String theatername) {
		this.theatername = theatername;
	}
	
	public int getCount_ot() {
		return count_ot;
	}
	public void setCount_ot(int count_ot) {
		this.count_ot = count_ot;
	}
	
	public String getConsultantdoc() {
		return consultantdoc;
	}
	public void setConsultantdoc(String consultantdoc) {
		this.consultantdoc = consultantdoc;
	}
	public String getDocsubserid() {
		return docsubserid;
	}
	public void setDocsubserid(String docsubserid) {
		this.docsubserid = docsubserid;
	}
	public int getChildsubservice_id() {
		return childsubservice_id;
	}
	public void setChildsubservice_id(int childsubservice_id) {
		this.childsubservice_id = childsubservice_id;
	}
	public Number getTheaterid() {
		return theaterid;
	}
	public void setTheaterid(Number theaterid) {
		this.theaterid = theaterid;
	}
	public String getOpgradeid() {
		return opgradeid;
	}
	public void setOpgradeid(String opgradeid) {
		this.opgradeid = opgradeid;
	}
	
}
