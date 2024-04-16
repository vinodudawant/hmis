package com.hms.ipd.daoimpl;

import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.constants.CommonMasterMessages;
import com.hms.dto.NursingNotesDTO;
import com.hms.dto.PrescriptionInstruction;
import com.hms.ipd.dao.IPDMasterDao;
import com.hms.ipd.dto.BedStateSettingDTO;
import com.hms.ipd.dto.DoctorRoundTempDTO;

@SuppressWarnings("unchecked")
@Repository
public class IPDMasterDaoImpl implements IPDMasterDao {


	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	private @Autowired SessionFactory sessionFactory;
	
	@Override
	public String saveNursingNotes(NursingNotesDTO nursingNotes) {
		LOGGER.info("IPDMasterDaoImpl method saveNursingNotes called.");
		 try {
			sessionFactory.getCurrentSession().merge(nursingNotes);
			 return CommonMasterMessages.SAVED.getMessage();
		} catch (HibernateException e) {
			LOGGER.error(e.getMessage());
			return CommonMasterMessages.SERVICEDOWN.getMessage();
		}
	}

	@Override
	public List<NursingNotesDTO> fetchNursingNotes() {
		LOGGER.info("IPDMasterDaoImpl method fetchNursingNotes called.");
		try {
			return sessionFactory.getCurrentSession().createCriteria((NursingNotesDTO.class))
			.add(Restrictions.eq("status","Y"))
			.list();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return null;
		}
	}

	@Override
	public NursingNotesDTO fetchNursingNotes(Integer id) {
		LOGGER.info("IPDMasterDaoImpl method fetchNursingNotes called.");
		try {
			return (NursingNotesDTO) sessionFactory.getCurrentSession().get(NursingNotesDTO.class, id);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return null;
		}
	}

	@Override
	public String deletehNursingNotes(Integer noteId) {
		try {
			String hqlUpdate = "update NursingNotesDTO n set n.status = :status where n.noteId = :noteId";
			 sessionFactory.getCurrentSession().createQuery( hqlUpdate )
			                    .setParameter("status", "N")
								 .setParameter("noteId", noteId)
			                    .executeUpdate();
			 return CommonMasterMessages.DELELTED.getMessage();
			 
		} catch (HibernateException e) {
			LOGGER.error("Error occured in IPDMasterDaoImpl: deletehNursingNotes" + e.getMessage());
			return CommonMasterMessages.SERVICEDOWN.getMessage();
		}
	}

	@Override
	public String savePrescriptionInstruction(PrescriptionInstruction prescriptionInstruction) {
		LOGGER.info("IPDMasterDaoImpl method saveNursingNotes called.");
		 try {
			sessionFactory.getCurrentSession().merge(prescriptionInstruction);
			 return CommonMasterMessages.SAVED.getMessage();
		} catch (HibernateException e) {
			LOGGER.error(e.getMessage());
			return CommonMasterMessages.SERVICEDOWN.getMessage();
		}
	}

	@Override
	public List<PrescriptionInstruction> fetchPrescriptionInstructionSearch(String search) {
		LOGGER.info("IPDMasterDaoImpl method fetchPrescriptionInstructionSearch called.");
		 try {
				/*
				 * return
				 * sessionFactory.getCurrentSession().createCriteria(PrescriptionInstruction.
				 * class) .add(Restrictions.disjunction()
				 * .add(Restrictions.like("presciptionInstructionId", "%"+search+"%"))
				 * .add(Restrictions.like("englishInstruction", "%"+search+"%"))
				 * .add(Restrictions.like("hindiInstruction", "%"+search+"%"))
				 * .add(Restrictions.like("marathiInstruction", "%"+search+"%")) ) .list();
				 */
			 String sql="select * from prescription_instruction where status='Y'";
			 
			 if (!search.isEmpty() || search !=null) 
				  sql="select * from prescription_instruction where status='Y' and ( idprescription_Instruction like '%"+search+"%' or english_Instruction like '%"+search+"%' or hindi_Instruction  like '%"+search+"%' or marathi_Instruction like '%"+search+"%' )";
				 			
			 return (List<PrescriptionInstruction>)sessionFactory.getCurrentSession()
					 .createSQLQuery(sql)
					 .addEntity(PrescriptionInstruction.class)
					 .list();
						
		} catch (HibernateException e) {
			LOGGER.error(e.getMessage());
			 return null;
		}
	}

	@Override
	public String deletePrescriptionInstruction(String id) {
		LOGGER.info("IPDMasterDaoImpl method deletePrescriptionInstruction called.");
		try {
			//String hqlUpdate = "update PrescriptionInstruction n set n.status = :status where n.presciptionInstructionId IN (:presciptionInstructionId)";
			// sessionFactory.getCurrentSession().createQuery( hqlUpdate )
			String sql = "update prescription_instruction set status = 'N' where idprescription_Instruction IN ("+id+")";
			 sessionFactory.getCurrentSession().createSQLQuery(sql)
			                    .executeUpdate();
			 return CommonMasterMessages.DELELTED.getMessage();
			 
		} catch (HibernateException e) {
			LOGGER.error("Error occured in IPDMasterDaoImpl: deletehNursingNotes" + e.getMessage());
			return CommonMasterMessages.SERVICEDOWN.getMessage();
		}
	}

	@Override
	public String saveDoctorRoundTemplate(DoctorRoundTempDTO doctorRoundTemp) {
		LOGGER.info("IPDMasterDaoImpl method saveDoctorRoundTemplate called.");
		 try {
			sessionFactory.getCurrentSession().merge(doctorRoundTemp);
			 return CommonMasterMessages.SAVED.getMessage();
		} catch (HibernateException e) {
			LOGGER.error(e.getMessage());
			return CommonMasterMessages.SERVICEDOWN.getMessage();
		}
	}

	@Override
	public String deleteDoctorRoundTemplate(Integer id) {
		LOGGER.info("IPDMasterDaoImpl method deleteDoctorRoundTemplate called.");
		try {
			String hqlUpdate = "update DoctorRoundTempDTO n set n.deleted =? where n.doctorRoundTemplateId =?";
			 sessionFactory.getCurrentSession().createQuery( hqlUpdate )
			                    .setParameter(0, "Y")
								.setParameter(1, id)
			                    .executeUpdate();
			 return CommonMasterMessages.DELELTED.getMessage();
			 
		} catch (HibernateException e) {
			LOGGER.error("Error occured in IPDMasterDaoImpl: deleteDoctorRoundTemplate" + e.getMessage());
			return CommonMasterMessages.SERVICEDOWN.getMessage();
		}
	}

	@Override
	public List<NursingNotesDTO> searchNursingNotes(String search) {
		LOGGER.info("IPDMasterDaoImpl method searchNursingNotes called.");
		 try {
			 String sql="select * from nursing_notes where status='Y' and (notesid like '%"+search+"%' or heading_note like '%"+search+"%' or notes  like '%"+search+"%')";
			 return (List<NursingNotesDTO>)sessionFactory.getCurrentSession()
					 .createSQLQuery(sql)
					 .addEntity(NursingNotesDTO.class)
					 .list();
						
		} catch (HibernateException e) {
			LOGGER.error(e.getMessage());
			 return null;
		}
	}

	@Override
	public String saveUpdateBedStateSetting(BedStateSettingDTO bedStateSetting) {

		LOGGER.info("IPDMasterDaoImpl method saveUpdateBedStateSetting called.");
		 try {
			sessionFactory.getCurrentSession().merge(bedStateSetting);
			 return CommonMasterMessages.SAVED.getMessage();
		} catch (HibernateException e) {
			LOGGER.error(e.getMessage());
			return CommonMasterMessages.SERVICEDOWN.getMessage();
		}
	
	}

	@Override
	public List<BedStateSettingDTO> fetchBedStateSettingList() {
		LOGGER.info("IPDMasterDaoImpl method fetchBedStateSettingList called.");
		try {
			return sessionFactory.getCurrentSession().createCriteria(BedStateSettingDTO.class)
			.add(Restrictions.eq("deleted","N"))
			.list();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return null;
		}
	}	
	@Override
	public String getNotesbyHeadnoteId(Integer noteId) {
		LOGGER.info("IPDMasterDaoImpl method getNotesbyHeadnoteId called.");
		String result ="";
		try {
 String sql="select notes from nursing_notes where status='Y' and notesid="+noteId+" ";
			 
				 
	SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	result = (String) query.uniqueResult();


		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return null;
		}
		return result;
	}


}
