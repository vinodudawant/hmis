package com.hms.ipd.dao;

import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.opdbill.dto.TestAutoSuggestionDto;
import com.hms.opdbill.dto.TestSponsorAutoSuggestionDto;

public interface IpdTestAutoSuggestionDao {

	TestAutoSuggestionDto getTestAutoSuggestion(TestAutoSuggestionDto objDto);
	TestSponsorAutoSuggestionDto getSponsorTestAutosuggestion(TestSponsorAutoSuggestionDto objDto);
	SponsorTestChargesDto getSponsorTestCharges(SponsorTestChargesDto objDto);
	SponsorTestChargesDto getHallWiseTestCharges(SponsorTestChargesDto objDto);
	
	SponsorTestChargesDto getSponsorTestChargesNew(SponsorTestChargesDto objDto);
}
