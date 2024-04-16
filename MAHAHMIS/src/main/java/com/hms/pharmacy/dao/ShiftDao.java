package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.ShiftMaster;

public interface ShiftDao {

	List<ShiftMaster> getShiftDetails(String type);

	boolean saveOrUpdateShift(ShiftMaster shiftMaster);

	List<ShiftMaster> getAutoSuggestionShiftTypes(String letter);

	List<ShiftMaster> getShiftById(Integer shiftId);

	boolean deleteShift(Integer shiftId);

}
