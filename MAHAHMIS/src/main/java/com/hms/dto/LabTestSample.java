package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabTestSample implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int idtestsample;
	private String sampleName;
	private String sampleStatus;
	private List<LabTestSample> testSamplelist;

	@JsonGetter("smplid")
	public int getIdtestsample() {
		return idtestsample;
	}

	@JsonSetter("smplid")
	public void setIdtestsample(int idtestsample) {
		this.idtestsample = idtestsample;
	}

	@JsonGetter("smplnm")
	public String getSampleName() {
		return sampleName;
	}

	@JsonSetter("smplnm")
	public void setSampleName(String sampleName) {
		this.sampleName = sampleName;
	}

	@JsonGetter("smplst")
	public String getSampleStatus() {
		return sampleStatus;
	}

	@JsonSetter("smplst")
	public void setSampleStatus(String sampleStatus) {
		this.sampleStatus = sampleStatus;
	}

	@JsonGetter("smplli")
	public List<LabTestSample> getTestSamplelist() {
		return testSamplelist;
	}

	@JsonSetter("smplli")
	public void setTestSamplelist(List<LabTestSample> arrLabTestsample) {
		this.testSamplelist = arrLabTestsample;
	}

}
