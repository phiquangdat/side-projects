package com.example.demo.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.DiningReview;
import com.example.demo.model.Restaurant;
import com.example.demo.model.User;
import com.example.demo.repository.DiningReviewRepository;
import com.example.demo.repository.RestaurantRepository;
import com.example.demo.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/dining-reviews")
public class DiningReviewController {
    private final DiningReviewRepository diningReviewRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

    public DiningReviewController(DiningReviewRepository diningReviewRepository, 
                                 UserRepository userRepository,
                                 RestaurantRepository restaurantRepository) {
        this.diningReviewRepository = diningReviewRepository;
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @PostMapping
    public ResponseEntity<?> submitReview(@RequestBody @Valid DiningReviewDto dto) {
        Optional<User> userOpt = userRepository.findByDisplayName(dto.getDisplayName());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not exist");
        }
        Optional<Restaurant> restOpt = restaurantRepository.findById(dto.getRestaurantId());
        if (restOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Restaurant does not exist");
        }
        DiningReview review = new DiningReview();
        review.setDisplayName(dto.getDisplayName());
        review.setRestaurantId(dto.getRestaurantId());
        review.setPeanutScore(dto.getPeanutScore());
        review.setEggScore(dto.getEggScore());
        review.setDairyScore(dto.getDairyScore());
        review.setCommentary(dto.getCommentary());
        review.setStatus(DiningReview.DiningReviewStatus.PENDING);
        diningReviewRepository.save(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(new DiningReviewDto(review));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReview(@PathVariable Long id) {
        Optional<DiningReview> reviewOpt = diningReviewRepository.findById(id);
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
        return ResponseEntity.ok(new DiningReviewDto(reviewOpt.get()));
    }

    // DTO for request/response
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
