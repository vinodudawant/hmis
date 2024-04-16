package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pharma_ingredient_master")
public class IngredientMaster implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "ingredient_id")
	private Integer ingredientId;

	@Column(name = "ingredient_content")
	private String ingredientContent;

	@Column(name = "ingredient_delete_flag")
	private Integer ingredientDeleteFlag;

	@Column(name = "ingredient_update_date")
	private Date ingredientUpdateDate;

	public Integer getIngredientId() {
		return ingredientId;
	}

	public void setIngredientId(Integer ingredientId) {
		this.ingredientId = ingredientId;
	}

	public String getIngredientContent() {
		return ingredientContent;
	}

	public void setIngredientContent(String ingredientContent) {
		this.ingredientContent = ingredientContent;
	}

	public Integer getIngredientDeleteFlag() {
		return ingredientDeleteFlag;
	}

	public void setIngredientDeleteFlag(Integer ingredientDeleteFlag) {
		this.ingredientDeleteFlag = ingredientDeleteFlag;
	}

	public Date getIngredientUpdateDate() {
		return ingredientUpdateDate;
	}

	public void setIngredientUpdateDate(Date ingredientUpdateDate) {
		this.ingredientUpdateDate = ingredientUpdateDate;
	}

}
