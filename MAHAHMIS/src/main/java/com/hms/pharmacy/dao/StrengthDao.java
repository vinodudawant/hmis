package com.hms.pharmacy.dao;
import java.util.List;
import com.hms.pharmacy.pojo.StrengthMaster;

public interface StrengthDao 
{
	List<StrengthMaster> getStrength();
	Boolean saveOrUpdateStrength(StrengthMaster strengthMaster);

	Boolean deleteStrength(Integer strengthId);

	List<StrengthMaster> getAutoSuggestionStrengthNames(String letter);

	List<StrengthMaster> getStrengthById(Integer strengthId);

}
