package com.hms.opdbill.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.opdbill.dao.TestAutoSuggestionDao;
import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.opdbill.dto.TestAutoSuggestionDto;
import com.hms.opdbill.dto.TestSponsorAutoSuggestionDto;
import com.hms.opdbill.service.TestAutoSuggestionService;

@Service
@Transactional
public class TestAutoSuggestionServiceImpl implements TestAutoSuggestionService {

	@Autowired
	TestAutoSuggestionDao testAutoSuggestDao;
	
	@Override
	public TestAutoSuggestionDto getTestAutoSuggestion(TestAutoSuggestionDto objDto) {	
		
		return testAutoSuggestDao.getTestAutoSuggestion(objDto);
	}

	@Override
	public TestSponsorAutoSuggestionDto getSponsorTestAutosuggestion(TestSponsorAutoSuggestionDto objDto) {
		
		return testAutoSuggestDao.getSponsorTestAutosuggestion(objDto);
	}

	@Override
	public SponsorTestChargesDto getSponsorTestCharges(SponsorTestChargesDto objDto) {

		return testAutoSuggestDao.getSponsorTestCharges(objDto);
	}
	
	@Override
	public SponsorTestChargesDto getB2BTestCharges(SponsorTestChargesDto objDto) {

		return testAutoSuggestDao.getB2BTestCharges(objDto);
	}
}
