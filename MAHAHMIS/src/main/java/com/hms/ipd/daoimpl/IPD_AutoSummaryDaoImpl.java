package com.hms.ipd.daoimpl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.dto.AdviceOnDescDTO;
import com.hms.dto.DischargeSummery;
import com.hms.dto.ElectrolyteDTO;
import com.hms.dto.ImagingDTO;
import com.hms.dto.PaediatricDept;
import com.hms.dto.PaediatricDeptNICU;
import com.hms.dto.VentilationDTO;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipd.dao.IPD_AutoSummaryDao;

@Repository
@SuppressWarnings("unchecked")
public class IPD_AutoSummaryDaoImpl implements IPD_AutoSummaryDao
{
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<TreatmentDto> fetchPatientAdmissionNote(TreatmentDto treatment) {
		
		List<TreatmentDto> treatmentList =new ArrayList<TreatmentDto>();
		try {
			String sql = "Select notes from ehat_treatment where treatment_id = " + treatment.getTreatmentId()
					+ " and patient_id= " + treatment.getPatientId();
		
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> dsList = query.list();
		
		for (Map mapDS : dsList) {
			System.out.println(dsList);
			TreatmentDto tempObj = new TreatmentDto();
			tempObj.setNotes((String) mapDS.get("notes"));
			treatmentList.add(tempObj);
			
		}
	}catch (Exception e) {
		e.printStackTrace();
		e.getMessage();
	}
	return treatmentList;

	}
	
	@Override
	public List<DiagonosisMasterDto> getListOfDiagoList(int treatmentId) {
		// TODO Auto-generated method stub
		TreatmentDto tobj=(TreatmentDto) sessionFactory.openSession().get(TreatmentDto.class, treatmentId);
		Criteria criteria = sessionFactory.openSession().createCriteria(
				DiagonosisMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		 criteria.add(Restrictions.eq("treatObj",tobj));
		// criteria.add(Restrictions.eq("treatmentId", treatmentId));
		List<DiagonosisMasterDto> list = criteria.list();
		return list;
	}

	@Override
	public int saveAutoDischargeSummery(DischargeSummery obj,String summaryNote,PaediatricDeptNICU nicuObj) {
		int result =0;
		
		
		try {
			
			//added by vishant
			/*
			 * String sql2 = "Select count(*) from ipd_patient_discharge_summary where " //+
			 * obj.get + " treatmentId = " + obj.getTreatment_ID(); int count=0; count =
			 * ((BigInteger)
			 * sessionFactory.getCurrentSession().createSQLQuery(sql2).uniqueResult()).
			 * intValue(); if(count!=0) { return 3; }
			 */
			
			
			if (!summaryNote.equals("") && summaryNote != "") {
				String sql = "update ehat_treatment set notes='"+summaryNote+"' where treatment_id=" + obj.getTreatment_ID();
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
			}
			 
			if(obj.getIddischarge_summery() == 0)
			{
				String[] dischargeDate = null;
				
				dischargeDate = obj.getDischarge_date().split(" ");
				String sql = "UPDATE ehat_treatment SET Treat_end_date='"+dischargeDate[0]+"',patient_outtime='"+dischargeDate[1]+"' WHERE Treatment_ID="+obj.getTreatment_ID();
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
				
				
				 sql = "select count(*) from discharge_summery where Treatment_ID = "
						+  obj.getTreatment_ID();
				int countdis = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue(); 
				
				if(countdis == 0)
				{
					sessionFactory.getCurrentSession().save(obj);
					result =1;
				
				}
				
				if(obj.getPaed_dept().equals("PD"))
				{
					PaediatricDept paediatricDept = obj.getPaediatricDept();
					sessionFactory.getCurrentSession().saveOrUpdate(paediatricDept);
				}
				else if (obj.getPaed_dept().equals("nicuPD"))
				{
					sessionFactory.getCurrentSession().saveOrUpdate(nicuObj);
					
					AdviceOnDescDTO adviceOnDescDTO = nicuObj.getListAdviceOnDesc().get(0);
					sessionFactory.getCurrentSession().saveOrUpdate(adviceOnDescDTO);
					ElectrolyteDTO electrolyteDTO = nicuObj.getListElectrolyte().get(0);
					sessionFactory.getCurrentSession().saveOrUpdate(electrolyteDTO);
					VentilationDTO ventilationDTO = nicuObj.getListVentilation().get(0);
					sessionFactory.getCurrentSession().saveOrUpdate(ventilationDTO);
					ImagingDTO imagingDTO = nicuObj.getListImaging().get(0);
					sessionFactory.getCurrentSession().saveOrUpdate(imagingDTO);
				}
				
			}else
			{

				String[] dischargeDate = null;
				
				dischargeDate = obj.getDischarge_date().split(" ");
				String sql = "UPDATE ehat_treatment SET Treat_end_date='"+dischargeDate[0]+"',patient_outtime='"+dischargeDate[1]+"' WHERE Treatment_ID="+obj.getTreatment_ID();
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
				
				
				 sql = "select count(*) from discharge_summery where Treatment_ID = "
						+  obj.getTreatment_ID();
				int countdis = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue(); 
				
				if(countdis != 0)
				{				
					sessionFactory.getCurrentSession().merge(obj);
					result =2;
				}
				
				if(obj.getPaed_dept().equals("PD"))
				{
					//PaediatricDept paediatricDeptNew = new PaediatricDept();
					PaediatricDept paediatricDept = obj.getPaediatricDept();
					PaediatricDept object = (PaediatricDept) sessionFactory.getCurrentSession().get(PaediatricDept.class, paediatricDept.getIdpaediatric_dept());
					
				if(object!=null)	{
					BeanUtils.copyProperties(paediatricDept, object);
					sessionFactory.getCurrentSession().saveOrUpdate(object);
				}
				else {
					sessionFactory.getCurrentSession().saveOrUpdate(paediatricDept);
				}
					
				}
				else if (obj.getPaed_dept().equals("nicuPD"))
				{
					
					PaediatricDeptNICU paediatricDeptNICUDB =(PaediatricDeptNICU) sessionFactory.getCurrentSession().get(PaediatricDeptNICU.class, nicuObj.getIdpaediatric_dept_nicu());
					
					if(paediatricDeptNICUDB!=null) {
						BeanUtils.copyProperties(nicuObj, paediatricDeptNICUDB);
						sessionFactory.getCurrentSession().saveOrUpdate(paediatricDeptNICUDB);
						
						//fetch AdviceOnDescDTO
						AdviceOnDescDTO adviceOnDescDTO = nicuObj.getListAdviceOnDesc().get(0);
						AdviceOnDescDTO descDTODB =(AdviceOnDescDTO) 
								sessionFactory.getCurrentSession().get(AdviceOnDescDTO.class, adviceOnDescDTO.getIdadvice_on_desc());
						BeanUtils.copyProperties(adviceOnDescDTO, descDTODB);
						sessionFactory.getCurrentSession().saveOrUpdate(descDTODB);
						
//						fetch ImagingDTO
						ImagingDTO imagingDTO = nicuObj.getListImaging().get(0);
						ImagingDTO imagingDTODB =(ImagingDTO) 
								sessionFactory.getCurrentSession().get(ImagingDTO.class, imagingDTO.getIdimaging());
						BeanUtils.copyProperties(imagingDTO, imagingDTODB);
						sessionFactory.getCurrentSession().saveOrUpdate(imagingDTODB);
						
//						fetch ElectrolyteDTO
						ElectrolyteDTO electrolyteDTO = nicuObj.getListElectrolyte().get(0);
						ElectrolyteDTO electrolyteDTODB =(ElectrolyteDTO) 
								sessionFactory.getCurrentSession().get(ElectrolyteDTO.class, electrolyteDTO.getIdelectrolyte());
						BeanUtils.copyProperties(electrolyteDTO, electrolyteDTODB);
						sessionFactory.getCurrentSession().saveOrUpdate(electrolyteDTODB);
						
						
//						fetch VentilationDTO
						VentilationDTO ventilationDTO = nicuObj.getListVentilation().get(0);
						VentilationDTO ventilationDB =(VentilationDTO) 
								sessionFactory.getCurrentSession().get(VentilationDTO.class, ventilationDTO.getIdventilation());
						BeanUtils.copyProperties(ventilationDTO, ventilationDB);
						sessionFactory.getCurrentSession().saveOrUpdate(ventilationDB);
						
						
					}
					else {
						sessionFactory.getCurrentSession().saveOrUpdate(nicuObj);
						
						
						AdviceOnDescDTO adviceOnDescDTO = nicuObj.getListAdviceOnDesc().get(0);
						sessionFactory.getCurrentSession().saveOrUpdate(adviceOnDescDTO);
						ElectrolyteDTO electrolyteDTO = nicuObj.getListElectrolyte().get(0);
						sessionFactory.getCurrentSession().saveOrUpdate(electrolyteDTO);
						VentilationDTO ventilationDTO = nicuObj.getListVentilation().get(0);
						sessionFactory.getCurrentSession().saveOrUpdate(ventilationDTO);
						ImagingDTO imagingDTO = nicuObj.getListImaging().get(0);
						sessionFactory.getCurrentSession().saveOrUpdate(imagingDTO);
					}	
					
					
				}
							
			}
			
			
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return result;
	
	}

	@Override
	public List<DischargeSummery> fetchAutoDischargeSummery(int treatmentId) {
		
		
		List<DischargeSummery> dsList = new ArrayList<DischargeSummery>();
		try {
			
			Criteria criteria = sessionFactory.openSession().createCriteria(DischargeSummery.class);
			criteria.add(Restrictions.eq("treatment_ID",treatmentId ));
			dsList = criteria.list();
			
			//fetch nicu nicuPD
		    String paed_dept = dsList.get(0).getPaed_dept();
		 //if(paed_dept.equalsIgnoreCase("nicuPD"))   {
			criteria = sessionFactory.openSession().createCriteria(PaediatricDeptNICU.class);
			criteria.add(Restrictions.eq("treatment_id",treatmentId ));
			List<PaediatricDeptNICU> deptNICUs = criteria.list();
			
		if(deptNICUs.size()>0) {	
			//fetch AdviceOnDescDTO
			criteria = sessionFactory.openSession().createCriteria(AdviceOnDescDTO.class);
			criteria.add(Restrictions.eq("treatmentId",treatmentId ));
			List<AdviceOnDescDTO> adviceOnDescDTOs = criteria.list();
			deptNICUs.get(0).setListAdviceOnDesc(adviceOnDescDTOs);
			
			//fetch ElectrolyteDTO
			criteria = sessionFactory.openSession().createCriteria(ElectrolyteDTO.class);
			criteria.add(Restrictions.eq("treatmentId",treatmentId ));
			List<ElectrolyteDTO>electrolyteDTOs = criteria.list();
			deptNICUs.get(0).setListElectrolyte(electrolyteDTOs);
			
			//fetch VentilationDTO
			criteria = sessionFactory.openSession().createCriteria(VentilationDTO.class);
			criteria.add(Restrictions.eq("treatmentId",treatmentId ));
			List<VentilationDTO>listVentilation = criteria.list();
			deptNICUs.get(0).setListVentilation(listVentilation);
			
			//fetch ImagingDTO
			criteria = sessionFactory.openSession().createCriteria(ImagingDTO.class);
			criteria.add(Restrictions.eq("treatmentId",treatmentId ));
			List<ImagingDTO> listImaging = criteria.list();
			deptNICUs.get(0).setListImaging(listImaging);
			
			
			
			dsList.get(0).setPaediatricDeptNicu(deptNICUs.get(0));
		 }
		//if(paed_dept.equalsIgnoreCase("PD")) {
			
			criteria = sessionFactory.openSession().createCriteria(PaediatricDept.class);
			criteria.add(Restrictions.eq("treatment_id",treatmentId ));
			List<PaediatricDept> list = criteria.list();
			
			if(list.size()>0) {
				dsList.get(0).setPaediatricDept(list.get(0));
			}
			
//		}
		 
		 
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return dsList;
	}

	@Override
	public int updateAdmissionNote(int treatmentId, String summaryNote) {
        int res=0;
        try {
        	if (!summaryNote.equals("") && summaryNote != "") {
				String sql = "update ehat_treatment set notes='"+summaryNote+"' where treatment_id=" + treatmentId;
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
				res=1;
			}
        }catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
}
