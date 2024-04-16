package com.hms.opdbill.dao;

import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.opdbill.dto.TestAutoSuggestionDto;
import com.hms.opdbill.dto.TestSponsorAutoSuggestionDto;

public interface TestAutoSuggestionDao {

	TestAutoSuggestionDto getTestAutoSuggestion(TestAutoSuggestionDto objDto);
	TestSponsorAutoSuggestionDto getSponsorTestAutosuggestion(TestSponsorAutoSuggestionDto objDto);
	SponsorTestChargesDto getSponsorTestCharges(SponsorTestChargesDto objDto);
	SponsorTestChargesDto getB2BTestCharges(SponsorTestChargesDto objDto);
}
