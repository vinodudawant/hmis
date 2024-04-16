package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.AllergyReaction;
import com.hms.doctordesk.dto.AllergyTypeDto;

public interface AllergyTypeDao {

	String saveAllergyType(AllergyTypeDto allergyTypeDto,HttpServletRequest request);
	
	List<AllergyTypeDto> getAllergyTypes(HttpServletRequest request,String searchText);
	
	List<AllergyTypeDto> getAllergyById(int id);
	
	String deletAllergyType(int id,HttpServletRequest request);
	
    String saveAllergyRecation(AllergyReaction allergyReaction,HttpServletRequest request);
	
	List<AllergyReaction> getallergyReaction(HttpServletRequest request,String searchText);
	
	List<AllergyReaction> getallergyReactionById(int id);
	
	String deletallergyReaction(int id,HttpServletRequest request);
	
}
