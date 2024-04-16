package com.hms.registration.dto;

import java.util.List;

public class MrnNoCenterPatientIdDto {

	Number unitcount,billcount;
	String mrno,center_patient_id;
	List<MrnNoCenterPatientIdDto> lstMrnNo;
		
	public String getMrno() {
		return mrno;
	}
	public void setMrno(String mrno) {
		this.mrno = mrno;
	}
	public Number getUnitcount() {
		return unitcount;
	}
	public void setUnitcount(Number unitcount) {
		this.unitcount = unitcount;
	}
	public Number getBillcount() {
		return billcount;
	}
	public void setBillcount(Number billcount) {
		this.billcount = billcount;
	}
	public String getCenter_patient_id() {
		return center_patient_id;
	}
	public void setCenter_patient_id(String center_patient_id) {
		this.center_patient_id = center_patient_id;
	}
	public List<MrnNoCenterPatientIdDto> getLstMrnNo() {
		return lstMrnNo;
	}
	public void setLstMrnNo(List<MrnNoCenterPatientIdDto> lstMrnNo) {
		this.lstMrnNo = lstMrnNo;
	}
}
