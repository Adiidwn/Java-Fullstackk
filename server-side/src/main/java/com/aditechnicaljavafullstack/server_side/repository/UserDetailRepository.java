package com.aditechnicaljavafullstack.server_side.repository;

import com.aditechnicaljavafullstack.server_side.models.UserDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetail, Long> {

    UserDetail findByNik(String nik);

    Page<UserDetail> findByNik(String nik, Pageable pageable);

    Page<UserDetail> findByNikContaining(String nik, Pageable pageable);

    List<UserDetail> findByNamaLengkapIgnoreCase(String namaLengkap);

    List<UserDetail> findByJenisKelamin(String jenisKelamin);

    List<UserDetail> findByTanggalLahir(LocalDate tanggalLahir);

    List<UserDetail> findByAlamat(String alamat);

    List<UserDetail> findByNegara(String negara);

    @Query("SELECT p FROM UserDetail p WHERE p.nik = ?1 AND p.namaLengkap = ?2")
    List<UserDetail> findByNikAndNamaLengkap(String nik, String namaLengkap);

    @Query("SELECT COUNT(p) FROM UserDetail p WHERE p.jenisKelamin = ?1")
    long countByJenisKelamin(String jenisKelamin);

}
