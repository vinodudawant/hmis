package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class FillRequirementDTO {
	private Integer reqId;
	private Integer reqTrolleyId;
	private String reqTrolleyName;
	private Integer reqProductId;
	private String reqProductName;
	private Double reqQnt;
	private Double reqMinQnt;
	private Double reqQntInHand;
	private Integer reqIndentFlag;
	private String reqRemark;
	private Integer reqGinFlag;
	private Double onorderqty;
	private List<FillRequirementDTO> ltRequirementDTOs;
	
	@JsonGetter("reqId")
	public Integer getReqId() {
		return reqId;
	}
	@JsonSetter("reqId")
	public void setReqId(Integer reqId) {
		this.reqId = reqId;
	}
	@JsonGetter("reqTrolleyId")
	public Integer getReqTrolleyId() {
		return reqTrolleyId;
	}
	@JsonSetter("reqTrolleyId")
	public void setReqTrolleyId(Integer reqTrolleyId) {
		this.reqTrolleyId = reqTrolleyId;
	}
	@JsonGetter("reqTrolleyName")
	public String getReqTrolleyName() {
		return reqTrolleyName;
	}
	@JsonSetter("reqTrolleyName")
	public void setReqTrolleyName(String reqTrolleyName) {
		this.reqTrolleyName = reqTrolleyName;
	}
	@JsonGetter("reqProductId")
	public Integer getReqProductId() {
		return reqProductId;
	}
	@JsonSetter("reqProductId")
	public void setReqProductId(Integer reqProductId) {
		this.reqProductId = reqProductId;
	}
	@JsonGetter("reqProductName")
	public String getReqProductName() {
		return reqProductName;
	}
	@JsonSetter("reqProductName")
	public void setReqProductName(String reqProductName) {
		this.reqProductName = reqProductName;
	}
	@JsonGetter("reqQnt")
	public Double getReqQnt() {
		return reqQnt;
	}
	@JsonSetter("reqQnt")
	public void setReqQnt(Double reqQnt) {
		this.reqQnt = reqQnt;
	}
	@JsonGetter("reqIndentFlag")
	public Integer getReqIndentFlag() {
		return reqIndentFlag;
	}
	@JsonSetter("reqIndentFlag")
	public void setReqIndentFlag(Integer reqIndentFlag) {
		this.reqIndentFlag = reqIndentFlag;
	}
	@JsonGetter("reqRemark")
	public String getReqRemark() {
		return reqRemark;
	}
	@JsonSetter("reqRemark")
	public void setReqRemark(String reqRemark) {
		this.reqRemark = reqRemark;
	}
	@JsonGetter("reqGinFlag")
	public Integer getReqGinFlag() {
		return reqGinFlag;
	}
	@JsonSetter("reqGinFlag")
	public void setReqGinFlag(Integer reqGinFlag) {
		this.reqGinFlag = reqGinFlag;
	}
	@JsonSetter("ltRequirementDTOs")
	public List<FillRequirementDTO> getLtRequirementDTOs() {
		return ltRequirementDTOs;
	}
	@JsonSetter("ltRequirementDTOs")
	public void setLtRequirementDTOs(List<FillRequirementDTO> ltRequirementDTOs) {
		this.ltRequirementDTOs = ltRequirementDTOs;
	}
	@JsonGetter("reqMinQnt")
	public Double getReqMinQnt() {
		return reqMinQnt;
	}
	@JsonSetter("reqMinQnt")
	public void setReqMinQnt(Double reqMinQnt) {
		this.reqMinQnt = reqMinQnt;
	}
	@JsonGetter("reqQntInHand")
	public Double getReqQntInHand() {
		return reqQntInHand;
	}
	@JsonSetter("reqQntInHand")
	public void setReqQntInHand(Double reqQntInHand) {
		this.reqQntInHand = reqQntInHand;
	}
	@JsonGetter("onorderqty")
	public Double getOnorderqty() {
		return onorderqty;
	}
	@JsonGetter("onorderqty")
	public void setOnorderqty(Double onorderqty) {
		this.onorderqty = onorderqty;
	}
	
	
	
}
