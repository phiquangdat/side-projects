package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.DiningReview;
import com.example.demo.model.DiningReview.DiningReviewStatus;

@Repository
public interface DiningReviewRepository extends JpaRepository<DiningReview, Long> {
  List<DiningReview> findByStatus(DiningReviewStatus status);
  List<DiningReview> findByRestaurantIdAndStatus(Long restaurantId, DiningReview.DiningReviewStatus status);
}
