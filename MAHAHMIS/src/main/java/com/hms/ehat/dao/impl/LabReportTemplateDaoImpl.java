package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.LabReportTemplateDao;
import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabReportTemplateMasterDto;
import com.hms.ehat.dto.LabReportTemplateSlaveDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.dto.LabTestDTO;

@Repository
public class LabReportTemplateDaoImpl implements LabReportTemplateDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public LabProfileDTO getAllLabProfiles(HttpServletRequest request) {
		Session session = null;
		LabProfileDTO dto = new LabProfileDTO();
		List<LabProfileDTO> profilesList = new ArrayList<>();
		
		try {
			session = sessionFactory.getCurrentSession();
			Query hql = session.createQuery("FROM LabProfileDTO WHERE profileStatus =:profileStatus");
				  hql.setParameter("profileStatus", "Y");
			profilesList = hql.list();
			dto.setProfileli(profilesList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public LabProfileDTO getAllTestsUnderProfile(Integer profileId, HttpServletRequest request) {
		Session session = null;
		LabProfileDTO dto = null;
		
		try {
			session = sessionFactory.getCurrentSession();
			dto = (LabProfileDTO) session.get(LabProfileDTO.class, profileId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public String saveLabReportTemplate(LabReportTemplateMasterDto dto) {
		Session session = null;
		List<LabReportTemplateSlaveDto> list = new ArrayList<>();
		String response = null;
		try {
			session = sessionFactory.getCurrentSession();
			String profileIds = dto.getProfileIds();
			String[] ids = profileIds.split(",");
			
			if(dto.getReportTemplateMasterId() == 0) {
				for(String str : ids) {
					LabReportTemplateSlaveDto obj = new LabReportTemplateSlaveDto();
					String id[] = str.split("-");
					
					if(id.length > 1) {
						Integer profileId = Integer.parseInt(id[0]);
						Integer subServiceId = Integer.parseInt(id[1]);
						
							if(dto.getTemplateFor().equalsIgnoreCase("profile")) {
								LabProfileDTO profileDTO = (LabProfileDTO) session.get(LabProfileDTO.class, profileId);
								SubServiceDto subServiceDto = (SubServiceDto) session.get(SubServiceDto.class, subServiceId);
								ServiceMasterDto serviceMasterDto = (ServiceMasterDto) session.get(ServiceMasterDto.class, dto.getServiceId());
								
								obj.setLabProfileDTO(profileDTO);
								obj.setServiceMasterDto(serviceMasterDto);
								obj.setSubServiceDto(subServiceDto);
							}else{
								LabProfileDTO profileDTO = (LabProfileDTO) session.get(LabProfileDTO.class, profileId);
								LabTestDTO labTestDTO = (LabTestDTO) session.get(LabTestDTO.class, dto.getTestId());
								SubServiceDto subServiceDto = (SubServiceDto) session.get(SubServiceDto.class, subServiceId);
								ServiceMasterDto serviceMasterDto = (ServiceMasterDto) session.get(ServiceMasterDto.class, dto.getServiceId());
								
								obj.setLabProfileDTO(profileDTO);
								obj.setServiceMasterDto(serviceMasterDto);
								obj.setSubServiceDto(subServiceDto);
								obj.setLabTestDTO(labTestDTO);
							}
						list.add(obj);
					}
				}
				dto.setLabReportTemplateSlaveList(list);
				session.merge(dto);
				response = "Template saved successfully.";
			}else {
				for(String str : ids) {
					LabReportTemplateSlaveDto obj = new LabReportTemplateSlaveDto();
					
					String id[] = str.split("-");
					
					if(id.length > 1) {
						Integer profileId = Integer.parseInt(id[0]);
						Integer subServiceId = Integer.parseInt(id[1]);
						
							if(dto.getTemplateFor().equalsIgnoreCase("profile")) {
								LabReportTemplateMasterDto masterDTO = (LabReportTemplateMasterDto) session.get(LabReportTemplateMasterDto.class, dto.getReportTemplateMasterId());
								if(masterDTO.getReportTemplateMasterId() == dto.getReportTemplateMasterId()) {
									for(LabReportTemplateSlaveDto list1 : masterDTO.getLabReportTemplateSlaveList()) {
										LabProfileDTO profileDTO = (LabProfileDTO) session.get(LabProfileDTO.class, profileId);
										SubServiceDto subServiceDto = (SubServiceDto) session.get(SubServiceDto.class, subServiceId);
										ServiceMasterDto serviceMasterDto = (ServiceMasterDto) session.get(ServiceMasterDto.class, dto.getServiceId());
										
										if(profileId == list1.getLabProfileDTO().getIdprofile()) {
											obj.setReportTemplateSlaveId(list1.getReportTemplateSlaveId());
										}
										obj.setLabProfileDTO(profileDTO);
										obj.setServiceMasterDto(serviceMasterDto);
										obj.setSubServiceDto(subServiceDto);
									}
								}
							}else{
								LabReportTemplateMasterDto masterDTO = (LabReportTemplateMasterDto) session.get(LabReportTemplateMasterDto.class, dto.getReportTemplateMasterId());
								if(masterDTO.getReportTemplateMasterId() == dto.getReportTemplateMasterId()) {
									for(LabReportTemplateSlaveDto list1 : masterDTO.getLabReportTemplateSlaveList()) {
										LabProfileDTO profileDTO = (LabProfileDTO) session.get(LabProfileDTO.class, profileId);
										LabTestDTO labTestDTO = (LabTestDTO) session.get(LabTestDTO.class, dto.getTestId());
										SubServiceDto subServiceDto = (SubServiceDto) session.get(SubServiceDto.class, subServiceId);
										ServiceMasterDto serviceMasterDto = (ServiceMasterDto) session.get(ServiceMasterDto.class, dto.getServiceId());
										
										obj.setReportTemplateSlaveId(list1.getReportTemplateSlaveId());
										obj.setLabProfileDTO(profileDTO);
										obj.setServiceMasterDto(serviceMasterDto);
										obj.setSubServiceDto(subServiceDto);
										obj.setLabTestDTO(labTestDTO);
									}
								}
							}
						list.add(obj);
					}
				}
				dto.setLabReportTemplateSlaveList(list);
				session.merge(dto);
				response = "Template updated successfully.";
		}
		}catch (Exception e) {
			e.printStackTrace();
			response = "Oops something went wrong.";
		}
		return response;
	}

	private void chkDupProfile(Integer reportTemplateMasterId, Integer profileId) {
		SQLQuery query =sessionFactory.getCurrentSession().createSQLQuery("update pathology_report_template_master set deleted='Y' where id="+reportTemplateMasterId);
		query.executeUpdate();
	}

	@Override
	public LabReportTemplateMasterDto getAllReportTemplates(Integer unitId) {
		Session session = null;
		LabReportTemplateMasterDto dto = new LabReportTemplateMasterDto();
		List<LabReportTemplateMasterDto> list = new ArrayList<>();
		
		try {
			session = sessionFactory.getCurrentSession();
			
			Query qry = session.createQuery("FROM LabReportTemplateMasterDto WHERE deleted =:deleted AND unitId =:unitId");
				  qry.setParameter("unitId", unitId);
				  qry.setParameter("deleted", "N");
				  
				 /* String hql="select u from LabReportTemplateMasterDto u left join fetch u.LabReportTemplateSlaveList slave"
							+ " WHERE u.deleted='N' and slave.deleted='N' and u.unitId="+unitId;
				  System.err.println("HQL.."+hql);
				  Query query = sessionFactory.getCurrentSession().createQuery(hql);
				  query.setMaxResults(1);*/
				  list = qry.list();
			dto.setReportTemplateList(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public LabReportTemplateMasterDto editLabReportTemplate(Integer id) {
		Session session = null;
		LabReportTemplateMasterDto dto = new LabReportTemplateMasterDto();
		List<LabReportTemplateMasterDto> list = new ArrayList<>();
		
		try {
			session = sessionFactory.getCurrentSession();
			
			Query qry = session.createQuery("FROM LabReportTemplateMasterDto WHERE deleted =:deleted AND reportTemplateMasterId =:id");
				  qry.setParameter("id", id);
				  qry.setParameter("deleted", "N");
				  list = qry.list();
			dto.setReportTemplateList(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
}