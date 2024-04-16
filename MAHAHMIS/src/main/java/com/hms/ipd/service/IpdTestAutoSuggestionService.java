package com.hms.ipd.service;

import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.opdbill.dto.TestAutoSuggestionDto;
import com.hms.opdbill.dto.TestSponsorAutoSuggestionDto;

public interface IpdTestAutoSuggestionService {

	TestAutoSuggestionDto getTestAutoSuggestion(TestAutoSuggestionDto objDto);
	TestSponsorAutoSuggestionDto getSponsorTestAutosuggestion(TestSponsorAutoSuggestionDto objDto);
	SponsorTestChargesDto getSponsorTestCharges(SponsorTestChargesDto objDto);
	SponsorTestChargesDto getHallWiseTestCharges(SponsorTestChargesDto objDto);
}
