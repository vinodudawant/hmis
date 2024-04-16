package com.hms.dto;
import java.util.Date;
import java.util.List;
import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ProFeesDTO {
	
	private List<ProFeesDTO> listProFeesPaymentDetails = null;
	
	private int idpfPaymentDetails = 0;
	private int testId = 0;
	private int testQuantity = 0;
	private int testGroupId = 0;
	private int treatmentId = 0;
	private int insertedBy = 0;
	private int billReceiptId = 0;
	private int billComponentId = 0;
	private int consultingDoctorId = 0;
	private int refferdDoctorId = 0;
	
	
	private Date date = null;
	
	private String dateString = null;
	private String hospitalName = null;

	private String testName = null ;
	private String patientReferredTo = null ;
	private String testGroupName = null ;
	private String paymentType = null ;
	private String time = null ;
	private String status = null ;
	private String serviceType = null;
	private String billReceiptPaidStatus = null;
	private String pfVoucherGenerated = null;
	
	private double testActualRate = 0;
	private double pfUnpaidAmount = 0;
	private double pfPaidAmount = 0;
	private double reductionAmount = 0;
	private double testPaidAmount = 0;
	private double doctorsActualCut = 0;
	private double clinicPercentInAmount = 0;
	private double clinicPercent = 0;
	private double payable = 0;
	private double discountOnTest = 0;
	
	//for reports
	private String doctorName = null;
	private String patientName = null;
	private String speciality = null;
	private String radioType = null;
	
	private int doctorId = 0;
	private int patientId = 0;
	
	private Date fromDate = null;
	private Date toDate = null;
	private String assignDate = null;
	
	private String visitDate = null;
	
	private List<ProFeesDTO> listReports = null;
	private List<ProFeesDTO> listBusinessReports = null;
	private List<ProFeesDTO> listDoctors = null;
	
	double docTotal = 0;
	double docNet = 0;
	double docPFPaid = 0;
	double docReduction = 0;
	
	double invTotal = 0;
	double invNet = 0;
	double invPFPaid = 0;
	double invReduction = 0;
	
	double physioTotal = 0;
	double physioNet = 0;
	double physioPFPaid = 0;
	double physioReduction = 0;
	
	double osTotal = 0;
	double osNet = 0;
	double osPFPaid = 0;
	double osReduction = 0;
	
	double totalBilling = 0;
	double netBilling = 0;
	
	double dailyTotal = 0;
	double dailyNet = 0;
	
	double csTotal = 0;
	double csNet = 0;
	double csPFPaid = 0;
	double csReduction = 0;
	
	double pathoTotal = 0;
	double pathoNet = 0;
	double pathoPFPaid = 0;
	double pathoReduction = 0;
	
	double totalPFPaid = 0;
	double totalReduction = 0;
	
	public double getTotalPFPaid() {
		return totalPFPaid;
	}

	public void setTotalPFPaid(double totalPFPaid) {
		this.totalPFPaid = totalPFPaid;
	}

	public double getTotalReduction() {
		return totalReduction;
	}

	public void setTotalReduction(double totalReduction) {
		this.totalReduction = totalReduction;
	}
	
	
	public double getDocPFPaid() {
		return docPFPaid;
	}

	public void setDocPFPaid(double docPFPaid) {
		this.docPFPaid = docPFPaid;
	}

	public double getDocReduction() {
		return docReduction;
	}

	public void setDocReduction(double docReduction) {
		this.docReduction = docReduction;
	}

	public double getInvPFPaid() {
		return invPFPaid;
	}

	public void setInvPFPaid(double invPFPaid) {
		this.invPFPaid = invPFPaid;
	}

	public double getInvReduction() {
		return invReduction;
	}

	public void setInvReduction(double invReduction) {
		this.invReduction = invReduction;
	}

	public double getPhysioPFPaid() {
		return physioPFPaid;
	}

	public void setPhysioPFPaid(double physioPFPaid) {
		this.physioPFPaid = physioPFPaid;
	}

	public double getPhysioReduction() {
		return physioReduction;
	}

	public void setPhysioReduction(double physioReduction) {
		this.physioReduction = physioReduction;
	}

	public double getOsPFPaid() {
		return osPFPaid;
	}

	public void setOsPFPaid(double osPFPaid) {
		this.osPFPaid = osPFPaid;
	}

	public double getOsReduction() {
		return osReduction;
	}

	public void setOsReduction(double osReduction) {
		this.osReduction = osReduction;
	}

	public double getCsPFPaid() {
		return csPFPaid;
	}

	public void setCsPFPaid(double csPFPaid) {
		this.csPFPaid = csPFPaid;
	}

	public double getCsReduction() {
		return csReduction;
	}

	public void setCsReduction(double csReduction) {
		this.csReduction = csReduction;
	}

	public double getPathoPFPaid() {
		return pathoPFPaid;
	}

	public void setPathoPFPaid(double pathoPFPaid) {
		this.pathoPFPaid = pathoPFPaid;
	}

	public double getPathoReduction() {
		return pathoReduction;
	}

	public void setPathoReduction(double pathoReduction) {
		this.pathoReduction = pathoReduction;
	}
	
	public String getAssignDate() {
		return assignDate;
	}

	public void setAssignDate(String assignDate) {
		this.assignDate = assignDate;
	}
	
	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}
	
	public String getDateString() {
		return dateString;
	}

	public void setDateString(String dateString) {
		this.dateString = dateString;
	}

	public double getCsTotal() {
		return csTotal;
	}

	public void setCsTotal(double csTotal) {
		this.csTotal = csTotal;
	}

	public double getCsNet() {
		return csNet;
	}

	public void setCsNet(double csNet) {
		this.csNet = csNet;
	}

	public double getPathoTotal() {
		return pathoTotal;
	}

	public void setPathoTotal(double pathoTotal) {
		this.pathoTotal = pathoTotal;
	}

	public double getPathoNet() {
		return pathoNet;
	}

	public void setPathoNet(double pathoNet) {
		this.pathoNet = pathoNet;
	}
	
	@JsonGetter("dailyTotal")
	public double getDailyTotal() {
		return dailyTotal;
	}

	@JsonSetter("dailyTotal")
	public void setDailyTotal(double dailyTotal) {
		this.dailyTotal = dailyTotal;
	}

	@JsonGetter("dailyNet")
	public double getDailyNet() {
		return dailyNet;
	}

	@JsonSetter("dailyNet")
	public void setDailyNet(double dailyNet) {
		this.dailyNet = dailyNet;
	}

	@JsonGetter("totalBilling")
	public double getTotalBilling() {
		return totalBilling;
	}

	@JsonSetter("totalBilling")
	public void setTotalBilling(double totalBilling) {
		this.totalBilling = totalBilling;
	}

	public double getNetBilling() {
		return netBilling;
	}

	public void setNetBilling(double netBilling) {
		this.netBilling = netBilling;
	}

	public double getDocTotal() {
		return docTotal;
	}

	public void setDocTotal(double docTotal) {
		this.docTotal = docTotal;
	}

	public double getDocNet() {
		return docNet;
	}

	public void setDocNet(double docNet) {
		this.docNet = docNet;
	}

	public double getInvTotal() {
		return invTotal;
	}

	public void setInvTotal(double invTotal) {
		this.invTotal = invTotal;
	}

	public double getInvNet() {
		return invNet;
	}

	public void setInvNet(double invNet) {
		this.invNet = invNet;
	}

	public double getPhysioTotal() {
		return physioTotal;
	}

	public void setPhysioTotal(double physioTotal) {
		this.physioTotal = physioTotal;
	}

	public double getPhysioNet() {
		return physioNet;
	}

	public void setPhysioNet(double physioNet) {
		this.physioNet = physioNet;
	}

	@JsonGetter("osTotal")
	public double getOsTotal() {
		return osTotal;
	}

	@JsonSetter("osTotal")
	public void setOsTotal(double osTotal) {
		this.osTotal = osTotal;
	}

	@JsonGetter("osNet")
	public double getOsNet() {
		return osNet;
	}

	@JsonSetter("osNet")
	public void setOsNet(double osNet) {
		this.osNet = osNet;
	}
	
	@JsonGetter("listDoctors")
	public List<ProFeesDTO> getListDoctors() {
		return listDoctors;
	}

	@JsonSetter("listDoctors")
	public void setListDoctors(List<ProFeesDTO> listDoctors) {
		this.listDoctors = listDoctors;
	}

	@JsonGetter("listBusinessReports")
	public List<ProFeesDTO> getListBusinessReports() {
		return listBusinessReports;
	}

	@JsonSetter("listBusinessReports")
	public void setListBusinessReports(List<ProFeesDTO> listBusinessReports) {
		this.listBusinessReports = listBusinessReports;
	}

	@JsonGetter("radioType")
	public String getRadioType() {
		return radioType;
	}

	@JsonSetter("radioType")
	public void setRadioType(String radioType) {
		this.radioType = radioType;
	}
	
	@JsonGetter("doctorName")
	public String getDoctorName() {
		return doctorName;
	}

	@JsonSetter("doctorName")
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	@JsonGetter("patientName")
	public String getPatientName() {
		return patientName;
	}

	@JsonSetter("patientName")
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	@JsonGetter("speciality")
	public String getSpeciality() {
		return speciality;
	}

	@JsonSetter("speciality")
	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	@JsonGetter("doctorId")
	public int getDoctorId() {
		return doctorId;
	}

	@JsonSetter("doctorId")
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	@JsonGetter("patientId")
	public int getPatientId() {
		return patientId;
	}

	@JsonSetter("patientId")
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	@JsonGetter("fromDate")
	public Date getFromDate() {
		return fromDate;
	}

	@JsonSetter("fromDate")
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	@JsonGetter("toDate")
	public Date getToDate() {
		return toDate;
	}

	@JsonSetter("toDate")
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	@JsonGetter("visitDate")
	public String getVisitDate() {
		return visitDate;
	}

	@JsonSetter("visitDate")
	public void setVisitDate(String visitDate) {
		this.visitDate = visitDate;
	}

	@JsonGetter("listReports")
	public List<ProFeesDTO> getListReports() {
		return listReports;
	}

	@JsonSetter("listReports")
	public void setListReports(List<ProFeesDTO> listReports) {
		this.listReports = listReports;
	}

	@JsonGetter("billReceiptPaidStatus")
	public String getBillReceiptPaidStatus() {
		return billReceiptPaidStatus;
	}

	@JsonSetter("billReceiptPaidStatus")
	public void setBillReceiptPaidStatus(String billReceiptPaidStatus) {
		this.billReceiptPaidStatus = billReceiptPaidStatus;
	}

	@JsonGetter("pfVoucherGenerated")
	public String getPfVoucherGenerated() {
		return pfVoucherGenerated;
	}

	@JsonSetter("pfVoucherGenerated")
	public void setPfVoucherGenerated(String pfVoucherGenerated) {
		this.pfVoucherGenerated = pfVoucherGenerated;
	}

	@JsonGetter("consultingDoctorId")
	public int getConsultingDoctorId() {
		return consultingDoctorId;
	}

	@JsonSetter("consultingDoctorId")
	public void setConsultingDoctorId(int consultingDoctorId) {
		this.consultingDoctorId = consultingDoctorId;
	}

	@JsonGetter("refferdDoctorId")
	public int getRefferdDoctorId() {
		return refferdDoctorId;
	}

	@JsonSetter("refferdDoctorId")
	public void setRefferdDoctorId(int refferdDoctorId) {
		this.refferdDoctorId = refferdDoctorId;
	}

	@JsonGetter("pfUnpaidAmount")
	public double getPfUnpaidAmount() {
		return pfUnpaidAmount;
	}

	@JsonSetter("pfUnpaidAmount")
	public void setPfUnpaidAmount(double pfUnpaidAmount) {
		this.pfUnpaidAmount = pfUnpaidAmount;
	}

	@JsonGetter("pfPaidAmount")
	public double getPfPaidAmount() {
		return pfPaidAmount;
	}

	@JsonSetter("pfPaidAmount")
	public void setPfPaidAmount(double pfPaidAmount) {
		this.pfPaidAmount = pfPaidAmount;
	}

	@JsonGetter("reductionAmount")
	public double getReductionAmount() {
		return reductionAmount;
	}

	@JsonSetter("reductionAmount")
	public void setReductionAmount(double reductionAmount) {
		this.reductionAmount = reductionAmount;
	}

	@JsonGetter("testPaidAmount")
	public double getTestPaidAmount() {
		return testPaidAmount;
	}

	@JsonSetter("testPaidAmount")
	public void setTestPaidAmount(double testPaidAmount) {
		this.testPaidAmount = testPaidAmount;
	}

	@JsonGetter("doctorsActualCut")
	public double getDoctorsActualCut() {
		return doctorsActualCut;
	}

	@JsonSetter("doctorsActualCut")
	public void setDoctorsActualCut(double doctorsActualCut) {
		this.doctorsActualCut = doctorsActualCut;
	}

	@JsonGetter("clinicPercentInAmount")
	public double getClinicPercentInAmount() {
		return clinicPercentInAmount;
	}

	@JsonSetter("clinicPercentInAmount")
	public void setClinicPercentInAmount(double clinicPercentInAmount) {
		this.clinicPercentInAmount = clinicPercentInAmount;
	}

	@JsonGetter("clinicPercent")
	public double getClinicPercent() {
		return clinicPercent;
	}

	@JsonSetter("clinicPercent")
	public void setClinicPercent(double clinicPercent) {
		this.clinicPercent = clinicPercent;
	}

	@JsonGetter("payable")
	public double getPayable() {
		return payable;
	}

	@JsonSetter("payable")
	public void setPayable(double payable) {
		this.payable = payable;
	}

	@JsonGetter("discountOnTest")
	public double getDiscountOnTest() {
		return discountOnTest;
	}

	@JsonSetter("discountOnTest")
	public void setDiscountOnTest(double discountOnTest) {
		this.discountOnTest = discountOnTest;
	}
	
	@JsonGetter("serviceType")
	public String getServiceType() {
		return serviceType;
	}

	@JsonSetter("serviceType")
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	@JsonGetter("testId")
	public int getTestId() {
		return testId;
	}

	@JsonSetter("testId")
	public void setTestId(int testId) {
		this.testId = testId;
	}

	@JsonGetter("testQuantity")
	public int getTestQuantity() {
		return testQuantity;
	}

	@JsonSetter("testQuantity")
	public void setTestQuantity(int testQuantity) {
		this.testQuantity = testQuantity;
	}

	@JsonGetter("testGroupId")
	public int getTestGroupId() {
		return testGroupId;
	}

	@JsonSetter("testGroupId")
	public void setTestGroupId(int testGroupId) {
		this.testGroupId = testGroupId;
	}

	@JsonGetter("treatmentId")
	public int getTreatmentId() {
		return treatmentId;
	}

	@JsonSetter("treatmentId")
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	@JsonGetter("insertedBy")
	public int getInsertedBy() {
		return insertedBy;
	}

	@JsonSetter("insertedBy")
	public void setInsertedBy(int insertedBy) {
		this.insertedBy = insertedBy;
	}

	@JsonGetter("billReceiptId")
	public int getBillReceiptId() {
		return billReceiptId;
	}

	@JsonSetter("billReceiptId")
	public void setBillReceiptId(int billReceiptId) {
		this.billReceiptId = billReceiptId;
	}

	@JsonGetter("billComponentId")
	public int getBillComponentId() {
		return billComponentId;
	}

	@JsonSetter("billComponentId")
	public void setBillComponentId(int billComponentId) {
		this.billComponentId = billComponentId;
	}

	@JsonGetter("date")
	public Date getDate() {
		return date;
	}

	@JsonSetter("date")
	public void setDate(Date date) {
		this.date = date;
	}

	@JsonGetter("patientReferredTo")
	public String getPatientReferredTo() {
		return patientReferredTo;
	}

	@JsonSetter("patientReferredTo")
	public void setPatientReferredTo(String patientReferredTo) {
		this.patientReferredTo = patientReferredTo;
	}

	@JsonGetter("testGroupName")
	public String getTestGroupName() {
		return testGroupName;
	}

	@JsonSetter("testGroupName")
	public void setTestGroupName(String testGroupName) {
		this.testGroupName = testGroupName;
	}

	@JsonGetter("paymentType")
	public String getPaymentType() {
		return paymentType;
	}

	@JsonSetter("paymentType")
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	@JsonGetter("time")
	public String getTime() {
		return time;
	}

	@JsonSetter("time")
	public void setTime(String time) {
		this.time = time;
	}

	@JsonGetter("status")
	public String getStatus() {
		return status;
	}

	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("testActualRate")
	public double getTestActualRate() {
		return testActualRate;
	}

	@JsonSetter("testActualRate")
	public void setTestActualRate(double testActualRate) {
		this.testActualRate = testActualRate;
	}

	@JsonGetter("testName")
	public String getTestName() {
		return testName;
	}

	@JsonSetter("testName")
	public void setTestName(String testName) {
		this.testName = testName;
	}

	@JsonGetter("idpfPaymentDetails")
	public int getIdpfPaymentDetails() {
		return idpfPaymentDetails;
	}

	@JsonSetter("idpfPaymentDetails")
	public void setIdpfPaymentDetails(int idpfPaymentDetails) {
		this.idpfPaymentDetails = idpfPaymentDetails;
	}

	@JsonGetter("listProFeesPaymentDetails")
	public List<ProFeesDTO> getListProFeesPaymentDetails() {
		return listProFeesPaymentDetails;
	}

	@JsonSetter("listProFeesPaymentDetails")
	public void setListProFeesPaymentDetails(
			List<ProFeesDTO> listProFeesPaymentDetails) {
		this.listProFeesPaymentDetails = listProFeesPaymentDetails;
	}

	

}
