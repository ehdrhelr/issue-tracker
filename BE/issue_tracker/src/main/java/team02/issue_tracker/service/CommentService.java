package team02.issue_tracker.service;

import org.springframework.stereotype.Service;
import team02.issue_tracker.domain.*;
import team02.issue_tracker.dto.CommentEmojiRequest;
import team02.issue_tracker.dto.CommentRequest;
import team02.issue_tracker.dto.EmojiResponse;
import team02.issue_tracker.dto.issue.IssueRequest;
import team02.issue_tracker.exception.CommentNotFoundException;
import team02.issue_tracker.exception.EmojiNotFoundException;
import team02.issue_tracker.repository.CommentEmojiRepository;
import team02.issue_tracker.repository.CommentRepository;
import team02.issue_tracker.repository.EmojiRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final EmojiRepository emojiRepository;
    private final CommentEmojiRepository commentEmojiRepository;

    public CommentService(CommentRepository commentRepository, EmojiRepository emojiRepository, CommentEmojiRepository commentEmojiRepository) {
        this.commentRepository = commentRepository;
        this.emojiRepository = emojiRepository;
        this.commentEmojiRepository = commentEmojiRepository;
    }

    public Comment makeComment(IssueRequest issueRequest, User writer, Issue issue) {
        Comment comment = issueRequest.toComment(writer);
        comment.addIssue(issue);
        return commentRepository.save(comment);
    }

    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    public void saveAll(List<Comment> comments) {
        commentRepository.saveAll(comments);
    }

    public void deleteCommentEmojis(Long commentId) {
        List<CommentEmoji> commentEmojis = commentEmojiRepository.findByCommentId(commentId);
        commentEmojiRepository.deleteAll(commentEmojis);
    }

    public void addEmoji(Long commentId, CommentEmojiRequest commentEmojiRequest) {
        Comment comment = commentRepository.findByIdAndDeletedFalse(commentId).orElseThrow(CommentNotFoundException::new);
        Emoji emoji = emojiRepository.findByIdAndDeletedFalse(commentEmojiRequest.getEmojiId()).orElseThrow(EmojiNotFoundException::new);
        commentEmojiRepository.save(new CommentEmoji(comment, emoji));
    }

    public void modifyComment(Long commentId, CommentRequest commentRequest) {
        Comment comment = commentRepository.findByIdAndDeletedFalse(commentId).orElseThrow(CommentNotFoundException::new);
        comment.edit(commentRequest.getContent(), commentRequest.getFile());
        commentRepository.save(comment);
    }

    public List<EmojiResponse> getAllEmojiResponses() {
        return emojiRepository.findByDeletedFalse().stream()
                .map(EmojiResponse::new)
                .collect(Collectors.toList());
    }
}
