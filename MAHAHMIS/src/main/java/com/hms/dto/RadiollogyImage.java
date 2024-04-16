package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class RadiollogyImage {
	
	private int idradiology_image_master;
	private String Treatment_ID;
	private String testId;
	private String image_name;
	private String date;
	private List<RadiollogyImage> rImgList;
	
	
	
	@JsonGetter("idradioimg")
	public int getIdradiology_image_master() {
		return idradiology_image_master;
	}
	@JsonSetter("idradioimg")
	public void setIdradiology_image_master(int idradiology_image_master) {
		this.idradiology_image_master = idradiology_image_master;
	}
	
	@JsonGetter("tid")
	public String getTreatment_ID() {
		return Treatment_ID;
	}
	@JsonSetter("tid")
	public void setTreatment_ID(String treatment_ID) {
		Treatment_ID = treatment_ID;
	}
	@JsonGetter("testID")
	public String getTestId() {
		return testId;
	}
	@JsonSetter("testID")
	public void setTestId(String testId) {
		this.testId = testId;
	}
	
	@JsonGetter("imageName")
	public String getImage_name() {
		return image_name;
	}
	@JsonSetter("imageName")
	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("rImgList")
	public List<RadiollogyImage> getrImgList() {
		return rImgList;
	}
	@JsonSetter("rImgList")
	public void setrImgList(List<RadiollogyImage> rImgList) {
		this.rImgList = rImgList;
	}
	
	
	
	

}
