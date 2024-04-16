package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TemplateRelationDTO {
	private Integer templateId;
	private Integer productId;
	private String productName;	
	private Double minQnt;
	private List<TemplateRelationDTO> ltTemplateRelatonDTOs;
	
	
	
	@JsonGetter("templateId")
	public Integer getTemplateId() {
		return templateId;
	}
	@JsonSetter("templateId")
	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
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
	@JsonGetter("ltTemplateRelatonDTOs")
	public List<TemplateRelationDTO> getLtTemplateRelatonDTOs() {
		return ltTemplateRelatonDTOs;
	}
	@JsonSetter("ltTemplateRelatonDTOs")
	public void setLtTemplateRelatonDTOs(
			List<TemplateRelationDTO> ltTemplateRelatonDTOs) {
		this.ltTemplateRelatonDTOs = ltTemplateRelatonDTOs;
	}
	
	
	
}
