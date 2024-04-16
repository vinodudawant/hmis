package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.CategoryMaster;

public interface CategoryService {
	Boolean saveOrUpdateCategory(CategoryMaster categoryMaster);

	List<CategoryMaster> getCategoryList();

	Boolean deleteCategory(Integer catId);

	List<CategoryMaster> getAutoSuggestionCategoryNames(String letter);

	List<CategoryMaster> getCategoryById(Integer catId);

	List<CategoryMaster> getAllCategoryList();

}
