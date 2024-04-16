package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class SalaryMaster {
	private int idSalaryMaster;
	private int User_ID;
	private String efferctive_date;
	private float basic_sal;
	private String anuual_sal;
	private String gross_sal;
	private String status;
	private String fname;
	private String utype;
	private float monthlygross;
	private float houserentallowance;
	private float medical;
	private float conveyance;
	private float LTA;
	private float otherAllowance;
	private float incentive;
	private float reimburse;
	private float grosssal;
	private float netPayable;
	private int noofworkingdays;
	private int noofleavestaken;
	private int noofdeductedleaves;
	private float PLVPval;
	private float PayableSal;
	private float TDS;
	private float ProfessionalTax;
	private float TotalDeduction;
	private String month;
	private String Year;
	private String datemonth;
	private String panno;
	private float leavedeductions;
	private float otherdeductions;
	private String salarycreateddate;
	private List<SalaryMaster> listSalaryMaster;
	private Doctor objDoctor;
	private int applicableleave;
	private String ctc;
	private String department;
	private String departmentName;
	private String paidsal;
	private String presentdays;
	private String totaldays;
	private String netDeduct;
	private int idsalarycomponent;
	private String doj;
	private String plvpPer;
	private String PF;

	@JsonGetter("PF")
	public String getPF() {
		return PF;
	}

	public void setPF(String pF) {
		PF = pF;
	}

	@JsonGetter("plvpPer")
	public String getPlvpPer() {
		return plvpPer;
	}

	public void setPlvpPer(String plvpPer) {
		this.plvpPer = plvpPer;
	}

	@JsonGetter("doj")
	public String getDoj() {
		return doj;
	}

	public void setDoj(String doj) {
		this.doj = doj;
	}

	@JsonGetter("componentid")
	public int getIdsalarycomponent() {
		return idsalarycomponent;
	}

	public void setIdsalarycomponent(int idsalarycomponent) {
		this.idsalarycomponent = idsalarycomponent;
	}

	@JsonGetter("netDeduct")
	public String getNetDeduct() {
		return netDeduct;
	}

	public void setNetDeduct(String netDeduct) {
		this.netDeduct = netDeduct;
	}

	@JsonGetter("Tdays")
	public String getTotaldays() {
		return totaldays;
	}

	public void setTotaldays(String totaldays) {
		this.totaldays = totaldays;
	}

	@JsonGetter("Pdays")
	public String getPresentdays() {
		return presentdays;
	}

	public void setPresentdays(String presentdays) {
		this.presentdays = presentdays;
	}

	private String absentdays;

	@JsonGetter("Apdays")
	public String getAbsentdays() {
		return absentdays;
	}

	public void setAbsentdays(String absentdays) {
		this.absentdays = absentdays;
	}

	@JsonGetter("paidsal")
	String getPaidsal() {
		return paidsal;
	}

	public void setPaidsal(String paidsal) {
		this.paidsal = paidsal;
	}

	@JsonGetter("deptname")
	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	@JsonGetter("dept")
	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	@JsonGetter("ctc")
	public String getCtc() {
		return ctc;
	}

	public void setCtc(String ctc) {
		this.ctc = ctc;
	}

	@JsonGetter("apl")
	public int getApplicableleave() {
		return applicableleave;
	}

	@JsonSetter("apl")
	public void setApplicableleave(int applicableleave) {
		this.applicableleave = applicableleave;
	}

	@JsonGetter("idsm")
	public int getIdSalaryMaster() {
		return idSalaryMaster;
	}

	public void setIdSalaryMaster(int idSalaryMaster) {
		this.idSalaryMaster = idSalaryMaster;
	}

	@JsonGetter("uid")
	public int getUser_ID() {
		return User_ID;
	}

	public void setUser_ID(int user_ID) {
		User_ID = user_ID;
	}

	@JsonGetter("ed")
	public String getEfferctive_date() {
		return efferctive_date;
	}

	public void setEfferctive_date(String efferctive_date) {
		this.efferctive_date = efferctive_date;
	}

	@JsonGetter("bs")
	public float getBasic_sal() {
		return basic_sal;
	}

	public void setBasic_sal(float basic_sal) {
		this.basic_sal = basic_sal;
	}

	@JsonGetter("as")
	public String getAnuual_sal() {
		return anuual_sal;
	}

	public void setAnuual_sal(String anuual_sal) {
		this.anuual_sal = anuual_sal;
	}

	@JsonGetter("gs")
	public String getGross_sal() {
		return gross_sal;
	}

	public void setGross_sal(String gross_sal) {
		this.gross_sal = gross_sal;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("listSm")
	public List<SalaryMaster> getListSalaryMaster() {
		return listSalaryMaster;
	}

	public void setListSalaryMaster(List<SalaryMaster> listSalaryMaster) {
		this.listSalaryMaster = listSalaryMaster;
	}

	@JsonGetter("fn")
	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	@JsonGetter("ut")
	public String getUtype() {
		return utype;
	}

	public void setUtype(String utype) {
		this.utype = utype;
	}

	@JsonGetter("mg")
	public float getMonthly_gross() {
		return monthlygross;
	}

	public void setMonthly_gross(float monthlygross) {
		this.monthlygross = monthlygross;
	}

	@JsonGetter("hra")
	public float getHouse_rent() {
		return houserentallowance;
	}

	public void setHouse_rent(float houserentallowance) {
		this.houserentallowance = houserentallowance;
	}

	@JsonGetter("med")
	public float getMedical() {
		return medical;
	}

	public void setMedical(float medical) {
		this.medical = medical;
	}

	@JsonGetter("conv")
	public float getConveyance() {
		return conveyance;
	}

	public void setConveyance(float conveyance) {
		this.conveyance = conveyance;
	}

	@JsonGetter("lta")
	public float getLTA() {
		return LTA;
	}

	public void setLTA(float LTA) {
		this.LTA = LTA;
	}

	@JsonGetter("otha")
	public float getotherAllowance() {
		return otherAllowance;
	}

	public void setotherAllowance(float otherAllowance) {
		this.otherAllowance = otherAllowance;
	}

	@JsonGetter("inct")
	public float get_Incentive() {
		return incentive;
	}

	public void set_Incentive(float incentive) {
		this.incentive = incentive;
	}

	@JsonGetter("reim")
	public float get_Reimburse() {
		return reimburse;
	}

	public void set_Reimburse(float reimburse) {
		this.reimburse = reimburse;
	}

	@JsonGetter("grosssal")
	public float get_Grosssal() {
		return grosssal;
	}

	public void set_Grosssal(float grosssal) {
		this.grosssal = grosssal;
	}

	@JsonGetter("netpay")
	public float get_netPayable() {
		return netPayable;
	}

	public void set_netPayable(float netPayable) {
		this.netPayable = netPayable;
	}

	@JsonGetter("nofw")
	public int get_noOfWorking() {
		return noofworkingdays;
	}

	public void set_noOfWorking(int noofworkingdays) {
		this.noofworkingdays = noofworkingdays;
	}

	@JsonGetter("nofl")
	public int get_noOfLeaves() {
		return noofleavestaken;
	}

	public void set_noOfLeaves(int noofleavestaken) {
		this.noofleavestaken = noofleavestaken;
	}

	@JsonGetter("nofd")
	public int get_noOfDeductedLeaves() {
		return noofdeductedleaves;
	}

	public void set_noOfDeductedLeaves(int noofdeductedleaves) {
		this.noofdeductedleaves = noofdeductedleaves;
	}

	@JsonGetter("plvpval")
	public float get_PLVPval() {
		return PLVPval;
	}

	public void set_PLVPval(float PLVPval) {
		this.PLVPval = PLVPval;
	}

	@JsonGetter("paysal")
	public float get_PayableSal() {
		return PayableSal;
	}

	public void set_PayableSal(float PayableSal) {
		this.PayableSal = PayableSal;
	}

	@JsonGetter("tds")
	public float get_TDS() {
		return TDS;
	}

	public void set_TDS(float TDS) {
		this.TDS = TDS;
	}

	@JsonGetter("professtax")
	public float get_ProfessionalTax() {
		return ProfessionalTax;
	}

	public void set_ProfessionalTax(float ProfessionalTax) {
		this.ProfessionalTax = ProfessionalTax;
	}

	@JsonGetter("totaldeduct")
	public float get_TotalDeduction() {
		return TotalDeduction;
	}

	public void set_TotalDeduction(float TotalDeduction) {
		this.TotalDeduction = TotalDeduction;
	}
	@JsonGetter("leavededuct")
	public float get_LeaveDeductions() {
		return leavedeductions;
	}

	public void set_LeaveDeductions(float leavedeductions) {
		this.leavedeductions = leavedeductions;
	}
	@JsonGetter("otherdeduct")
	public float get_OtherDeductions() {
		return otherdeductions;
	}

	public void set_OtherDeductions(float otherdeductions) {
		this.otherdeductions = otherdeductions;
	}
	
	@JsonGetter("salcredate")
	public String get_SalaryCreatedDate() {
		return salarycreateddate;
	}

	public void set_SalaryCreatedDate(String salarycreateddate) {
		this.salarycreateddate = salarycreateddate;
	}
	@JsonGetter("listDoc")
	public Doctor getObjDoctor() {
		return objDoctor;
	}

	public void setObjDoctor(Doctor objDoctor) {
		this.objDoctor = objDoctor;
	}

	@JsonGetter("month")
	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	@JsonGetter("year")
	public String getYear() {
		return Year;
	}

	public void setYear(String year) {
		Year = year;
	}
	@JsonGetter("dmonth")
	public String getmonthDate() {
		return datemonth;
	}

	public void setmonthDate(String datemonth) {
		this.datemonth = datemonth;
	}
	
	
	@JsonGetter("panno")
	public String getPan_no() {
		return panno;
	}

	public void setPan_No(String panno) {
		this.panno = panno;
	}

}
