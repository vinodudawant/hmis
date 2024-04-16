package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.CategoryDao;
import com.hms.pharmacy.dao.DoctorDao;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.service.CategoryService;
import com.hms.pharmacy.service.DoctorSevice;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	CategoryDao categoryDao;

		@Override
	@Transactional
	public Boolean saveOrUpdateCategory(CategoryMaster categoryMaster) {

			if(categoryMaster.getCatId()==null)
			{
				categoryMaster.setCatDeleteFlag(0);
				categoryMaster.setCategoryAddDate(new Date(new java.util.Date()
						.getTime()));
				categoryMaster.setCatUpdateDate(new Date(new java.util.Date()
						.getTime()));
			}
			else
			{
				
				
				CategoryMaster categoryMaster2= categoryDao.getCategoryByIdForDate(categoryMaster.getCatId());
				/*CompanyMaster companyMaster3=categoryDao;*/
				
				categoryMaster.setCategoryAddDate(categoryMaster2.getCategoryAddDate());
				categoryMaster.setCatDeleteFlag(0);
				categoryMaster.setCatUpdateDate(new Date(new java.util.Date()
						.getTime()));
			}
						
		
		if (categoryDao.saveOrUpdateCategory(categoryMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<CategoryMaster> getCategoryList()
	{
		// TODO Auto-generated method stub
		return categoryDao.getCategoryMasters();
	}
	
	@Override
	@Transactional
	public Boolean deleteCategory(Integer catId) {
		// TODO Auto-generated method stub
		
		return categoryDao.deleteCategory(catId);
	}
	
	@Override
	@Transactional
	public List<CategoryMaster> getAutoSuggestionCategoryNames(String letter) {
		// TODO Auto-generated method stub
		return categoryDao.getAutoSuggestionCategoryNames(letter);
	}
	
	@Override
	@Transactional
	public List<CategoryMaster> getCategoryById(Integer catId) {
		// TODO Auto-generated method stub
		return categoryDao.getCategoryById(catId);
	}

	@Override
	@Transactional
	public List<CategoryMaster> getAllCategoryList() {
		// TODO Auto-generated method stub
		return categoryDao.getAllCategoryList();
	}
}

