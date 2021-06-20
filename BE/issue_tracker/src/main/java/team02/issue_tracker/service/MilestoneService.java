package team02.issue_tracker.service;

import org.springframework.stereotype.Service;
import team02.issue_tracker.domain.Milestone;
import team02.issue_tracker.dto.MilestoneCountResponse;
import team02.issue_tracker.dto.MilestoneRequest;
import team02.issue_tracker.dto.MilestoneResponse;
import team02.issue_tracker.exception.MilestoneNotFoundException;
import team02.issue_tracker.repository.MilestoneRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MilestoneService {

    private static final Long EMPTY = 0L;

    private final MilestoneRepository milestoneRepository;

    public MilestoneService(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    public Milestone findOne(Long id) {
        Milestone milestone = milestoneRepository.findById(id).orElseThrow(MilestoneNotFoundException::new);
        return milestone;
    }

    public Milestone getMilestone(Long milestoneId) {
        if (isMilestoneEmpty(milestoneId)) {
            return null;
        }
        return findOne(milestoneId);
    }

    private boolean isMilestoneEmpty(Long milestoneId) {
        return milestoneId == EMPTY;
    }

    public List<MilestoneResponse> getAllMilestones() {
        return milestoneRepository.findAll().stream()
                .map(MilestoneResponse::new)
                .collect(Collectors.toList());
    }

    public MilestoneCountResponse getMilestoneCount() {
        return new MilestoneCountResponse(getOpenMilestoneCount(), getClosedMilestoneCount());
    }

    public Long getOpenMilestoneCount() {
        return milestoneRepository.countByIsOpenTrueAndIsDeletedFalse();
    }

    public Long getClosedMilestoneCount() {
        return milestoneRepository.countByIsOpenFalseAndIsDeletedFalse();
    }

    public void addMilestone(MilestoneRequest milestoneRequest) {
        milestoneRepository.save(milestoneRequest.toMilestone());
    }

    public void modifyMilestone(Long milestoneId, MilestoneRequest milestoneRequest) {
        Milestone milestone = milestoneRepository.findById(milestoneId).orElseThrow(MilestoneNotFoundException::new);
        milestone.edit(milestoneRequest);
        milestoneRepository.save(milestone);
    }

    public void deleteMilestone(Long milestoneId) {
        Milestone milestone = milestoneRepository.findById(milestoneId).orElseThrow(MilestoneNotFoundException::new);

        // Todo: 수정 해야함
        milestone.delete();
        milestoneRepository.save(milestone);

    }
}
