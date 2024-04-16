package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TemplateMasterDTO {
	private Integer templateId;
	private String templateName;
	private String templateStatus;
	private List<TemplateMasterDTO> ltTemplateDTOs;
	
	private Integer productId;
	private String productName;	
	private Double minQnt;
	
	private List<TemplateRelationDTO> ltTemplateRelationDTOs;
	
	
	@JsonGetter("templateId")
	public Integer getTemplateId() {
		return templateId;
	}
	@JsonSetter("templateId")
	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}
	@JsonGetter("templateName")
	public String getTemplateName() {
		return templateName;
	}
	@JsonSetter("templateName")
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	@JsonGetter("templateStatus")
	public String getTemplateStatus() {
		return templateStatus;
	}
	@JsonSetter("templateStatus")
	public void setTemplateStatus(String templateStatus) {
		this.templateStatus = templateStatus;
	}
	@JsonGetter("ltTemplateDTOs")
	public List<TemplateMasterDTO> getLtTemplateDTOs() {
		return ltTemplateDTOs;
	}
	@JsonSetter("ltTemplateDTOs")
	public void setLtTemplateDTOs(List<TemplateMasterDTO> ltTemplateDTOs) {
		this.ltTemplateDTOs = ltTemplateDTOs;
	}	
	@JsonGetter("productId")
	public Integer getProductId() {
		return productId;
	}
	@JsonSetter("productId")
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	@JsonGetter("productName")
	public String getProductName() {
		return productName;
	}
	@JsonSetter("productName")
	public void setProductName(String productName) {
		this.productName = productName;
	}
	@JsonGetter("minQnt")
	public Double getMinQnt() {
		return minQnt;
	}
	@JsonSetter("minQnt")
	public void setMinQnt(Double minQnt) {
		this.minQnt = minQnt;
	}
	@JsonGetter("ltTemplateRelationDTOs")
	public List<TemplateRelationDTO> getLtTemplateRelationDTOs() {
		return ltTemplateRelationDTOs;
	}
	@JsonSetter("ltTemplateRelationDTOs")
	public void setLtTemplateRelationDTOs(
			List<TemplateRelationDTO> ltTemplateRelationDTOs) {
		this.ltTemplateRelationDTOs = ltTemplateRelationDTOs;
	}
	
}
