package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.IngredientsDao;
import com.hms.pharmacy.pojo.IngredientMaster;
import com.hms.pharmacy.service.IngredientsService;


@Service
public class IngredientsServiceImpl implements IngredientsService
{

	@Autowired
	IngredientsDao ingredientsDao;
	
	@Override
	@Transactional
	public List<IngredientMaster> getIngredients() 
	{
		return ingredientsDao.getIngredients();
	}
	
	@Override
	@Transactional
	public boolean saveIngredients(IngredientMaster ingredientMaster) {
		ingredientMaster.setIngredientDeleteFlag(0);
		ingredientMaster.setIngredientUpdateDate(new Date(new java.util.Date()
				.getTime()));
		if (ingredientsDao.saveIngredients(ingredientMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteIngredient(Integer ingredientId) {
		return ingredientsDao.deleteIngredient(ingredientId);
	}

	@Override
	@Transactional
	public List<IngredientMaster> getAutoSuggestionIngredientNames(String letter) 
	{
		return ingredientsDao.getAutoSuggestionIngredientName(letter);
	}

	@Override
	@Transactional
	public List<IngredientMaster> getIngredientById(Integer ingredientId) 
	{
		return ingredientsDao.getIngredientById(ingredientId);
	}

}
