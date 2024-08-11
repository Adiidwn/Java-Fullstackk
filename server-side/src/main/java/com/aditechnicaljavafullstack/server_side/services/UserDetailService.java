package com.aditechnicaljavafullstack.server_side.services;

import com.aditechnicaljavafullstack.server_side.models.UserDetail;
import com.aditechnicaljavafullstack.server_side.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserDetailService {

    private final UserDetailRepository userDetailRepository;

    @Autowired
    public UserDetailService(UserDetailRepository userDetailRepository) {
        this.userDetailRepository = userDetailRepository;
    }

    public Page<UserDetail> getAllUserDetails(String queryParam, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        if (queryParam == null || queryParam.isEmpty()) {
            return userDetailRepository.findAll(pageable);
        }
        return userDetailRepository.findByNikContaining(queryParam, pageable);
    }

    public Optional<UserDetail> getUserDetailById(Long id) {
        return userDetailRepository.findById(id);
    }

    public UserDetail getUserDetailByNik(String nik) {
        return userDetailRepository.findByNik(nik);
    }

    public UserDetail updateUserDetail(Long id, UserDetail userDetailDetails) {
        UserDetail existingUserDetail = userDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserDetail not found with ID " + id));

        existingUserDetail.setNik(userDetailDetails.getNik());
        existingUserDetail.setNamaLengkap(userDetailDetails.getNamaLengkap());
        existingUserDetail.setJenisKelamin(userDetailDetails.getJenisKelamin());
        existingUserDetail.setTanggalLahir(userDetailDetails.getTanggalLahir());
        existingUserDetail.setAlamat(userDetailDetails.getAlamat());
        existingUserDetail.setNegara(userDetailDetails.getNegara());

        return userDetailRepository.save(existingUserDetail);
    }

    public void deleteUserDetail(Long id) {
        UserDetail existingUserDetail = userDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserDetail not found with ID " + id));

        userDetailRepository.delete(existingUserDetail);
    }

    public List<UserDetail> findByNamaLengkapIgnoreCase(String namaLengkap) {
        return userDetailRepository.findByNamaLengkapIgnoreCase(namaLengkap);
    }

    public List<UserDetail> findByJenisKelamin(String jenisKelamin) {
        return userDetailRepository.findByJenisKelamin(jenisKelamin);
    }

    public List<UserDetail> findByTanggalLahir(LocalDate tanggalLahir) {
        return userDetailRepository.findByTanggalLahir(tanggalLahir);
    }

    public List<UserDetail> findByAlamat(String alamat) {
        return userDetailRepository.findByAlamat(alamat);
    }

    public List<UserDetail> findByNegara(String negara) {
        return userDetailRepository.findByNegara(negara);
    }

    public List<UserDetail> findByNikAndNamaLengkap(String nik, String namaLengkap) {
        return userDetailRepository.findByNikAndNamaLengkap(nik, namaLengkap);
    }

    public long countByJenisKelamin(String jenisKelamin) {
        return userDetailRepository.countByJenisKelamin(jenisKelamin);
    }
}
