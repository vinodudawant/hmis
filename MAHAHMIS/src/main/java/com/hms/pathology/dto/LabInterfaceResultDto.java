package com.hms.pathology.dto;

public class LabInterfaceResultDto {

	private int ID;
	private int ResultId;	
	private int TestId;
	private String Result;
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public int getResultId() {
		return ResultId;
	}
	public void setResultId(int resultId) {
		ResultId = resultId;
	}
	public int getTestId() {
		return TestId;
	}
	public void setTestId(int testId) {
		TestId = testId;
	}
	public String getResult() {
		return Result;
	}
	public void setResult(String result) {
		Result = result;
	}
}
