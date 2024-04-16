

package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class LabPatienttestsMaster implements Serializable {

	private int id_patienttests_master;

	private int treatmentId;

	private float total_amount;

	private int amtcollectedby;

	private String status;

	private List<LabPatienttestsMaster> listTestMaster;

	//private Patient objPatient;

	private List<LabPatientGroupSlave> listGrpSlave;

	private String doc_comment;

	private String current_time;
	
	
	
	@JsonGetter("liGrpSlave")
	public List<LabPatientGroupSlave> getListGrpSlave() {
		return listGrpSlave;
	}

	public void setListGrpSlave(List<LabPatientGroupSlave> listGrpSlave) {
		this.listGrpSlave = listGrpSlave;
	}

	@JsonGetter("currTime")
	public String getCurrent_time() {
		return current_time;
	}

	public void setCurrent_time(String string) {
		this.current_time = string;
	}

	@JsonGetter("docComm")
	public String getDoc_comment() {
		return doc_comment;
	}

	public void setDoc_comment(String doc_comment) {
		this.doc_comment = doc_comment;
	}

	
	//@JsonGetter("objPat")
	/*public Patient getObjPatient() {
		return objPatient;
	}

	public void setObjPatient(Patient objPatient) {
		this.objPatient = objPatient;
	}*/

	@JsonGetter("idtestmstr")
	public int getId_patienttests_master() {
		return id_patienttests_master;
	}

	public void setId_patienttests_master(int id_patienttests_master) {
		this.id_patienttests_master = id_patienttests_master;
	}

	@JsonGetter("trid")
	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	@JsonGetter("tlamt")
	public float getTotal_amount() {
		return total_amount;
	}

	public void setTotal_amount(float total_amount) {
		this.total_amount = total_amount;
	}

	@JsonGetter("amtCollBy")
	public int getAmtcollectedby() {
		return amtcollectedby;
	}

	public void setAmtcollectedby(int amtcollectedby) {
		this.amtcollectedby = amtcollectedby;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("liTestMaster")
	public List<LabPatienttestsMaster> getListTestMaster() {
		return listTestMaster;
	}

	public void setListTestMaster(List<LabPatienttestsMaster> listTestMaster) {
		this.listTestMaster = listTestMaster;
	}

}
