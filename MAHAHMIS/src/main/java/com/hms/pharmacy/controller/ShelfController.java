package com.hms.pharmacy.controller;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.service.ShelfService;

@Controller
@RequestMapping(value = "/shelf")
public class ShelfController {
	@Autowired
	ShelfService  shelfSevice;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getShelfView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("shelf", new ShelfMaster());
		
		List<ShelfMaster> ltShelfMasters = new ArrayList<ShelfMaster>();
		ltShelfMasters = shelfSevice.getShelfs("limit");
		modelAndView.addObject("ltShelfMasters", ltShelfMasters);
		
		modelAndView.setViewName("Pharma_Shelf_Master");
		return modelAndView;
	}

	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateShelf(
			@ModelAttribute("shelf") ShelfMaster shelfMaster) {
		ModelAndView modelAndView = new ModelAndView();
		/*
		 * HttpServletRequest request = null; HttpSession session=request.getSession();
		 * Integer userId=(Integer) session.getAttribute("userId1"); Integer unitId
		 * =(Integer) session.getAttribute("uId"); shelfMaster.setUserId(userId);
		 * shelfMaster.setUserId(unitId);
		 */
		if (shelfSevice.saveOrUpdateShelf(shelfMaster)) {
			if (shelfMaster.getShelfId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate Shelf can not be save..!");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/shelf/view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteShelf(@RequestParam("shelfId") Integer shelfId) {
		Boolean flag = false;
		if (shelfSevice.deleteShelf(shelfId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/shelfList", method = RequestMethod.GET)
	public @ResponseBody List<ShelfMaster> getShelfList() {
		List<ShelfMaster> ltShelfMasters = new ArrayList<ShelfMaster>();
		ltShelfMasters = shelfSevice.getShelfs("all");
		return ltShelfMasters;
	}
	
	@RequestMapping(value = "/autoSuggestionShelfNames", method = RequestMethod.GET)
	public @ResponseBody List<ShelfMaster> getAutoSuggestionShelfNames(@RequestParam("letter")String letter) {
		List<ShelfMaster> ltShelfMasters = new ArrayList<ShelfMaster>();
		ltShelfMasters = shelfSevice.getAutoSuggestionShelfNames(letter);
		return ltShelfMasters;
	}
	
	@RequestMapping(value = "/getShelfById", method = RequestMethod.GET)
	public @ResponseBody List<ShelfMaster> getShelfById(@RequestParam("shelfId")Integer shelfId) {
		List<ShelfMaster> ltShelfMasters = new ArrayList<ShelfMaster>();
		ltShelfMasters = shelfSevice.getShelfById(shelfId);
		return ltShelfMasters;
	}
	
}
