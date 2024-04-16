package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.service.CategoryService;

@Controller
@RequestMapping(value = "/category")
public class CategoryController {
	@Autowired
	CategoryService categorySevice;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCategoryView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("category", new CategoryMaster());
		List<CategoryMaster> ltCategoryMaster = new ArrayList<CategoryMaster>();
		ltCategoryMaster = categorySevice.getCategoryList();
		modelAndView.addObject("ltCategoryMaster", ltCategoryMaster);
		modelAndView.setViewName("Pharma_Category_Master");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateCategory(
			@Valid @ModelAttribute("category") CategoryMaster categoryMaster,
			BindingResult result, ModelMap model) {

		ModelAndView modelAndView = new ModelAndView();
		if (result.hasErrors()) {
			List<CategoryMaster> ltCategoryMaster = new ArrayList<CategoryMaster>();
			ltCategoryMaster = categorySevice.getCategoryList();
			model.addAttribute("ltCategoryMaster", ltCategoryMaster);
           
			modelAndView
			.setViewName("redirect:/pharmacy/category/view");
			return modelAndView;
		}

		if (categorySevice.saveOrUpdateCategory(categoryMaster)) {
			if (categoryMaster.getCatId() != null) {
			modelAndView.addObject("msg", "Record saved successfully..!");
			} else {
				modelAndView.addObject("msg", "Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate Category can not save..!");
		} 
		List<CategoryMaster> ltCategoryMaster = new ArrayList<CategoryMaster>();
		ltCategoryMaster = categorySevice.getCategoryList();
		model.addAttribute("ltCategoryMaster", ltCategoryMaster);
		
		modelAndView
		.setViewName("redirect:/pharmacy/category/view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteCategory(@RequestParam("catId") Integer catId) {
		Boolean flag = false;
		if (categorySevice.deleteCategory(catId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/categoryList", method = RequestMethod.GET)
	public @ResponseBody
	List<CategoryMaster> getCategoryMasters() {
		List<CategoryMaster> ltCategoryMasters = new ArrayList<CategoryMaster>();
		ltCategoryMasters = categorySevice.getCategoryList();
		return ltCategoryMasters;
	}

	@RequestMapping(value = "/autoSuggestionCategoryNames", method = RequestMethod.GET)
	public @ResponseBody
	List<CategoryMaster> getAutoSuggestionCategoryNames(
			@RequestParam("letter") String letter) {
		List<CategoryMaster> ltCategoryMaster = new ArrayList<CategoryMaster>();
		ltCategoryMaster = categorySevice
				.getAutoSuggestionCategoryNames(letter);
		return ltCategoryMaster;
	}

	@RequestMapping(value = "/getCategoryById", method = RequestMethod.GET)
	public @ResponseBody
	List<CategoryMaster> getCategoryById(@RequestParam("catId") Integer catId) {
		List<CategoryMaster> ltCategoryMasters = new ArrayList<CategoryMaster>();
		ltCategoryMasters = categorySevice.getCategoryById(catId);
		return ltCategoryMasters;
	}
	
	@RequestMapping(value = "/allCategoryList", method = RequestMethod.GET)
	public @ResponseBody
	List<CategoryMaster> getAllCategoryList() {
		List<CategoryMaster> ltCategoryMasters = new ArrayList<CategoryMaster>();
		ltCategoryMasters = categorySevice.getAllCategoryList();
		return ltCategoryMasters;
	}

}
