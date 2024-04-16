package com.hms.ivf.dao.impl;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.hms.doctordesk.dao.impl.OpdDocumentUploadDaoImpl;
import com.hms.doctordesk.dto.OpdDocumentUploadDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfDocumentUploadDao;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfDocumentUploadDto;
import com.hms.pharmacy.upload.FilePath;



@Repository
public class IvfDocumentUploadDaoImpl implements IvfDocumentUploadDao{
	@Autowired
	SessionFactory sessionfactory; 
	
	static Logger log=Logger.getLogger(IvfDocumentUploadDaoImpl.class.getName());

	@Override
	public int uploadDoctorDeskDocument(IvfDocumentUploadDto obj, Integer patientId, Integer treatmentId,
			MultipartFile[] uploadDocs,Integer ivftreatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		try {

			if (obj.getDocumentId() == 0) {

				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);

				RegistrationDto registrationDto = (RegistrationDto) sessionfactory.getCurrentSession()
						.get(RegistrationDto.class, patientId);
				obj.setPatientRegistered(registrationDto);

				TreatmentDto treatmentDto = (TreatmentDto) sessionfactory.getCurrentSession().get(TreatmentDto.class,
						treatmentId);
				obj.setTreatmentDto(treatmentDto);

				IVFTreatmentDTO ivfTreatObj = (IVFTreatmentDTO) sessionfactory.getCurrentSession().get(IVFTreatmentDTO.class,
						ivftreatmentId);
				obj.setIvfTreatObj(ivfTreatObj);

				IvfDocumentUploadDto dto = (IvfDocumentUploadDto) sessionfactory.getCurrentSession().merge(obj);
				String documentPath="";
				for (MultipartFile file : uploadDocs) {
					if (file.isEmpty()) {
						continue;
					}
					
					documentPath = FilePath.getIVFUploadFilesPath() +""+ dto.getDocumentId();
					Path path = Paths.get(documentPath);
					java.io.File uploadPath = new java.io.File(documentPath);	
					if (!uploadPath.exists()) {
						Files.createDirectories(path);
					}
					
					String fileName = file.getOriginalFilename();
					String filepath = Paths.get(uploadPath.toString(), fileName).toString();
					BufferedOutputStream stream;

					stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
					stream.write(file.getBytes());
					stream.close();
				}
				return 1;

			} else {

				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);

				RegistrationDto registrationDto = (RegistrationDto) sessionfactory.getCurrentSession()
						.get(RegistrationDto.class, patientId);
				obj.setPatientRegistered(registrationDto);

				TreatmentDto treatmentDto = (TreatmentDto) sessionfactory.getCurrentSession().get(TreatmentDto.class,
						treatmentId);
				obj.setTreatmentDto(treatmentDto);
				
				IVFTreatmentDTO ivfTreatObj = (IVFTreatmentDTO) sessionfactory.getCurrentSession().get(IVFTreatmentDTO.class,
						ivftreatmentId);
				obj.setIvfTreatObj(ivfTreatObj);

				IvfDocumentUploadDto dto = (IvfDocumentUploadDto) sessionfactory.getCurrentSession()
						.merge(obj);

				for (MultipartFile file : uploadDocs) {
					if (file.isEmpty()) {
						continue;
					}
					java.io.File uploadPath = new java.io.File(
							FilePath.getIVFUploadFilesPath() + dto.getDocumentId());
					if (!uploadPath.exists())
						uploadPath.mkdirs();
					String fileName = file.getOriginalFilename();
					String filepath = Paths.get(uploadPath.toString(), fileName).toString();
					BufferedOutputStream stream;

					stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
					stream.write(file.getBytes());
					stream.close();
				}
				return 2;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<IvfDocumentUploadDto> getAllOPDDocuments(Integer patientId, Integer treatmentId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<IvfDocumentUploadDto> lst = new ArrayList<IvfDocumentUploadDto>();
		try {
			RegistrationDto registrationDto = (RegistrationDto) sessionfactory.openSession()
					.get(RegistrationDto.class, patientId);

			IVFTreatmentDTO treatmentDto = (IVFTreatmentDTO) sessionfactory.openSession().get(IVFTreatmentDTO.class,
					treatmentId);

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Criteria criteria = sessionfactory.openSession().createCriteria(IvfDocumentUploadDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("ivfTreatObj",treatmentDto ));
			//criteria.add(Restrictions.eq("patientRegistered", registrationDto));
			lst = criteria.list();
		} catch (Exception e) {
			log.error("Exception--> ", e);
		}
		return lst;
	}

	@Override
	public boolean deleteOPDDocuments(Integer documentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			IvfDocumentUploadDto obj = (IvfDocumentUploadDto) sessionfactory
					.getCurrentSession().get(IvfDocumentUploadDto.class,
							documentId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionfactory.getCurrentSession().merge(obj);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public IvfDocumentUploadDto editOPDDocuments(Integer documentId) {
		// TODO Auto-generated method stub
		IvfDocumentUploadDto obj=new IvfDocumentUploadDto();
		try {
			Criteria criteria = sessionfactory.openSession().createCriteria(IvfDocumentUploadDto.class);
			criteria.add(Restrictions.eq("documentId",documentId));
			criteria.add(Restrictions.eq("deleted","N"));
			obj = (IvfDocumentUploadDto) criteria.uniqueResult();
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return obj;
	}
	
}
