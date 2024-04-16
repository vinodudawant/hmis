package com.hms.rostermanagement.dao;

import java.util.List;

import com.hms.rostermanagement.dto.ConsultingRoomMaterDTO;

public interface ConsultingRoomDao {

	int saveConsultingRoom(ConsultingRoomMaterDTO obj);
	 
	 List<ConsultingRoomMaterDTO> getAllConsultingRoom(Integer unitId);
	 
	 int deleteConsultingRoom(Integer roomId,Integer userId);
	 
	 ConsultingRoomMaterDTO editConsultingRoom(Integer roomId);
}
