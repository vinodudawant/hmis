package com.hms.rostermanagement.service;

import java.util.List;

import com.hms.rostermanagement.dto.ConsultingRoomMaterDTO;

public interface ConsultingRoomService {
 
	 int saveConsultingRoom(ConsultingRoomMaterDTO obj);
	 
	 List<ConsultingRoomMaterDTO> getAllConsultingRoom(Integer unitId);
	 
	 int deleteConsultingRoom(Integer roomId,Integer userId);
	 
	 ConsultingRoomMaterDTO editConsultingRoom(Integer roomId);
}
