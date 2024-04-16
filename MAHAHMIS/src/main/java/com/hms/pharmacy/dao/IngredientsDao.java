package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.IngredientMaster;

public interface IngredientsDao
{

	List<IngredientMaster> getIngredients();

	boolean saveIngredients(IngredientMaster ingredientMaster);

	Boolean deleteIngredient(Integer ingredientId);

	List<IngredientMaster> getAutoSuggestionIngredientName(String letter);

	List<IngredientMaster> getIngredientById(Integer ingredientId);

}
