package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;

public interface CategoryDao {
	Boolean saveOrUpdateCategory(CategoryMaster categoryMaster);

	List<CategoryMaster> getCategoryMasters();

	Boolean deleteCategory(Integer catId);

	List<CategoryMaster> getAutoSuggestionCategoryNames(String letter);
	
	List<CategoryMaster> getCategoryById(Integer catId);
	
	CategoryMaster getCategoryByIdForDate(Integer compId);

	List<CategoryMaster> getAllCategoryList();
}
