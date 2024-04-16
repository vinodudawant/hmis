package com.hms.pathology.dto;

import java.util.Date;
import java.util.List;

public class LabInterfaceDto {

	private int ID;
	private int AnalyzerId;
	private String AnalyzerName;
	private int SampleId;	
	private Date ResultDate;
	private String TestName;
	private List<LabInterfaceResultDto> Results;
	
	public List<LabInterfaceResultDto> getResults() {
		return Results;
	}

	public void setResults(List<LabInterfaceResultDto> results) {
		Results = results;
	}

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public int getAnalyzerId() {
		return AnalyzerId;
	}

	public void setAnalyzerId(int analyzerId) {
		AnalyzerId = analyzerId;
	}

	public String getAnalyzerName() {
		return AnalyzerName;
	}

	public void setAnalyzerName(String analyzerName) {
		AnalyzerName = analyzerName;
	}

	public int getSampleId() {
		return SampleId;
	}

	public void setSampleId(int sampleId) {
		SampleId = sampleId;
	}


	public Date getResultDate() {
		return ResultDate;
	}

	public void setResultDate(Date resultDate) {
		ResultDate = resultDate;
	}

	public String getTestName() {
		return TestName;
	}

	public void setTestName(String testName) {
		TestName = testName;
	}

	
	
}
