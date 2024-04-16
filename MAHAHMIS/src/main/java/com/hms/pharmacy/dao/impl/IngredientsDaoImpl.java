package com.hms.pharmacy.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.IngredientsDao;
import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.IngredientMaster;

@Repository
public class IngredientsDaoImpl implements IngredientsDao 
{
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<IngredientMaster> getIngredients() {
		List<IngredientMaster> ingredientsMasters = null;
		try 
		{
			Criteria criteria = sessionFactory.openSession().createCriteria(IngredientMaster.class);
			criteria.add(Restrictions.eq("ingredientDeleteFlag", 0));
			ingredientsMasters = criteria.list();

		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return ingredientsMasters;
		}
		return ingredientsMasters;
	}

	@Override
	public boolean saveIngredients(IngredientMaster ingredientMaster) {
		try 
		{
			sessionFactory.getCurrentSession().saveOrUpdate(ingredientMaster);
			
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public Boolean deleteIngredient(Integer ingredientId) {
		// TODO Auto-generated method stub
				try {
					IngredientMaster ingredientMaster = (IngredientMaster) sessionFactory
							.getCurrentSession().get(IngredientMaster.class, ingredientId);
					ingredientMaster.setIngredientDeleteFlag(1);
				} catch (Exception e) {
					e.printStackTrace();
					return false;
				}
				return true;
		
	}
	
	@Override
	public List<IngredientMaster> getAutoSuggestionIngredientName(String letter) {
		// TODO Auto-generated method stub
		List<IngredientMaster> ingredientMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IngredientMaster.class);
			criteria.add(Restrictions.eq("ingredientDeleteFlag", 0));
			criteria.add(Restrictions.like("ingredientContent", letter,
					MatchMode.ANYWHERE));
			ingredientMasters = criteria.list();

		} catch (Exception e)
		{
			e.printStackTrace();
			return ingredientMasters;
		}
		return ingredientMasters;
	}

	@Override
	public List<IngredientMaster> getIngredientById(Integer ingredientId) 
	{
		List<IngredientMaster> ingredients = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IngredientMaster.class);
			criteria.add(Restrictions.eq("ingredientDeleteFlag", 0));
			if (ingredientId != 0) {
				criteria.add(Restrictions.eq("ingredientId", ingredientId));
			}

			ingredients = criteria.list();

		} catch (Exception e) 
		{
			e.printStackTrace();
			return ingredients;
		}
		return ingredients;
	}
		
}
