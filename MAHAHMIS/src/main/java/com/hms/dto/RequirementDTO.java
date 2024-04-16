package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class RequirementDTO {

	private Integer reqId;
	private String reqProductId;
	private Integer reqTrolleyId;
	private String reqQnt;
	private String reqRemark;
	private List<RequirementDTO> ltRequirementDTOs;
	private String reqStatus;
	private Integer reqGinFlag;
	private Integer reqIndentFlag;
	private Date reqDate;
	
	@JsonGetter("reqId")
	public Integer getReqId() {
		return reqId;
	}
	@JsonSetter("reqId")
	public void setReqId(Integer reqId) {
		this.reqId = reqId;
	}
	@JsonGetter("reqProductId")
	public String getReqProductId() {
		return reqProductId;
	}
	@JsonSetter("reqProductId")
	public void setReqProductId(String reqProductId) {
		this.reqProductId = reqProductId;
	}
	@JsonGetter("reqTrolleyId")
	public Integer getReqTrolleyId() {
		return reqTrolleyId;
	}
	@JsonSetter("reqTrolleyId")
	public void setReqTrolleyId(Integer reqTrolleyId) {
		this.reqTrolleyId = reqTrolleyId;
	}
	@JsonGetter("reqQnt")
	public String getReqQnt() {
		return reqQnt;
	}
	@JsonSetter("reqQnt")
	public void setReqQnt(String reqQnt) {
		this.reqQnt = reqQnt;
	}
	@JsonGetter("reqRemark")
	public String getReqRemark() {
		return reqRemark;
	}
	@JsonSetter("reqRemark")
	public void setReqRemark(String reqRemark) {
		this.reqRemark = reqRemark;
	}
	@JsonGetter("ltRequirementDTOs")
	public List<RequirementDTO> getLtRequirementDTOs() {
		return ltRequirementDTOs;
	}
	@JsonSetter("ltRequirementDTOs")
	public void setLtRequirementDTOs(List<RequirementDTO> ltRequirementDTOs) {
		this.ltRequirementDTOs = ltRequirementDTOs;
	}
	@JsonGetter("reqStatus")
	public String getReqStatus() {
		return reqStatus;
	}
	@JsonSetter("reqStatus")
	public void setReqStatus(String reqStatus) {
		this.reqStatus = reqStatus;
	}
	@JsonGetter("reqGinFlag")
	public Integer getReqGinFlag() {
		return reqGinFlag;
	}
	@JsonSetter("reqGinFlag")
	public void setReqGinFlag(Integer reqGinFlag) {
		this.reqGinFlag = reqGinFlag;
	}
	@JsonGetter("reqIndentFlag")
	public Integer getReqIndentFlag() {
		return reqIndentFlag;
	}
	@JsonSetter("reqIndentFlag")
	public void setReqIndentFlag(Integer reqIndentFlag) {
		this.reqIndentFlag = reqIndentFlag;
	}
	@JsonGetter("reqDate")
	public Date getReqDate() {
		return reqDate;
	}
	@JsonSetter("reqDate")
	public void setReqDate(Date reqDate) {
		this.reqDate = reqDate;
	}
	
	
}
