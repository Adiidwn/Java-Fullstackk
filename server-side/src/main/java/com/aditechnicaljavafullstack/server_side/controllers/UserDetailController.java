package com.aditechnicaljavafullstack.server_side.controllers;

import com.aditechnicaljavafullstack.server_side.models.UserDetail;
import com.aditechnicaljavafullstack.server_side.repository.UserDetailRepository;
import com.aditechnicaljavafullstack.server_side.services.UserDetailService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;

import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/user-details")
public class UserDetailController {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailController.class);

    @Autowired
    private UserDetailService userDetailService;

    @Autowired
    private final UserDetailRepository userDetailRepository;

    public UserDetailController(UserDetailRepository userDetailRepository) {
        this.userDetailRepository = userDetailRepository;
    }

    // Retrieve all user details
    @GetMapping
    public ResponseEntity<Page<UserDetail>> getAllUserDetails(
            @RequestParam(required = false) String queryParam,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        logger.info("Query params: {}, Page: {}, Size: {}", queryParam, page, size);
        Page<UserDetail> userDetails = userDetailService.getAllUserDetails(queryParam, page, size);

        return ResponseEntity.ok(userDetails);
    }

    // Retrieve a user detail by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDetail> getUserDetailById(@PathVariable Long id) {
        Optional<UserDetail> userDetail = userDetailService.getUserDetailById(id);
        return userDetail.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Retrieve a user detail by NIK
    @GetMapping("/nik/{nik}")
    public ResponseEntity<UserDetail> getUserDetailByNik(@PathVariable String nik) {
        UserDetail userDetail = userDetailService.getUserDetailByNik(nik);
        return userDetail != null ? ResponseEntity.ok(userDetail)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Create a new user detail
    @PostMapping
    public ResponseEntity<UserDetail> createUserDetail(@RequestBody UserDetail userDetail) {

        UserDetail existingUserDetail = userDetailRepository.findByNik(userDetail.getNik());
        if (existingUserDetail != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "UserDetail with NIK " + userDetail.getNik() + " already exists");
        }

        UserDetail savedUserDetail = userDetailRepository.save(userDetail);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUserDetail);
    }

    // Update an existing user detail
    @PutMapping("/{id}")
    public ResponseEntity<UserDetail> updateUserDetail(@PathVariable Long id,
            @RequestBody UserDetail userDetailDetails) {
        try {
            UserDetail updatedUserDetail = userDetailService.updateUserDetail(id, userDetailDetails);
            return ResponseEntity.ok(updatedUserDetail);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a user detail by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserDetail(@PathVariable Long id) {
        try {
            userDetailService.deleteUserDetail(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
