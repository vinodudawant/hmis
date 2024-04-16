package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Visiting_doc_Procedure {

	private int vidoproid;
	private int Doctor_ID;
	private int Operation_id;
	private float charges;

	private List<Visiting_doc_Procedure> liVDPro;

	@JsonGetter("idVDPro")
	public int getVidoproid() {
		return vidoproid;
	}

	@JsonSetter("idVDPro")
	public void setVidoproid(int vidoproid) {
		this.vidoproid = vidoproid;
	}

	@JsonGetter("docId")
	public int getDoctor_ID() {
		return Doctor_ID;
	}

	@JsonSetter("docId")
	public void setDoctor_ID(int doctor_ID) {
		Doctor_ID = doctor_ID;
	}

	@JsonGetter("opid")
	public int getOperation_id() {
		return Operation_id;
	}

	@JsonSetter("opid")
	public void setOperation_id(int operation_id) {
		Operation_id = operation_id;
	}

	@JsonGetter("opcharg")
	public float getCharges() {
		return charges;
	}

	@JsonSetter("opcharg")
	public void setCharges(float charges) {
		this.charges = charges;
	}

	@JsonGetter("liVDPro")
	public List<Visiting_doc_Procedure> getLiVDPro() {
		return liVDPro;
	}

	@JsonSetter("liVDPro")
	public void setLiVDPro(List<Visiting_doc_Procedure> liVDPro) {
		this.liVDPro = liVDPro;
	}

}
