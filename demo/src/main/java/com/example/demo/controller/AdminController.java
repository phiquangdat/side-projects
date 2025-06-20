package com.example.demo.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.DiningReview;
import com.example.demo.repository.DiningReviewRepository;

@RestController
@RequestMapping("/admin/dining-reviews")
public class AdminController {
    private final DiningReviewRepository diningReviewRepository;

    public AdminController(DiningReviewRepository diningReviewRepository) {
        this.diningReviewRepository = diningReviewRepository;
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingReviews() {
        List<DiningReview> pending = diningReviewRepository.findByStatus(DiningReview.DiningReviewStatus.PENDING);
        List<DiningReviewDto> dtos = pending.stream().map(DiningReviewDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approveReview(@PathVariable Long id) {
        Optional<DiningReview> reviewOpt = diningReviewRepository.findById(id);
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dining review not found");
        }
        DiningReview review = reviewOpt.get();
        review.setStatus(DiningReview.DiningReviewStatus.APPROVED);
        diningReviewRepository.save(review);
        // TODO: Recompute restaurant scores here
        return ResponseEntity.ok(new DiningReviewDto(review));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<?> rejectReview(@PathVariable Long id) {
        Optional<DiningReview> reviewOpt = diningReviewRepository.findById(id);
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dining review not found");
        }
        DiningReview review = reviewOpt.get();
        review.setStatus(DiningReview.DiningReviewStatus.REJECTED);
        diningReviewRepository.save(review);
        return ResponseEntity.ok(new DiningReviewDto(review));
    }

    // DTO for response
    public static class DiningReviewDto {
        private Long id;
        private String displayName;
        private Long restaurantId;
        private Double peanutScore;
        private Double eggScore;
        private Double dairyScore;
        private String commentary;
        private String status;

        public DiningReviewDto() {}
        public DiningReviewDto(DiningReview review) {
            this.id = review.getId();
            this.displayName = review.getDisplayName();
            this.restaurantId = review.getRestaurantId();
            this.peanutScore = review.getPeanutScore();
            this.eggScore = review.getEggScore();
            this.dairyScore = review.getDairyScore();
            this.commentary = review.getCommentary();
            this.status = review.getStatus() != null ? review.getStatus().name() : null;
        }

        // Getters and setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getDisplayName() { return displayName; }
        public void setDisplayName(String displayName) { this.displayName = displayName; }
        public Long getRestaurantId() { return restaurantId; }
        public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }
        public Double getPeanutScore() { return peanutScore; }
        public void setPeanutScore(Double peanutScore) { this.peanutScore = peanutScore; }
        public Double getEggScore() { return eggScore; }
        public void setEggScore(Double eggScore) { this.eggScore = eggScore; }
        public Double getDairyScore() { return dairyScore; }
        public void setDairyScore(Double dairyScore) { this.dairyScore = dairyScore; }
        public String getCommentary() { return commentary; }
        public void setCommentary(String commentary) { this.commentary = commentary; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
} 
