package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class RadiologyFileMaster {

	private int idRadiologyFileMaster;

	private int treatmentId;

	private String status;
	private Float radio_total;
	private List<RadiologyFileMaster> listRadiologyFileMaster;

	private List<RadiologyAssignTest> listRadiologyAssignTest;

	@JsonGetter("rtot")
	public Float getRadio_total() {
		return radio_total;
	}

	@JsonSetter("rtot")
	public void setRadio_total(Float radio_total) {
		this.radio_total = radio_total;
	}

	private Patient objPatient;

	@JsonGetter("objPat")
	public Patient getObjPatient() {
		return objPatient;
	}

	@JsonSetter("objPat")
	public void setObjPatient(Patient objPatient) {
		this.objPatient = objPatient;
	}

	@JsonGetter("liRadasgntest")
	public List<RadiologyAssignTest> getListRadiologyAssignTest() {
		return listRadiologyAssignTest;
	}

	@JsonSetter("liRadasgntest")
	public void setListRadiologyAssignTest(
			List<RadiologyAssignTest> listRadiologyAssignTest) {
		this.listRadiologyAssignTest = listRadiologyAssignTest;
	}

	@JsonGetter("liRadFlMstr")
	public List<RadiologyFileMaster> getListRadiologyFileMaster() {
		return listRadiologyFileMaster;
	}

	@JsonSetter("liRadFlMstr")
	public void setListRadiologyFileMaster(
			List<RadiologyFileMaster> listRadiologyFileMaster) {
		this.listRadiologyFileMaster = listRadiologyFileMaster;
	}

	@JsonGetter("radFlId")
	public int getIdRadiologyFileMaster() {
		return idRadiologyFileMaster;
	}

	@JsonSetter("radFlId")
	public void setIdRadiologyFileMaster(int idRadiologyFileMaster) {
		this.idRadiologyFileMaster = idRadiologyFileMaster;
	}

	@JsonGetter("trid")
	public int getTreatmentId() {
		return treatmentId;
	}

	@JsonSetter("trid")
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

}
