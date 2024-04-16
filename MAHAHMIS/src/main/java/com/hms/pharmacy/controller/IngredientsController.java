package com.hms.pharmacy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.IngredientMaster;
import com.hms.pharmacy.service.IngredientsService;


@Controller
@RequestMapping(value="/ingredients")
public class IngredientsController 
{
	@Autowired
	IngredientsService ingredientsService;
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView loadIngredientsPage() 
	{
			ModelAndView modelAndView=new ModelAndView();
			modelAndView.addObject("ingredients", new IngredientMaster());
			modelAndView.setViewName("Pharma_Ingredients_Master");
			List<IngredientMaster> ingredientMasters=ingredientsService.getIngredients();
			modelAndView.addObject("ingredientsMaster",ingredientMasters);
			return modelAndView;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView addIngredients(
			@ModelAttribute("ingredients") IngredientMaster ingredientMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (ingredientsService.saveIngredients(ingredientMaster)) 
		{
			if (ingredientMaster.getIngredientId() != null) {
				modelAndView.addObject("success",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("success",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		modelAndView
				.setViewName("redirect:view");
		return modelAndView;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteIngredient(@RequestParam("ingredientId") Integer ingredientId) {
		Boolean flag = false;
		if (ingredientsService.deleteIngredient(ingredientId)) {
			flag = true;
		}
		return flag;
	}
	
	@RequestMapping(value = "/autoSuggestionIngredient", method = RequestMethod.GET)
	public @ResponseBody List<IngredientMaster> autoSuggestionIngredient(@RequestParam("letter")String letter) {
		 
		List<IngredientMaster> ingredientMasters = ingredientsService.getAutoSuggestionIngredientNames(letter);
		return ingredientMasters;
	}
	
	@RequestMapping(value = "/getIngredientById", method = RequestMethod.GET)
	public @ResponseBody List<IngredientMaster> getIngredientById(@RequestParam("ingredientId")Integer ingredientId) {
		List<IngredientMaster> ltIngredientMaster = ingredientsService.getIngredientById(ingredientId);
		return ltIngredientMaster;
	}
}
