package com.hms.dao;

import java.util.List;

public class IPDNusringMedicationDashboardDAO {
	private int idOrderCompDruges;
	private String prep;
	private String druges_doses;
	private String invProdID;
	private String strength;
	private String unit;
	private String doseType;
	private String frequency;
	private String instruction;
	private String route;
	private String totaldays;
	private String quantity;
	private String morning;
	private String afternoon;
	private String evening;
	private String night;
	private String pname;
	private String sign;
	private String pharmaIndentStatus;

	private int idipd_nursingStation_medication_dashboard;
	private int	currentDays;
	private String timeslot;
	private int doneBy;
	private String doneDate;
	private String doneTime;
	private int reverseBy;
	private String administrativeStatus;
	private String status;
	private String givenQuantity;
	private String currentDate;
	private String time;
	
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	private List<IPDNusringMedicationDashboardDAO> ipdNursingMedicationList;

	public int getIdorder_comp_druges() {
		return idOrderCompDruges;
	}

	public void setIdorder_comp_druges(int idOrderCompDruges) {
		this.idOrderCompDruges = idOrderCompDruges;
	}

	public String getPrep() {
		return prep;
	}

	public void setPrep(String prep) {
		this.prep = prep;
	}

	public String getDruges_doses() {
		return druges_doses;
	}

	public void setDruges_doses(String druges_doses) {
		this.druges_doses = druges_doses;
	}

	public String getInvProdID() {
		return invProdID;
	}

	public void setInvProdID(String invProdID) {
		this.invProdID = invProdID;
	}

	public String getStrength() {
		return strength;
	}

	public void setStrength(String strength) {
		this.strength = strength;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getDoseType() {
		return doseType;
	}

	public void setDoseType(String doseType) {
		this.doseType = doseType;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getTotaldays() {
		return totaldays;
	}

	public void setTotaldays(String totaldays) {
		this.totaldays = totaldays;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getMorning() {
		return morning;
	}

	public void setMorning(String morning) {
		this.morning = morning;
	}

	public String getAfternoon() {
		return afternoon;
	}

	public void setAfternoon(String afternoon) {
		this.afternoon = afternoon;
	}

	public String getEvening() {
		return evening;
	}

	public void setEvening(String evening) {
		this.evening = evening;
	}

	public String getNight() {
		return night;
	}

	public void setNight(String night) {
		this.night = night;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getPharmaIndentStatus() {
		return pharmaIndentStatus;
	}

	public void setPharmaIndentStatus(String pharmaIndentStatus) {
		this.pharmaIndentStatus = pharmaIndentStatus;
	}

	public int getCurrentDays() {
		return currentDays;
	}

	public void setCurrentDays(int currentDays) {
		this.currentDays = currentDays;
	}

	public String getTimeslot() {
		return timeslot;
	}

	public void setTimeslot(String timeslot) {
		this.timeslot = timeslot;
	}

	public int getDoneBy() {
		return doneBy;
	}

	public void setDoneBy(int doneBy) {
		this.doneBy = doneBy;
	}

	public String getDoneDate() {
		return doneDate;
	}

	public void setDoneDate(String doneDate) {
		this.doneDate = doneDate;
	}

	public String getDoneTime() {
		return doneTime;
	}

	public void setDoneTime(String doneTime) {
		this.doneTime = doneTime;
	}

	public int getReverseBy() {
		return reverseBy;
	}

	public void setReverseBy(int reverseBy) {
		this.reverseBy = reverseBy;
	}

	public String getAdministrativeStatus() {
		return administrativeStatus;
	}

	public void setAdministrativeStatus(String administrativeStatus) {
		this.administrativeStatus = administrativeStatus;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getGivenQuantity() {
		return givenQuantity;
	}

	public void setGivenQuantity(String givenQuantity) {
		this.givenQuantity = givenQuantity;
	}

	public List<IPDNusringMedicationDashboardDAO> getIpdNursingMedicationList() {
		return ipdNursingMedicationList;
	}

	public void setIpdNursingMedicationList(
			List<IPDNusringMedicationDashboardDAO> ipdNursingMedicationList) {
		this.ipdNursingMedicationList = ipdNursingMedicationList;
	}

	public int getIdipd_nursingStation_medication_dashboard() {
		return idipd_nursingStation_medication_dashboard;
	}

	public void setIdipd_nursingStation_medication_dashboard(
			int idipd_nursingStation_medication_dashboard) {
		this.idipd_nursingStation_medication_dashboard = idipd_nursingStation_medication_dashboard;
	}

	public String getCurrentDate() {
		return currentDate;
	}

	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
	}

}
