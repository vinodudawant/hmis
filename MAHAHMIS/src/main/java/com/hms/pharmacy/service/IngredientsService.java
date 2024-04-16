package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.IngredientMaster;

public interface IngredientsService 
{

	List<IngredientMaster> getIngredients();

	boolean saveIngredients(IngredientMaster ingredientMaster);

	boolean deleteIngredient(Integer ingredientId);

	List<IngredientMaster> getAutoSuggestionIngredientNames(String letter);

	List<IngredientMaster> getIngredientById(Integer ingredientId);
	
}
