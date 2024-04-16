package com.hms.dto;

import org.codehaus.jackson.annotate.JsonGetter;

public class RadiologyFileComponent {

	private int idRadiologyFileComponent;
	
	private int idradiology_test;
	
	private String file_name;
	
	private String file_path;
	
	private String file_comment;
	
	private String date;
	
	private String status;

	@JsonGetter("idRadFlComp")
	public int getIdRadiologyFileComponent() {
		return idRadiologyFileComponent;
	}

	public void setIdRadiologyFileComponent(int idRadiologyFileComponent) {
		this.idRadiologyFileComponent = idRadiologyFileComponent;
	}

	@JsonGetter("idRadFlMstr")
	public int getIdradiology_test() {
		return idradiology_test;
	}

	public void setIdradiology_test(int idradiology_test) {
		this.idradiology_test = idradiology_test;
	}

	@JsonGetter("flNm")
	public String getFile_name() {
		return file_name;
	}

	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}

	@JsonGetter("flPth")
	public String getFile_path() {
		return file_path;
	}

	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}

	@JsonGetter("flComm")
	public String getFile_comment() {
		return file_comment;
	}

	public void setFile_comment(String file_comment) {
		this.file_comment = file_comment;
	}

	@JsonGetter("fldt")
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
