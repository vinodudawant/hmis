package com.hms.pathology.dto;

public class LisTabCountDto {

	Number record_count,rrc_all_record_count;
	String record_count_str;
	String result;

	public Number getRecord_count() {
		return record_count;
	}

	public void setRecord_count(Number record_count) {
		this.record_count = record_count;
	}

	public Number getRrc_all_record_count() {
		return rrc_all_record_count;
	}

	public void setRrc_all_record_count(Number rrc_all_record_count) {
		this.rrc_all_record_count = rrc_all_record_count;
	}

	public String getRecord_count_str() {
		return record_count_str;
	}

	public void setRecord_count_str(String record_count_str) {
		this.record_count_str = record_count_str;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}	
}
