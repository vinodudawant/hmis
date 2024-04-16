package com.hms.dto;

public class IpdEpisodeAndVisitDetails {

	private int ipdEpisodeAndVisitId;
	private String episodeNo;
	private String visitNo;
	private String episodeDescription;
	private String visitType;

	public String getVisitType() {
		return visitType;
	}

	public void setVisitType(String visitType) {
		this.visitType = visitType;
	}

	public int getIpdEpisodeAndVisitId() {
		return ipdEpisodeAndVisitId;
	}

	public void setIpdEpisodeAndVisitId(int ipdEpisodeAndVisitId) {
		this.ipdEpisodeAndVisitId = ipdEpisodeAndVisitId;
	}

	public String getEpisodeNo() {
		return episodeNo;
	}

	public void setEpisodeNo(String episodeNo) {
		this.episodeNo = episodeNo;
	}

	public String getVisitNo() {
		return visitNo;
	}

	public void setVisitNo(String visitNo) {
		this.visitNo = visitNo;
	}

	public String getEpisodeDescription() {
		return episodeDescription;
	}

	public void setEpisodeDescription(String episodeDescription) {
		this.episodeDescription = episodeDescription;
	}

}
