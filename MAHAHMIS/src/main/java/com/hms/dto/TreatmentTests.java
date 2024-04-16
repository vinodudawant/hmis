package com.hms.dto;

import java.util.List;

import com.hms.administrator.dto.Test;

public class TreatmentTests {

	private int id;
	private int treatment_ID;
	private String test_ID;
	private String done_By;
	private String time;
	private String comments;
	private String charges;
	private String test_report;
	private List<TreatmentTests> trlist;
	private List<Test> tlist;
	private String date;
	private String tname;
	private int test_count;
	private String test_fee;
	private float serviceQty;
	private String investigationInstruction;
	private String investigationClinicalNote;
	private int investigationUrgentFlag;
	 
	public String getInvestigationInstruction() {
		return investigationInstruction;
	}

	public void setInvestigationInstruction(String investigationInstruction) {
		this.investigationInstruction = investigationInstruction;
	}

	public String getInvestigationClinicalNote() {
		return investigationClinicalNote;
	}

	public void setInvestigationClinicalNote(String investigationClinicalNote) {
		this.investigationClinicalNote = investigationClinicalNote;
	}

	public int getInvestigationUrgentFlag() {
		return investigationUrgentFlag;
	}

	public void setInvestigationUrgentFlag(int investigationUrgentFlag) {
		this.investigationUrgentFlag = investigationUrgentFlag;
	}
	public float getServiceQty() {
		return serviceQty;
	}

	public void setServiceQty(float serviceQty) {
		this.serviceQty = serviceQty;
	}

	public String getTest_fee() {
		return test_fee;
	}

	public void setTest_fee(String test_fee) {
		this.test_fee = test_fee;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public TreatmentTests() {
		super();
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTreatment_ID() {
		return treatment_ID;
	}

	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	public String getTest_ID() {
		return test_ID;
	}

	public void setTest_ID(String test_ID) {
		this.test_ID = test_ID;
	}

	public String getDone_By() {
		return done_By;
	}

	public void setDone_By(String done_By) {
		this.done_By = done_By;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getCharges() {
		return charges;
	}

	public void setCharges(String charges) {
		this.charges = charges;
	}

	public String getTest_report() {
		return test_report;
	}

	public void setTest_report(String test_report) {
		this.test_report = test_report;
	}

	public List<TreatmentTests> getTrlist() {
		return trlist;
	}

	public void setTrlist(List<TreatmentTests> trlist) {
		this.trlist = trlist;
	}

	public List<Test> getTlist() {
		return tlist;
	}

	public void setTlist(List<Test> tlist) {
		this.tlist = tlist;
	}

	public String getTname() {
		return tname;
	}

	public void setTname(String tname) {
		this.tname = tname;
	}

	public int getTest_count() {
		return test_count;
	}

	public void setTest_count(int test_count) {
		this.test_count = test_count;
	}

}
