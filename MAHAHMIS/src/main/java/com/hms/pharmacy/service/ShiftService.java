package com.hms.pharmacy.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.pharmacy.pojo.ShiftMaster;

public interface ShiftService {

	List<ShiftMaster> getShiftDetails(String string);

	boolean saveOrUpdateShift(ShiftMaster shiftMaster, HttpServletRequest request);

	List<ShiftMaster> getAutoSuggestionShiftTypes(String letter);

	List<ShiftMaster> getShiftById(Integer shiftId);

	boolean deleteShift(Integer shiftId);

}
