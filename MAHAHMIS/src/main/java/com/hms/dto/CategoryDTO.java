package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class CategoryDTO {
	private Integer categoryId;
	private String categoryName;
	private String categoryStatus;
	
	private String categoryPerifix;
	private List<CategoryDTO> CategoryDTO;
	
	@JsonGetter("categoryId")
	public Integer getCategoryId() {
		return categoryId;
	}
	@JsonSetter("categoryId")
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	@JsonGetter("categoryName")
	public String getCategoryName() {
		return categoryName;
	}
	@JsonSetter("categoryName")
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	@JsonGetter("categoryStatus")
	public String getCategoryStatus() {
		return categoryStatus;
	}
	@JsonSetter("categoryStatus")
	public void setCategoryStatus(String categoryStatus) {
		this.categoryStatus = categoryStatus;
	}
	@JsonGetter("CategoryDTO")
	public List<CategoryDTO> getCategoryDTO() {
		return CategoryDTO;
	}
	@JsonSetter("CategoryDTO")
	public void setCategoryDTO(List<CategoryDTO> categoryDTO) {
		CategoryDTO = categoryDTO;
	}
	public String getCategoryPerifix() {
		return categoryPerifix;
	}
	public void setCategoryPerifix(String categoryPerifix) {
		this.categoryPerifix = categoryPerifix;
	}
	
	
}
