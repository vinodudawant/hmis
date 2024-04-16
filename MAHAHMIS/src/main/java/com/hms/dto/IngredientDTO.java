package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class IngredientDTO {
	private Integer ingredientId;
	private String ingredientContent;
	private String ingredientStatus;
	private List<IngredientDTO> ltIngredientDTOs;
	
	@JsonGetter("ingredientId")
	public Integer getIngredientId() {
		return ingredientId;
	}
	@JsonSetter("ingredientId")
	public void setIngredientId(Integer ingredientId) {
		this.ingredientId = ingredientId;
	}
	@JsonGetter("ingredientContent")
	public String getIngredientContent() {
		return ingredientContent;
	}
	@JsonSetter("ingredientContent")
	public void setIngredientContent(String ingredientContent) {
		this.ingredientContent = ingredientContent;
	}
	@JsonGetter("ingredientStatus")
	public String getIngredientStatus() {
		return ingredientStatus;
	}
	@JsonSetter("ingredientStatus")
	public void setIngredientStatus(String ingredientStatus) {
		this.ingredientStatus = ingredientStatus;
	}
	@JsonGetter("ltIngredientDTOs")
	public List<IngredientDTO> getLtIngredientDTOs() {
		return ltIngredientDTOs;
	}
	@JsonSetter("ltIngredientDTOs")
	public void setLtIngredientDTOs(List<IngredientDTO> ltIngredientDTOs) {
		this.ltIngredientDTOs = ltIngredientDTOs;
	}

	
}
